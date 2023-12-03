// Задача: Добавить анимацию для элемента: Напишите функцию,
// которая добавляет анимацию для элемента на веб-странице,
// например, плавное изменение его положения или размера.

// Создадим класс
class Ball {
    constructor() {
        // Получаем DOM элемент "мяча"
        this.ballElement = document.getElementById('ball');
        // Вешаем на него листнер "касания"
        this.ballElement.addEventListener(
            'mouseover',
            this.ballHoverHandler.bind(this)
        );
    }

    // Функция получения рандомных координат в границах видимой области
    getRandomCoords() {
        const max_x = window.innerWidth - 50;
        const max_y = window.innerHeight - 50;
        return [
            Math.trunc(Math.random() * max_y),
            Math.trunc(Math.random() * max_x),
        ];
    }

    // Листнер "касания" мяча. Рандомно с анимацией меняет его положение
    ballHoverHandler() {
        const newCoords = this.getRandomCoords();
        this.ballElement.style.top = `${newCoords[0]}px`;
        this.ballElement.style.left = `${newCoords[1]}px`;
    }
}

const ball = new Ball();
