//-----------constants---------//

const boardSize = 20
// let cellObj = {
//   isHead: false,
//   isBody: false,
//   isApple: false,
//   x: 0,
//   y: 0
// }

//------------variables--------//

let snake = [{ x: 10, y: 10 }]
let food = { x: 15, y: 15}
let dx = 0
let dy = 0
let score = 0
let scoreHistory = []

//--------cached elements---------//

const gameBoard = document.querySelector("#gameBoard")
const scoreEl = document.querySelector("#score")
const scoreList = document.querySelector("#scoreList")
const startGameBtn = document.querySelector("#startGameBtn")

//-----------event listners-------//

document.addEventListener("keydown", changeDirection)
startGameBtn.addEventListener("click", startGame)

//-----------functions-----------//

function startGame() {
  generateBoard()
  generateSnake()
  generateFood()
}

function generateBoard() {
  gameBoard.innerHTML = ""
  for (let y = 0; y < boardSize; y++) {
    for (let x = 0; x < boardSize; x++) {
      const cell = document.createElement("div")
      //add class of cell and x and y coordinate
      cell.classList.add("cell")
      cell.setAttribute("data-x", x)
      cell.setAttribute("data-y", y)
      gameBoard.appendChild(cell)
    }
  }
}

function generateSnake() {
  snake.forEach(segment => {
    const snakeCell = document.querySelector(".cell[data-x='" + segment.x + "'][data-y='" + segment.y + "']")
    snakeCell.classList.add("snake")
  })
}

function generateFood() {
  const foodCell = document.querySelector(".cell[data-x='" + food.x + "'][data-y='" + food.y + "']")
  foodCell.classList.add("food")
}

function changeDirection(event) {
  const key = event.key
  if (key === "ArrowUp" && dy === 0) {
    dx = 0
    dy = -1
  } else if (key === "ArrowDown" && dy === 0) {
    dx = 0
    dy = 1
  } else if (key === "ArrowLeft" && dx === 0) {
    dx = -1
    dy = 0
  } else if (key === "ArrowRight" && dx === 0) {
    dx = 1
    dy = 0
  }
}
