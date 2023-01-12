const screen = document.querySelectorAll(".screen");
const startBtn = document.querySelector(".start")

startBtn.addEventListener("click", (event) => {
    event.preventDefault();
    screen[0].classList.add("up")
})

let time = 0
let score = 0
let prevColor = ""
let currentColor = ""
let newColor = ""
const timeDisplay = document.querySelector("#time")
const timeList = document.querySelector(".time-list");
const board = document.querySelector("#board");

timeList.addEventListener("click", (event) => {
    if (event.target.classList.contains("time-btn")) {
        time = parseInt(event.target.getAttribute("data-time"))
        setTime(time)
        screen[1].classList.add("up")
        startGame()
    }
})

board.addEventListener("click", (event) => {
    if (event.target.classList.contains("circle")) {
        score++
        event.target.remove()
        createRandomCircle()
    }
})

function setTime(time) {
    if (time < 10) {
        time = `0${time}`
    }
    timeDisplay.innerHTML = `00:${time}`
}
function startGame() {
    setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime(time)
}

function stopGame() {
    timeDisplay.parentNode.classList.add("hide")
    board.innerHTML = `<h1>Count: <span class="primary">${score}</span></h1>`
}

function decreaseTime() {
    if (time <= 0) {
        stopGame()
    } else {
        let current = --time
        setTime(current)
    }
}

function createRandomCircle() {
    const circle = document.createElement("div")
    const size = getRandomNumber(10, 60)
    circle.className = "circle"
    const { width, height } = board.getBoundingClientRect()
    const x = getRandomNumber(0 + 10, width - size - 10)
    const y = getRandomNumber(0 + 10, height - size - 10)
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    const { color, shadowColor } = getRandomColor()
    circle.style.background = color
    circle.style.boxShadow = `0 0 15px ${shadowColor}`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    board.append(circle)
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function getRandomColor() {
    const color1 = "linear-gradient(220.16deg, #4c7f1e 0%, #4c7d18 100%)"
    const color2 = "linear-gradient(221.87deg, #f8490f 0%, #f80f0f 100%)"
    const color3 = "linear-gradient(229.99deg, #16d9e3 0%, #46aef7 100%)"
    const color4 = "linear-gradient(229.99deg, #f4ea2e 0%, #f0bb0b 100%)"
    const color5 = "linear-gradient(220.99deg, #9238a4 0%, #ca0bf0 100%)"
    const colors = [color1, color2, color3, color4, color5]
    const shadowColors = ["#4c7d18", "#f80f0f", "#46aef7", "#f0bb0b", "#dc4cf9"]

    let index = 0
    while (currentColor === newColor || prevColor === newColor) {
        index = Math.round(Math.random() * (colors.length - 1))
        newColor = colors[index]
    }
    prevColor = currentColor
    currentColor = newColor
    const shadowColor = shadowColors[index]
    const color = newColor
    return { color, shadowColor }
}
