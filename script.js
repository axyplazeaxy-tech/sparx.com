// FIVE NIGHTS CUSTOM - COMPLETE SCRIPT


let power = 100;
let hour = 12;

let doorClosed = false;
let lightOn = false;
let cameraOpen = false;

let gameOver = false;


// Animatronic location
let animatronicRoom = "stage";

let rooms = [
    "stage",
    "hall",
    "office"
];



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

        loseGame(
        "Power ran out..."
        );

    }



    updateText();


},1000);





// NIGHT TIMER

setInterval(()=>{


    if(gameOver)
        return;



    hour++;


    if(hour >= 18){

        winGame();

    }


    updateText();



},30000);







function updateText(){


let powerText =
document.getElementById("power");


let timeText =
document.getElementById("time");


if(powerText)
powerText.innerHTML =
"Power: "
+ Math.floor(power)
+ "%";



if(timeText)
timeText.innerHTML =
hour + ":00 AM";


}







// CAMERA SYSTEM


function openCamera(){

cameraOpen=true;


let office =
document.getElementById("office");


let cameras =
document.getElementById("cameras");


if(office)
office.style.display="none";


if(cameras)
cameras.style.display="block";


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



if(!image)
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



document.getElementById("screen").innerHTML =


doorClosed ?

"🚪 DOOR CLOSED"

:

"🚪 DOOR OPEN";



}







// LIGHT


function toggleLight(){


lightOn =
!lightOn;



document.getElementById("screen").innerHTML =


lightOn ?

"💡 LIGHT ON"

:

"💡 LIGHT OFF";


}









// ADVANCED ANIMATRONIC AI 👾

let animatronicLevel = 3; 
// Higher number = harder


let animatronicPath = [

    "stage",
    "hall",
    "office"

];


let animatronicPosition = 0;



setInterval(()=>{


if(gameOver)
return;



let chance =
Math.random();



if(chance < animatronicLevel / 10){



    // Move forward

    if(animatronicPosition < animatronicPath.length - 1){

        animatronicPosition++;

    }


    else{


        // At office

        if(doorClosed){


            console.log(
            "Animatronic blocked by door"
            );


            // move away

            animatronicPosition = 1;


        }


        else{


            loseGame(
            "The animatronic reached you!"
            );


        }


    }



    animatronicRoom =
    animatronicPath[animatronicPosition];



    console.log(
    "Animatronic moved to:",
    animatronicRoom
    );


}



},10000);


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

<h2>You survived!</h2>


<button onclick="location.reload()">

Play Again

</button>

`;

}