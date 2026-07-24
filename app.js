// 🏫 SCHOOL HUB PRO APP


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
// PAGES
// ======================


function openPage(page){


let box=document.getElementById("page");


let pages={


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
// HOMEWORK
// ======================


function addHomework(){


let input=
document.getElementById("newHomework");


if(!input.value)
return;



let list=
JSON.parse(
localStorage.getItem("homework")||"[]"
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


let box=
document.getElementById("homeworkList");


if(!box)
return;



let list=
JSON.parse(
localStorage.getItem("homework")||"[]"
);



box.innerHTML="";



list.forEach(item=>{


box.innerHTML+=

`
<p>✅ ${item}</p>
`;


});


}







// ======================
// SETTINGS
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

let header=
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


if(
localStorage.getItem("theme")=="dark"
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

<h1>🎮 Learn More</h1>

<p>Touch Arcade</p>

</header>



<button onclick="location.reload()">

⬅ Back

</button>


<button onclick="zoomGame()">

🔍 Zoom

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





function zoomGame(){

let canvas=
document.getElementById("gameCanvas");


if(canvas.requestFullscreen){

canvas.requestFullscreen();

}


}





// ======================
// 🐍 SNAKE
// ======================


function startSnake(){


let c=document.getElementById("gameCanvas");

let ctx=c.getContext("2d");


let snake=[{x:200,y:200}];

let food={x:100,y:100};


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





function loop(){


ctx.fillStyle="black";

ctx.fillRect(0,0,600,500);


ctx.fillStyle="lime";


snake.forEach(s=>{

ctx.fillRect(s.x,s.y,20,20);

});



ctx.fillStyle="red";

ctx.fillRect(food.x,food.y,20,20);



let head={

x:snake[0].x+dx,

y:snake[0].y+dy

};



snake.unshift(head);


if(head.x==food.x && head.y==food.y){

food.x=Math.random()*580;

food.y=Math.random()*480;

}

else{

snake.pop();

}



requestAnimationFrame(loop);


}



loop();


}