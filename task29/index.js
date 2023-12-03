// Задача: Взаимодействие с формами: Напишите функцию, которая
// получает данные из формы на веб-странице и выполняет определенные
// действия с этими данными, например, отправляет их на сервер
// или отображает всплывающее окно с результатами.

// Вариант с обработкой через HTML сделан в index.html
// Здесь код для отправки через HTML
// Получаем элементы DOM'a
const nameJS = document.getElementById('nameJS');
const emailJS = document.getElementById('emailJS');
const messageJS = document.getElementById('messageJS');
const genderJS = document.getElementById('genderJS');
const confirmButton = document.getElementById('submitJS');

// Вешаем на кнопку подтвердить листнер
confirmButton.addEventListener('click', buttonHandler.bind(this));

function buttonHandler() {
    // Парсим данные
    const data = {
        name: nameJS.value,
        email: emailJS.value,
        message: messageJS.value,
        gender: genderJS.value,
    };
    // Отправляем их
    fetch('/sendDataJS', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    // Все!
}
