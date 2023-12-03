// Подсчитать максимальный объем данных, который
// можно записать в localStorage вашего браузера.

// Функция для получения строки определнной длинны
function getString(N) {
    return new Array(N).fill('A').join('');
}

// Предварительно очищаем LS
localStorage.clear();
let writenString = '';
// Создаем массив для регистрации сколько удалось запистаь строк разной длинны
let i = new Array(5).fill(0);
// Пишем по 10000, 1000, 100, 10 символов в LS
for (let raz = 10000; raz >= 1; raz = raz / 10) {
    try {
        while (true) {
            // Увеличиваем длинну строки
            writenString = writenString + getString(raz);
            // Предварительно очищаем LS
            localStorage.clear();
            // Записываем строку в LS
            localStorage.setItem('mass', writenString);
            // Если удалось - добавляем к счетчику +1
            i[raz.toString().length - 1]++;
        }
    } catch (error) {}
}

// Считаем сколько удалось записать символов в LS
const writeSymbCount = i.reduce(
    (Sum, Num, Ind) => (Sum += Math.pow(10, Ind) * Num),
    0
);

// 1 символ занимает 2 байта. Выводим результат с учето этого.
console.log(
    `Примерный размер localStorgae: ${(
        writeSymbCount * 2
    ).toLocaleString()} байт`
);
