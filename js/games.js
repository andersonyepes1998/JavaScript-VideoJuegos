const canvas = document.getElementById('game');
const game = canvas.getContext('2d');
const btnUp = document.getElementById('up');
const btnLeft = document.getElementById('left');
const btnRight = document.getElementById('right');
const btnDown = document.getElementById('down');
const heartsLive = document.getElementById('lives');
const spamTime = document.getElementById('time');
const spamRecord = document.getElementById('record');
const pResult = document.getElementById('resul');

let canvasSize;
let elementsSize;
let level = 0;
let lives = 3;

let timeStar;
let timePlayer;
let timeInterval;

const playerPosition = {
    x: undefined,
    y: undefined
}

const giftPosition = {
    x: undefined,
    y: undefined
}

let enemiesPoitions = [];

//para que cargue nustro HTML cuando se recargue.

window.addEventListener('load',setCanvasSize);
window.addEventListener('resize',setCanvasSize);


function fixNumber(n){
    return Number (n.toFixed(0));
}

function setCanvasSize() {
    
    if (window.innerHeight > window.innerWidth){
        canvasSize = window.innerWidth * 0.75;
    } else {
        canvasSize = window.innerHeight * 0.75;
    }

    canvasSize = Number(canvasSize.toFixed(0));// Aqui estoy pasando un numero que tiene strig a numero entero

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);


    elementsSize = canvasSize * 0.093;

    playerPosition.x = undefined;
    playerPosition.y = undefined;
    startGame();
}

function startGame(){

    console.log({canvasSize,elementsSize });

    game.font = elementsSize + 'px Verdana';
    game.textAlign = 'center'

    const map = maps[level];

    if(!map) {
        gameWin();
        return;
    }

    if(!timeStar){ //si timeStar 'NO TIENE TIEMPO', asi se le con el signo de admiracion.
        timeStar = Date.now();
        timeInterval = setInterval(showTime, 100);
        showRecord();
    }

    const mapRows = map.trim().split('\n');
    const mapRowsCols = mapRows.map(row => row.trim().split(''));
    console.log({map,mapRows});

    showLives();

    enemiesPoitions = [];

    game.clearRect(0,0,canvasSize,canvasSize);

    mapRowsCols.forEach((row, rowI) => {
        row.forEach((col, colI) =>{
            const emoji = emojis[col];
            const posX = elementsSize * (colI + 1);
            const posY = elementsSize * (rowI + 1);
            game.fillText(emoji,posX,posY);

                if (col == 'O') {
                   if (!playerPosition.x && !playerPosition.y ) {
                        playerPosition.x = posX;
                        playerPosition.y = posY;
                        console.log({playerPosition});
                   }
                }else if(col == 'I'){
                    giftPosition.x = posX;
                    giftPosition.y = posY;
                }else if (col == 'X'){
                    enemiesPoitions.push({
                        x: posX,
                        y: posY
                    })
                }


            //console.log({row, col});
        });
    });
    //for (let row = 1; row <= 10; row++) {
   //     for (let col = 1; col <= 10; col++) {
    //        game.fillText(emojis[mapRowsCols[row-1][col-1]], elementsSize*col, elementsSize*row); 
   //     } 
          
   // }
   //window.innerHeight
    //window.innerWidth
    //game.fillRect(0,50,100,100); con fill podemos crear un retangulo.
    //game.clearRect(50,50,50,50); con clear podemos borrar una parte del retangulo.
    //game.clearRect()
    //con estas propiedades les podemos dar estilos a canvas desde JS.
    //game.font = '40px Verdana';
    //game.fillStyle = 'purple';
    //game.textAlign = 'center';
    //game.fillText('colombia',50,50);
    movePlayer();
}

function movePlayer() {

    const giftCollisionX = playerPosition.x.toFixed(3)== giftPosition.x.toFixed(3);
    const giftCollisionY = playerPosition.y.toFixed(3) == giftPosition.y.toFixed(3);
    const giftCollision = giftCollisionX && giftCollisionY;

    if (giftCollision) {
        levelWin();

    }

    const enemiesCollision = enemiesPoitions.find(enemies => {
      const enemiesCollisionX =  enemies.x.toFixed(3) == playerPosition.x.toFixed(3);
      const enemiesCollisionY =  enemies.y.toFixed(3) == playerPosition.y.toFixed(3);
      return enemiesCollisionX && enemiesCollisionY
    });

    if (enemiesCollision) {
        levelFail();
    }

    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
}

function levelWin() {
    console.log('subistes de nivel');
    level++;
    startGame();
};

function levelFail() {
    alert('chocastes contra un enmigo');
    lives--;

    if (lives <= 0) {
        level=0;
        lives=3;
        timeStar=undefined;
    }
    playerPosition.x = undefined;
    playerPosition.y = undefined;
    startGame();
}

function gameWin() {
   // alert('Terminastes el juego!!!')
    clearInterval(timeInterval);

    const recordTime = localStorage.getItem('record_Time');
    const playerTime = Date.now() - timeStar;
    if (recordTime) {
        if (recordTime>=playerTime) {
            localStorage.setItem('record_Time',playerTime);
            pResult.innerHTML = 'SUPERASTES EL RECORD!!!';
        }else{
            pResult.innerHTML ='Lo siento, no superastes el RECORD 😥';
        }
    }else{
        localStorage.setItem('record_Time',playerTime);
        pResult.innerHTML ='Muy bien, trata de superar el nuevo tiempo.';
    }
}

function showLives() {

    const heartsArray= Array(lives).fill(emojis['HEART']) // [1,2,3]

    heartsLive.innerHTML = ''; //para que limpie despues de borrar cada corazon.
    heartsLive.innerHTML = heartsArray;
}

function showTime() {
    spamTime.innerHTML= Date.now() - timeStar;
}

function showRecord() {
    spamRecord.innerHTML = localStorage.getItem('record_Time');
}


window.addEventListener('keydown', moveByKeys)
btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown); 

function moveByKeys(e){
    if (e.key == 'ArrowUp') {
        moveUp();
    } else if (e.key == 'ArrowLeft'){
        moveLeft();
    }else if (e.key == 'ArrowRight'){
        moveRight();
    }else if (e.key == 'ArrowDown'){
        moveDown();
    }
}

function moveUp() {
    if ((playerPosition.y-elementsSize) < elementsSize) {
        console.log('OUT');
    }else{
        playerPosition.y -= elementsSize;
        startGame();
    }
    
}

function moveLeft() {
    if ((playerPosition.x-elementsSize) < elementsSize) {
        
    }else{
        playerPosition.x -= elementsSize;
        startGame();
    }
    
}

function moveRight() {
    if ((playerPosition.x+elementsSize) > canvasSize) {
        console.log('OUT');
    }else{
        playerPosition.x += elementsSize;
        startGame();
    }
   
}

function moveDown() {
    if ((playerPosition.y+elementsSize) > canvasSize) {
        
    }else{
        playerPosition.y += elementsSize;
        startGame();
    }
    
}