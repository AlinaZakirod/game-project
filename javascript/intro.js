//1. set the canvas _Wednesday
//2. Crete Letters placeholders
//3. Make them fall
//4. Randomize letters (replace rectangles with images in random order)
//4. Wrong letters touch 
//5. score
// 5.1 click-kill  on all letters ---> on only wrong letters
// 5.2 touch the ground
//6. win-lose & start-pause

const gameRunningBackground = new Image();
gameRunningBackground.src = './images/bg/screen_frame.png';
const gameStartBackground = new Image();
gameStartBackground.src = './images/car.png';
const gameOverBackground = new Image();
gameOverBackground.src = './images/bg/gameOver_1.jpg';
const victoryBackground = new Image();
victoryBackground.src = './images/bg/victory.jpg';

let pauseIcon = new Image();
pauseIcon.src = './images/bg/pause.svg'


let currentGame;
let frames = 0;

// sounds
class Sound{
    constructor(src){
        this.sound = document.createElement('audio');
        this.sound.src = src;
        this.sound.setAttribute('preload', 'auto');
        this.sound.setAttribute('controls', 'none');
        this.sound.style.display = 'none';
        document.body.appendChild(this.sound);
    }
    play(){
        this.sound.play();
    }
    stop(){
        this.sound.pause();
    }
}

const cheerSound = new Sound ('./sounds/cheer.wav');
const boomSound = new Sound('./sounds/boom.wav');
const bgSound = new Sound('./sounds/bensound-jazzyfrenchy.mp3')
//end of sounds

window.onload =  function(){
    const canvas = document.querySelector('canvas');
    canvas.width = 1024;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');
    
    ctx.drawImage(gameStartBackground,0,0);
    document.getElementById("my-game").style.display = "none";
    canvas.onclick = function(e){
        storeGuess(e);
    }

let gameIsRunning;

class Game{
    constructor(){
        this.letters = [];//array of falling letters
        this.score = 0;
    }

    pauseGame() {
        document.getElementById('start-button').style.display = 'block';
        document.getElementById('pause-button').style.display = 'none';
        gameIsRunning = false;
        // console.log('stop') ;
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
    }

} // end of Letter Class

document.getElementById("start-button").onclick = function() {
    startGame();
  };
 
function startGame() {
    currentGame = new Game();
    gameIsRunning = true;
    document.getElementById("my-game").style.display = "block";
    document.getElementById('pause-button').style.display = 'block';
    document.getElementById('start-button').style.display = 'none';
    document.getElementById('new_game').style.display = 'none'
    currentGame = new Game();
    drawGame();
    bgSound.play();
}

class Sprite {
    constructor(image, x, y){
        this.spriteWidth = 1280;
        this.spriteHeight = 80;
        this.frames = 16;
        this.width = this.spriteWidth/this.frames;
        this.curFrame = 0;
        this.frameCount = 16;
        this.image = image
        this.x = x;
        this.y = y;
        this.srcX = 0;
        this.srcY = 0;
    }
    updateSprite(){
        this.curFrame = ++ this.curFrame % this.frames;
        ctx.clearRect(this.x, this.y, this.width, this.spriteHeight);
        }

    drawSprite(){
        // setTimeout(this.updateSprite(), 16000);
        this.updateSprite();
        // console.log('jhgdfigh');
        ctx.drawImage(this.image, this.srcX, this.srcY, this.width, this.spriteHeight, this.x, this.y, this.width, this.spriteHeight);
        }
}

//here I declare images for sprites
let boom = new Image();
boom.src = './images/sprites/Effect-fire-16.png';
let air = new Image();
air.src = './images/sprites/Effect-air-16.png';



document.getElementById("pause-button").onclick = function()  {
    currentGame.pauseGame();
};



guessX = 0; //stores user's click on canvas
guessY = 0; //stores user's click on canvas
function storeGuess(event) {
    var x = event.offsetX;
    var y = event.offsetY;
    guessX = x;
    guessY = y;
    console.log("x coords: " + guessX + ", y coords: " + guessY);
}

function drawGame(){

    ctx.clearRect(0,0,1024,600);
    frames ++;
    ctx.drawImage(gameRunningBackground, 0, 0)
    
    if(frames % 50 === 1 ){
        randomLetterX = 40 + (Math.floor(Math.random() * 600)- 10);
        letterY = 58; //to start from the top
        letterWidth  = 80;
        letterHeight = 80;

        let letter = new Letter(randomLetterX, letterY, letterWidth, letterHeight);
        
        currentGame.letters.push(letter);
      } 
      for (let i=0; i < currentGame.letters.length; i++){
        currentGame.letters[i].y += 2.5;
        
        // console.log(currentGame.letters[i], randomLetterX, letterY)
        currentGame.letters[i].drawLetter();

            if(currentGame.letters[i].x < guessX && guessX < currentGame.letters[i].x + currentGame.letters[i].width && currentGame.letters[i].y < guessY && guessY < currentGame.letters[i].y + currentGame.letters[i].height && currentGame.letters[i].letterImage.src.includes('CS')){
                // console.log('ON CLICK COLLISION!!!!!! = = == = == = = =')
                guessX = 0;
                guessY = 0;
                
                
                let airSprite = new Sprite(air, currentGame.letters[i].x, currentGame.letters[i].y);
                setTimeout(airSprite.drawSprite(), 12000);
                currentGame.letters.splice(i, 1);
                
                document.getElementById('myScore').innerHTML = currentGame.score;  
                // console.log('kjvbdfjhbjk');
                cheerSound.play();
                
                
                if(gameIsRunning){
                    currentGame.score ++
                }
            }
        //remove image of clicked letter and add score

        if(!gameIsRunning){//style for "pause" state
            ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
            ctx.fillRect(0, 0, 1024, 600);
            ctx.drawImage(pauseIcon, (canvas.width / 2) - 50, (canvas.height / 2) - 50, 100, 100);
            bgSound.stop();
        }
       if(currentGame.letters[i]){
        //when letters reach the bottom
        if((currentGame.letters[i].y + currentGame.letters[i].height) >= 600 && currentGame.letters[i].letterImage.src.includes('CS')){
            
            let boomSprite = new Sprite(boom, currentGame.letters[i].x, currentGame.letters[i].y);
            setTimeout(boomSprite.drawSprite(), 1000);
            boomSound.play();
            currentGame.letters.splice(i, 1);
            
                //for later score counting:
                if(gameIsRunning){
                    currentGame.score --;
                }
                document.getElementById('myScore').innerHTML = currentGame.score;  
                }
    }

    }
    
    if(currentGame.score < -5){
        // gameIsRunning = false;
        ctx.fillRect(0,0, 1024, 600);
        ctx.drawImage(gameOverBackground, 0, 0);
        document.getElementById('new_game').style.display = 'block';
        document.getElementById('pause-button').style.display = 'none';
        document.getElementById('start-button').style.display = 'none';
        currentGame.letters[i].y = 0;
        currentGame.letters = [];  

    } 

    if(currentGame.score > 5){
        ctx.fillRect(0,0, 1024, 600);
        ctx.drawImage(victoryBackground, 0, 0);
        currentGame.letters = [];
        document.getElementById('start-button').style.display = 'none';
        document.getElementById('pause-button').style.display = 'none';
        document.getElementById('new_game').style.display = 'block';
        currentGame.letters[i].y = 0;
    }
    // to stop running the function behind the scene when the "pause" button is clicked
    // this also controls the speed 
    if(gameIsRunning){
        requestAnimationFrame(drawGame);
    }  
 }


 document.getElementById("new_game").onclick = function() {
    
    startGame();
    
    document.getElementById('pause-button').style.display = 'block';
    let updatedScore = 0;
    document.getElementById('myScore').innerHTML = updatedScore;
    document.getElementById('start-button').style.display = 'none';
    
    currentGame.letters = [];  
    
  };
}

// function visualPause(something1, something2){

//     document.getElementById('pause-button').style.display = `${something1}`;
//     document.getElementById('myScore').innerHTML = updatedScore;
//     document.getElementById('start-button').style.display = 'none';
// }

//make game Methods, remove lines you don't use + function for turn on and off
