var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

//starting game
var object = document.getElementById("body");
object.onkeypress = function () {
  if (started == false) {
    nextSequence();
    started = true;
  }
};

//when user click on any of one colour
function handler(id) {
  var userChosenColour = id;
  userClickedPattern.push(userChosenColour);
  play(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
}

//checking Answer
function checkAnswer(level) {
  if (gamePattern[level] === userClickedPattern[level]) {
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(() => {
        nextSequence();
      }, 1200);
    }
  } else {
    play("wrong");
    var object=document.getElementById("body");
    object.classList.add("game-over");
    document.getElementById("level-title").innerText ="Game Over, Press Space Key to Restart" ;
    setTimeout(() => {
      object.classList.remove("game-over");
    }, 200);
    startOver();
  }
}

//sequence to get a new colour
function nextSequence() {
  level++;
  document.getElementById("level-title").innerText = "level " + level;
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  document.querySelector("#" + randomChosenColour).style.background =
    "transparent";
  document.querySelector("#" + randomChosenColour).style.border =
    "10px solid transparent";
  setInterval(() => {
    document.querySelector(
      "#" + randomChosenColour
    ).style.background = randomChosenColour;
    document.querySelector(
      "#" + randomChosenColour
    ).style.border = `10px solid black`;
    return 0;
  }, 300);
  play(randomChosenColour);
  userClickedPattern = [];
}

function play(name) {
  var audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  var clicked = document.getElementById(currentColour);
  clicked.classList.add("pressed");
  setInterval(() => {
    clicked.classList.remove("pressed");
  }, 100);
}

//restarting function
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}