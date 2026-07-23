// 🏫 SCHOOL HUB + 🎮 SCHOOL ARCADE


// SCHOOL PAGES

function openPage(page){

let area=document.getElementById("page");

if(!area) return;


let content={

timetable:`
<h2>📅 Timetable</h2>
<p>
Monday:<br>
Maths<br>
Science<br>
English<br>
PE
</p>`,

subjects:`
<h2>📚 Subjects</h2>
<p>
Maths<br>
English<br>
Science<br>
Computing<br>
Art<br>
Languages
</p>`,

homework:`
<h2>📝 Homework</h2>
<p>
No new homework today.
</p>`,

events:`
<h2>🎉 Events</h2>
<p>
School trips<br>
Sports day<br>
Clubs<br>
Assemblies
</p>`,

staff:`
<h2>👩‍🏫 Staff</h2>
<p>
Headteacher<br>
Teachers<br>
Student Support
</p>`,

contact:`
<h2>📞 Contact</h2>
<p>
Email: school@example.com<br>
Phone: 0000 000000
</p>`

};


area.innerHTML=content[page];

}





// 🎮 ARCADE MENU

function openGames(){


document.body.innerHTML=`

<div id="app">

<header>

<h1>🎮 School Arcade</h1>

<p>Choose a game!</p>

</header>


<button onclick="location.reload()">
⬅ Back to School
</button>


<div class="buttons">


<button onclick="startSnake()">
🐍 Snake
</button>


<button onclick="startPong()">
🏓 Pong
</button>


<button onclick="startShooter()">
🚀 Space Shooter
</button>


<button onclick="startBreakout()">
🧱 Breakout
</button>


</div>


<canvas id="gameCanvas"
width="400"
height="400">
</canvas>


</div>

`;

}

// 🐍 SNAKE GAME


function startSnake(){


let canvas=document.getElementById("gameCanvas");

let ctx=canvas.getContext("2d");



let snake=[
{x:200,y:200}
];


let food={
x:100,
y:100
};



let dx=20;
let dy=0;



document.onkeydown=function(e){


if(e.key==="ArrowUp"){
dx=0;
dy=-20;
}


if(e.key==="ArrowDown"){
dx=0;
dy=20;
}


if(e.key==="ArrowLeft"){
dx=-20;
dy=0;
}


if(e.key==="ArrowRight"){
dx=20;
dy=0;
}


};





function loop(){


ctx.fillStyle="black";

ctx.fillRect(
0,
0,
400,
400
);



ctx.fillStyle="lime";


snake.forEach(part=>{

ctx.fillRect(
part.x,
part.y,
20,
20
);

});



ctx.fillStyle="red";

ctx.fillRect(
food.x,
food.y,
20,
20
);



let head={

x:snake[0].x+dx,

y:snake[0].y+dy

};



snake.unshift(head);



if(
head.x===food.x &&
head.y===food.y
){


food.x=Math.floor(Math.random()*20)*20;

food.y=Math.floor(Math.random()*20)*20;


}

else{

snake.pop();

}





if(
head.x<0 ||
head.y<0 ||
head.x>=400 ||
head.y>=400
){

alert("Game Over!");

location.reload();

return;

}



requestAnimationFrame(loop);


}


loop();


}








// 🏓 PONG GAME


function startPong(){


let canvas=document.getElementById("gameCanvas");

let ctx=canvas.getContext("2d");



let playerY=160;

let cpuY=160;


let ball={

x:200,

y:200,

dx:4,

dy:3

};



let score=0;



document.onkeydown=function(e){


if(e.key==="ArrowUp"){

playerY-=25;

}


if(e.key==="ArrowDown"){

playerY+=25;

}


};






function pongLoop(){


ctx.fillStyle="black";

ctx.fillRect(0,0,400,400);




// player

ctx.fillStyle="white";

ctx.fillRect(
20,
playerY,
10,
80
);



// computer

ctx.fillRect(
370,
cpuY,
10,
80
);



// ball

ctx.fillRect(
ball.x,
ball.y,
10,
10
);




// movement

ball.x+=ball.dx;

ball.y+=ball.dy;



if(ball.y<=0 || ball.y>=390){

ball.dy*=-1;

}




if(ball.x<40 &&
ball.y>playerY &&
ball.y<playerY+80){

ball.dx*=-1;

score++;

}



if(ball.x>360 &&
ball.y>cpuY &&
ball.y<cpuY+80){

ball.dx*=-1;

}



cpuY +=
(ball.y-cpuY)*0.05;



if(ball.x<0){

alert("Game Over! Score: "+score);

location.reload();

}



if(ball.x>400){

ball.x=200;

ball.y=200;

}



requestAnimationFrame(pongLoop);


}



pongLoop();


}

// 🚀 SPACE SHOOTER


function startShooter(){


let canvas=document.getElementById("gameCanvas");

let ctx=canvas.getContext("2d");



let player={
x:190,
y:350
};



let bullets=[];

let enemies=[];

let score=0;



document.onkeydown=function(e){


if(e.key==="ArrowLeft"){

player.x-=20;

}


if(e.key==="ArrowRight"){

player.x+=20;

}


if(e.key===" "){

bullets.push({

x:player.x+15,

y:player.y

});

}


};






setInterval(()=>{


enemies.push({

x:Math.random()*370,

y:0

});


},1000);







function shooterLoop(){


ctx.fillStyle="black";

ctx.fillRect(0,0,400,400);




// player

ctx.fillStyle="lime";

ctx.fillRect(
player.x,
player.y,
30,
30
);




// bullets

ctx.fillStyle="yellow";


bullets.forEach((b)=>{

b.y-=6;

ctx.fillRect(
b.x,
b.y,
5,
10
);

});




// enemies

ctx.fillStyle="red";


enemies.forEach((enemy)=>{


enemy.y+=3;


ctx.fillRect(
enemy.x,
enemy.y,
30,
30
);

});





// collision


bullets.forEach((b,bi)=>{


enemies.forEach((enemy,ei)=>{


if(
b.x < enemy.x+30 &&
b.x+5 > enemy.x &&
b.y < enemy.y+30 &&
b.y+10 > enemy.y
){

bullets.splice(bi,1);

enemies.splice(ei,1);

score++;

}


});


});




ctx.fillStyle="white";

ctx.fillText(
"Score: "+score,
10,
20
);



requestAnimationFrame(shooterLoop);


}



shooterLoop();


}








// 🧱 BREAKOUT


function startBreakout(){


let canvas=document.getElementById("gameCanvas");

let ctx=canvas.getContext("2d");



let paddleX=170;


let ball={

x:200,

y:200,

dx:4,

dy:-4

};



let blocks=[];



for(let y=0;y<3;y++){


for(let x=0;x<8;x++){


blocks.push({

x:x*50+5,

y:y*25+20,

alive:true

});


}

}






document.onkeydown=function(e){


if(e.key==="ArrowLeft"){

paddleX-=25;

}


if(e.key==="ArrowRight"){

paddleX+=25;

}


};







function breakoutLoop(){


ctx.fillStyle="black";

ctx.fillRect(
0,
0,
400,
400
);



// paddle

ctx.fillStyle="white";

ctx.fillRect(
paddleX,
370,
80,
10
);




// ball

ctx.fillRect(
ball.x,
ball.y,
10,
10
);



ball.x+=ball.dx;

ball.y+=ball.dy;



if(ball.x<0 || ball.x>390){

ball.dx*=-1;

}


if(ball.y<0){

ball.dy*=-1;

}



if(
ball.y>360 &&
ball.x>paddleX &&
ball.x<paddleX+80
){

ball.dy*=-1;

}






blocks.forEach(block=>{


if(block.alive){


ctx.fillStyle="red";


ctx.fillRect(
block.x,
block.y,
45,
20
);



if(
ball.x>block.x &&
ball.x<block.x+45 &&
ball.y>block.y &&
ball.y<block.y+20
){

block.alive=false;

ball.dy*=-1;

}


}


});




requestAnimationFrame(breakoutLoop);


}



breakoutLoop();


}








// 📱 SIMPLE TOUCH CONTROLS


document.addEventListener(
"touchstart",
function(e){

window.touchStartX=
e.touches[0].clientX;

window.touchStartY=
e.touches[0].clientY;

});



document.addEventListener(
"touchend",
function(e){


let x=
e.changedTouches[0].clientX-window.touchStartX;


let y=
e.changedTouches[0].clientY-window.touchStartY;



if(Math.abs(x)>Math.abs(y)){


if(x>0){

document.dispatchEvent(
new KeyboardEvent(
"keydown",
{key:"ArrowRight"}
)
);

}else{

document.dispatchEvent(
new KeyboardEvent(
"keydown",
{key:"ArrowLeft"}
)
);

}


}


});






// 🎮 CONTROLLER SUPPORT


window.addEventListener(
"gamepadconnected",
function(){

console.log(
"Controller connected"
);

});

