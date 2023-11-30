const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

const server = express();
const staticDir = path.resolve(__dirname);
const SERVER_PORT = 18080;

server.use(cors());

server.use(express.static(staticDir));

server.use(bodyParser.urlencoded({ extended: true }));

server.post('/sendData', (res, req) => {
    console.log(JSON.stringify(res.body, null, 2));
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
