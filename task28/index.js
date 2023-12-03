const originalButton = document.getElementById('orgignal-button');
const body = document.getElementById('body');
const template = document.getElementById('template');
originalButton.addEventListener('click', () => {
    const clone = template.content.cloneNode(true);
    console.log(clone);
    body.appendChild(clone);
});
