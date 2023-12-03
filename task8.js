// Задача о замыканиях: напишите функцию, которая будет принимать массив функций
// и возвращать новую функцию, которая вызывает каждую функцию в этом массиве
// и возвращает массив результатов, полученных после вызова каждой функции.

// Функция для проверки, является ли аргумент синхр. функцией
function isSyncFunc(Func) {
    function example() {}
    return Object.getPrototypeOf(Func) === Object.getPrototypeOf(example);
}

function fucntionsAll(funcArray) {
    // Проверяем все ли элементы ммассива - синхронные ф-ии
    if (!funcArray.every((Func) => isSyncFunc(Func)))
        throw new TypeError(
            'One or more of the array elements is not a synchronous function'
        );

    // Я не знаю что здесь комментировать. Честно. Она просто берет и делает то что сказано...
    return () => {
        return funcArray.map((Func) => Func());
    };
}
