// Задача: Создать и добавить элемент с использованием шаблонов: 
// Напишите функцию, которая создает новый элемент с использованием 
// шаблонов (например, с помощью тега <template>) и добавляет его в DOM.

// Получаем ссылку на "оригинальную кнопку"
const originalButton = document.getElementById('orgignal-button');

// Получаем ссылку на body
const body = document.getElementById('body');

// Получаем ссылку на шаблон
const template = document.getElementById('template');

// Вешаем листнер на клик по оригинальной кнопке. 
originalButton.addEventListener('click', () => {
    const clone = template.content.cloneNode(true);
    console.log(clone);
    body.appendChild(clone);
});
