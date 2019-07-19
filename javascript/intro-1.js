//1. set the canvas _Wednesday
//2. Crete Letters placeholders
//3. Make them fall
//4. Randomize letters (replace rectangles with images in random order)
//4. Wrong letters touch 
//5. score
// 5.1 click-kill  on all letters ---> on only wrong letters
// 5.2 touch the ground
//6. win-lose & start-pause

// const canvas = document.querySelector('canvas');
// canvas.width = 1000;
// canvas.height = 600;
// const ctx = canvas.getContext('2d');

// const gameRunningBackground = new Image();
// gameRunningBackground.src = './images/bg/screen_frame.png';
// const gameStartBackground = new Image();
// gameStartBackground.src = './images/screen-frame.png';
// const gameOverBackground = new Image();
// gameOverBackground.src = './images/bg/victory.jpg';
// const victoryBackground = new Image();
// victoryBackground.src = '.images/fuego.png'

window.onload =  function(){
    const canvas = document.querySelector('canvas');
    canvas.width = 1024;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');
    // document.getElementById("my-game").style.display = "none";//hide it before Start button is pressed
    ctx.drawImage(gameStartBackground,0,0);



let gameIsRunning;

class Game{
    constructor(){
        this.letters = [];//array of falling letters
        this.score = 0;
    }
}

//class for of letters of all the fonts
class Letter{
    constructor(x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.arrayOfPaths = ['images/2842CS.jpg','./images/car.png','./images/screen.png'];
        this.randomPath = Math.floor(Math.random()*this.arrayOfPaths.length);
        this.letterImage = new Image();
        this.letterImage.src = this.arrayOfPaths[this.randomPath];
    } //end of Constructor Letter

    drawLetter(){//method to draw a letter
        ctx.drawImage(this.letterImage ,this.x, this.y, this.width, this.height);
        //ctx.fillStyle = 'yellow'
    }

} // end of Letter Class


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
    this.stop = function(){
        this.sound.pause();
    }
}

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
let frames = 0;


document.getElementById("start-button").onclick = function() {
    startGame();
  };

let mouse = {
    x: undefined,
    y: undefined
}

function startGame() {

    currentGame = new Game();
    document.getElementById('my-game').addEventListener('click', function(e){
       mouse.x = event.x;
       mouse.y = event.y; 
    });
    gameIsRunning = true;
    

    document.getElementById("my-game").style.display = "block";
    document.getElementById('pause-button').style.display = 'block';
    document.getElementById('start-button').style.display = 'none'
    currentGame = new Game();

    drawGame();

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


const spriteWidth = 400;
const spriteHeight = 80;
var colls = 5;
var width = spriteWidth/colls;
var curFrame = 0;
var frameCount = 10;
let a;
let b;
var srcX = 0;
var srcY = 0;
var speed = 1000;
var character = new Image();
character.src = './images/explosionSprite.png';

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
        document.getElementById('start-button').style.display = 'block';
        document.getElementById('pause-button').style.display = 'none';
        gameIsRunning = false;
        console.log('stop') ;
}

function drawGame(){
    ctx.clearRect(0,0,1024,600);
    frames ++;
    ctx.drawImage(gameRunningBackground, 0, 0);
    // ctx.drawRect(0,0,1024,600);
    // ctx.fillStyle = 'grey';
    
    if(frames % 50 === 1 ){
        randomLetterX = Math.floor(Math.random() * 600);
        letterY = 64; //to start from the top
        letterWidth  = 80;
        letterHeight = 80;

        let letter = new Letter(randomLetterX, letterY, letterWidth, letterHeight);
        currentGame.letters.push(letter);
      } 
      for (let i=0; i < currentGame.letters.length; i++){
        currentGame.letters[i].y += 2;

        console.log("--------", currentGame.letters[i].y)
        currentGame.letters[i].drawLetter();
            if(currentGame.letters[i].x < mouse.x && mouse.x < currentGame.letters[i].x + currentGame.letters[i].width && currentGame.letters[i].y < mouse.y && mouse.y < currentGame.letters[i].y + currentGame.letters[i].height && currentGame.letters[i].letterImage.src.includes('28')){
            c = currentGame.letters[i].x
            d = currentGame.letters[i].y
            // a = currentGame.letters[i].x + (currentGame.letters[i].width / 2);
            // b = currentGame.letters[i].y + (currentGame.letters[i].height / 2);
            // a = mouse.x;
            // b = mouse.y
            draw(character);
            console.log('kjvbdfjhbjk');
            boomSound.play();
            
            mouse.x = 0;
            mouse.y = 0;
            currentGame.letters.splice(i, 1);
            boomSound.play();
            if(gameIsRunning){
                currentGame.score ++
            }
            document.getElementById('myScore').innerHTML = currentGame.score; 
            }
        //remove image of clicked letter and add score

        if(!gameIsRunning){//style for "pause" state
            ctx.rect(0,0,1024, 600);
            ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'
            ctx.fill();
            ctx.font = '30px Arial';
            ctx.fillStyle ='white';
            ctx.textAlign = 'center';
            ctx.fillText('Paused', 300 , 400)
       }

        //when letters reach the bottom
        if(currentGame.letters[i].y >= (680 - currentGame.letters[i].height) && currentGame.letters[i].letterImage.src.includes('28')){
            
            
            currentGame.letters.splice(i, 1);
            
            //for later score counting:
            if(gameIsRunning){
                currentGame.score --;
            }
            document.getElementById('myScore').innerHTML = currentGame.score;  
        }

    }
    
    if(currentGame.score < -9){
        // gameIsRunning = false;
        ctx.fillRect(0,0, 1024, 600);
        ctx.drawImage(gameOverBackground, 0, 0);
        currentGame.letters = [];
        ctx.font = "70px bold Arial";
        ctx.fillStyle = "red";
        ctx.fillText("Game Over", 300, 200);
        document.getElementById('start-button').style.display = 'block';
        document.getElementById('pause-button').style.display = 'none';
    } 

    if(currentGame.score > 9){
        ctx.fillRect(0,0, 1024, 600);
        ctx.drawImage(gameOverBackground, 0, 0);
        currentGame.letters = [];
        ctx.font = "70px bold Arial";
        ctx.fillStyle = "red";
        ctx.fillText("You Won!", 300, 200);
        document.getElementById('start-button').style.display = 'none';
        document.getElementById('pause-button').style.display = 'none';
        document.getElementById('second-level').style.display = 'block';
    }
    // to stop running the function behind the scene when the "pause" button is clicked
    // this also controls the speed 
    if(gameIsRunning){
        requestAnimationFrame(drawGame);
    }  
 }
}