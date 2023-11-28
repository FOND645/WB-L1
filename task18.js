// Подсчитать максимальный объем данных, который 
// можно записать в localStorage вашего браузера.

function getString(N) {
    return new Array(N).fill('A').join('')
}

localStorage.clear()
let writenString = ''
let i = new Array(5).fill(0)
for (let raz = 10000; raz >= 1; raz = raz / 10) {
    try {
        while (true) {
            writenString = writenString + getString(raz)
            localStorage.setItem('mass', writenString)
            i[raz.toString().length - 1]++
        }
    } catch (error) {

    }
}
const writeSymbCount = i.reduce((Sum, Num, Ind) => Sum+= Math.pow(10, Ind) * Num, 0)
console.log(`Примерный размер localStorgae: ${writeSymbCount * 2} байт`)