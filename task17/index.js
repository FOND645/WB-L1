// Необходимо реализовать простое поле ввода адреса с функцией геокодинга: 
// пользователь вводит данные в поле с помощью одного из геоинформационных 
// сервисов (Яндекс.Карты, ДаДата, GraphHopper), подбирается адрес. 
// Найденные данные должны отображаться в выпадающем списке, из которого 
// можно выбрать подходящее значение.

// Реализовать дебоунсинг и защиту от троттлинга с помощью замыканий.

const API_S_KEY = `130c894c-e50b-4bef-b391-2a6f33e4c172`
const API_RES_FORMAT = 'json'
const API_URL = 'https://geocode-maps.yandex.ru/1.x/'

const getGeoCodeURL = (text) => `https://geocode-maps.yandex.ru/1.x/?apikey=${API_S_KEY}&geocode=${text}&format=json`

class GeoCodeAutocompite {
    constructor(args) {
        this.inputElement = document.getElementById('input')
        this.dropDownList = document.getElementById('drop-down-list')
        this.searchedResult = []
        this.inputElement.addEventListener('input', this.getInputHandler().bind(this))
    }

    isVieldEmpty() {
        return this.inputElement.value === ''
    }

    getInputHandler() {
        let timeout = undefined

        return () => {
            const text = this.inputElement.value
            if (text === "") {
                this.fetchCallback([])
                return
            }
            if (timeout) return
            clearTimeout(timeout)
            timeout = setTimeout(() => {
                this.fetchAddresPromise(text, this.fetchCallback.bind(this))
                clearTimeout(timeout)
                timeout = undefined
            }, 500)
        }
    }

    fetchCallback(result) {
        this.searchedResult = result
        const selectTextElements = result.map((Text, Ind) => `<div class="drop-down-element" id="drop-down-element-${Ind}">${Text}</div>`)
        this.dropDownList.innerHTML = ''
        this.dropDownList.innerHTML = selectTextElements.join('')
        selectTextElements.forEach((_, ind) => {
            const selectElement = document.getElementById(`drop-down-element-${ind}`)
            selectElement.addEventListener('click', this.getSelectElementClickHandler(ind).bind(this))
        })
    }

    fetchAddresPromise(text, callback) {
        return new Promise((res, rej) => {
            fetch(getGeoCodeURL(text))
                .then(response => response.json())
                .then(data => {
                    const result = data.response.GeoObjectCollection.featureMember
                        .map(Element => Element.GeoObject.metaDataProperty.GeocoderMetaData.text)
                    if (callback) callback(result)
                    res(result)
                })
                .catch(error => console.log("error", error));
        })
    }

    getSelectElementClickHandler(index) {
        return () => {
            this.inputElement.value = this.searchedResult[index]
            this.dropDownList.innerHTML = ''
            this.searchedResult = []
        }
    }
}

const geoCodeAutocompite = new GeoCodeAutocompite()