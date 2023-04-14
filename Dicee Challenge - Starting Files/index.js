var a = Math.floor(Math.random()*6)+1;
var newSrc = "images/dice"+ a +".png";
document.querySelector(".img1").setAttribute("src",newSrc);

var b = Math.floor(Math.random()*6)+1;
var newSrc = "images/dice"+ b +".png";
document.querySelector(".img2").setAttribute("src",newSrc);

if (a > b) {
    document.querySelector("h1").innerHTML = "🚩Player 1 Win!"
}else if (b > a) {
    document.querySelector("h1").innerHTML = "Player 2 Win!🚩"
}else if (a == b) {
    document.querySelector("h1").innerHTML = "Draw!"
}