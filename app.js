// 🏫 SCHOOL HUB PRO MAX
// Login + Dashboard + Settings + Arcade


// ======================
// APP START
// ======================


window.onload=function(){

if(localStorage.getItem("username")){

showDashboard();

}

loadSettings();

};




// ======================
// LOGIN
// ======================


function login(){


let school=document.getElementById("school").value.trim();

let username=document.getElementById("username").value.trim();

let password=document.getElementById("password").value.trim();



if(!school || !username || !password){


document.getElementById("loginMessage").innerHTML=
"⚠️ Please fill in every box";


return;

}




localStorage.setItem(
"school",
school
);


localStorage.setItem(
"username",
username
);


localStorage.setItem(
"avatar",
"🙂"
);



showDashboard();


}




function showDashboard(){


let login=document.getElementById("loginBox");

let dash=document.getElementById("dashboard");



if(login)
login.style.display="none";


if(dash)
dash.style.display="block";




let school=localStorage.getItem("school");

let user=localStorage.getItem("username");



let title=document.getElementById("schoolTitle");

let name=document.getElementById("studentName");

let studentSchool=document.getElementById("studentSchool");



if(title)
title.innerHTML=school;


if(name)
name.innerHTML=user;


if(studentSchool)
studentSchool.innerHTML=school;



loadSettings();

}




function logout(){

localStorage.clear();

location.reload();

}






// ======================
// PROFILE
// ======================


function changeAvatar(){


let avatar=prompt(
"Choose an emoji avatar"
);


if(avatar){

localStorage.setItem(
"avatar",
avatar
);

alert(
"Avatar changed!"
);

}


}








// ======================
// SCHOOL PAGES
// ======================


function openPage(page){


let box=document.getElementById("page");



let pages={



home:`

<h2>🏠 Home</h2>

<p>
Welcome back to your student portal.
</p>

`,




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
Art<br>
Languages
</p>

`,




homework:`

<h2>📝 Homework</h2>

<input id="newHomework"
placeholder="Add homework">


<button onclick="addHomework()">
Add
</button>


<div id="homeworkList"></div>


`,




events:`

<h2>🎉 Events</h2>

<div class="notice">
🏆 Sports Day coming soon
</div>

<div class="notice">
🚌 School Trip
</div>

`,




clubs:`

<h2>🎯 Clubs</h2>

<p>
⚽ Football Club
</p>

<p>
🎮 Computing Club
</p>

<p>
🎨 Art Club
</p>

<p>
🔬 Science Club
</p>

`,




staff:`

<h2>👩‍🏫 Staff</h2>

<p>
Teachers<br>
Support Team<br>
Headteacher
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



loadHomework();


}






// ======================
// HOMEWORK STORAGE
// ======================


function addHomework(){


let input=document.getElementById("newHomework");


if(!input.value)
return;



let list=JSON.parse(

localStorage.getItem("homework") || "[]"

);



list.push(input.value);



localStorage.setItem(
"homework",
JSON.stringify(list)
);



input.value="";


loadHomework();


}




function loadHomework(){


let box=document.getElementById("homeworkList");


if(!box)
return;



let list=JSON.parse(

localStorage.getItem("homework") || "[]"

);



box.innerHTML="";



list.forEach((item,index)=>{


box.innerHTML+=`

<p>
✅ ${item}

<button onclick="removeHomework(${index})">
❌
</button>

</p>

`;


});


}





function removeHomework(i){


let list=JSON.parse(

localStorage.getItem("homework") || "[]"

);


list.splice(i,1);


localStorage.setItem(
"homework",
JSON.stringify(list)
);


loadHomework();


}
// ======================
// ⚙️ SETTINGS
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
"Language changed to "+language
);


}





function soundToggle(){

let current=
localStorage.getItem("sound");


localStorage.setItem(
"sound",
current==="on" ? "off":"on"
);


alert(
"Sound: "+localStorage.getItem("sound")
);


}




function loadSettings(){


if(
localStorage.getItem("theme")
==="dark"
){

darkMode();

}




let tint=
localStorage.getItem("tint");



if(tint){

changeTint(tint);

}


}







// ======================
// 🎮 LEARN MORE ARCADE
// ======================


function openGames(){



document.getElementById("app").innerHTML=`

<header>

<div class="school-logo">
🎮
</div>

<h1>
Learn More
</h1>

<p>
School Arcade
</p>

</header>




<button onclick="backHome()">
⬅ Back
</button>


<button onclick="zoomGame()">
🔍 Fullscreen
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





<canvas
id="gameCanvas"
width="600"
height="500">
</canvas>





<div id="touchControls">


<button onclick="pressKey('ArrowLeft')">
⬅️
</button>


<button onclick="pressKey('ArrowUp')">
⬆️
</button>


<button onclick="pressKey('ArrowDown')">
⬇️
</button>


<button onclick="pressKey('ArrowRight')">
➡️
</button>


<button onclick="pressKey('Space')">
🔥
</button>


</div>


`;



}




function backHome(){

location.reload();

}





function zoomGame(){


let canvas=
document.getElementById("gameCanvas");



if(canvas.requestFullscreen){

canvas.requestFullscreen();

}


}





function pressKey(key){


document.dispatchEvent(

new KeyboardEvent(
"keydown",
{
key:key,
code:key
}
)

);


}






// ======================
// 🐍 SNAKE
// ======================


function startSnake(){


let canvas=
document.getElementById("gameCanvas");


let ctx=
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







function game(){


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
head.x===food.x &&
head.y===food.y
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


if(e.key==="ArrowUp"){

playerY-=30;

}


if(e.key==="ArrowDown"){

playerY+=30;

}


};







function game(){


ctx.fillStyle="black";

ctx.fillRect(
0,
0,
600,
500
);



ctx.fillStyle="white";


// player

ctx.fillRect(
30,
playerY,
15,
100
);


// cpu

ctx.fillRect(
555,
cpuY,
15,
100
);


// ball

ctx.fillRect(
ball.x,
ball.y,
15,
15
);



ball.x+=ball.dx;

ball.y+=ball.dy;



if(ball.y<0 || ball.y>485){

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



cpuY += (ball.y-cpuY)*0.05;



ctx.fillText(
"Score: "+score,
20,
30
);



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


let player=280;

let bullets=[];

let enemies=[];

let score=0;



document.onkeydown=function(e){


if(e.key==="ArrowLeft"){

player-=25;

}



if(e.key==="ArrowRight"){

player+=25;

}



if(e.code==="Space"){

bullets.push({

x:player+15,

y:450

});

}


};






setInterval(()=>{


enemies.push({

x:Math.random()*560,

y:0

});


},900);








function game(){


ctx.fillStyle="black";

ctx.fillRect(
0,
0,
600,
500
);



ctx.fillStyle="lime";


ctx.fillRect(
player,
450,
40,
40
);





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





bullets.forEach((b,bi)=>{


enemies.forEach((e,ei)=>{


if(

b.x<e.x+35 &&

b.x+6>e.x &&

b.y<e.y+35 &&

b.y+15>e.y

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

20,

30

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



let paddle=250;



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


if(e.key==="ArrowLeft"){

paddle-=30;

}



if(e.key==="ArrowRight"){

paddle+=30;

}


};






function game(){


ctx.fillStyle="black";

ctx.fillRect(
0,
0,
600,
500
);





ctx.fillStyle="white";


ctx.fillRect(

paddle,

460,

100,

15

);





ctx.fillRect(

ball.x,

ball.y,

15,

15

);





ball.x+=ball.dx;

ball.y+=ball.dy;





if(ball.x<0 || ball.x>585){

ball.dx*=-1;

}



if(ball.y<0){

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




requestAnimationFrame(game);


}




game();


}








// ======================
// 🎮 CONTROLLER SUPPORT
// ======================


function controllerLoop(){


let pad=navigator.getGamepads()[0];



if(pad){


if(pad.buttons[14]?.pressed){

pressKey("ArrowLeft");

}



if(pad.buttons[15]?.pressed){

pressKey("ArrowRight");

}



if(pad.buttons[0]?.pressed){

pressKey("Space");

}


}



requestAnimationFrame(controllerLoop);


}


controllerLoop();








// ======================
// ⌨️ ENTER LOGIN
// ======================


document.addEventListener(
"keydown",
function(e){


if(e.key==="Enter"){


if(
document.getElementById("loginBox")
){

login();

}


}


});


