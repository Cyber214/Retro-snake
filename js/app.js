//-----------constants---------//

const boardSize = 20

//------------variables--------//

let snake = [{ x: 10, y: 10 }]
let food = { x: 15, y: 15}
let dx = 0
let dy = 0
let score = 0
let playerName = ""
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
  savePlayerName()
  gameInterval
}

function updateGame() {

}

function resetGame() {
  snake = [{ x: 10, y: 10 }]
  dx = 0
  dy = 0
  score = 0
  playerName = ""
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

function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy}
  snake.unshift(head)

  if (head.x === food.x && head.y === food.y) {
    food.x = Math.floor(Math.random() * (gameBoard.width / boardSize))
    food.y = Math.floor(Math.random() * (gameBoard.height / boardSize))
    increaseScore()
  } else {
    snake.pop()
  }
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

function generateFood() {
  const foodCell = document.querySelector(".cell[data-x='" + food.x + "'][data-y='" + food.y + "']")
  foodCell.classList.add("food")
}

function increaseScore() {
  score += 10
  scoreEl.textContent = score
}

function saveScore() {
  scoreHistory.push({name: playerName, score: score })
  scoreHistory.sort((a, b) => {
    b.score - a.score
  })
  scoreHistory = scoreHistory.slice(0, 5)
  displayScoreHistory()
}

function savePlayerName() {
  playerName = document.querySelector("#playerName").value
}

function displayScoreHistory() {
  scoreList.innerHTML = ""
  scoreHistory.forEach(item => {
    const listItem = document.createElement("li")
    listItem.textContent = item.name + ": " + item.score
    scoreList.appendChild(listItem)
  })
}