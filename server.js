const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

const server = express();
const staticDir = path.resolve(__dirname);
const SERVER_PORT = 18080;

server.use(cors());
server.use(express.static(staticDir));


server.use('/sendDataJS', express.json()); // Применение промежуточного ПО для парсинга тела запроса как JSON
server.post('/sendDataJS', (req, res) => {
    console.log('/sendDataJS')
    console.log('body', req.body);
    res.send('Data received successfully'); // Отправка ответа на запрос
})

server.use('/sendDataHTML', bodyParser.urlencoded({ extended: true }));
server.post('/sendDataHTML', (req, res) => {
    console.log('body', req.body);
    res.send('Data received successfully'); // Отправка ответа на запрос
});

server.use('/vkapi', (req, res, next) => {
    const requestURL = 'https://api.vk.ru/' + req.url.replace('/vkapi');
    fetch(requestURL)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            res.status(200).send(data);
        });
});

server.listen(SERVER_PORT, () =>
    console.log(`Сервер запущен на порту ${SERVER_PORT}`)
);
