// document.querySelector("button").addEventListener("click", handleClick);

// function handleClick() {
//     alert("I got clicked!");
// }   or the better way is:

// document.querySelectorAll(".drum")[i].addEventListener("click", function () {
//     alert("I got clicked!");
// });


// Detect Button Pressed
for (var i = 0; i < document.querySelectorAll(".drum").length; i++) {
    document.querySelectorAll(".drum")[i].addEventListener("click", function () {
      var buttonInnerHTML = this.innerHTML;
      makeSound(buttonInnerHTML);
      buttonFlash(buttonInnerHTML);
    });  
}


// Detect Key Pressed
document.addEventListener("keydown", function(event) {
  makeSound(event.key);
  buttonFlash(event.key);
});

//What audio top play
function makeSound(key) {
  switch (key) {
    case "w":
      var crash = new Audio("./Sounds/crash.mp3");
      crash.play();
      break;
    case "a":
      var kb = new Audio("./Sounds/kick-bass.mp3");
      kb.play();
      break;
    case "s":
      var snare = new Audio("./Sounds/snare.mp3");
      snare.play();
      break;
    case "d":
      var tom1 = new Audio("./Sounds/tom-1.mp3");
      tom1.play();
      break;
    case "j":
      var tom2 = new Audio("./Sounds/tom-2.mp3");
      tom2.play();
      break;
    case "k":
      var tom3 = new Audio("./Sounds/tom-3.mp3");
      tom3.play();
      break;
    case "l":
      var tom4 = new Audio("./Sounds/tom-4.mp3");
      tom4.play();
      break;
    default:
      console.log(key)
      break;
  }

}

function buttonFlash(currentKey) {
  var actButton = document.querySelector("." + currentKey);
  actButton.classList.add(".pressed");
  setTimeout(function() {
    actButton.classList.remove(".pressed");
  }, 100);
}