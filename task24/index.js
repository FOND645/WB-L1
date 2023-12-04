// Разработайте страницу, отображающую таблицу с данными. Данные необходимо подгружать из этого источника.

// Требования:
// данные должны загружаться при загрузке страницы
// необходимо реализовать сортировку по убыванию и по возрастания для всех колонок
// необходимо реализовать клиентскую пагинацию (50 элементов на странице)

// Создадим класс
class Table {
    constructor() {
        this.data = [];
        this.size = 50
        this.pageNumber = 1
        this.sortOrder = {
            column: false,
            order: false
        }
        this.tableElement = document.getElementById('table')
        this.inputElement = document.getElementById('input')
        this.decrButtonElement = document.getElementById('page-decrement')
        this.incrButtonElement = document.getElementById('page-increment')
        this.decrButtonElement.addEventListener('click', this.getPageButtonsHandler(false).bind(this))
        this.incrButtonElement.addEventListener('click', this.getPageButtonsHandler(true).bind(this))
        this.inputElement.addEventListener('input', this.inputFormater.bind(this))
        this.url =
            'http://www.filltext.com/?rows=1000&fname=%7BfirstName%7D&lname=%7BlastName%7D&tel=%7Bphone%7Cformat%7D&address=%7BstreetAddress%7D&city=%7Bcity%7D&state=%7BusState%7Cabbr%7D&zip=%7Bzip%7D&pretty=true';
        this.fetchData().then(_ => this.drawTable())
        this.inputElement.value = this.pageNumber

    }

    // Функция высшего порядка - возвращает хэндлер 
    // для нажатия на кнопки следующей и предыдущей страницы
    getPageButtonsHandler(isIncrement) {
        return () => {
            console.log('handler')
            if (isIncrement) {
                if (+this.inputElement.max === this.pageNumber) return
                this.pageNumber++
            } else {
                if (this.pageNumber === 1) return
                this.pageNumber--
            }

            this.inputElement.value = this.pageNumber
            this.drawTable()
        }
    }

    // Метод форматирующая ввод страницы
    inputFormater() {
        if (this.inputElement.value % 1 !== 0) this.inputElement.value = Math.trunc(this.inputElement.value)
        if (this.inputElement.value.toString() === '') return
        if (+this.inputElement.value < 1 || +this.inputElement.value > +this.inputElement.max) {
            this.inputElement.value = this.pageNumber
        }
        this.pageNumber = this.inputElement.value
        this.drawTable()
    }

    // Функция высшего порядка - возвращает хэндлер 
    // для нажатия на кнопки сортировки столбцов
    getSorterButtonHandler(fieldName) {
        return () => {
            if (this.sortOrder.column === fieldName) {
                if (this.sortOrder.order === "asc") {
                    this.sortOrder.order = 'desc'
                } else if (this.sortOrder.order === "desc") {
                    this.sortOrder.order = false
                    this.sortOrder.column = false
                } else this.sortOrder.order = 'asc'
            } else {
                this.sortOrder.order = 'asc'
                this.sortOrder.column = fieldName
            }
            this.drawTable()
        }
    }

    // Метод для получения HTML заголовка таблицы
    getTableHeaderHTML() {
        return [
            { name: 'fname', title: 'Имя' },
            { name: 'lname', title: 'Фамилия' },
            { name: 'tel', title: 'Телефон' },
            { name: 'address', title: 'Адрес' },
            { name: 'city', title: 'Город' },
            { name: 'state', title: 'Штат' },
            { name: 'zip', title: 'Индекс' }].map(Field => {
                const { name, title } = Field
                const symbol = (() => {
                    if (this.sortOrder.column === name) return this.sortOrder.order === 'asc' ? "↓" : "↑"
                    return '|'
                })()
                return `<p class="table-col-header">${title} <span class="page-button" id="sort-button-${name}">${symbol}</span></p>`
            }).join('')
    }

    // Метод для получения HTML строки таблицы
    getTableRowHTML(record) {
        const { fname, lname, tel, address, city, state, zip } = record
        return [fname, lname, tel, address, city, state, zip].map(Cell => `<p class="table-cell">${Cell}</p>`).join('')
    }

    // Метод для получения HTML всей таблицы
    getVisibleTableHTML() {
        const visibleData = this.getVisibleData(this.size, this.pageNumber)
        return visibleData.map(Row => this.getTableRowHTML(Row)).join('')
    }

    // Метод для отрисовки таблицы
    drawTable() {
        this.tableElement.innerHTML = this.getTableHeaderHTML() + this.getVisibleTableHTML()
        this.inputElement.max = Math.trunc(this.data.length / this.size)

        if (+this.inputElement.max === this.pageNumber) {
            this.incrButtonElement.style.cursor = 'not-allowed'
            this.incrButtonElement.style.color = 'gray'
        } else {
            this.incrButtonElement.style.cursor = 'pointer'
            this.incrButtonElement.style.color = 'black'
        }

        if (this.pageNumber === 1) {
            this.decrButtonElement.style.cursor = 'not-allowed'
            this.decrButtonElement.style.color = 'gray'
        } else {
            this.decrButtonElement.style.cursor = 'pointer'
            this.decrButtonElement.style.color = 'black'
        }
        this.sortButtonsElements = ['fname', 'lname', 'tel', 'address', 'city', 'state', 'zip'].map(FieldName => {
            const Element = document.getElementById(`sort-button-${FieldName}`)
            Element.addEventListener('click', this.getSorterButtonHandler(FieldName).bind(this))
            return Element
        })
    }

    // Метод для получения данных
    fetchData() {
        return new Promise((res, rej) => {
            fetch(this.url)
                .then((response) => response.json())
                .then((data) => {
                    this.data = data;
                    res(data);
                });
        });
    }

    // Метод для сравнения данных
    compareElements(A, B, order) {
        if (typeof A === "number") A = A.toString()
        if (typeof B === "number") B = B.toString()
        const compareIndex = order === 'asc' ? -1 : 1
        if (A > B) return -1 * compareIndex
        if (A < B) return 1 * compareIndex
        return 0
    }

    // Метод для выборки отображаемых данных на основе пагинации
    getVisibleData(size, pageNumber) {
        const start = size * (pageNumber - 1);
        const end = size * pageNumber;
        if (this.sortOrder.column) return [...this.data].sort((A, B) =>
            this.compareElements(
                A[this.sortOrder.column],
                B[this.sortOrder.column],
                this.sortOrder.order
            ))
            .slice(start, end);
        return [...this.data].slice(start, end);
    }
}

const table = new Table();