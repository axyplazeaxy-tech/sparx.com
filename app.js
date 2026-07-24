// 🏫 SCHOOL HUB + 🎮 LEARN MORE GAMES


// LOGIN SYSTEM

function login(){

let school =
document.getElementById("school").value;


let username =
document.getElementById("username").value;


let password =
document.getElementById("password").value;



if(
school &&
username &&
password
){


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
"Please fill everything in";


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


}






window.onload=function(){


if(
localStorage.getItem("username")
){

showDashboard();

}

};








// SCHOOL PAGES


function openPage(page){


let area =
document.getElementById("page");



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
Art<br>
Languages
</p>

`,




homework:`

<h2>📝 Homework</h2>

<p>
No new homework today.
</p>

`,




events:`

<h2>🎉 Events</h2>

<p>
Sports Day<br>
Trips<br>
Clubs<br>
Assemblies
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
Email: school@example.com
</p>

`

};



area.innerHTML =
pages[page];


}








// 🎮 LEARN MORE


function openGames(){


document.body.innerHTML=`

<div id="app">


<header>

<h1>🎮 Learn More</h1>

<p>Retro Games</p>

</header>



<button onclick="location.reload()">

⬅ Back

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

// 🐍 SNAKE


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


if(e.key=="ArrowUp"){
dx=0;
dy=-20;
}


if(e.key=="ArrowDown"){
dx=0;
dy=20;
}


if(e.key=="ArrowLeft"){
dx=-20;
dy=0;
}


if(e.key=="ArrowRight"){
dx=20;
dy=0;
}


};




function game(){


ctx.fillStyle="black";
ctx.fillRect(0,0,400,400);



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

alert("Game Over");

location.reload();

return;

}


requestAnimationFrame(game);


}


game();


}









// 🏓 PONG


function startPong(){


let canvas=document.getElementById("gameCanvas");

let ctx=canvas.getContext("2d");


let player=160;

let cpu=160;


let ball={

x:200,

y:200,

dx:4,

dy:3

};



document.onkeydown=function(e){


if(e.key=="ArrowUp")
player-=25;


if(e.key=="ArrowDown")
player+=25;


};




function game(){


ctx.fillStyle="black";

ctx.fillRect(0,0,400,400);



ctx.fillStyle="white";


ctx.fillRect(
20,
player,
10,
80
);



ctx.fillRect(
370,
cpu,
10,
80
);



ctx.fillRect(
ball.x,
ball.y,
10,
10
);



ball.x+=ball.dx;
ball.y+=ball.dy;



if(
ball.y<0 ||
ball.y>390
){

ball.dy*=-1;

}



if(
ball.x<40 &&
ball.y>player &&
ball.y<player+80
){

ball.dx*=-1;

}



if(
ball.x>360 &&
ball.y>cpu &&
ball.y<cpu+80
){

ball.dx*=-1;

}



cpu +=
(ball.y-cpu)*0.05;



if(ball.x<0){

alert("You lost!");

location.reload();

}



requestAnimationFrame(game);


}


game();


}









// 🚀 SPACE SHOOTER


function startShooter(){


let canvas=document.getElementById("gameCanvas");

let ctx=canvas.getContext("2d");


let player={

x:185,

y:350

};


let bullets=[];

let enemies=[];



document.onkeydown=function(e){


if(e.key=="ArrowLeft")
player.x-=20;


if(e.key=="ArrowRight")
player.x+=20;


if(e.code=="Space"){

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





function game(){


ctx.fillStyle="black";

ctx.fillRect(0,0,400,400);



ctx.fillStyle="lime";

ctx.fillRect(
player.x,
player.y,
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



requestAnimationFrame(game);


}


game();


}