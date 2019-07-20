//1. set the canvas _Wednesday
//2. Crete Letters placeholders
//3. Make them fall
//4. Randomize letters (replace rectangles with images in random order)
//4. Wrong letters touch 
//5. score
// 5.1 click-kill  on all letters ---> on only wrong letters
// 5.2 touch the ground
//6. win-lose & start-pause
var canvas = document.querySelector('canvas');
canvas.width = 1000;
canvas.height = 600;
var ctx = canvas.getContext('2d');
// const canvas = document.querySelector('canvas');
// canvas.width = 1000;
// canvas.height = 600;
// const ctx = canvas.getContext('2d');

const gameRunningBackground = new Image();
gameRunningBackground.src = './images/2842CS.jpg';
const gameStartBackground = new Image();
gameStartBackground.src = './images/fuego.png';
const gameOverBackground = new Image();
gameOverBackground.src = './images/screen.png';
const victoryBackground = new Image();
victoryBackground.src = '.images/fuego.png'

window.onload =  function(){
    const canvas = document.querySelector('canvas');
    canvas.width = 1024;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');
    // document.getElementById("my-game").style.display = "none";//hide it before Start button is pressed
    ctx.drawImage(gameStartBackground,0,0);


document.getElementById("my-game").style.display = "none";//hide it before Start button is pressed

let gameIsRunning;

class Letter{

} // end of Letter Class

class Boom{
    constructor(x,y){
        this.spriteWidth = 3840
        this.spriteHeight = 192
        this.spries = 20
        this.width = this.spriteWidth / this.spries
        this.currentFrame = 0
        this.frameCount = 20
        this.x = x
        this.y = y
        this.speed = 12
        this.img = 'images/boom.png'
        this.srcX = 0
        this.srcY = 0
    }

    updateBoom(){
        this.currentFrame = ++this.currentFrame % this.frameCount
        this.srcX = this.currentFrame* this.width
//Effects: sound, animation
function sound(src){
    this.sound = document.createElement('audio');
    this.sound.src = src;
    this.sound.setAttribute('preload', 'auto');
    this.sound.setAttribute('controls', 'none');
    this.sound.style.display = 'none';
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }

    drawBoom()
    {
        this.updateFrame()
        let boomStripe = new Image()
        boomStripe.src =this.img
        ctx.drawImage(boomStripe, this.srcX, this.srcY, this.width, this.spriteHeight, this.x, this.y, this.width, this.spriteHeight)
    this.stop = function(){
        this.sound.pause();
    }
}

let explosion = new Boom;
const boomSound = new sound ('./sounds/explosion.wav');

// animate tut
// let img = new Image();
// img.src = './images/Preview-Green-Cap-Character-16x18.png'
// const scale = 2;
// const width = 16;
// const height = 18;
// const scaleWidth = scale * width;
// const scaleHeight = scale * height;

// function drawFrame(frameX, frameY, canvasX, canvasY){
//     ctx.drawImage(img, frameX * width, frameY * height, width, height, 80, 80, scaleWidth, scaleHeight);
// }
// function init() {
//     window.requestAnimationFrame(step);
// }
//  const cycleLoop = [0, 1, 0, 2];
//  let currentLoopIndex = 0;
//  let frameCount = 0;

//  function step() {
//     frameCount ++;
//     if( frameCount < 15){
//         window.requestAnimationFrame(step);
//         return;
//     }
//     frameCount = 0;
//      ctx.clearRect(0, 0, canvas.width, canvas.height);
//      drawFrame(cycleLoop[currentLoopIndex], 0 , 0 , 0);
//      currentLoopIndex ++;
//      if (currentLoopIndex >= cycleLoop.length) {
//          currentLoopIndex = 0;
//      }
//      window.requestAnimationFrame(step);
//  }

//end of tut


// 





// for Start button use following lines:
let currentGame;
function startGame() {

}


// class Coin {
//         constructor(src) {
//             this.spriteWidth = 440
//             this.spriteHeight = 40
//             this.sprites = 10
//             this.width = this.spriteWidth / this.sprites
//             this.currentFrame = 0
//             this.frameCount = 10
//             this.x = x
//             this.y = y
//             this.speed = 12
//             this.src = src
//             this.srcX = 0
//             this.srcY = 0
//         }
//         upateFrame() {
//             this.currentFrame = ++this.currentFrame % this.frameCount
//             this.srcX = this.currentFrame * this.width;
//             ctx.clearRect(x, y, spriteWidth, spriteHeight);
//         }
//         drawFrame() {
//             this.upateFrame()
//             let coinSprite = new Image()
//             coinSprite.src = this.img
//             ctx.drawImage(coinSprite, this.srcX, this.srcY, this.width, this.spriteHeight, this.x, this.y, this.width, this.spriteHeight)
//         }
//       }




// let boomAnimation = new Coin('./images/sprite.png');


const spriteWidth = 440;
const spriteHeight = 40;
var colls = 10;
var width = spriteWidth/colls;
var curFrame = 0;
var frameCount = 10;
let a = 200;
var b = 200;
var srcX = 0;
var srcY = 0;
var speed = 2;
var character = new Image();
character.src = './images/sprite.png';

function updateFrame(){
    curFrame = ++ curFrame % frameCount;
    srcX = curFrame * width;
    ctx.clearRect(a, b, width, spriteHeight);
}

function draw(a, b){
    updateFrame();
    ctx.drawImage(character, srcX, srcY, width, spriteHeight, a, b, width, spriteHeight);
}




//_______________________________________________________________________________

document.getElementById("pause-button").onclick = function()  {
    pauseGame();
  };
function pauseGame() {
}

function drawGame(){
    ctx.clearRect(0,0,1000,600);
    ctx.clearRect(0,0,1024,600);
    frames ++;

    ctx.drawImage(gameRunningBackground, 0, 0)

    if(frames % 50 === 1 ){
        randomLetterX = Math.floor(Math.random() * 600);
function drawGame(){

        console.log("--------", currentGame.letters[i].y)
        currentGame.letters[i].drawLetter();

            if(currentGame.letters[i].x < mouse.x && mouse.x < currentGame.letters[i].x + currentGame.letters[i].width && currentGame.letters[i].y < mouse.y && mouse.y < currentGame.letters[i].y + currentGame.letters[i].height && currentGame.letters[i].letterImage.src.includes('28')){
            console.log('kjvbdfjhbjk');
            boomSound.play();
            draw(character);
            x = 0;
            y = 0;
            currentGame.letters.splice(i, 1);
            boomSound.play();
            if(gameIsRunning){
                currentGame.score ++
            }
function drawGame(){
        //remove image of clicked letter and add score

        if(!gameIsRunning){//style for "pause" state
            ctx.rect(0,0,1000, 600);
            ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
            ctx.rect(0,0,1024, 600);
            ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'
            ctx.fill();
            ctx.font = '30px Arial';
            ctx.fillStyle ='white';
function drawGame(){
       }

        //when letters reach the bottom
        if(currentGame.letters[i].y >= (640 - currentGame.letters[i].height) && currentGame.letters[i].letterImage.src.includes('28')){
        if(currentGame.letters[i].y >= (680 - currentGame.letters[i].height) && currentGame.letters[i].letterImage.src.includes('28')){


            drawBoom(explosion);
            currentGame.letters.splice(i, 1);

            //for later score counting:
function drawGame(){

    }

    if(currentGame.score < -10){
    if(currentGame.score < -9){
        // gameIsRunning = false;
        ctx.fillRect(0,0, 1024, 600);
        ctx.drawImage(gameOverBackground, 0, 0);
        currentGame.letters = [];
        ctx.font = "70px bold Arial";
        ctx.fillStyle = "red";
function drawGame(){
        document.getElementById('pause-button').style.display = 'none';
    } 

    if(currentGame.score > 10){
    if(currentGame.score > 9){
        ctx.fillRect(0,0, 1024, 600);
        ctx.drawImage(gameOverBackground, 0, 0);
        currentGame.letters = [];
        ctx.font = "70px bold Arial";
        ctx.fillStyle = "red";
function drawGame(){
    if(gameIsRunning){
        requestAnimationFrame(drawGame);
    }  
 } 
 }

