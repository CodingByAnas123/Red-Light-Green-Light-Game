const light = document.querySelector("#light");
const player = document.querySelector("#player");
const moveBtn = document.querySelector("#move_btn");
const status = document.querySelector("#status");
const body = document.body;

const gameAudio = document.querySelector("#game_audio");
const gameOverOverlay = document.querySelector("#game_over_overlay");
const restartBtn = document.querySelector("#restart_btn");
const victoryOverlay = document.querySelector("#victory_overlay");
const playAgainBtn = document.querySelector("#play_again_btn");


let isGreenLight = true;
let playerPosition = 0;
let gameInterval;

// Create a Function
function showGameOver() {
  gameOverOverlay.style.visibility = "visible";
  gameOverOverlay.style.opacity = "1";
}

// show win function
function showVictory() {
  victoryOverlay.style.visibility = "visible";
  victoryOverlay.style.opacity = "1";
  gameAudio.pause()  //Stop the game audio when player wins
  gameAudio.currentTime = 0 //Reset the audio time to start
}

// restart function create
function restartGame() {
  gameOverOverlay.style.visibility = "hidden";
  gameOverOverlay.style.opacity = "0";
  victoryOverlay.style.visibility = "hidden";
  victoryOverlay.style.opacity = "0";
  playerPosition = 0;
  player.style.bottom = `${playerPosition}px`;
  moveBtn.disabled = false;
  status.textContent = "Press  'Move' during Green Light!";
  body.style.backgroundColor = "green";
  startGame();
}

// toggle light function
function toggleLight() {
  isGreenLight = !isGreenLight;
  light.textContent = isGreenLight ? "Green Light" : "Red Light";
  light.className = isGreenLight ? "green" : "red";
  body.style.backgroundColor = isGreenLight ? "green" : "red";

  if (isGreenLight) {
    gameAudio.play();
  }else {
    gameAudio.pause();
    gameAudio.currentTime = 0
  }
}

// Move Player function
function movePlayer() {
  if(!isGreenLight) {
    status.textContent = "You moved during Red Light!";
    showGameOver();
    clearInterval(gameInterval)
    moveBtn.disabled = true;
  }else {
    playerPosition += 20;
    player.style.bottom = `${playerPosition}px`;

    if(playerPosition >= 460) {
      status.textContent = "You win!";
      clearInterval(gameInterval)
      moveBtn.disabled = true;
      showVictory();
    }
  }
}

function startGame() {
  body.style.backgroundColor = "green";
  gameInterval = setInterval(toggleLight, 3000)
}


moveBtn.addEventListener("click", movePlayer);

restartBtn.addEventListener("click", restartGame);

playAgainBtn.addEventListener("click", restartGame);

startGame();