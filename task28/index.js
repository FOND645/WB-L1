const nameJS = document.getElementById('nameJS')
const emailJS = document.getElementById('emailJS')
const messageJS = document.getElementById('messageJS')
const genderJS = document.getElementById('genderJS')

const confirmButton = document.getElementById('submitJS')

confirmButton.addEventListener('click', buttonHandler.bind(this))

function buttonHandler() {
    const data = {
        name: nameJS.value,
        email: emailJS.value,
        message: messageJS.value,
        gender: genderJS.value,
    }
    console.log(data)
    fetch('/sendDataJS', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Установка заголовка Content-Type для указания типа отправляемых данных
        },
        body: JSON.stringify(data) // Преобразование объекта в строку JSON для передачи данных
    })
}