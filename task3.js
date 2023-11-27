class CustomMath {
    // Хэш чисел фибоначчи
    fibonacciNums = [1, 1]
    getNthFibonacciFunction(needArray) {
        return (N) => {
            if (this.fibonacciNums.length >= N) return needArray ? this.fibonacciNums.slice(0, N) : this.fibonacciNums[N - 1]
            while (true) {
                const a = this.fibonacciNums[this.fibonacciNums.length - 2]
                const b = this.fibonacciNums[this.fibonacciNums.length - 1]
                this.fibonacciNums.push(a + b)
                if (this.fibonacciNums.length >= N) return needArray ? this.fibonacciNums.slice(0, N) : this.fibonacciNums[N - 1]
            }
        }
    }
    getFibonacciNthNum = this.getNthFibonacciFunction(false)
    getFibonacciNNums = this.getNthFibonacciFunction(true)

    // Хэширование простых чисел
    simpleNums = [2, 3, 5]
    isSimple = (num) => {
        return this.simpleNums.every(Simp => num % Simp !== 0)
    }
    // Функция высшего порядка
    // Если true, то возвращает функцию возвращающую массив из N простых числе
    // Если false, то возвращает функцию возвращающую N-е простое число
    getNthSimpleFunction(needArray) {
        return (N) => {
            if (N <= this.simpleNums.length) return needArray ? this.simpleNums.slice(0, N) : this.simpleNums[N - 1]
            let temp = this.simpleNums[this.simpleNums.length - 1]
            while (true) {
                if (this.isSimple(temp)) this.simpleNums.push(temp)
                if (N <= this.simpleNums.length) return needArray ? this.simpleNums.slice(0, N) : this.simpleNums[N - 1]
                temp += 2
            }
        }
    }

    getNthSimpleNum = this.getNthSimpleFunction(false);
    getNSimpleNums = this.getNthSimpleFunction(true)

}

const CMath = new CustomMath

console.log(CMath.getFibonacciNNums(10))
console.log(CMath.getFibonacciNthNum(12))