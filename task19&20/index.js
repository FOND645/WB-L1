// Задача 19
// Реализовать виджет, отображающий список постов из любого паблика в VK
// (подойдет любой паблик, где постов очень много). Например, с помощью этой
// функции API VK. Виджет должен иметь фиксированные размеры и возможность
// прокрутки. При прокрутке содержимого виджета до конца должны подгружаться
// новые посты. Необходимо реализовать возможность кэширования уже загруженных
// данных: если пользователь закрыл страницу, а потом снова открыл ее, виджет
// должен отображать все загруженные ранее данные (новые данные должны
// подгружаться из учетом уже загруженных ранее).
// При переполнении localStorage, данные, загруженные последними должны
// вытеснять данные загруженные первыми.

// Задача 20
// Реализовать функцию подсчета объема памяти занимаемого данными в
// LocalStorage для предыдущей задачи. При изменении данных в localStorage
// в консоль должен выводиться объем занятой памяти / максимальный размер
// хранилища.

const API_KEY =
    '8ebfb0148ebfb0148ebfb014528da9c85988ebf8ebfb014ebd896c1e3e63f447c79f5da';
const COMMUINTY_DOMAIN = 'escapefromtarkov';

class VKExtension {
    constructor() {
        this.postsContainerElement = document.getElementById('widget');
        this.currntOffset = 0;
        if (!localStorage.getItem('LSlimit')) {
            this.updateLocalStorageLimit();
        }
        this.showenPosts = [];
        this.pullRemoteData();
        this.postsContainerElement.addEventListener(
            'scroll',
            this.getFuncDelayShell(
                this.scrollEndHandler.bind(this),
                500,
                500
            ).bind(this)
        );
    }

    // Функция высшего порядка - обертка для реализации ЗоТ и дебоунсинга
    getFuncDelayShell(callback, delay, interval) {
        // Переменнай для хранения таймаута
        let timeout = undefined;
        // Переменная для хранения последнего запуска коллбэка
        let lastStart = 0;
        return () => {
            // Получаем текущее время в мс
            const now = Date.now();
            // Если прошло достаточно времени с последнего запуска - очищаем индервал и запускаем коллбэк с таймером
            if (now > lastStart + interval) {
                clearInterval(timeout);
                timeout = setTimeout(callback, delay);
            }
        };
    }

    // Хэндлер для скролла. Если скролл почти достиг конца - подгружаем еще контенту
    scrollEndHandler() {
        const currentScroll = this.postsContainerElement.scrollTop;
        const maxScroll = this.postsContainerElement.scrollHeight;
        if (currentScroll > maxScroll * 0.95) {
            this.currntOffset++;
            this.pullRemoteData();
        }
    }

    updateLocalStorageLimit() {
        // Функция для получения строки определнной длинны
        function getString(N) {
            return new Array(N).fill('A').join('');
        }
        // Предварительно очищаем LS
        localStorage.clear();
        let writenString = '';
        // Создаем массив для регистрации сколько удалось запистаь строк разной длинны
        let i = new Array(5).fill(0);
        // Пишем по 10000, 1000, 100, 10 символов в LS
        for (let raz = 10000; raz >= 1; raz = raz / 10) {
            try {
                while (true) {
                    // Увеличиваем длинну строки
                    writenString = writenString + getString(raz);
                    // Предварительно очищаем LS
                    localStorage.clear();
                    // Записываем строку в LS
                    localStorage.setItem('mass', writenString);
                    // Если удалось - добавляем к счетчику +1
                    i[raz.toString().length - 1]++;
                }
            } catch (error) {}
        }

        // Считаем сколько удалось записать символов в LS
        const writeSymbCount = i.reduce(
            (Sum, Num, Ind) => (Sum += Math.pow(10, Ind) * Num),
            0
        );
        localStorage.setItem('LSlimit', writeSymbCount * 2);
    }

    // Медои для получения всех идентификаторов постов, которые есть в памяти
    getLocalPostsIDs() {
        const localPostsIDs = Object.keys(localStorage)
            .filter((Key) => Key.includes('post:'))
            .map((Key) => Key.replace('post:', ''));
        return localPostsIDs;
    }

    // Метод для получения текущего (занятого) места в LS
    getLocalStorageSize() {
        let symbolsCount = 0;
        for (let field in localStorage) {
            if (typeof localStorage[field] !== 'string') continue;
            symbolsCount += field.length;
            symbolsCount += localStorage.getItem(field).length;
        }
        return symbolsCount * 2;
    }

    // Обновляем LS новыми постами
    updatePostsInLS(posts) {
        this.getLocalPostsIDs().forEach((PostID) =>
            this.removeLocalPost(PostID)
        );
        for (let Post of posts) {
            try {
                const ID = Post.id;
                localStorage.setItem(`post:${ID}`, JSON.stringify(Post));
            } catch (error) {
                return;
            }
        }

        console.log(
            `Занято ${this.getLocalStorageSize().toLocaleString()} байт из ${(+localStorage.getItem(
                'LSlimit'
            )).toLocaleString()} байт`
        );
    }

    // Метод для преобразования просто ссылок в обернутые в <a> ссылки
    parseLinks(text) {
        const regexAll = /https?:\/\/\S+/gi;
        const matches = text.match(regexAll);
        if (!matches) return text;
        matches.forEach((Mtch) => {
            text = text.replace(
                Mtch,
                `<a href="${Mtch}" class="post-link">${Mtch}</a>`
            );
        });
        return text;
    }

    // Метод для подтягивания новых данных
    pullRemoteData() {
        let promises = [];
        for (let Offset = 0; Offset <= this.currntOffset; Offset++) {
            promises.push(
                new Promise((res, rej) => {
                    fetch(this.getFetchURL(Offset * 100, 100))
                        .then((response) => response.json())
                        .then((data) => {
                            if (data.hasOwnProperty('error')) {
                                rej(data.error);
                            } else {
                                res(this.filterResponse(data));
                            }
                        });
                })
            );
        }
        Promise.all(promises)
            .then((dataArr) => {
                console.log(promises.length);
                this.showenPosts = dataArr
                    .flat()
                    .sort((A, B) => B.date - A.date);
                this.updatePostsInLS(this.showenPosts);
                this.drawPosts();
            })
            // Если была ошибка - отрисовываем данные из LS
            .catch((_) => {
                this.drawLocalPosts();
            });
    }

    // Метод для получения URL для запроса
    // Поскольку VK не вставляет заголовок Access-Control-Allow-Origin, то данные проксятся через хост-сервер
    getFetchURL(offset, count) {
        return `/vkapi/method/wall.get/?access_token=${API_KEY}&offset=${offset}&count=${count}&domain=${COMMUINTY_DOMAIN}&v=5.199`;
    }

    // Функция для выборки данных из ответа VK API
    filterResponse(data) {
        let filtredData = data.response.items
            .map((Post) => {
                const ImgUrl = (() => {
                    if (Post.attachments.length === 0) return null;
                    if (Post.attachments[0].type === 'photo') {
                        return Post.attachments[0].photo.sizes.find(
                            (Photo) => Photo.type === 'q'
                        ).url;
                    } else if (Post.attachments[0].type === 'video') {
                        return Post.attachments[0].video.image[3].url;
                    }
                })();
                return {
                    id: Post.id,
                    hash: Post.hash,
                    type: Post.type,
                    date: Post.date,
                    text: this.parseLinks(Post.text),
                    imgaeURL: ImgUrl,
                };
            })
            .filter((A) => A.text || A.imgaeURL)
            .sort((A, B) => B.date - A.date);
        return filtredData;
    }

    // Метод преобразования поста в HTML код
    getPostHTML(Post) {
        const { date, text, imgaeURL } = Post;
        const postDate = new Date(date * 1000);
        return `<div class="post-container">
            <p class="post-text">${text}</p>
            ${imgaeURL ? `<img src="${imgaeURL}" class="post-image">` : ''}
            <p class="post-date">${postDate.toLocaleDateString()}</p>
        </div>`;
    }

    // Отрисовка постов
    drawPosts() {
        this.postsContainerElement.innerHTML = this.showenPosts
            .map((Post) => this.getPostHTML(Post))
            .join('');
    }

    // Отрисовка постов из LS
    drawLocalPosts() {
        const localPosts = this.getLocalPostsIDs().map((PostID) =>
            JSON.parse(localStorage.getItem(`post:${PostID}`))
        );
        this.postsContainerElement.innerHTML = localPosts
            .map((Post) => this.getPostHTML(Post))
            .join('');
    }

    removeLocalPost(ID) {
        localStorage.removeItem(`post:${ID}`);
    }
}

const widget = new VKExtension();
