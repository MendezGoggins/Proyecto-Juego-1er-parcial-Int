window.onload = function (){
    const canvas = document.getElementById("pongGame");
    const context = canvas.getContext("2d");
    canvas.width = 1100;
    canvas.height = 600;
    let intervalID = null
    let cancion = new Audio('backLogExtras/soundEffects/DON-omar-sol.mp3');
    cancion.volume = 0.3
    let heGanaoYo = document.getElementById('heganaoyo');
    heGanaoYo.volume = 0.8
    let player1gana = document.getElementById('player1gana');
    let player2gana = document.getElementById('player2gana');
    let presionacualquiertecla = document.getElementById('presionacualquiertecla');
    let randomdiselotete = document.getElementById('randomdiselotete');
    let randomprinsesaquelepasa = document.getElementById('randomprinsesaquelepasa');
    let randomvosestaparsera = document.getElementById('randomvosestaparsera');

    let scoreOne = 0;
    let scoreTwo = 0;
    
    
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
            this.image = options.image 
        }
    
    }
    // first 
        let caraJosep = document.createElement("img");
        let caraJosep2 = document.createElement("img");
        caraJosep.src="backLogExtras/imagenes/Jose_cara_izquierda.png";
     const playerOne = new Element({
        x:10,
        y:299,
        width:60,
        height:180,
        color: "#fff",
        gravity: 20,
        image: caraJosep
     });
    
     // second paddle
     caraJosep2.src="backLogExtras/imagenes/Jose_cara_derecha.png";
     const playerTwo = new Element({
        x:canvas.width -70,
        y:canvas.height/2,
        width:60,
        height:180,
        color: "#fff",
        gravity: 20,
        image: caraJosep2
     });
    
     // ball
     const ball = new Element({
        x:650/2,
        y:400/2,
        width:15,
        height:15,
        color: "#00ff00",
        speed: 13,
        gravity: 13,
        image: null
     });
    
    
     //player one score text
    function displayScoreOne(){
        context.font="18px Arial"
        context.fillStyle= "#fff"
        context.fillText(`JOSEP 1:    ${scoreOne}`, canvas.width/2 - 400, 30)
    }
    
     // players two score text
     function displayScoreTwo(){
        context.font="18px Arial"
        context.fillStyle= "#fff"
        context.fillText(`${scoreTwo}    :JOSEP 2`, canvas.width/2 + 200, 30 )
    }
     // draw elements
    function drawElement(element){
        if(element.image == null){
            context.fillStyle = element.color;
            context.fillRect(element.x, element.y, element.width, element.height);
        }else{
            context.drawImage(element.image, element.x, element.y, element.width, element.height);
        }
    
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
        drawElements();
        // audio player1/2 gana
    
        if(scoreOne == 1){
            setTimeout(function() { heGanaoYo.play();
            let imagenPlayer1Gana = document.createElement("img");
            imagenPlayer1Gana.id = "player1gana"
            imagenPlayer1Gana.src="backLogExtras/imagenes/Jose_cara_grande.png";
            document.body.appendChild(imagenPlayer1Gana);
            cancion.pause();
            
            }, 3000);
            
            finishGame(); 
        }
    
        if(scoreTwo == 1){
            setTimeout(function() { heGanaoYo.play();
                let imagenPlayer2Gana = document.createElement("img");
                imagenPlayer2Gana.id = "player2gana"
                imagenPlayer2Gana.src="backLogExtras/imagenes/Jose_cara_grande.png";
                document.body.appendChild(imagenPlayer2Gana);
                cancion.pause();
                
            }, 3000);
           
            finishGame();
        }
     }
    
     // FRASES RANDOMS A CADA PUNTO:
     

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
            randomvosestaparsera.play();
            scoreTwo += 1;
            ball.speed = ball.speed * -1;
            ball.x = canvas.width / 2 + ball.speed;
            ball.y = canvas.height / 2 + ball.speed;
            stopGame()
            
        } else if(ball.x + ball.speed > canvas.width){
            randomprinsesaquelepasa.play();
            scoreOne += 1;
            ball.speed = ball.speed * -1;
            ball.x = canvas.width / 2 + ball.speed;
            ball.y = canvas.height / 2 + ball.speed;
            stopGame()
        }
        
    }   
    
    function startGameOnKeyPress(){
        window.addEventListener("keydown", startGame, {once:true});
        cancion.play();
        
    }
     // draw all elements
    
    function drawElements(){
        context.clearRect(0,0,canvas.width,canvas.height);
        console.log(playerOne)
        drawElement(playerOne);
        drawElement(playerTwo);
        drawElement(ball);
        displayScoreOne();
        displayScoreTwo();
    }

    function startGame() {
        console.log("empieza")
        intervalID = setInterval(ballBounce, 20);
        document.getElementById("intro").remove();
      }
    
    
    
    function stopGame(){
        clearInterval(intervalID)
        startGameOnKeyPress()
    }
    function finishGame(){
        clearInterval(intervalID);
    }
    
//    startGame();
    
    startGameOnKeyPress();
    
}




/* SONIDOS: 
ETIQUETA HTML QUE ES AUDIO

(en el tag <audio id="frasejosep1" src=""></audio> de html es sin control)
JS: ACCEDER AL ELEMENT HTML(get element by id) CREAR VARIABLE QUE ES UN ARRAY CON TODAS LAS FRASES,
meterla dentro de las colisiones y, math.floor)math.random x length . 
A LA VARIABLE SELE PUEDEPONER .PLAY Y .PAUSE

PARA AUDIO A CADA PUNTO DE JUGARO:METER ESTA VARIABLE EN EL MOMENTO DE COLISION EN LOS PLANOS de y

*/