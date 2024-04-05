//-----------constants---------//

const boardSize = 20

//------------variables--------//

let snake = [{ x: 6, y: 6 }]
let food = { x: 13, y: 13}
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
  startGameBtn.disabled = true
  resetGame()
  gameInterval = setInterval(updateGame, 100)
}

//if there is a collision stop the game if not continue
function updateGame() {
  if (checkCollision()) {
    clearInterval(gameInterval)
    endMessage()
    saveScore()
    startGameBtn.disabled = false
  } else {
    generateBoard()
    generateSnake()
    generateFood()
    moveSnake()
  }
}

function resetGame() {
  snake = [{ x: 6, y: 6 }]
  food = { x: 13, y: 13}
  dx = 0
  dy = 0
  score = 0
  playerName = ""
  scoreEl.textContent = score
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
  const head = { x: snake[0].x + dx, y: snake[0].y + dy }
  snake.unshift(head)

  if (head.x === food.x && head.y === food.y) {
    food.x = Math.floor(Math.random() * (boardSize))
    food.y = Math.floor(Math.random() * (boardSize))
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

function checkCollision() {
  const head = snake[0]
  if (head.x < 0 || head.x >= boardSize || head.y < 0 || head.y >= boardSize) {
    return true
  }
  const bodyWithoutHead = snake.slice(1)
  if (bodyWithoutHead.some(segment => segment.x === head.x && segment.y === head.y)) {
    return true
  }
  return false
}

function generateFood() {
  const foodCell = document.querySelector(".cell[data-x='" + food.x + "'][data-y='" + food.y + "']")
  foodCell.classList.add("food")
}

function increaseScore() {
  score += 10
  scoreEl.textContent = score
}

function savePlayerName() {
  playerName = document.querySelector("#playerName").value
}

function saveScore() {
  savePlayerName()
  scoreHistory.push({name: playerName, score: score })
  scoreHistory.sort((a, b) => {
    return b.score - a.score
  })
  scoreHistory = scoreHistory.slice(0, 5)
  displayScoreHistory()
}

function displayScoreHistory() {
  scoreList.innerHTML = ""
  scoreHistory.forEach(item => {
    const listItem = document.createElement("li")
    listItem.textContent = item.name + ": " + item.score
    scoreList.appendChild(listItem)
  })
}

function endMessage() {
  scoreEl.textContent = "Game over"
}