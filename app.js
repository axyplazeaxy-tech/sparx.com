// 🏫 SCHOOL HUB PRO
// Desktop + Mobile Version


// ======================
// LOGIN SYSTEM
// ======================


function login(){

let school =
document.getElementById("school").value;


let username =
document.getElementById("username").value;


let password =
document.getElementById("password").value;



if(school && username && password){


localStorage.setItem(
"school",
school
);


localStorage.setItem(
"username",
username
);



showDashboard();


}

else{


document.getElementById("loginMessage").innerHTML =
"Please fill in all boxes";


}


}






function showDashboard(){


let loginBox =
document.getElementById("loginBox");


let dashboard =
document.getElementById("dashboard");



if(loginBox)
loginBox.style.display="none";



if(dashboard)
dashboard.style.display="block";




document.getElementById("schoolTitle").innerHTML =
localStorage.getItem("school");



document.getElementById("studentName").innerHTML =
localStorage.getItem("username");



document.getElementById("studentSchool").innerHTML =
localStorage.getItem("school");



loadSettings();

loadHomework();


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
// SCHOOL SECTIONS
// ======================


function openPage(page){


let box =
document.getElementById("page");



let pages={


subjects:`

<h2>📚 Subjects</h2>

<p>
Maths<br>
English<br>
Science<br>
Computing<br>
Art<br>
Languages
</p>

`,


events:`

<h2>🎉 Events</h2>

<p>
Sports Day<br>
School Trips<br>
Clubs<br>
Assemblies
</p>

`,


staff:`

<h2>👩‍🏫 Staff</h2>

<p>
Headteacher<br>
Teachers<br>
Student Support
</p>

`,


contact:`

<h2>📞 Contact</h2>

<p>
school@example.com
</p>

`


};



box.innerHTML =
pages[page];


}







// ======================
// HOMEWORK SAVER
// ======================


function addHomework(){


let input =
document.getElementById("newHomework");


if(input.value=="")
return;



let homework =
JSON.parse(
localStorage.getItem("homework") || "[]"
);



homework.push(
input.value
);



localStorage.setItem(
"homework",
JSON.stringify(homework)
);



input.value="";


loadHomework();


}





function loadHomework(){


let box =
document.getElementById("homeworkList");



if(!box)
return;



let homework =
JSON.parse(
localStorage.getItem("homework") || "[]"
);



box.innerHTML="";



homework.forEach(item=>{


box.innerHTML +=
`
<p>
✅ ${item}
</p>
`;


});


}
// ======================
// ⚙️ SETTINGS SYSTEM
// ======================


function darkMode(){


document.body.classList.add("dark");


localStorage.setItem(
"theme",
"dark"
);


}





function lightMode(){


document.body.classList.remove("dark");


localStorage.setItem(
"theme",
"light"
);


}





function changeTint(color){


let header =
document.querySelector("header");



if(header){

header.style.background=color;

}



localStorage.setItem(
"tint",
color
);


}





function loadSettings(){


let theme =
localStorage.getItem("theme");



if(theme=="dark"){

darkMode();

}




let tint =
localStorage.getItem("tint");



if(tint){

changeTint(tint);

}


}








// ======================
// 🎮 LEARN MORE
// ======================


function openGames(){



document.getElementById("app").innerHTML=`

<header>

<h1>🎮 Learn More</h1>

<p>
School Game Zone
</p>

</header>





<div class="game-buttons">


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





<canvas 
id="gameCanvas"
width="600"
height="500">
</canvas>





<button onclick="location.reload()">

⬅ Back to School

</button>


`;

}








// ======================
// 🐍 SNAKE GAME
// ======================


function startSnake(){


let canvas =
document.getElementById("gameCanvas");


let ctx =
canvas.getContext("2d");



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







function loop(){


ctx.fillStyle="black";

ctx.fillRect(
0,
0,
600,
500
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


food.x=
Math.floor(Math.random()*30)*20;


food.y=
Math.floor(Math.random()*25)*20;



}

else{


snake.pop();


}






ctx.fillStyle="white";


ctx.fillText(
"Score: "+score,
20,
30
);






if(
head.x<0 ||
head.y<0 ||
head.x>=600 ||
head.y>=500
){


alert(
"Game Over"
);


location.reload();


return;


}



requestAnimationFrame(loop);


}



loop();


}
// ======================
// 🏓 PONG
// ======================


function startPong(){


let canvas =
document.getElementById("gameCanvas");


let ctx =
canvas.getContext("2d");



let playerY=200;

let cpuY=200;



let ball={

x:300,

y:250,

dx:5,

dy:4

};



let score=0;




document.onkeydown=function(e){


if(e.key=="ArrowUp"){

playerY-=30;

}


if(e.key=="ArrowDown"){

playerY+=30;

}


};







function loop(){


ctx.fillStyle="black";

ctx.fillRect(
0,
0,
600,
500
);



ctx.fillStyle="white";


// Player

ctx.fillRect(
30,
playerY,
15,
100
);


// CPU

ctx.fillRect(
555,
cpuY,
15,
100
);


// Ball

ctx.fillRect(
ball.x,
ball.y,
15,
15
);




ball.x+=ball.dx;

ball.y+=ball.dy;



if(
ball.y<=0 ||
ball.y>=485
){

ball.dy*=-1;

}




if(
ball.x<45 &&
ball.y>playerY &&
ball.y<playerY+100
){

ball.dx*=-1;

score++;

}




if(
ball.x>540 &&
ball.y>cpuY &&
ball.y<cpuY+100
){

ball.dx*=-1;

}





cpuY +=
(ball.y-cpuY)*0.05;




ctx.fillText(
"Score: "+score,
20,
30
);





if(ball.x<0){

alert("CPU wins!");

location.reload();

}




requestAnimationFrame(loop);


}



loop();


}








// ======================
// 🚀 SPACE SHOOTER
// ======================


function startShooter(){


let canvas =
document.getElementById("gameCanvas");


let ctx =
canvas.getContext("2d");



let player=280;

let bullets=[];

let enemies=[];

let score=0;



document.onkeydown=function(e){



if(e.key=="ArrowLeft"){

player-=25;

}



if(e.key=="ArrowRight"){

player+=25;

}



if(e.code=="Space"){

bullets.push({

x:player+15,

y:450

});


}


};







setInterval(()=>{


enemies.push({

x:Math.random()*570,

y:0

});


},900);







function loop(){



ctx.fillStyle="black";

ctx.fillRect(
0,
0,
600,
500
);




// Player

ctx.fillStyle="lime";


ctx.fillRect(
player,
450,
40,
40
);





// Bullets

ctx.fillStyle="yellow";


bullets.forEach(b=>{


b.y-=8;


ctx.fillRect(
b.x,
b.y,
6,
15
);


});





// Enemies

ctx.fillStyle="red";


enemies.forEach(e=>{


e.y+=4;


ctx.fillRect(
e.x,
e.y,
35,
35
);


});






// Collision


bullets.forEach((b,bi)=>{


enemies.forEach((e,ei)=>{


if(

b.x<e.x+35 &&

b.x+6>e.x &&

b.y<e.y+35 &&

b.y+15>e.y

){


bullets.splice(
bi,
1
);


enemies.splice(
ei,
1
);


score++;


}


});


});






ctx.fillStyle="white";


ctx.fillText(
"Score: "+score,
20,
30
);



requestAnimationFrame(loop);


}



loop();


}








// ======================
// 🧱 BREAKOUT
// ======================


function startBreakout(){


let canvas =
document.getElementById("gameCanvas");


let ctx =
canvas.getContext("2d");



let paddle=260;



let ball={

x:300,

y:250,

dx:5,

dy:-5

};



let bricks=[];



for(let y=0;y<4;y++){


for(let x=0;x<10;x++){


bricks.push({

x:x*60,

y:y*30,

alive:true

});


}


}




document.onkeydown=function(e){


if(e.key=="ArrowLeft"){

paddle-=30;

}


if(e.key=="ArrowRight"){

paddle+=30;

}


};






function loop(){


ctx.fillStyle="black";

ctx.fillRect(
0,
0,
600,
500
);




// Paddle

ctx.fillStyle="white";


ctx.fillRect(
paddle,
460,
100,
15
);




// Ball

ctx.fillRect(
ball.x,
ball.y,
15,
15
);



ball.x+=ball.dx;

ball.y+=ball.dy;




if(
ball.x<=0 ||
ball.x>=585
){

ball.dx*=-1;

}



if(ball.y<=0){

ball.dy*=-1;

}



if(
ball.y>430 &&
ball.x>paddle &&
ball.x<paddle+100
){

ball.dy*=-1;

}





bricks.forEach(brick=>{


if(brick.alive){


ctx.fillStyle="red";


ctx.fillRect(
brick.x,
brick.y,
50,
20
);




if(

ball.x>brick.x &&

ball.x<brick.x+50 &&

ball.y>brick.y &&

ball.y<brick.y+20

){


brick.alive=false;

ball.dy*=-1;


}


}


});




if(
bricks.every(b=>!b.alive)
){

alert("You win!");

location.reload();

}



requestAnimationFrame(loop);


}



loop();


}







// ======================
// 🎮 CONTROLLER SUPPORT
// ======================


function controllerLoop(){


let pad =
navigator.getGamepads()[0];



if(pad){


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

