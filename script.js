const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 400;

function openGames(){
    document.getElementById("arcade").style.display="flex";
}

function closeGames(){
    document.getElementById("arcade").style.display="none";
}

function startGame(game){

    if(game==="flappy"){
        flappy();
    }

    if(game==="snake"){
        snake();
    }

    if(game==="night"){
        night();
    }
}


// Flappy Sparx
function flappy(){

let y=200;
let gravity=2;
let score=0;

document.onkeydown=()=>{
    y-=30;
};

function loop(){

ctx.clearRect(0,0,400,400);

ctx.fillStyle="yellow";
ctx.fillRect(80,y,30,30);

y+=gravity;

ctx.fillStyle="green";
ctx.fillRect(300,0,40,150);
ctx.fillRect(300,260,40,150);

ctx.fillStyle="white";
ctx.font="20px Arial";
ctx.fillText("Score: "+score,10,25);

score++;

requestAnimationFrame(loop);

}

loop();

}


// Snake

function snake(){

let x=200;
let y=200;
let size=20;

document.onkeydown=(e)=>{
if(e.key==="ArrowRight") x+=size;
if(e.key==="ArrowLeft") x-=size;
if(e.key==="ArrowUp") y-=size;
if(e.key==="ArrowDown") y+=size;
};

function loop(){

ctx.clearRect(0,0,400,400);

ctx.fillStyle="lime";
ctx.fillRect(x,y,size,size);

requestAnimationFrame(loop);

}

loop();

}


// Night Survival

function night(){

let power=100;

function loop(){

ctx.clearRect(0,0,400,400);

ctx.fillStyle="black";
ctx.fillRect(0,0,400,400);

ctx.fillStyle="white";
ctx.font="25px Arial";
ctx.fillText("Night Survival",100,50);

ctx.fillText("Power: "+power+"%",120,200);

power--;

if(power<=0){
ctx.fillText("Game Over",130,250);
return;
}

requestAnimationFrame(loop);

}

loop();

}