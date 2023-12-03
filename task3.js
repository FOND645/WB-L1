// Реализовать аналог библиотеки Math (можно назвать MathX) с базовым набором функций, используя замыкания:
// вычисление N-го числа в ряду Фибоначчи
// вычисление всех чисел в ряду Фибоначчи до числа N
// вычисление N-го просто числа
// вычисление всех простых чисел до числа N
// kl
// Будет плюсом, если задумаетесь и об оптимизации.

// Создадим класс
class CustomMath {
    // Хэш чисел фибоначчи
    fibonacciNums = [1, 1];
    // Функция высшего порядка
    // Если true, то возвращает функцию возвращающую массив из N чисел Фибоначчи
    // Если false, то возвращает функцию возвращающую N-е число Фибоначчи
    _getNthFibonacciFunction(needArray) {
        return (N) => {
            // Проверяем, содержит ли хэш нужное нам число, если да, то возвращаем число или массив в зависимости от того, что нужно
            if (this.fibonacciNums.length >= N)
                return needArray
                    ? this.fibonacciNums.slice(0, N)
                    : this.fibonacciNums[N - 1];
            while (true) {
                // Вычисляем новое число Фибоначчи и пушим его в хэш
                const a = this.fibonacciNums[this.fibonacciNums.length - 2];
                const b = this.fibonacciNums[this.fibonacciNums.length - 1];
                this.fibonacciNums.push(a + b);
                // Если в хэше есть нужное число, то возвращаем число или массив в зависимости от того, что нужно
                if (this.fibonacciNums.length >= N)
                    return needArray
                        ? this.fibonacciNums.slice(0, N)
                        : this.fibonacciNums[N - 1];
            }
        };
    }

    // Получаем нужные функции
    getFibonacciNthNum = this._getNthFibonacciFunction(false);
    getFibonacciNNums = this._getNthFibonacciFunction(true);

    // Хэширование простых чисел
    simpleNums = [2, 3, 5];

    // Проверка простое ли число - если оно не делится без остатка на уже имеющиеся, то оно простое
    // ТОЛЬКО ДЛЯ ИСПОЛЬЗОВАНИЯ ВНУТРИ КЛАССА!
    // Если подать на него слишком большое число, то может быть неверное решение
    _isSimple(num) {
        return this.simpleNums.every((Simp) => num % Simp !== 0);
    }

    // Функция высшего порядка
    // Если true, то возвращает функцию возвращающую массив из N простых числе
    // Если false, то возвращает функцию возвращающую N-е простое число
    _getNthSimpleFunction(needArray) {
        return (N) => {
            // Проверяем, содержит ли хэш нужное нам число, если да, то возвращаем число или массив в зависимости от того, что нужно
            if (N <= this.simpleNums.length)
                return needArray
                    ? this.simpleNums.slice(0, N)
                    : this.simpleNums[N - 1];
            // Если нет то начиинаем вычислять простые числа дальше
            // Берем последнее известное простое число из хэша
            let temp = this.simpleNums[this.simpleNums.length - 1];
            while (true) {
                // Увеличиваем его на 2, что бы пропустить четные
                temp += 2;
                // Проверяме простое ли оно? Если да - пушим в хэш
                if (this._isSimple(temp)) this.simpleNums.push(temp);
                // Если в хэше есть нужное число, если да, то возвращаем число или массив в зависимости от того, что нужно
                if (N <= this.simpleNums.length)
                    return needArray
                        ? this.simpleNums.slice(0, N)
                        : this.simpleNums[N - 1];
            }
        };
    }

    // Получаем нужные функции
    getNthSimpleNum = this._getNthSimpleFunction(false);
    getNSimpleNums = this._getNthSimpleFunction(true);
}

// Получаем экземпляр класса
const MathX = new CustomMath();
console.log(MathX.getFibonacciNNums(10));
console.log(MathX.getFibonacciNthNum(10));
