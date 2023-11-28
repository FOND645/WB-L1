function JSONparse(JSONstring) {
    if (JSONstring === 'null') return null
    else if (JSONstring === 'true') return true
    else if (JSONstring === 'false') return false
    else if (JSONstring === 'NaN') return NaN
    else if (JSONstring === 'undefined') return undefined
    else if (/^-?\d+(\.\d+)?$/.test(JSONstring)) return parseFloat(JSONstring)
    else if (JSONstring.startsWith('"') && JSONstring.endsWith('"')) return JSONstring.slice(1, -1)
    else if (JSONstring.startsWith('[') && JSONstring.endsWith(']')) {
        JSONstring = JSONstring.slice(1, -1)
        let objArr = splitObject(JSONstring)
        return objArr.map(Element => JSONparse(Element))
    }
    else if (JSONstring.startsWith('{') && JSONstring.endsWith('}')) {
        JSONstring = JSONstring.slice(1, -1)
        let result = {}
        splitObject(JSONstring).forEach(Element => {
            const indexOfBreak = Element.indexOf(':')
            let key = Element.substring(0, indexOfBreak)
            let value = Element.substring(indexOfBreak + 1)
            key = key.slice(1, -1)
            value = JSONparse(value)
            result[key] = value
        })
        return result
    }
    else throw new Error('Invalid JSON')
}

function findObjectBreakPoints(JSONstring) {
    let borders = []
    let breakPointsIndexes = []
    for (let i = 0; i < JSONstring.length; i++) {
        const ch = JSONstring[i]
        if (ch === '{' || ch === '[' || ch === '"' && borders[borders.length - 1] !== '"') borders.push(ch)
        else if (ch === '}' || ch === ']' || ch === '"' && borders[borders.length - 1] === '"') borders.pop()
        else if (ch === "," && borders.length === 0) breakPointsIndexes.push(i)
    }
    return breakPointsIndexes
}

function splitObject(JSONstring) {
    const breakPointsIndexes = findObjectBreakPoints(JSONstring)
    if (breakPointsIndexes.length === 0) return [JSONstring]
    let result = [JSONstring.slice(0, breakPointsIndexes[0])]
    if (breakPointsIndexes.length > 2) {
        for (let i = 1; i < breakPointsIndexes.length; i++) {
            const breakPoint1 = breakPointsIndexes[i - 1]
            const breakPoint2 = breakPointsIndexes[i]
            const subString = JSONstring.slice(breakPoint1 + 1, breakPoint2)
            result.push(subString)
        }
    }
    result.push(JSONstring.slice(breakPointsIndexes[breakPointsIndexes.length - 1] + 1))
    return result
}

const complexObject = {
    string: 'Пример строки',
    number: 42,
    boolean: true,
    nullValue: null,
    undefinedValue: undefined,
    nanValue: NaN,
    function: () => console.log('Это функция'),
    array: [1, 'two', { nested: 'object' }, null, undefined, NaN, () => { }],
    nestedObject: {
        anotherString: 'Еще одна строка',
        anotherNumber: 10,
        anotherBoolean: false,
        anotherArray: [{ nestedArray: [1, 2, 3] }, 'text', null, undefined, NaN, () => { }],
    },
};
const JSONstr = '{"string":"Пример строки","number":42,"boolean":true,"nullValue":null,"nanValue":null,"array":[1,"two",{"nested":"object"},null,null,null,null],"nestedObject":{"anotherString":"Еще одна строка","anotherNumber":10,"anotherBoolean":false,"anotherArray":[{"nestedArray":[1,2,3]},"text",null,null,null,null]}}'

console.log(JSONparse(JSONstr))