// Реализовать функцию конвертации JSON в строку

function JSONstringify(target) {
    // Если аргумент - примитив, то возвращаем его приведенного к строке
    if (typeof target !== 'object' || target === null || target === undefined) {
        return String(target);
    }

    // Проверяме не является ли аргумент массивом
    const isArray = Array.isArray(target);
    // Подготавливаем переменную для результата
    let result = [];

    // Перебираем все ключи в объекте
    for (let key in target) {
        // Подготавливаем значение свойства
        const value = target[key];

        // Подготваливаем тип свойства
        const valueType = typeof value;

        // Если в свойстве записана ф-я, то пропускаем ее
        if (valueType === 'function') continue;

        // Подготавливаем строковое представление ключа
        const stringKey = `"${key}":`;

        // Подготавливаем строковое представление значения, рекурсивно вызвав ф-ю преобразования
        const stringValue = JSONstringify(value);

        // Если это не массив, то пушим в результат ключ со значением, если массив, то только значение
        result.push((isArray ? '' : stringKey) + stringValue);
    }
    // Если это массив, то оборачиваем его в [], а если объект то в {}
    return isArray ? `[${result.join(',')}]` : `{${result.join(',')}}`;
}

const obj = {
    A: undefined,
    B: [1, 7, 8, { A: 1, B: 2 }],
    E: () => console.log(12),
};

console.log(JSONstringify(obj));
