let power = 100;
let hour = 12;

let doorClosed = false;
let lightOn = false;

let cameraOpen = false;

let animatronicRoom = "stage";


// Update game every second

setInterval(() => {

    if(power <= 0){
        power = 0;
        document.getElementById("power").innerHTML =
        "Power: 0% - SYSTEM OFF";
        return;
    }


    let usage = 0.05;

    if(doorClosed) usage += 0.15;
    if(lightOn) usage += 0.10;
    if(cameraOpen) usage += 0.05;


    power -= usage;


    document.getElementById("power").innerHTML =
    "Power: " + Math.floor(power) + "%";


},1000);



// Time system

setInterval(()=>{

    hour++;

    if(hour >= 18){
        hour = 12;
    }


    let display = hour + ":00 AM";


    if(hour === 6){
        display = "6:00 AM - SURVIVED!";
    }


    document.getElementById("time").innerHTML =
    display;


},30000);




// Cameras

function openCamera(){

    cameraOpen = true;

    document.getElementById("office").style.display="none";

    document.getElementById("cameras").style.display="block";

}


function closeCamera(){

    cameraOpen=false;

    document.getElementById("office").style.display="block";

    document.getElementById("cameras").style.display="none";

}



function camera(room){

    let screen =
    document.getElementById("cameraScreen");


    if(room==="stage"){

        alert("Camera 1: Empty stage...");

    }


    if(room==="hall"){

        if(animatronicRoom==="hall"){
            alert("Something is standing in the hallway...");
        }
        else{
            alert("Empty hallway.");
        }

    }


    if(room==="room"){

        alert("Dark room. Camera signal unstable.");

    }

}




// Door

function toggleDoor(){

    doorClosed = !doorClosed;


    if(doorClosed){

        document.getElementById("screen").innerHTML =
        "🚪 Door CLOSED";

    }
    else{

        document.getElementById("screen").innerHTML =
        "🚪 Door OPEN";

    }

}




// Light

function toggleLight(){

    lightOn=!lightOn;


    if(lightOn){

        document.getElementById("screen").innerHTML =
        "💡 Hallway light ON";

    }
    else{

        document.getElementById("screen").innerHTML =
        "💡 Light OFF";

    }

}



// Simple animatronic movement

setInterval(()=>{

    let chance = Math.random();


    if(chance < 0.3){

        let rooms=[
            "stage",
            "hall",
            "room"
        ];


        animatronicRoom =
        rooms[Math.floor(Math.random()*rooms.length)];


        console.log(
            "Animatronic moved to:",
            animatronicRoom
        );

    }


},8000);