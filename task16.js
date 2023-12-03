// Задача на модули и использование внешних библиотек: напишите модуль,
//  который экспортирует функцию для работы с датами. Внутри модуля
//  используйте внешнюю библиотеку Moment.js для удобной работы с датами.

const Moment = require('moment');

// Функция принимает дату и возвращает ее приведенную к определенному формату
function getFormatDate(date) {
    date = Moment(date).format('DD of MMMM YYYY HH:MM:SS');
    return date;
}

export default getFormatDate;
