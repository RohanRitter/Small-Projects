//Random Number Generator for num 1
var randomNumber1 = Math.random();
randomNumber1 = randomNumber1 * 6;
randomNumber1 = Math.floor(randomNumber1) + 1;
console.log(randomNumber1);

document.querySelector(".img1").setAttribute("src", "./Images/dice" + randomNumber1 + ".png");


//Random Number Generator for num 2
var randomNumber2 = Math.random();
randomNumber2 = randomNumber2 * 6;
randomNumber2 = Math.floor(randomNumber2) + 1;
console.log(randomNumber2);

document.querySelector(".img2").setAttribute("src", "./Images/dice" + randomNumber2 + ".png");

if (randomNumber1 > randomNumber2) {
    document.querySelector("h1").innerHTML = "Player 1 Wins!";
} else if (randomNumber1 < randomNumber2) {
    document.querySelector("h1").innerHTML = "Player 2 Wins!";
} else { 
    document.querySelector("h1").innerHTML = "We have a Draw, Try again!";
}