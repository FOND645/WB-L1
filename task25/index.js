const button = document.getElementById('button');
const body = document.getElementById('body');
button.addEventListener('click', buttonHandler);

function buttonHandler() {
    const newStyle = document.createElement('style');
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
    document.head.appendChild(newStyle);
    const newElement = document.createElement('p');
    newElement.classList.add('new-style-class');
    newElement.innerText = 'НОВЫЙ ЭЛЕМЕНТ';
    console.log(newElement);
    console.log(newStyle);
    body.appendChild(newElement);
}
