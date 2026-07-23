// FIVE NIGHTS CUSTOM - Main Game Script


let power = 100;
let hour = 12;

let doorClosed = false;
let lightOn = false;
let cameraOpen = false;

let animatronicRoom = "stage";

let gameOver = false;


// POWER SYSTEM

setInterval(() => {

    if(gameOver) return;

    let drain = 0.05;

    if(doorClosed) drain += 0.15;
    if(lightOn) drain += 0.10;
    if(cameraOpen) drain += 0.05;


    power -= drain;


    if(power <= 0){

        power = 0;
        loseGame("Power Lost");

    }


    document.getElementById("power").innerHTML =
    "Power: " + Math.floor(power) + "%";


},1000);



// NIGHT TIMER

setInterval(()=>{

    if(gameOver) return;


    hour++;


    if(hour >= 18){

        winGame();

    }


    document.getElementById("time").innerHTML =
    hour + ":00 AM";


},30000);




// CAMERA SYSTEM


function openCamera(){

    cameraOpen=true;

    document.getElementById("office").style.display="none";

    document.getElementById("cameras").style.display="block";

}



function closeCamera(){

    cameraOpen=false;

    document.getElementById("office").style.display="block";

    document.getElementById("cameras").style.display="none";

}




function camera(room){

    let name =
    document.getElementById("cameraName");

    let image =
    document.getElementById("cameraImage");


    name.innerHTML =
    "CAM - " + room.toUpperCase();



    if(animatronicRoom === room){


        image.innerHTML =

        `
        <div id="animatronic">
        👁️
        </div>

        ⚠️ MOVEMENT DETECTED
        `;


    }

    else{


        image.innerHTML =

        `
        📺 Empty room<br>
        Signal stable
        `;


    }


}




// DOOR


function toggleDoor(){

    doorClosed = !doorClosed;


    if(doorClosed){

        document.getElementById("screen").innerHTML =
        "🚪 DOOR CLOSED";

    }

    else{

        document.getElementById("screen").innerHTML =
        "🚪 DOOR OPEN";

    }

}



// LIGHT


function toggleLight(){

    lightOn = !lightOn;


    if(lightOn){

        document.getElementById("screen").innerHTML =
        "💡 LIGHT ON";

    }

    else{

        document.getElementById("screen").innerHTML =
        "💡 LIGHT OFF";

    }

}



// ANIMATRONIC AI


setInterval(()=>{


    if(gameOver) return;


    let rooms = [

        "stage",
        "hall",
        "room"

    ];


    let move =
    Math.random();


    if(move < 0.5){

        animatronicRoom =
        rooms[Math.floor(Math.random()*rooms.length)];

        console.log(
        "Animatronic moved:",
        animatronicRoom
        );

    }


},8000);




// WIN / LOSE


function loseGame(reason){

    gameOver=true;

    document.body.innerHTML =

    `
    <h1>GAME OVER</h1>
    <h2>${reason}</h2>
    <button onclick="location.reload()">
    Restart
    </button>
    `;

}



function winGame(){

    gameOver=true;


    document.body.innerHTML =

    `
    <h1>6:00 AM</h1>
    <h2>You survived the night!</h2>

    <button onclick="location.reload()">
    Play Again
    </button>
    `;

}