// Реализовать функцию конвертации строки в JSON со
// всеми необходимыми проверками и валидациями.

function JSONparse(JSONstring) {
    // Пробуем проверить какого типа объект в JSON'e
    // null ?
    if (JSONstring === 'null') return null;
    // true ?
    else if (JSONstring === 'true') return true;
    // false ?
    else if (JSONstring === 'false') return false;
    // NaN ?
    else if (JSONstring === 'NaN') return NaN;
    // undefined ?
    else if (JSONstring === 'undefined') return undefined;
    // Число ?
    else if (/^-?\d+(\.\d+)?$/.test(JSONstring)) return parseFloat(JSONstring);
    // Строка?
    else if (JSONstring.startsWith('"') && JSONstring.endsWith('"'))
        return JSONstring.slice(1, -1);
    // Массив?
    else if (JSONstring.startsWith('[') && JSONstring.endsWith(']')) {
        // Отсекаем скобки
        JSONstring = JSONstring.slice(1, -1);

        // Разбиваем на элементы
        let objArr = splitObject(JSONstring);

        // Рекурсивно преобразуем каждый элемент массива и возвращаем
        return objArr.map((Element) => JSONparse(Element));
    }

    // Объект?
    else if (JSONstring.startsWith('{') && JSONstring.endsWith('}')) {
        // Отсекаем скобки
        JSONstring = JSONstring.slice(1, -1);

        // Готовим объект-результат
        let result = {};

        // Разбиваем строку на элементы и каждую рекурсивно преобразуем
        splitObject(JSONstring).forEach((Element) => {
            // Получаем позицию разделителя - первое двоеточние
            const indexOfBreak = Element.indexOf(':');

            // Получаем ключ свойства
            let key = Element.substring(0, indexOfBreak).slice(1, -1);

            // Получаем JSON значения свойства
            let value = Element.substring(indexOfBreak + 1);

            // Записываем в итоговый объект рекурсивно преобразованное свойство
            result[key] = JSONparse(value);
        });
        return result;
    }

    // Ничего из этого? Ну тогда JSON инвалиден
    else throw new Error('Invalid JSON');
}

// Функция поиска в JSON строке разделительных запятых
function findObjectBreakPoints(JSONstring) {
    // Подготваливаем массив для открывающих скобок и кавычек
    let borders = [];
    // Подготавливаем массив с результатами
    let breakPointsIndexes = [];
    // Проходимся по всем символам в JSON'e
    for (let i = 0; i < JSONstring.length; i++) {
        const ch = JSONstring[i];
        // Если символ - открывающая скобка или открывающие кавычки то пушим элемент в массив
        if (
            ch === '{' ||
            ch === '[' ||
            (ch === '"' && borders[borders.length - 1] !== '"')
        )
            borders.push(ch);
        // Если символ - закрывающая скобка или закрывающие кавычки то вытаскиваем элемент из массива
        else if (
            ch === '}' ||
            ch === ']' ||
            (ch === '"' && borders[borders.length - 1] === '"')
        )
            borders.pop();
        // А если это запятая и в массиве открывающих элементов пусто (т.е. мы на верхнем уровне) то пушим позицию запятой в результат
        else if (ch === ',' && borders.length === 0) breakPointsIndexes.push(i);
    }
    return breakPointsIndexes;
}

// Функция для разбития JSON строки на элементы
function splitObject(JSONstring) {
    // Получаем позиции разделителей
    const breakPointsIndexes = findObjectBreakPoints(JSONstring);

    // Если таких нет, значит элемент в массиве/объекте один
    if (breakPointsIndexes.length === 0) return [JSONstring];

    // Создаем массив с результатами и добавляем в него первый элемент вырезаный из строки
    let result = [JSONstring.slice(0, breakPointsIndexes[0])];

    // если элементов больше чем 2 то заполняем ими массив
    if (breakPointsIndexes.length > 2) {
        for (let i = 1; i < breakPointsIndexes.length; i++) {
            const breakPoint1 = breakPointsIndexes[i - 1];
            const breakPoint2 = breakPointsIndexes[i];
            const subString = JSONstring.slice(breakPoint1 + 1, breakPoint2);
            result.push(subString);
        }
    }

    // И добавляем последний элемент массива
    result.push(
        JSONstring.slice(breakPointsIndexes[breakPointsIndexes.length - 1] + 1)
    );
    return result;
}

const complexObject = {
    string: 'Пример строки',
    number: 42,
    boolean: true,
    nullValue: null,
    undefinedValue: undefined,
    nanValue: NaN,
    function: () => console.log('Это функция'),
    array: [1, 'two', { nested: 'object' }, null, undefined, NaN, () => {}],
    nestedObject: {
        anotherString: 'Еще одна строка',
        anotherNumber: 10,
        anotherBoolean: false,
        anotherArray: [
            { nestedArray: [1, 2, 3] },
            'text',
            null,
            undefined,
            NaN,
            () => {},
        ],
    },
};
const JSONstr =
    '{"string":"Пример строки","number":42,"boolean":true,"nullValue":null,"nanValue":null,"array":[1,"two",{"nested":"object"},null,null,null,null],"nestedObject":{"anotherString":"Еще одна строка","anotherNumber":10,"anotherBoolean":false,"anotherArray":[{"nestedArray":[1,2,3]},"text",null,null,null,null]}}';

console.log(JSONparse(JSONstr));
