const canvas = document.getElementById('game');
const game = canvas.getContext('2d');
const btnUp = document.getElementById('up');
const btnLeft = document.getElementById('left');
const btnRight = document.getElementById('right');
const btnDown = document.getElementById('down');

let canvasSize;
let elementsSize;

const playerPosition = {
    x: undefined,
    y: undefined
}

//para que cargue nustro HTML cuando se recargue.

window.addEventListener('load',setCanvasSize);
window.addEventListener('resize',setCanvasSize);


function setCanvasSize() {
    
    if (window.innerHeight > window.innerWidth){
        canvasSize = window.innerWidth * 0.8;
    } else {
        canvasSize = window.innerHeight * 0.8;
    }

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    

    elementsSize = canvasSize * 0.093;
    startGame();
}

function startGame(){

    console.log({canvasSize,elementsSize });

    game.font = elementsSize + 'px Verdana';
    game.textAlign = 'center'

    const map = maps[0];
    const mapRows = map.trim().split('\n');
    const mapRowsCols = mapRows.map(row => row.trim().split(''));
    console.log({map,mapRows});

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
    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
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
        console.log('OUT');
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