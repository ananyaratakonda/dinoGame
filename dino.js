let board; 
let boardWidth = 750; 
let boardHeight = 250; 
let context;

// dino 
let dinoWidth = 74;  //  88 
let dinoHeight = 80;  // 94
let dinoX = 50; 
let dinoY = boardHeight - dinoHeight; 
let dinoImg;
let dinoImg2;
let duck = false; 

// dino javascript object 
let dino = {
    x : dinoX,
    y : dinoY,
    width : dinoWidth,
    height : dinoHeight
}

let dinoRunArray = []; 
// will have different cactcus -> use different data sturtures 

let cactusArray = [];
let cactus1Width = 34; 
let cactus2Width = 69; 
let cactus3Width = 102; 

let cactusHeight = 70; 
let cactusX = 700; 
let cactusY = boardHeight - cactusHeight; 

let cactus1Img;
let cactus2Img;
let cactus3Img;
let bird1; 

let velX = -8; // move left
let velY = 0; 
let gravity = 0.4; 

let birdArray = [];
let birdwid = 95; 
let birdHeight = 70; 
let birdX = 700; 
let birdY = 90; 

let gameOver = false; 
let score = 0; 


// when the page loads it will intital these things 
window.onload = function(){

    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth; 
    context = board.getContext("2d"); // drawing on the board 

   // context.fillStyle = "green";
    // context.fillRect(dino.x, dino.y, dino.width, dino.height);

    dinoImg = new Image(); // creates a new dino image object 
    dinoImg.src = "./img/dino.png";
    dinoImg.onload = function() {
        context.drawImage(dinoImg,dino.x, dino.y, dino.width, dino.height);
    }  


    cactus1Img = new Image();
    cactus1Img.src = "./img/cactus1.png"

    cactus2Img = new Image();
    cactus2Img.src = "./img/cactus2.png"

    cactus3Img = new Image();
    cactus3Img.src = "./img/cactus3.png"

    bigcactus1Img = new Image();
    bigcactus1Img.src = "./img/big-cactus1.png"

    bigcactus2Img = new Image();
    bigcactus2Img.src = "./img/big-cactus2.png"

    bigcactus3Img = new Image();
    bigcactus3Img.src = "./img/big-cactus3.png"

    bird1 = new Image();
    bird1.src = "./img/bird2.png"

    requestAnimationFrame(update);
    setInterval(placeCactus, 1000);
    document.addEventListener("keydown", moveDino);
    
}

function update(){
    requestAnimationFrame(update);

    if (gameOver) {
        return;
    }

    context.clearRect(0,0, board.width, board.height);

    velY += gravity; 
    dino.y = Math.min(dino.y + velY, dinoY);
    context.drawImage(dinoImg,dino.x, dino.y, dino.width, dino.height);

    for(let i = 0; i < cactusArray.length; i++){
        let cactus = cactusArray[i];
        cactus.x += velX; 
        context.drawImage(cactus.img ,cactus.x, cactus.y, cactus.width, cactus.height);

        if(detectCollision(dino, cactus)){
            gameOver = true; 
            dinoImg.src = "./img/dino-dead.png";
            dinoImg.onload = function(){
                context.drawImage(dinoImg,dino.x, dino.y, dino.width, dino.height);
            }
        }
    }



    // scoreer
    context.fillStyle = "black";
    context.font = "20px courier"; 
    score++;
    context.fillText(score, 5, 20);
}

function moveDino(e){
    if (gameOver) {
        return;
    }

    if((e.code == "Space" || e.code == "ArrowUp") && dino.y == dinoY){
        velY = -10; 
    }
    else if(e.code == "ArrowLeft" && dino.y == dinoY){
        velY = 0; 
        /*
        dinoImg.src = "./img/dino-duck1.png";
        dinoImg.onload = function(){
            context.drawImage(dinoImg,dino.x, dino.y, dino.width, dino.height);
        }
            */
    }
}

function placeCactus(){

    if (gameOver) {
        return;
    } 

    let cactus = {
        img : null,
        x : cactusX, 
        y : cactusY,
        height : cactusHeight,
        width : null

    }

    let placeCactusChance = Math.random();
    if(placeCactusChance > 0.90){ // around 10% chance
        cactus.img = cactus3Img;
        cactus.width = cactus3Width;
        cactusArray.push(cactus); 
    } else if(placeCactusChance > 0.70){
        cactus.img = cactus2Img;
        cactus.width = cactus2Width;
        cactusArray.push(cactus);
    } else if(placeCactusChance > 0.50){
        cactus.img = cactus1Img;
        cactus.width = cactus1Width;
        cactusArray.push(cactus);
    } else if(placeCactusChance > 0.34){
        cactus.img = bigcactus1Img;
        cactus.width = cactus1Width;
        cactusArray.push(cactus);
    }  else if(placeCactusChance > 0.20){ 
        cactus.img = bird1;
        cactus.width = 70; 
        cactus.height = 50;
        cactus.y = birdY; 
        cactusArray.push(cactus);
    }
    else if(placeCactusChance > 0.17){
        cactus.img = bigcactus2Img;
        cactus.width = cactus2Width;
        cactusArray.push(cactus);
    } else if(placeCactusChance > 0.01){
        cactus.img = bigcactus3Img;
        cactus.width = cactus3Width;
        cactusArray.push(cactus);
    } 


    if(cactusArray.length > 5){
        cactusArray.shift();
    }
}


function detectCollision(a,b){
    return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y; 
}