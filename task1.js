// Задача о палиндроме: напишите функцию, которая проверяет, является ли заданная строка палиндромом.
// Палиндром — это строка, которая читается одинаково в обоих направлениях (например, «аргентина манит негра»).

function isPalindrome(input) {
    input = input
        .split('')
        .map((Char) =>
            Char.toLowerCase() === Char.toUpperCase()
                ? null
                : Char.toLowerCase()
        )
        .filter((Char) => Char)
        .join('');

    return input === input.split('').reverse().join('');
}

console.log('аргентина манит непра', isPalindrome('аргентина манит непра'));
console.log('аргентина манит негра', isPalindrome('аргентина манит негра'));
console.log('аргентина майнит негра', isPalindrome('аргентина майнит негра'));
console.log('а ргентИна ман Ит Н егра', isPalindrome('а ргентИна ман Ит Н егра'));
