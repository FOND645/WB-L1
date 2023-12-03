// Необходимо реализовать простое поле ввода адреса с функцией геокодинга:
// пользователь вводит данные в поле с помощью одного из геоинформационных
// сервисов (Яндекс.Карты, ДаДата, GraphHopper), подбирается адрес.
// Найденные данные должны отображаться в выпадающем списке, из которого
// можно выбрать подходящее значение.

// Реализовать дебоунсинг и защиту от троттлинга с помощью замыканий.

// Параметры запроса
const API_S_KEY = `130c894c-e50b-4bef-b391-2a6f33e4c172`;
const API_RES_FORMAT = 'json';
const API_URL = 'https://geocode-maps.yandex.ru/1.x/';

// Функция для получения URL геокода
const getGeoCodeURL = (text) =>
    `https://geocode-maps.yandex.ru/1.x/?apikey=${API_S_KEY}&geocode=${text}&format=json`;

// Класс автокомплита строки
class GeoCodeAutocompite {
    constructor(args) {
        // Получаем ссылки на нужные элементы
        this.inputElement = document.getElementById('input');
        this.dropDownList = document.getElementById('drop-down-list');
        // Создаем хранилище результатов. Понадобится для заполнения инпута
        this.searchedResult = [];
        // Добавляем листнер для ввода инпута
        this.inputElement.addEventListener(
            'input',
            this.getFuncDelayShell(this.fetchData.bind(this), 500, 500).bind(
                this
            )
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

    fetchData() {
        // Получаем текст из инпута
        const query = this.inputElement.value;
        // Если поле пусто, то не делаем ничего
        if (query === '') return;
        // Фетчим данные
        fetch(getGeoCodeURL(query))
            .then((response) => response.json())
            .then((data) => {
                // Разбираем ответ, получаем только строки с адресом
                const result =
                    data.response.GeoObjectCollection.featureMember.map(
                        (Element) =>
                            Element.GeoObject.metaDataProperty.GeocoderMetaData
                                .text
                    );
                // Записываем результат
                this.searchedResult = result;
                // Создаем HTML разметку
                const selectTextElements = result.map(
                    (Text, Ind) =>
                        `<div class="drop-down-element" id="drop-down-element-${Ind}">${Text}</div>`
                );
                // Очищаем поле с выпадающим списком
                this.dropDownList.innerHTML = '';
                // Записываем в выпадающий список новые элементы
                this.dropDownList.innerHTML = selectTextElements.join('');
                // Для каждого нового элемента вешаем листнер
                selectTextElements.forEach((_, ind) => {
                    const selectElement = document.getElementById(
                        `drop-down-element-${ind}`
                    );
                    selectElement.addEventListener(
                        'click',
                        this.getSelectElementClickHandler(ind).bind(this)
                    );
                });
            })
            .catch((error) => console.error('error', error));
    }

    // Листнер для нажатия на найденый адрес - записывает в интпут адрес и удаляет дропдаун
    getSelectElementClickHandler(index) {
        return () => {
            this.inputElement.value = this.searchedResult[index];
            this.dropDownList.innerHTML = '';
            this.searchedResult = [];
        };
    }
}

// Инициализируем автокомплит
const geoCodeAutocompite = new GeoCodeAutocompite();
