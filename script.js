// FIVE NIGHTS CUSTOM - COMPLETE GAME SCRIPT 🎮


// GAME VARIABLES

let power = 100;
let hour = 12;

let doorClosed = false;
let lightOn = false;
let cameraOpen = false;

let gameOver = false;


// ANIMATRONIC

let animatronicLevel = 3;

let animatronicPath = [
    "stage",
    "hall",
    "office"
];

let animatronicPosition = 0;

let animatronicRoom = "stage";




// POWER SYSTEM

setInterval(() => {

    if(gameOver) return;


    let drain = 0.05;


    if(doorClosed)
        drain += 0.15;


    if(lightOn)
        drain += 0.10;


    if(cameraOpen)
        drain += 0.05;



    power -= drain;


    if(power <= 0){

        power = 0;

        loseGame("Power ran out!");

    }


    updateUI();


},1000);







// NIGHT TIMER

setInterval(()=>{


    if(gameOver) return;


    hour++;


    if(hour >= 18){

        winGame();

        return;

    }


    updateUI();


},30000);







// UPDATE TEXT

function updateUI(){


    let powerText =
    document.getElementById("power");


    let timeText =
    document.getElementById("time");



    if(powerText){

        powerText.innerHTML =
        "Power: "
        + Math.floor(power)
        + "%";

    }



    if(timeText){

        timeText.innerHTML =
        hour
        + ":00 AM";

    }

}







// CAMERA SYSTEM


function openCamera(){

    cameraOpen = true;


    document.getElementById("office").style.display="none";

    document.getElementById("cameras").style.display="block";


}




function closeCamera(){

    cameraOpen = false;


    document.getElementById("office").style.display="block";

    document.getElementById("cameras").style.display="none";


}




function camera(room){


    let name =
    document.getElementById("cameraName");


    let image =
    document.getElementById("cameraImage");



    if(!name || !image)
    return;



    name.innerHTML =
    "CAM: "
    + room.toUpperCase();




    if(animatronicRoom === room){


        image.innerHTML =

        `
        <div id="animatronic">
        👁️
        </div>

        <br>

        ⚠️ MOVEMENT DETECTED

        `;


    }

    else{


        image.innerHTML =

        `
        📺 Empty room
        <br>
        Signal stable
        `;


    }


}







// DOOR


function toggleDoor(){


    doorClosed =
    !doorClosed;



    let screen =
    document.getElementById("screen");



    if(screen){


        screen.innerHTML =

        doorClosed ?

        "🚪 DOOR CLOSED"

        :

        "🚪 DOOR OPEN";


    }


}







// LIGHT


function toggleLight(){


    lightOn =
    !lightOn;



    let screen =
    document.getElementById("screen");



    if(screen){


        screen.innerHTML =

        lightOn ?

        "💡 LIGHT ON"

        :

        "💡 LIGHT OFF";


    }


}







// ANIMATRONIC AI 👾


setInterval(()=>{


    if(gameOver)
    return;



    let chance =
    Math.random();



    if(chance < animatronicLevel / 10){



        if(animatronicPosition <
        animatronicPath.length - 1){


            animatronicPosition++;


        }


        else{


            if(doorClosed){


                console.log(
                "Animatronic blocked"
                );


                animatronicPosition = 1;


            }


            else{


                loseGame(
                "The animatronic reached you!"
                );


                return;


            }


        }



        animatronicRoom =
        animatronicPath[animatronicPosition];



        console.log(
        "Animatronic location:",
        animatronicRoom
        );


    }


},10000);








// KEYBOARD CONTROLS


document.addEventListener(
"keydown",
function(e){


    if(e.key.toLowerCase()=="c")
        openCamera();


    if(e.key.toLowerCase()=="d")
        toggleDoor();


    if(e.key.toLowerCase()=="l")
        toggleLight();


    if(e.key=="Escape")
        closeCamera();


});








// GAME END


function loseGame(reason){


    gameOver = true;


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


    gameOver = true;


    document.body.innerHTML =

    `

    <h1>6:00 AM</h1>

    <h2>You survived the night!</h2>


    <button onclick="location.reload()">

    Play Again

    </button>

    `;


}