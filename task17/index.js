// Необходимо реализовать простое поле ввода адреса с функцией геокодинга: 
// пользователь вводит данные в поле с помощью одного из геоинформационных 
// сервисов (Яндекс.Карты, ДаДата, GraphHopper), подбирается адрес. 
// Найденные данные должны отображаться в выпадающем списке, из которого 
// можно выбрать подходящее значение.

// Реализовать дебоунсинг и защиту от троттлинга с помощью замыканий.

const API_S_KEY = `130c894c-e50b-4bef-b391-2a6f33e4c172`
const API_RES_FORMAT = 'json'
const API_URL = 'https://geocode-maps.yandex.ru/1.x/'

const getGeoCodeURL = (text) =>`https://geocode-maps.yandex.ru/1.x/?apikey=${API_S_KEY}&geocode=${text}&format=json`

function fetchAddresPromise(text, callback) {
    return new Promise((res, rej) => {
        fetch(getGeoCodeURL(text))
            .then(response => response.json())
            .then(data => {
                const result = data.response.GeoObjectCollection.featureMember.map(Element => Element.GeoObject.metaDataProperty.GeocoderMetaData.text)
                console.log(result)
                if (callback) callback(result)
                res(result)
            })
            .catch(error => console.log("error", error));
    })
}

fetchAddresPromise('рязань новаторов 5к3')


const inputFieldElement = document.getElementById('input')
inputFieldElement.addEventListener('focusout', getInputHandler())

function getInputHandler() {
    let timeOut
    return (element) => {
        clearTimeout(timeOut)
        const callback = result => {
            element.srcElement.value = result
        }
        timeOut = setTimeout(() => fetchAddresPromise(element.srcElement.value, callback), 500)
    }
}