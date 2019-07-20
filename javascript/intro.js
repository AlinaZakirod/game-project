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

const gameRunningBackground = new Image();
gameRunningBackground.src = './images/bg/screen_frame.png';
const gameStartBackground = new Image();
gameStartBackground.src = './images/car.png';
const gameOverBackground = new Image();
gameOverBackground.src = './images/gameOver.png';
const victoryBackground = new Image();
victoryBackground.src = './images/bg/screen_frame.png';

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
        this.arrayOfPaths = ['./images/letters/a_Bodoni.png', './images/letters/a_CS.png', './images/letters/a_Helvetica.png', './images/letters/b_Bodoni.png', './images/letters/b_CS.png', './images/letters/b_Helvetica.png', './images/letters/c_Bodoni.png', './images/letters/c_CS.png', './images/letters/c_Helvetica.png', './images/letters/d_Bodoni.png', './images/letters/d_CS.png', './images/letters/d_Helvetica.png', './images/letters/e_Bodoni.png', './images/letters/e_CS.png', './images/letters/e_Helvetica.png', './images/letters/f_Bodoni.png', './images/letters/f_CS.png', './images/letters/f_Helvetica.png', './images/letters/g_Bodoni.png', './images/letters/g_CS.png', './images/letters/g_Helvetica.png', './images/letters/h_Bodoni.png', './images/letters/h_CS.png', './images/letters/h_Helvetica.png', './images/letters/i_Bodoni.png', './images/letters/i_CS.png', './images/letters/i_Helvetica.png', './images/letters/j_Bodoni.png', './images/letters/j_CS.png', './images/letters/j_Helvetica.png', './images/letters/k_Bodoni.png', './images/letters/k_CS.png', './images/letters/k_Helvetica.png', './images/letters/l_Bodoni.png', './images/letters/l_CS.png', './images/letters/l_Helvetica.png', './images/letters/m_Bodoni.png', './images/letters/m_CS.png', './images/letters/m_Helvetica.png', './images/letters/n_Bodoni.png', './images/letters/n_CS.png', './images/letters/n_Helvetica.png', './images/letters/o_Bodoni.png', './images/letters/o_CS.png', './images/letters/o_Helvetica.png', './images/letters/p_Bodoni.png', './images/letters/p_CS.png', './images/letters/p_Helvetica.png', './images/letters/q_Bodoni.png', './images/letters/q_CS.png', './images/letters/q_Helvetica.png', './images/letters/r_Bodoni.png', './images/letters/r_CS.png', './images/letters/r_Helvetica.png', './images/letters/s_Bodoni.png', './images/letters/s_CS.png', './images/letters/s_Helvetica.png', './images/letters/t_Bodoni.png', './images/letters/t_CS.png', './images/letters/t_Helvetica.png', './images/letters/u_Bodoni.png', './images/letters/u_CS.png', './images/letters/u_Helvetica.png', './images/letters/v_Bodoni.png', './images/letters/v_CS.png', './images/letters/v_Helvetica.png', './images/letters/w_Bodoni.png', './images/letters/w_CS.png', './images/letters/w_Helvetica.png', './images/letters/x_Bodoni.png', './images/letters/x_CS.png', './images/letters/x_Helvetica.png', './images/letters/y_Bodoni.png', './images/letters/y_CS.png', './images/letters/y_Helvetica.png', './images/letters/z_Bodoni.png', './images/letters/z_CS.png', './images/letters/z_Helvetica.png',]; 
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

const cheerSound = new sound ('./sounds/cheer.wav');
const boomSound = new sound('./sounds/boom.wav')

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

//___________________________
// class Sprite {
//     constructor(src,x, y){
//         this.spriteWidth = 440;
//         this.spriteHeight = 40;
//         this.sprites = 10;
//         this.width = this.spriteWidth/this.sprites;
//         this.curFrame = 0;
//         frameCount = 10;
//         this.x = x;
//         this.y = y;
//         this.srcX = 0;
//         this.srcY = 0;
//         this.speed = 2;
//         this.src = src;
//     }
//     updateFrame(){
//         curFrame = ++ curFrame % frameCount;
//         srcX = curFrame * width;
//         ctx.clearRect(x, y, width, spriteHeight);
//         }
//     drawFrame(){
//         this.updateFrame();
//         ctx.drawImage(this.src, this.srcX, this.srcY, this.width, this.spriteHeight, this.x, this.y, this.width, spriteHeight);
//     }
// }

// let boom = new Sprite('./images/sprite.png');

// const spriteWidth = 440;
// const spriteHeight = 40;
// var colls = 10;
// var width = spriteWidth/colls;
// var curFrame = 0;
// var frameCount = 2;
// let a 
// let b 
// var srcX = 0;
// var srcY = 0;
// var speed = 2;
// var character = new Image();
// character.src = './images/explosionSprite.png';

// function updateFrame(){
//     curFrame = ++ curFrame % frameCount;
//     srcX = curFrame * width;
//     // ctx.clearRect(a, b, width, spriteHeight);
// }

// function drawFrame(a, b){
//     updateFrame();
//     ctx.drawImage(character, srcX, srcY, width, spriteHeight, a, b, width, spriteHeight);
// }




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
    ctx.drawImage(gameRunningBackground, 0, 0)
    
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

        console.log("--------", mouse.x, mouse.y, currentGame.letters[i].x, currentGame.letters[i].y)
        currentGame.letters[i].drawLetter();

            if(currentGame.letters[i].x < mouse.x && mouse.x < currentGame.letters[i].x + currentGame.letters[i].width && currentGame.letters[i].y < mouse.y && mouse.y < currentGame.letters[i].y + currentGame.letters[i].height && currentGame.letters[i].letterImage.src.includes('CS'))
            {
                currentGame.letters.splice(i, 1);
                x = 0;
                y = 0;
                
                document.getElementById('myScore').innerHTML = currentGame.score;  
                console.log('kjvbdfjhbjk');
                cheerSound.play();
                 // a = currentGame.letters[i].x
                // b = currentGame.letters[i].y
                // drawFrame(a, b);
                
                if(gameIsRunning){
                    currentGame.score ++
                }
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
        if(currentGame.letters[i].y >= (680 - currentGame.letters[i].height) && currentGame.letters[i].letterImage.src.includes('CS')){
            
            boomSound.play();
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
        ctx.fillStyle = "white";
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

