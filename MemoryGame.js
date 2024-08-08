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

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
  newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}
// function onlyTwoCards (event){if (count < 2){cardColor(event)}
// else {alert("You can only click two cards at a time!")
// return;}}
// function onlyTwoCards() {alert("You can only click two cards at a time!");
//     return;}
    

//if the div does not have a class of match, the background color will change to match the 
//class color and a class of "clicked" will be added. the count will increase by one    
function cardColor(event){if (!event.target.classList.contains("match")){
    event.target.style.backgroundColor = event.target.className;
  event.target.classList.add("clicked")}
count++;}  

//resets the background to no color and removes the "clicked" class
function resetCards(){
const cards = document.querySelectorAll(".clicked");  
cards.forEach((card) => {card.style.backgroundColor = '';
card.classList.remove("clicked");
})
}    
//resets cards after 2 seconds
function isNotMatch(){setTimeout(resetCards,2000);
 const allDiv = document.querySelectorAll("div"); 
 allDiv.forEach((divs) =>{divs.removeEventListener("click", function(){alert("NOT A MATCH!")}); 
})}   

let count = 0;
let turns = 0;

function handleCardClick(event) {
 cardColor(event);
//when two cards are clicked their class names are compared for a match. If they are a 
//match they are given the class of match and left 'face up'. the class of "clicked" is removed
if(count === 2){
  const cards = document.querySelectorAll(".clicked");
  if(cards[0].className === cards[1].className){cards.forEach((card) => {card.classList.add("match");
  card.classList.remove("clicked")});
  let matches = ((document.querySelectorAll(".match")).length);
let flipped = ((document.querySelectorAll("div")).length-1);
if(matches === flipped) {setTimeout(alert("YOU WIN!!!"),2000)};
}
//if it's not a match, the not match function runs and the count is reset to 0
else {isNotMatch();}
count = 0;
turns++;
let turn = document.querySelector("h2");
turn.innerText = "Turns: "+ `${turns}`;
}

// let cards = ((document.querySelectorAll(".match")).length);
// let flipped = ((document.querySelectorAll("div")).length-1);
// if(cards = flipped) {alert("YOU WIN!!!")};
}
  

// when the DOM loads
createDivsForColors(shuffledColors);

// - Clicking a card should change the background color 
//to be the color of the class it has.

// - Users should only be able to change at most two cards 
//at a time.



// - Clicking on two matching cards should be a “match” — 
//those cards should stay face up.
// - When clicking two cards that are not a match, they should 
//stay turned over for at least 1 second before they hide the 
//color again. You should make sure to use a  so that you can 
//execute code after one second.
    
//     ***setTimeout***
