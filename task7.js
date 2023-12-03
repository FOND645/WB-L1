// Задача о коллекции функций: у вас есть массив функций, напишите код,
// который вызовет каждую функцию в этом массиве и выведет их порядковый
// номер. Однако, вызов каждой функции должен происходить только после
// вызова предыдущей функции.
// Другими словами, нужно выполнить следующие шаги:
// Вызвать первую функцию из массива.
// После завершения работы первой функции вызвать вторую функцию.
// После завершения работы второй функции вызвать третью функцию.
// И так далее, пока все функции в массиве не будут вызваны по порядку.

// Функция для проверки, является ли аргумент асинхр. функцией
function isAsyncFunc(Func) {
    async function example() {}
    return Object.getPrototypeOf(Func) === Object.getPrototypeOf(example);
}

// Функция для проверки, является ли аргумент синхр. функцией
function isSyncFunc(Func) {
    function example() {}
    return Object.getPrototypeOf(Func) === Object.getPrototypeOf(example);
}

// Если на вход приходят ТОЛЬКО синхронные функции, то просто подряд вызываем их.
async function functionsExecutor(funcsArray) {
    // Проверяем все ли функции синхронны, если нет - дропаем ошибку
    if (!funcsArray.every((Func) => isSyncFunc(Func)))
        throw TypeError(
            'One or more of the array elements is not a synchronous function'
        );
    funcsArray.forEach((Func, index) => {
        Func();
        // И выводим индекс вызванной функции
        console.log(index);
    });
}

// А если мы не занем синхронные они или нет, то можно так
async function asyncFunctionsExecutor(funcsArray) {
    // Проверяем все ли элементы массива - функции
    if (!funcsArray.every((Func) => isSyncFunc(Func) || isAsyncFunc(Func)))
        throw TypeError('One or more of the array elements is not a function');
    // Проходимся по всем элементам массива
    for (let i = 0; i < funcsArray.length; i++) {
        // Берем функцию из массива по индексу
        const Func = funcsArray[i];
        if (isSyncFunc(Func)) {
            // Если функция синхронна, то просто вызываем ее
            Func();
        } else {
            // А если нет, то вызываем ее с await
            await Func();
        }
        // Выводим индекс
        console.log(i);
    }
}
