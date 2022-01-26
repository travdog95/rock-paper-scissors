/* elements */

const rulesButton = document.getElementById("rules");
const modalContainer = document.querySelector(".modal-container");
const modalCloseButton = document.querySelector(".modal-close");
const tokenContainers = document.querySelectorAll(".token-container");
const gameStartSection = document.querySelector("section.game-start");
const playAgainButton = document.getElementById("playAgain");
const playerToken = document.querySelector(".player-token");
const computerToken = document.querySelector(".computer-token");
const gameCompleted = document.querySelector(".game-completed");
const gameActive = {
  section: document.querySelector("section.game-active"),
  tokenContainers: document.querySelectorAll(".game-active-token-container"),
};
let score = 0;

const options = ["rock", "paper", "scissors"];

const optionElements = {
  paper: `
    <div class="token-outer-container">
      <div class="game-active-token-inner-container token-container-paper">
        <div class="game-active-token">
          <img src="../images/icon-paper.svg" alt="Paper" />
        </div>
      </div>
    </div>
  `,
  rock: `    
    <div class="token-outer-container">
      <div class="game-active-token-inner-container token-container-rock">
        <div class="game-active-token">
          <img src="../images/icon-rock.svg" alt="Rock" />
        </div>
      </div>
    </div>
  `,
  scissors: `    
  <div class="token-outer-container">
    <div class="game-active-token-inner-container token-container-scissors">
      <div class="game-active-token">
        <img src="../images/icon-scissors.svg" alt="Scissors" />
      </div>
    </div>
  </div>
`,
};

/* Functions */

const init = () => {
  //check local storage
  const tkoRPS = localStorage.getItem("tko-rps");

  if (tkoRPS === null) {
    localStorage.setItem("tko-rps", "0");
    score = 0;
  } else {
    score = parseInt(tkoRPS);
  }

  document.querySelector(".score").innerHTML = score;
};

const goToStep = async (step, playerSelection) => {
  switch (step) {
    case 1:
      computerToken.innerHTML = `<div class="computer-token-placeholder"></div>`;
      computerToken.classList.remove("winner");
      playerToken.classList.remove("winner");
      gameCompleted.classList.add("hidden");
      gameStartSection.classList.remove("hidden");
      gameActive.section.classList.add("hidden");
      break;
    case 2:
      displayPlayerSelection(playerSelection);
      gameStartSection.classList.add("hidden");
      gameActive.section.classList.remove("hidden");

      const computerSelectionIndex = await determineComputerSelection();

      displayComputerSelection(options[computerSelectionIndex]);

      determineWinner(playerSelection, options[computerSelectionIndex]);

      gameCompleted.classList.remove("hidden");
      break;
  }
};

const displayPlayerSelection = (playerSelection) => {
  const playerToken = document.querySelector(".player-token");
  playerToken.innerHTML = optionElements[playerSelection];
};

const determineComputerSelection = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const computerSelection = Math.floor(Math.random() * options.length);
      resolve(computerSelection);
    }, 500);
  });
};

const displayComputerSelection = (computerSelection) => {
  computerToken.innerHTML = optionElements[computerSelection];
};

const determineWinner = (playerSelection, computerSelection) => {
  let resultText = "";
  //Tie
  if (playerSelection == computerSelection) {
    resultText = "It's a tie!";
    document.querySelector(".result").innerHTML = resultText;
    return;
  }

  if (
    (playerSelection == "rock" && computerSelection == "scissors") ||
    (playerSelection == "paper" && computerSelection == "rock") ||
    (playerSelection == "scissors" && computerSelection == "paper")
  ) {
    resultText = "You win!";
    playerToken.classList.add("winner");
    updateScore(1);
  } else {
    resultText = "You lose!";
    computerToken.classList.add("winner");
    updateScore(-1);
  }

  document.querySelector(".result").innerHTML = resultText;
  return;
};

const updateScore = (amount) => {
  score = score + amount;
  document.querySelector(".score").innerHTML = score;
  localStorage.setItem("tko-rps", score);
};
/* Event Handlers */

rulesButton.addEventListener("click", (e) => {
  modalContainer.classList.toggle("hidden");
});

modalCloseButton.addEventListener("click", (e) => {
  modalContainer.classList.add("hidden");
});

tokenContainers.forEach((token) => {
  token.addEventListener("click", function (e) {
    const playerSelection = this.dataset.token;
    goToStep(2, playerSelection);
  });
});

playAgainButton.addEventListener("click", (e) => {
  goToStep(1);
});

init();
