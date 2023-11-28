// Разработать функцию, изменяющую окончание слов в зависимости от падежа. Например:
// 112 сообщения
// 12 сообщений
// 1 сообщение
// 1024 пользователя
// 1026 пользователей
// 121 пользователь

// Функцию надо упаковать в модуль.
['модуль', "модуля", "модулей"]


function localizeNumeral(number, wordForms) {
    const wordForm = (() => {
        if ((number >= 11 && number <= 19) || number % 10 === 0) return wordForm[2]
        if (number % 10 <= 4 && number % 10 >= 2) return wordForm[1]
        return wordForm[0]
    })()
    return `${number} ${wordForm}`
}