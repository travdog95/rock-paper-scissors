/* elements */

const rulesButton = document.getElementById("rules");
const modalContainer = document.querySelector(".modal-container");
const modalCloseButton = document.querySelector(".modal-close");
const tokenContainers = document.querySelectorAll(".token-container");
const gameStartSection = document.querySelector("section.game-start");
const playAgainButton = document.getElementById("playAgain");

const gameActive = {
  section: document.querySelector("section.game-active"),
  tokenContainers: document.querySelectorAll(".game-active-token-container"),
};

/* Functions */

const goToStep = (step, playerSelection) => {
  switch (step) {
    case 1:
      gameStartSection.classList.remove("hidden");
      gameActive.section.classList.add("hidden");
      break;
    case 2:
      displayPlayerSelection(playerSelection);
      gameStartSection.classList.add("hidden");
      gameActive.section.classList.remove("hidden");

      determineComputerSelection();
      break;
  }
};

const displayPlayerSelection = (playerSelection) => {
  document
    .querySelector(`.game-active-token-container.token-container-${playerSelection}`)
    .classList.remove("hidden");
};

const determineComputerSelection = () => {};

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
