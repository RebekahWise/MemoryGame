const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
];

// Shuffle function
function shuffle(array) {
  let counter = array.length;
  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}

let shuffledColors = shuffle(COLORS);

// Create divs for colors
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add(color);
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  }
}

let count = 0;
let turnNumber = 0;
let firstCard = null;
let secondCard = null;

function winner() {
  let matches = document.querySelectorAll(".match").length;
  let flipped = document.querySelectorAll("div").length - 1;
  if (matches === flipped) {
    setTimeout(function () {
      highScore();
    }, 2000);
    setTimeout(function () {
      alert("YOU WIN!!!");
    }, 1000);
  }
}

function handleCardClick(event) {
  if (
    count < 2 &&
    !event.target.classList.contains("clicked") &&
    !event.target.classList.contains("match")
  ) {
    event.target.style.backgroundColor = event.target.className;
    event.target.classList.add("clicked");
    count++;

    if (count === 1) {
      firstCard = event.target;
    } else if (count === 2) {
      secondCard = event.target;
      if (firstCard.className === secondCard.className) {
        firstCard.classList.add("match");
        secondCard.classList.add("match");
        resetCards();
        winner();
      } else {
        setTimeout(isNotMatch, 1000);
      }
    }
  }
}

function resetCards() {
  count = 0;
  firstCard = null;
  secondCard = null;
  const clickedCards = document.querySelectorAll(".clicked");
  clickedCards.forEach((card) => {
    card.classList.remove("clicked");
    turnNumber++;
    let turn = document.querySelector("#turns");
    let turns = turnNumber / 2;
    turn.innerText = "Turns: " + `${turns}`;
  });
}

function isNotMatch() {
  firstCard.style.backgroundColor = "azure";
  secondCard.style.backgroundColor = "azure";
  resetCards();
}
// const reset = createDivsForColors(shuffledColors);
//Only addd one button because I don't see the purpose of 2 buttons that do the same thing
const button = document.getElementById("restart");
button.addEventListener("click", reload);

function reload() {
  window.location.reload();
}

// loadList();
// When the DOM loads
createDivsForColors(shuffledColors);

let bestScore = JSON.parse(localStorage.getItem("highScore"));
if (bestScore === null) {
  bestScore === 0;
}
let scores = document.querySelector("#score");
scores.innerText = "Best Score: " + `${bestScore}`;
function highScore() {
  if (turns < bestScore || bestScore === 0 || bestScore === null) {
    bestScore = turnNumber / 2;
    localStorage.setItem("highScore", JSON.stringify(bestScore));
    alert("Awesome! You beat the high score!");
    let scores = document.querySelector("#score");
    scores.innerText = "Best Score: " + `${bestScore}`;
  } else {
    alert("You didn't beat the high score.");
  }
}
