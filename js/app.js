//-----------constants---------//

const boardSize = 20

//------------variables--------//

let snake = [{ x: 6, y: 6 }]
let food = { x: 13, y: 13 }
let dx = 0
let dy = 0
let score = 0
let playerName = ""
let scoreHistory = []
let previousScores = []
let gameInterval = null
let gameSpeed = {
  slug: 160,
  worm: 110,
  python: 75
}
let gameIsInPlay = false

//--------cached elements---------//

const gameBoard = document.querySelector("#gameBoard")
const scoreEl = document.querySelector("#score")
const scoreList = document.querySelector("#scoreList")
const previousScoreList = document.querySelector("#previousScoreList")
const nextBtn = document.querySelector("#nextBtn")
const startGameBtn = document.querySelector("#startGameBtn")
const slugSp = document.getElementById("slugBtn")
const wormSp = document.getElementById("wormBtn")
const pythonSp = document.getElementById("pythonBtn")
const upBtn = document.getElementById("upBtn")
const downBtn = document.getElementById("downBtn")
const leftBtn = document.getElementById("leftBtn")
const rightBtn = document.getElementById("rightBtn")
const playerNameInput = document.querySelector("#playerName")
const mobileControls = document.getElementById("mobileControls")
const speedPrompt = document.getElementById("speedPrompt")

//-----------event listeners-------//

document.addEventListener("keydown", changeDirection)
nextBtn.addEventListener("click", nextPage)
startGameBtn.addEventListener("click", startGame)
slugSp.addEventListener("click", () => changeSpeed("slug"))
wormSp.addEventListener("click", () => changeSpeed("worm"))
pythonSp.addEventListener("click", () => changeSpeed("python"))
upBtn.addEventListener("click", () => changeDirection({ key: "ArrowUp" }))
downBtn.addEventListener("click", () => changeDirection({ key: "ArrowDown" }))
leftBtn.addEventListener("click", () => changeDirection({ key: "ArrowLeft" }))
rightBtn.addEventListener("click", () => changeDirection({ key: "ArrowRight" }))

//-----------functions-----------//

function startGame() {
  gameIsInPlay = true
  nextBtn.disabled = true
  resetGame()
  render()
  gameInterval = setInterval(updateGame, gameSpeed.worm)
}

function changeSpeed(speed) {
  if (gameInterval) {
    clearInterval(gameInterval)
    gameInterval = setInterval(updateGame, gameSpeed[speed])
  }
}

function updateGame() {
  if (checkCollision()) {
    clearInterval(gameInterval)
    gameInterval = null
    endMessage()
    saveScore()
    nextBtn.disabled = false
    gameIsInPlay = false
    render()
  } else {
    generateBoard()
    generateSnake()
    generateFood()
    moveSnake()
  }
}

function resetGame() {
  snake = [{ x: 6, y: 6 }]
  food = { x: 13, y: 13 }
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
    food.x = Math.floor(Math.random() * boardSize)
    food.y = Math.floor(Math.random() * boardSize)
    increaseScore()
  } else {
    snake.pop()
  }
}

function changeDirection(event) {
  const key = event.key
  if ((key === "ArrowUp" || key === "w") && dy === 0) {
    dx = 0
    dy = -1
  } else if ((key === "ArrowDown" || key === "s") && dy === 0) {
    dx = 0
    dy = 1
  } else if ((key === "ArrowLeft" || key === "a") && dx === 0) {
    dx = -1
    dy = 0
  } else if ((key === "ArrowRight" || key === "d") && dx === 0) {
    dx = 1
    dy = 0
  }
}

function checkCollision() {
  // check for collision with game board
  const head = snake[0]
  if (head.x < 0 || head.x >= boardSize || head.y < 0 || head.y >= boardSize) {
    return true
  }
  // check for self collition
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
  playerName = playerNameInput.value
}

function saveScore() {
  savePlayerName()
  const existingPlayer = scoreHistory.find(item => item.name === playerName)
  if (existingPlayer) {
    existingPlayer.score = Math.max(existingPlayer.score, score)
  } else {
    scoreHistory.push({ name: playerName, score: score })
  }
  scoreHistory.sort((a, b) => b.score - a.score)
  scoreHistory = scoreHistory.slice(0, 5)
  previousScores.unshift({ name: playerName, score: score })
  previousScores = previousScores.slice(0, 5)
  localStorage.setItem("previousScore", JSON.stringify(scoreHistory))
  localStorage.setItem("lastScores", JSON.stringify(previousScores))
  displayHighScore()
  displayPreviousScores()
}

function displayHighScore() {
  scoreList.innerHTML = ""
  scoreHistory.forEach(item => {
    const listItem = document.createElement("li")
    listItem.textContent = item.name + ": " + item.score
    scoreList.appendChild(listItem)
  })
}

function displayPreviousScores() {
  previousScoreList.innerHTML = ""
  previousScores.forEach(item => {
    const listItem = document.createElement("li")
    listItem.textContent = item.name + ": " + item.score
    previousScoreList.appendChild(listItem)
  })
}

window.addEventListener('load', () => {
  const storedHistory = JSON.parse(localStorage.getItem("previousScore"))
  const storedPreviousScores = JSON.parse(localStorage.getItem("lastScores"))
  if (storedHistory) {
    scoreHistory = storedHistory
    displayHighScore()
  }
  if (storedPreviousScores) {
    previousScores = storedPreviousScores
    displayPreviousScores()
  }
  render()
})

function endMessage() {
  scoreEl.textContent = "Game over"
}

function nextPage() {
  // Display
  head1.style.display = ''
  speedPrompt.style.display = ''
  startGameBtn.style.display = ''
  // Hide
  gameBoard.style.display = 'none'
  highScoresContainer.style.display = 'none'
  keyValScore.style.display = 'none'
  mobileControls.style.display = 'none'
  nextBtn.style.display = 'none'
  playerNameInput.style.display = 'none'
  previousScoresContainer.style.display = 'none'
}

function render() {
  if (gameIsInPlay) {
    // Display
    gameBoard.style.display = ''
    head1.style.display = ''
    keyValScore.style.display = ''
    mobileControls.style.display = ''
    // Hide
    highScoresContainer.style.display = 'none'
    nextBtn.style.display = 'none'
    playerNameInput.style.display = 'none'
    previousScoresContainer.style.display = 'none'
    speedPrompt.style.display = 'none'
    startGameBtn.style.display = 'none'
  } else {
    // Display
    head1.style.display = ''
    highScoresContainer.style.display = ''
    playerNameInput.style.display = ''
    previousScoresContainer.style.display = ''
    nextBtn.style.display = ''
    // Hide
    gameBoard.style.display = 'none'
    keyValScore.style.display = 'none'
    mobileControls.style.display = 'none'
    speedPrompt.style.display = 'none'
    startGameBtn.style.display = 'none'
  }
}