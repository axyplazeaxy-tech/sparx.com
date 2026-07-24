// 🏫 SCHOOL HUB PRO
// Login + Dashboard + Pages + Homework


// ======================
// STARTUP
// ======================

window.onload = function(){

    if(localStorage.getItem("username")){

        showDashboard();

    }

    loadSettings();

};




// ======================
// LOGIN
// ======================

function login(){

    let school =
    document.getElementById("school").value.trim();


    let username =
    document.getElementById("username").value.trim();


    let password =
    document.getElementById("password").value.trim();



    if(!school || !username || !password){

        document.getElementById("loginMessage").innerHTML =
        "⚠️ Please fill in all boxes";

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


    showDashboard();

}




function showDashboard(){

    let loginBox =
    document.getElementById("loginBox");


    let dashboard =
    document.getElementById("dashboard");



    if(loginBox){

        loginBox.style.display="none";

    }



    if(dashboard){

        dashboard.style.display="block";

    }



    let school =
    localStorage.getItem("school");


    let username =
    localStorage.getItem("username");



    document.getElementById("schoolTitle").innerHTML =
    school;


    document.getElementById("studentName").innerHTML =
    username;


    document.getElementById("studentSchool").innerHTML =
    school;



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

    let avatar =
    prompt(
        "Enter an emoji avatar"
    );


    if(avatar){

        localStorage.setItem(
            "avatar",
            avatar
        );


        alert(
            "Avatar updated!"
        );

    }

}






// ======================
// SCHOOL PAGES
// ======================


function openPage(page){


    let box =
    document.getElementById("page");



    let pages = {


home:`

<h2>🏠 Home</h2>

<p>
Welcome to your student portal.
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

<p>
Sports Day<br>
Trips<br>
Assemblies
</p>

`,




clubs:`

<h2>🎯 Clubs</h2>

<p>
⚽ Football Club<br>
🎮 Computing Club<br>
🎨 Art Club<br>
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



box.innerHTML =
pages[page];


loadHomework();


}






// ======================
// HOMEWORK SAVER
// ======================


function addHomework(){

    let input =
    document.getElementById(
        "newHomework"
    );


    if(!input.value){

        return;

    }



    let list =
    JSON.parse(

        localStorage.getItem("homework")
        ||
        "[]"

    );



    list.push(
        input.value
    );



    localStorage.setItem(
        "homework",
        JSON.stringify(list)
    );



    input.value="";


    loadHomework();


}





function loadHomework(){


    let box =
    document.getElementById(
        "homeworkList"
    );



    if(!box){

        return;

    }



    let list =
    JSON.parse(

        localStorage.getItem("homework")
        ||
        "[]"

    );



    box.innerHTML="";



    list.forEach(function(item,index){


        box.innerHTML += `

        <p>
        ✅ ${item}

        <button onclick="removeHomework(${index})">
        ❌
        </button>

        </p>

        `;


    });


}





function removeHomework(index){


    let list =
    JSON.parse(

        localStorage.getItem("homework")
        ||
        "[]"

    );



    list.splice(
        index,
        1
    );



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





function loadSettings(){


if(localStorage.getItem("theme")=="dark"){

darkMode();

}



let tint=localStorage.getItem("tint");


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



<button onclick="location.reload()">

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





function zoomGame(){

let canvas=document.getElementById(
"gameCanvas"
);



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
// ⌨️ ENTER LOGIN
// ======================


document.addEventListener(
"keydown",
function(e){


if(e.key==="Enter"){


if(document.getElementById("loginBox")){

login();

}


}


});
// ======================
// 🐍 SNAKE
// ======================

function startSnake(){

let canvas=document.getElementById("gameCanvas");

let ctx=canvas.getContext("2d");


let snake=[
{x:300,y:250}
];


let food={
x:100,
y:100
};


let dx=20;
let dy=0;
let score=0;



document.onkeydown=function(e){

if(e.key==="ArrowUp" && dy===0){
dx=0;
dy=-20;
}

if(e.key==="ArrowDown" && dy===0){
dx=0;
dy=20;
}

if(e.key==="ArrowLeft" && dx===0){
dx=-20;
dy=0;
}

if(e.key==="ArrowRight" && dx===0){
dx=20;
dy=0;
}

};



function game(){


ctx.fillStyle="black";
ctx.fillRect(0,0,600,500);



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



if(head.x===food.x && head.y===food.y){

score++;

food.x=Math.floor(Math.random()*30)*20;

food.y=Math.floor(Math.random()*25)*20;


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
head.x>580 ||
head.y>480
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



let player=200;

let cpu=200;



let ball={

x:300,

y:250,

dx:5,

dy:4

};



document.onkeydown=function(e){

if(e.key==="ArrowUp")
player-=30;


if(e.key==="ArrowDown")
player+=30;

};




function game(){

ctx.fillStyle="black";

ctx.fillRect(0,0,600,500);



ctx.fillStyle="white";


ctx.fillRect(
30,
player,
15,
100
);


ctx.fillRect(
555,
cpu,
15,
100
);



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
ball.y>player &&
ball.y<player+100
){

ball.dx*=-1;

}



if(
ball.x>540 &&
ball.y>cpu &&
ball.y<cpu+100
){

ball.dx*=-1;

}



cpu+=(ball.y-cpu)*0.05;



requestAnimationFrame(game);


}


game();

}







// ======================
// 🚀 SHOOTER
// ======================


function startShooter(){

let canvas=document.getElementById("gameCanvas");

let ctx=canvas.getContext("2d");


let player=280;

let bullets=[];

let enemies=[];

let score=0;



document.onkeydown=function(e){


if(e.key==="ArrowLeft")
player-=25;


if(e.key==="ArrowRight")
player+=25;



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


},800);





function game(){

ctx.fillStyle="black";

ctx.fillRect(0,0,600,500);



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



document.onkeydown=function(e){

if(e.key==="ArrowLeft")
paddle-=30;


if(e.key==="ArrowRight")
paddle+=30;


};




function game(){

ctx.fillStyle="black";

ctx.fillRect(0,0,600,500);



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



if(ball.x<0 || ball.x>585)
ball.dx*=-1;



if(ball.y<0)
ball.dy*=-1;



if(
ball.y>430 &&
ball.x>paddle &&
ball.x<paddle+100
){

ball.dy*=-1;

}



requestAnimationFrame(game);


}



game();

}







// ======================
// 📱 TOUCH + CONTROLLER
// ======================


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


