class Ball {
    constructor() {
        this.ballElement = document.getElementById('ball')
        this.ballElement.addEventListener('mouseover', this.ballHoverHandler.bind(this))
    }

    getRandomCoords() {
        const max_x = window.innerWidth - 50
        const max_y = window.innerHeight - 50
        return [Math.trunc(Math.random() * max_y), Math.trunc(Math.random() * max_x)]
    }   

    ballHoverHandler() {
        const newCoords = this.getRandomCoords()
        this.ballElement.style.top = `${newCoords[0]}px`
        this.ballElement.style.left = `${newCoords[1]}px`
    }
}

const ball = new Ball()