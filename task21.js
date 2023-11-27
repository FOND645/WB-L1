// Вычислить размер коллстэка в основных 
// браузерах: Chrome, Firefox, Opera и Safari (если есть возможность).


let outCounter0 = 0
function callSelf0() {
    outCounter0++
    callSelf0()
}

let outCounter1 = 0
function callSelf1() {
    outCounter1++
    const A = outCounter1
    callSelf1()
}

let outCounter2 = 0
function callSelf2() {
    outCounter2++
    const A = outCounter2
    const B = A
    callSelf2()
}

try {
    callSelf0()
} catch (error) {
    console.log('Количество вызовов без переменных', outCounter0)    
}

try {
    callSelf1(0)
} catch (error) {
    console.log('Количество вызовов с 1 переменной типа number', outCounter1)
}

try {
    callSelf2(0)
} catch (error) {
    console.log('Количество вызовов с 2 переменными типа number', outCounter2)
}