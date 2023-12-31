// Задача на работу с объектами: создайте объект, представляющий собой книгу.
// Объект должен иметь свойства, такие как: название книги, автор и год издания.
// Напишите методы для получения и изменения значений свойств книги.

const book = {
    _authorName: 'Стивен',
    _authorLastName: 'Кинг',
    _bookName: 'Оно',
    _ISBN: '978-5-17-145607-8',
    _publishingYear: 2022,

    // Метод для установки нового имени автора с проверкой валидности
    setAuthorName(newName) {
        if (typeof newName !== 'string')
            throw new TypeError(
                `Имя автора должно быть String. Получено: ${typeof newName}`
            );
        this._authorName = newName;
    },

    // Метод для установки нового имени автора с проверкой валидности
    setAuthorLastName(newName) {
        if (typeof newName !== 'string')
            throw new TypeError(
                `Фамилия автора должна быть String. Получено: ${typeof newName}`
            );
        this._authorLastName = newName;
    },

    // Метод для установки новой фамилии автора с проверкой валидности
    setBookName(newName) {
        if (typeof newName !== 'string')
            throw new TypeError(
                `Название книги должно быть String. Получено: ${typeof newName}`
            );
        this._bookName = newName;
    },

    // Метод для установки нового года издательства с проверкой валидности
    setPublishingYear(newPubYear) {
        if (typeof newPubYear !== 'number')
            throw new TypeError(
                `Год издания должен быть Number. Получено: ${typeof newName}`
            );
        const isValidYear = (() => {
            const currentYear = new Date().getFullYear();
            if (newPubYear < 1445 || newPubYear > currentYear) return false;
            if (newPubYear % 1 !== 0) return false;
            return true;
        })();
        if (!isValidYear) throw new Error('Невалидный год');
        this._publishingYear = newPubYear;
    },

    // Метод для установки нового номера ISBN с проверкой валидности
    setISBN(newISBN) {
        const isValidISBN = /^(978|979)-\d-\d{2}-\d{6}-\d$/.test(newISBN);
        if (!isValidISBN) throw new Error('ISBN не валиден');
        this._ISBN = newISBN;
    },
};
