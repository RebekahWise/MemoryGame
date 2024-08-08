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
  "purple"
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
let firstCard = null;
let secondCard = null;

function handleCardClick(event) {
  if (count < 2 && !event.target.classList.contains("clicked") && !event.target.classList.contains("match")) {
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
  clickedCards.forEach(card => {
    card.classList.remove("clicked");
  });
}

function isNotMatch() {
  firstCard.style.backgroundColor = "white";
  secondCard.style.backgroundColor = "white";
  resetCards();
  alert("Try again!");
}

// When the DOM loads
createDivsForColors(shuffledColors);