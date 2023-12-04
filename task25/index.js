// Задача: Создать и добавить стиль для элемента: 
// Напишите функцию, которая создает новый элемент, 
// добавляет его в DOM и устанавливает для него стиль с помощью CSS.

// Получаем ссылку на кнопку
const button = document.getElementById('button');

// Вешаем на нее листнер
button.addEventListener('click', buttonHandler);

// Получаем ссылку на body
const body = document.getElementById('body');

// Листнер нажатия на кнопку
function buttonHandler() {
    // Создаем новый стиль
    const newStyle = document.createElement('style');
    // Записываем в новый стиль содержимое 
    newStyle.textContent = `
    .new-style-class {
        width: 240px;
        height: 24px;
        background-color: red;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }`;
    // Добавляем новый стиль в документ
    document.head.appendChild(newStyle);
    // Создаем новый элемент - параграф
    const newElement = document.createElement('p');
    // Добавляем к параграфу свежесделаный стиль
    newElement.classList.add('new-style-class');
    // Записываем в параграф текст
    newElement.innerText = 'НОВЫЙ ЭЛЕМЕНТ';
    // Добавляем параграф в body
    body.appendChild(newElement);
}
