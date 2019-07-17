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


// for Start button use following lines:

let currentGame;
let frames = 0;

// let gameIsRunning = false;//to be able pause game


document.getElementById("start-button").onclick = function() {
    startGame();
  };

let mouse = {
    x: undefined,
    y: undefined
}

function startGame() {
    
    currentGame = new Game();
    document.getElementById('myScore').innerHTML = 0;
    document.getElementById('my-game').addEventListener('click', function(e){
       mouse.x = event.x;
       mouse.y = event.y; 
       console.log(mouse.x, mouse.y);
  
    //    gameIsRunning = true;
    });

    document.getElementById("my-game").style.display = "block";
    document.getElementById('pause-button').style.display = 'block';
    document.getElementById('start-button').style.display = 'none'
    currentGame = new Game();
    drawGame();
}

document.getElementById("pause-button").onclick = function() {
    pauseGame();
  };
function pauseGame() {
        document.getElementById('my-game').style.display = 'none';
        document.getElementById('start-button').style.display = 'block';
        document.getElementById('pause-button').style.display = 'none'
        currentGame.score = 0;
        document.getElementById('myScore').innerHTML = currentGame.score;
        gameIsRunning = false;
        console.log('stop') ;
}

function drawGame(){
    ctx.clearRect(0,0,1000,600);
    frames ++;
    // console.log('a')

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
        currentGame.letters[i].drawLetter();
          
            if(currentGame.letters[i].x < mouse.x && mouse.x < currentGame.letters[i].x + currentGame.letters[i].width && currentGame.letters[i].y < mouse.y && mouse.y < currentGame.letters[i].y + currentGame.letters[i].height && currentGame.letters[i].letterImage.src.includes('28')){
            console.log('kjvbdfjhbjk');
            x = 0;
            y = 0;
            currentGame.letters.splice(i, 1);
            currentGame.score ++
            document.getElementById('myScore').innerHTML = currentGame.score; 
            }
        //remove image of clicked letter and add score
        

        //when letters reach the bottom
        if(currentGame.letters[i].y >= (640 - currentGame.letters[i].height) && currentGame.letters[i].letterImage.src.includes('28')){
            // console.log('Fuego!Fuego!Fire!Fire');
            currentGame.letters.splice(i, 1);
            //for later score counting:
            currentGame.score --;
            document.getElementById('myScore').innerHTML = currentGame.score;  
        }

    }
    
    if(currentGame.score < -10){
        // gameIsRunning = false;
        currentGame.letters = [];
        ctx.font = "70px bold Arial";
        ctx.fillStyle = "red";
        ctx.fillText("GAME OVER!", 300, 200);
        document.getElementById('start-button').style.display = 'block';
        document.getElementById('pause-button').style.display = 'none';
    } 

    if(currentGame.score > 10){
        document.getElementById('myScore').innerHTML = 0;
        currentGame.letters = [];
        ctx.font = "70px bold Arial";
        ctx.fillStyle = "red";
        ctx.fillText("You Won!", 300, 200);
        document.getElementById('start-button').style.display = 'none';
        document.getElementById('pause-button').style.display = 'none';
        document.getElementById('second-level').style.display = 'block';
        }
    requestAnimationFrame(drawGame);   
 }

drawGame();

