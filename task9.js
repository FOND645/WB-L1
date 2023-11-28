// Реализовать функцию конвертации JSON в строку

function JSONstringify(target) {
    if (typeof target !== 'object' || target === null || target === undefined) {
        return String(target);
    }

    const isArray = Array.isArray(target);
    const result = [];

    for (let key in target) {
        if (target.hasOwnProperty(key)) {
            const value = target[key];
            const valueType = typeof value;

            if (valueType !== 'function') {
                const stringKey = `"${key}":`;
                const stringValue = JSONstringify(value);

                result.push((isArray ? '' : stringKey) + stringValue);
            }
        }
    }
    return isArray ? `[${result.join(',')}]` : `{${result.join(',')}}`;
}

const obj = {
    A: undefined,
    B: [1, 7, 8, { A: 1, B: 2 }],
    E: () => console.log(12)
}

console.log(JSONstringify(obj))