const rulesButton = document.querySelector("button.rules");
const modal = document.querySelector(".modal");
const modalCloseButton = document.querySelector(".modal-close");

/* Event Handlers */

rulesButton.addEventListener("click", (e) => {
  modal.classList.toggle("hidden");
});

modalCloseButton.addEventListener("click", (e) => {
  modal.classList.add("hidden");
});
