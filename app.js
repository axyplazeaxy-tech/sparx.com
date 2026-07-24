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