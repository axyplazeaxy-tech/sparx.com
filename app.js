// 🏫 SCHOOL HUB PRO
// Login + Dashboard + Settings + Arcade


// ======================
// LOGIN
// ======================


function login(){

let school =
document.getElementById("school").value;


let username =
document.getElementById("username").value;


let password =
document.getElementById("password").value;



if(school && username && password){


localStorage.setItem("school",school);

localStorage.setItem("username",username);


showDashboard();


}
else{


document.getElementById("loginMessage").innerHTML =
"Fill in all boxes";


}


}





function showDashboard(){


document.getElementById("loginBox").style.display="none";


document.getElementById("dashboard").style.display="block";



document.getElementById("schoolTitle").innerHTML =
localStorage.getItem("school");


document.getElementById("studentName").innerHTML =
localStorage.getItem("username");


document.getElementById("studentSchool").innerHTML =
localStorage.getItem("school");


loadSettings();


}





function logout(){

localStorage.clear();

location.reload();

}





window.onload=function(){

if(localStorage.getItem("username")){

showDashboard();

}

};






// ======================
// SCHOOL PAGES
// ======================


function openPage(page){


let box=document.getElementById("page");



let pages={


timetable:`

<h2>📅 Timetable</h2>

<p>
Monday<br>
Maths<br>
Science<br>
English<br>
PE
</p>

`,


subjects:`

<h2>📚 Subjects</h2>

<p>
Maths<br>
English<br>
Science<br>
Computing<br>
Art
</p>

`,


homework:`

<h2>📝 Homework</h2>

<p>
No homework today.
</p>

`,


events:`

<h2>🎉 Events</h2>

<p>
Sports Day<br>
Trips<br>
Clubs
</p>

`,


staff:`

<h2>👩‍🏫 Staff</h2>

<p>
Teachers<br>
Support Team
</p>

`,


contact:`

<h2>📞 Contact</h2>

<p>
school@example.com
</p>

`

};



box.innerHTML=pages[page];


}







// ======================
// SETTINGS
// ======================


function darkMode(){

document.body.style.background="#111";

document.body.style.color="white";


localStorage.setItem(
"theme",
"dark"
);

}





function lightMode(){

document.body.style.background="#f2f5f8";

document.body.style.color="#222";


localStorage.setItem(
"theme",
"light"
);

}





function changeTint(color){


let header=document.querySelector("header");


if(header){

header.style.background=color;

}


localStorage.setItem(
"tint",
color
);


}




function changeLanguage(language){

localStorage.setItem(
"language",
language
);


alert(
"Language: "+language
);


}





function loadSettings(){


if(localStorage.getItem("theme")=="dark"){

darkMode();

}



let tint=
localStorage.getItem("tint");



if(tint){

changeTint(tint);

}


}






// ======================
// ARCADE MENU
// ======================


function openGames(){


document.getElementById("app").innerHTML=`

<header>

<h1>🎮 Learn More</h1>

<p>Retro Game Zone</p>

</header>



<button onclick="location.reload()">

⬅ Back

</button>



<div class="game-buttons">


<button onclick="startSnake()">
🐍 Snake
</button>


<button onclick="startPong()">
🏓 Pong
</button>


<button onclick="startShooter()">
🚀 Shooter
</button>


<button onclick="startBreakout()">
🧱 Breakout
</button>


</div>



<canvas id="gameCanvas"
width="400"
height="400"></canvas>


`;

}
// ======================
// 🐍 SNAKE
// ======================


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

let score=0;



document.onkeydown=function(e){


if(e.key=="ArrowUp" && dy==0){

dx=0;
dy=-20;

}


if(e.key=="ArrowDown" && dy==0){

dx=0;
dy=20;

}


if(e.key=="ArrowLeft" && dx==0){

dx=-20;
dy=0;

}


if(e.key=="ArrowRight" && dx==0){

dx=20;
dy=0;

}


};





function game(){


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
head.x==food.x &&
head.y==food.y
){

score++;

food.x=Math.floor(Math.random()*20)*20;

food.y=Math.floor(Math.random()*20)*20;


}
else{

snake.pop();

}





ctx.fillStyle="white";

ctx.fillText(
"Score: "+score,
10,
20
);





if(
head.x<0 ||
head.y<0 ||
head.x>=400 ||
head.y>=400
){

alert("Game Over");

location.reload();

return;

}



requestAnimationFrame(game);


}


game();


}







// ======================
// 🏓 PONG
// ======================


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


if(e.key=="ArrowUp"){

playerY-=25;

}



if(e.key=="ArrowDown"){

playerY+=25;

}


};







function game(){


ctx.fillStyle="black";

ctx.fillRect(0,0,400,400);



ctx.fillStyle="white";



// player

ctx.fillRect(
20,
playerY,
10,
80
);



// cpu

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



ball.x+=ball.dx;

ball.y+=ball.dy;




if(
ball.y<=0 ||
ball.y>=390
){

ball.dy*=-1;

}




if(
ball.x<40 &&
ball.y>playerY &&
ball.y<playerY+80
){

ball.dx*=-1;

score++;

}





if(
ball.x>360 &&
ball.y>cpuY &&
ball.y<cpuY+80
){

ball.dx*=-1;

}





// CPU AI

cpuY +=
(ball.y-cpuY)*0.04;




ctx.fillText(
"Score: "+score,
10,
20
);



if(ball.x<0){

alert("CPU wins!");

location.reload();

}



requestAnimationFrame(game);


}


game();


}






// ======================
// 🚀 SPACE SHOOTER
// ======================


function startShooter(){


let canvas=document.getElementById("gameCanvas");

let ctx=canvas.getContext("2d");



let player=185;

let bullets=[];

let enemies=[];

let score=0;



document.onkeydown=function(e){



if(e.key=="ArrowLeft"){

player-=20;

}



if(e.key=="ArrowRight"){

player+=20;

}



if(e.code=="Space"){

bullets.push({

x:player+12,

y:350

});

}


};






setInterval(()=>{


enemies.push({

x:Math.random()*370,

y:0

});


},800);






function game(){


ctx.fillStyle="black";

ctx.fillRect(
0,
0,
400,
400
);



ctx.fillStyle="lime";


ctx.fillRect(
player,
350,
30,
30
);



ctx.fillStyle="yellow";


bullets.forEach(b=>{


b.y-=7;


ctx.fillRect(
b.x,
b.y,
5,
10
);


});





ctx.fillStyle="red";


enemies.forEach(e=>{


e.y+=3;


ctx.fillRect(
e.x,
e.y,
30,
30
);


});




bullets.forEach((b,bi)=>{


enemies.forEach((e,ei)=>{


if(

b.x<e.x+30 &&

b.x+5>e.x &&

b.y<e.y+30 &&

b.y+10>e.y

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



requestAnimationFrame(game);


}


game();


}
// ======================
// 🧱 BREAKOUT
// ======================


function startBreakout(){


let canvas=document.getElementById("gameCanvas");

let ctx=canvas.getContext("2d");



let paddle=160;


let ball={

x:200,

y:200,

dx:4,

dy:-4

};



let bricks=[];



for(let row=0;row<4;row++){


for(let col=0;col<8;col++){


bricks.push({

x:col*50+5,

y:row*25+20,

alive:true

});


}


}



document.onkeydown=function(e){


if(e.key=="ArrowLeft"){

paddle-=25;

}



if(e.key=="ArrowRight"){

paddle+=25;

}


};







function game(){


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
paddle,
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



if(
ball.x<0 ||
ball.x>390
){

ball.dx*=-1;

}



if(ball.y<0){

ball.dy*=-1;

}



if(
ball.y>350 &&
ball.x>paddle &&
ball.x<paddle+80
){

ball.dy*=-1;

}





// bricks


bricks.forEach(brick=>{


if(brick.alive){


ctx.fillStyle="red";


ctx.fillRect(
brick.x,
brick.y,
45,
20
);





if(

ball.x>brick.x &&

ball.x<brick.x+45 &&

ball.y>brick.y &&

ball.y<brick.y+20

){

brick.alive=false;

ball.dy*=-1;


}


}


});



requestAnimationFrame(game);


}



game();


}








// ======================
// 📱 TOUCH CONTROLS
// ======================


let touchStartX=0;



document.addEventListener(
"touchstart",
function(e){


touchStartX =
e.touches[0].clientX;


});





document.addEventListener(
"touchend",
function(e){


let endX =
e.changedTouches[0].clientX;



if(endX-touchStartX>40){


document.dispatchEvent(
new KeyboardEvent(
"keydown",
{
key:"ArrowRight"
}
)
);


}



if(touchStartX-endX>40){


document.dispatchEvent(
new KeyboardEvent(
"keydown",
{
key:"ArrowLeft"
}
)
);


}


});








// ======================
// 🎮 CONTROLLER SUPPORT
// ======================


function controllerLoop(){


let pad =
navigator.getGamepads()[0];



if(pad){



// left stick / dpad left

if(
pad.buttons[14] &&
pad.buttons[14].pressed
){

document.dispatchEvent(
new KeyboardEvent(
"keydown",
{
key:"ArrowLeft"
}
)
);

}




// dpad right

if(
pad.buttons[15] &&
pad.buttons[15].pressed
){

document.dispatchEvent(
new KeyboardEvent(
"keydown",
{
key:"ArrowRight"
}
)
);

}





// A button = shoot

if(
pad.buttons[0] &&
pad.buttons[0].pressed
){

document.dispatchEvent(
new KeyboardEvent(
"keydown",
{
code:"Space"
}
)
);

}


}



requestAnimationFrame(
controllerLoop
);


}



controllerLoop();




