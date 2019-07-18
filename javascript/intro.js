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

document.getElementById("my-game").style.display = "none";//hide it before Start button is pressed

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
    }

    drawBoom(){
        this.updateFrame()
        let boomStripe = new Image()
        boomStripe.src =this.img
        ctx.drawImage(boomStripe, this.srcX, this.srcY, this.width, this.spriteHeight, this.x, this.y, this.width, this.spriteHeight)
    }
}

let explosion = new Boom;

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
    ctx.clearRect(0,0,1000,600);
    frames ++;

    
    if(frames % 50 === 1 ){
        randomLetterX = Math.floor(Math.random() * 600);
        letterY = -80; //to start from the top
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
            console.log('kjvbdfjhbjk');
            x = 0;
            y = 0;
            currentGame.letters.splice(i, 1);
            if(gameIsRunning){
                currentGame.score ++
            }
            document.getElementById('myScore').innerHTML = currentGame.score; 
            }
        //remove image of clicked letter and add score

        if(!gameIsRunning){//style for "pause" state
            ctx.rect(0,0,1000, 600);
            ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
            ctx.fill();
            ctx.font = '30px Arial';
            ctx.fillStyle ='white';
            ctx.textAlign = 'center';
            ctx.fillText('Paused', 300 , 400)
       }

        //when letters reach the bottom
        if(currentGame.letters[i].y >= (640 - currentGame.letters[i].height) && currentGame.letters[i].letterImage.src.includes('28')){
            
            drawBoom(explosion);
            currentGame.letters.splice(i, 1);
            
            //for later score counting:
            if(gameIsRunning){
                currentGame.score --;
            }
            document.getElementById('myScore').innerHTML = currentGame.score;  
        }

    }
    
    if(currentGame.score < -10){
        // gameIsRunning = false;
        currentGame.letters = [];
        ctx.font = "70px bold Arial";
        ctx.fillStyle = "red";
        ctx.fillText("Game Over", 300, 200);
        document.getElementById('start-button').style.display = 'block';
        document.getElementById('pause-button').style.display = 'none';
    } 

    if(currentGame.score > 10){
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