// Вычислить размер коллстэка в основных
// браузерах: Chrome, Firefox, Opera и Safari (если есть возможность).

// Для начала измерим сколько раз сможет рекурсивно вызваться функция
// с одной переменной number внутри
let outCounter1 = 0;
function callSelf1() {
    outCounter1++;
    const A = outCounter1;
    callSelf1();
}

// А теперь с двумя
let outCounter2 = 0;
function callSelf2() {
    outCounter2++;
    const A = outCounter2;
    const B = A;
    callSelf2();
}

// Вызываем эти функции и что бы не дропнуть все оборачиваем это в try catch
try {
    callSelf1();
} catch (error) {
    console.log('Количество вызовов с 1 переменной типа number', outCounter1);
}

try {
    callSelf2();
} catch (error) {
    console.log('Количество вызовов с 2 переменными типа number', outCounter2);
}

// Теперь нам нужно понять сколько занимает "обвязка" функции
const funcSize =
    (128 * outCounter2 - 64 * outCounter1) / (outCounter1 - outCounter2);
console.log(`Размер функции: ${funcSize} бит`);

// И теперь имея на руках все данные можно высчитать размер стека
const callStackSize = (funcSize + 64) * outCounter1;
console.log(`Размер стека: ~${Math.trunc(callStackSize / 8 / 1024)} Кбайт`);

// В моем случае получились следующие данные:
// Chrome: ~980 Кбайт
// Opera (v.60.0.3255.170): ~981 Кбайт
// ЯБраузер: ~980 Кбайт
// А вот Mozilla и, прости Господи, Edge отличились.
// Данный скрипт выдает вообще рандомные значения от -10 000 Кбайт (sic!) до 10 000 Кбайт
