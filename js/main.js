/* elements */

const rulesButton = document.getElementById("rules");
const modalContainer = document.querySelector(".modal-container");
const modalCloseButton = document.querySelector(".modal-close");
const tokenContainers = document.querySelectorAll(".token-container");
const gameStartSection = document.querySelector("section.game-start");
const playAgainButton = document.getElementById("playAgain");
const playAgainButtonMobile = document.getElementById("playAgainMobile");
const playerToken = document.querySelector(".player-token");
const computerToken = document.querySelector(".computer-token");
const gameCompleted = document.querySelector(".game-completed");
const gameCompletedMobile = document.querySelector(".game-completed-mobile");
const gameActive = {
  section: document.querySelector("section.game-active"),
  tokenContainers: document.querySelectorAll(".game-active-token-container"),
};
const mobileWidth = 375;
let score = 0;

const options = ["rock", "paper", "scissors"];
const bonusOptions = ["rock", "paper", "scissors", "spock", "lizard"];

let isBonusGame = false;

const optionElements = {
  paper: `
    <div class="token-outer-container">
      <div class="game-active-token-inner-container token-container-paper">
        <div class="game-active-token">
          <img src="./images/icon-paper.svg" alt="Paper" />
        </div>
      </div>
    </div>
  `,
  rock: `    
    <div class="token-outer-container">
      <div class="game-active-token-inner-container token-container-rock">
        <div class="game-active-token">
          <img src="./images/icon-rock.svg" alt="Rock" />
        </div>
      </div>
    </div>
  `,
  scissors: `    
  <div class="token-outer-container">
    <div class="game-active-token-inner-container token-container-scissors">
      <div class="game-active-token">
        <img src="./images/icon-scissors.svg" alt="Scissors" />
      </div>
    </div>
  </div>
`,
  spock: `    
  <div class="token-outer-container">
    <div class="game-active-token-inner-container token-container-spock">
      <div class="game-active-token">
        <img src="./images/icon-spock.svg" alt="Spock" />
      </div>
    </div>
  </div>
`,
  lizard: `    
  <div class="token-outer-container">
    <div class="game-active-token-inner-container token-container-lizard">
      <div class="game-active-token">
        <img src="./images/icon-lizard.svg" alt="Lizard" />
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
      //Add placeholder for computer selection
      computerToken.innerHTML = `<div class="computer-token-placeholder"></div>`;
      //Reset winner
      computerToken.classList.remove("winner");
      playerToken.classList.remove("winner");
      //Hide game active steps
      gameCompleted.classList.add("hidden");
      gameCompletedMobile.classList.add("hidden");
      gameActive.section.classList.add("hidden");
      //Display step 1
      gameStartSection.classList.remove("hidden");
      break;
    case 2:
      //Hide step 1
      gameStartSection.classList.add("hidden");
      gameActive.section.classList.remove("hidden");

      //Display player selection
      displayPlayerSelection(playerSelection);

      //Display selection titles based screen width
      const mobileTokenTitles = document.querySelectorAll(".token-title-mobile");
      const tokenTitles = document.querySelectorAll(".token-title");
      if (screen.width <= mobileWidth) {
        mobileTokenTitles.forEach((title) => {
          title.classList.remove("hidden");
        });
        tokenTitles.forEach((title) => {
          title.classList.add("hidden");
        });
      } else {
        mobileTokenTitles.forEach((title) => {
          title.classList.add("hidden");
        });
        tokenTitles.forEach((title) => {
          title.classList.remove("hidden");
        });
      }

      //Determine computer selection
      const computerSelectionIndex = await determineComputerSelection();

      const computerSelection = isBonusGame
        ? bonusOptions[computerSelectionIndex]
        : options[computerSelectionIndex];
      displayComputerSelection(computerSelection);

      //Update result text
      const resultText = determineWinner(playerSelection, computerSelection);

      document.querySelector(".result").innerHTML = resultText;

      //Mobile display
      if (screen.width <= mobileWidth) {
        gameCompletedMobile.classList.remove("hidden");
      } else {
        gameCompleted.classList.remove("hidden");
      }

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
      const potentialOptions = isBonusGame ? bonusOptions.length : options.length;
      const computerSelection = Math.floor(Math.random() * potentialOptions);
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
    return "It's a tie!";
  }

  if (isBonusGame) {
    if (
      (playerSelection == "scissors" && computerSelection == "paper") ||
      (playerSelection == "scissors" && computerSelection == "lizard") ||
      (playerSelection == "paper" && computerSelection == "rock") ||
      (playerSelection == "paper" && computerSelection == "spock") ||
      (playerSelection == "rock" && computerSelection == "lizard") ||
      (playerSelection == "rock" && computerSelection == "scissors") ||
      (playerSelection == "lizard" && computerSelection == "spock") ||
      (playerSelection == "lizard" && computerSelection == "paper") ||
      (playerSelection == "spock" && computerSelection == "scissors") ||
      (playerSelection == "spock" && computerSelection == "rock")
    ) {
      resultText = "You win!";
      playerToken.classList.add("winner");
      updateScore(1);
    } else {
      resultText = "You lose!";
      computerToken.classList.add("winner");
      updateScore(-1);
    }
  } else {
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
  }

  return resultText;
};

const updateScore = (amount) => {
  score = score + amount;
  document.querySelector(".score").innerHTML = score;
  localStorage.setItem("tko-rps", score);
};

const switchGame = () => {
  const bonusElements = document.querySelectorAll(".bonus");
  const originalElements = document.querySelectorAll(".original");

  if (isBonusGame) {
    bonusElements.forEach((bonus) => {
      bonus.classList.remove("hidden");
    });

    originalElements.forEach((og) => {
      og.classList.add("hidden");
    });
  } else {
    bonusElements.forEach((bonus) => {
      bonus.classList.add("hidden");
    });

    originalElements.forEach((og) => {
      og.classList.remove("hidden");
    });
  }
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

playAgainButtonMobile.addEventListener("click", (e) => {
  goToStep(1);
});

document.querySelector(".switch-game").addEventListener("click", (e) => {
  isBonusGame = !isBonusGame;
  switchGame();
});

init();
