const canvas = document.getElementById("pongGame");
const context = canvas.getContext("2d");
canvas.width = 1100;
canvas.height = 600;
let intervalID = null

let scoreOne = "PLAYER 1:    " + 0;
let scoreTwo = 0 + "    :PLAYER 2";

// key movement
document.body.addEventListener("keydown", doKeyDown, false);

function doKeyDown(e){
    // player one
    const key = e.key;
    if(key == "w" && playerOne.y - playerOne.gravity > 0){
        playerOne.y -= playerOne.gravity;
    } else if (
        key == "s" && 
        playerOne.y + playerOne.height + playerOne.gravity < canvas.height){
        playerOne.y += playerOne.gravity;
    }
    // player two
    if(key == "i" && playerTwo.y - playerTwo.gravity > 0){
        playerTwo.y -= playerTwo.gravity;
    } else if (
        key == "k" && 
        playerTwo.y + playerTwo.height + playerTwo.gravity < canvas.height){
        playerTwo.y += playerTwo.gravity;
    }


}



class Element{
    constructor(options){
        this.x = options.x;
        this.y = options.y;
        this.width = options.width;
        this.height = options.height;
        this.color = options.color;
        this.speed = options.speed || 2;
        this.gravity = options.gravity; 
    }

}
// first paddle
 const playerOne = new Element({
    x:10,
    y:200,
    width:60,
    height:180,
    color: "#fff",
    gravity: 20
 });

 // second paddle
 const playerTwo = new Element({
    x:canvas.width -70,
    y:canvas.height/2,
    width:60,
    height:180,
    color: "#fff",
    gravity: 10
 });

 // ball
 const ball = new Element({
    x:650/2,
    y:400/2,
    width:15,
    height:15,
    color: "#20C220E",
    speed: 10,
    gravity: 10
 });

 //player one score text
function displayScoreOne(){
    context.font="18px Arial"
    context.fillStyle= "#fff"
    context.fillText(scoreOne, canvas.width/2 - 400, 30 )
}

 // players two score text
 function displayScoreTwo(){
    context.font="18px Arial"
    context.fillStyle= "#fff"
    context.fillText(scoreTwo, canvas.width/2 + 200, 30 )
}
 // draw elements
function drawElement(element){
    context.fillStyle = element.color;
    context.fillRect(element.x, element.y, element.width, element.height);
}

 // make ball bounce
 function ballBounce(){
    if(ball.y + ball.gravity <= 0 || ball.y + ball.gravity >= canvas.height){
        ball.gravity = ball.gravity * -1; // gravity 1 es una dirección, -1 hace que cambie al rebotar con pared
        ball.y += ball.gravity;
        ball.x += ball.speed;
    } else{ 
        ball.y += ball.gravity;
        ball.x += ball.speed;
    }
    ballWallCollision();

    if(scoreOne == 6 || scoreTwo == 6){
        finishGame()
    }
 }

 // detect collision
function ballWallCollision(){
    if(
        (ball.y + ball.gravity <= playerTwo.y + playerTwo.height &&
        ball.x + ball.width >= playerTwo.x &&
        ball.y + ball.gravity >= playerTwo.y
        ) 
        ||
        (
        ball.x <= playerOne.x + playerOne.width &&
        ball.y + ball.gravity >= playerOne.y &&
        ball.y + ball.gravity <= playerOne.y + playerOne.height)
    ) {
        ball.speed = ball.speed * -1;
    } else if(ball.x + ball.speed < 0){
        scoreTwo += 1;
        ball.speed = ball.speed * -1;
        ball.x = canvas.width / 2 + ball.speed;
        ball.y = canvas.height / 2 + ball.speed;
        stopGame()
        
    } else if(ball.x + ball.speed > canvas.width){
        scoreOne += 1;
        ball.speed = ball.speed * -1;
        ball.x = canvas.width / 2 + ball.speed;
        ball.y = canvas.height / 2 + ball.speed;
        stopGame()
    }
    drawElements();
}   

function startGameOnKeyPress(){
    window.addEventListener("keydown", startGame, {once:true});
}
 // draw all elements
function drawElements(){
    context.clearRect(0,0,canvas.width,canvas.height);
    drawElement(playerOne);
    drawElement(playerTwo);
    drawElement(ball);
    displayScoreOne();
    displayScoreTwo();
}

function renderizarJosep(){
    caraJosep
}


function startGame() {
    intervalID = setInterval(ballBounce, 20);
  }



function stopGame(){
    clearInterval(intervalID)
    startGameOnKeyPress()
}
function finishGame(){
    clearInterval(intervalID);
}

  startGame();


