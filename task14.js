// Задача на промисы: напишите функцию, которая принимает URL изображения
// и возвращает промис, который разрешается с данными об изображении, когда
// оно загружено. Когда говорится "промис разрешается с данными об изображении",
// это означает, что промис должен быть успешно выполнен (resolved) с данными
// об изображении после того, как изображение будет загружено.

const url = `https://sun9-80.userapi.com/impg/QbtiPBvsAM2-IjtRNaBD3DiyeaYqTpbXcAeT8g/diQMh9QtKI4.jpg?size=2560x1707&quality=95&sign=bbd445e318e3c7613e27eb9203764d8f&type=album`;

function getFetchImgPromise(url) {
    return new Promise((res, rej) => {
        fetch(url)
            .then((resp) => resp.blob())
            .then((data) => res(data));
    });
}

getFetchImgPromise(url);
