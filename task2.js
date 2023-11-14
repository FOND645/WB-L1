// Задача о странных числах: Напишите функцию, которая принимает число и возвращает true,
// если это число является странным, и false в противном случае. Странным числом считается число,
// которое равно сумме всех своих делителей, кроме самого себя.

function isStrangeNum(number) {
    let sum = 0;
    for (let i = Math.floor(number / 2); i > 0; i--) {
        if (number % i !== 0) continue;
        sum += i;
        if (sum > number) return false;
    }
    return number === sum;
}

console.log(6, isStrangeNum(6));
console.log(10, isStrangeNum(10));
console.log(19, isStrangeNum(19));
console.log(28, isStrangeNum(28));
console.log(106, isStrangeNum(106));
console.log(496, isStrangeNum(496));
