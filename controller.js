// 🎮 Controller Support for Five Nights Custom

let controllerConnected = false;

window.addEventListener("gamepadconnected", function(e){

    controllerConnected = true;

    console.log(
        "Controller connected:",
        e.gamepad.id
    );

});


window.addEventListener("gamepaddisconnected", function(){

    controllerConnected = false;

    console.log("Controller disconnected");

});



function checkController(){

    if(!controllerConnected){
        requestAnimationFrame(checkController);
        return;
    }


    let gamepads = navigator.getGamepads();

    let pad = gamepads[0];


    if(!pad){
        requestAnimationFrame(checkController);
        return;
    }



    // A button = open cameras

    if(pad.buttons[0].pressed){

        openCamera();

    }



    // B button = close cameras

    if(pad.buttons[1].pressed){

        closeCamera();

    }



    // X button = light

    if(pad.buttons[2].pressed){

        toggleLight();

    }



    // Y button = door

    if(pad.buttons[3].pressed){

        toggleDoor();

    }



    requestAnimationFrame(checkController);

}


checkController();