// 🎮 Controller Support for Five Nights Custom

let controllerConnected = false;

let previousButtons = [];



window.addEventListener("gamepadconnected", function(e){

    controllerConnected = true;

    console.log(
        "Controller connected:",
        e.gamepad.id
    );

});



window.addEventListener("gamepaddisconnected", function(){

    controllerConnected = false;

    console.log(
        "Controller disconnected"
    );

});





function buttonPressed(pad, button){

    if(
        pad.buttons[button].pressed &&
        !previousButtons[button]
    ){

        return true;

    }


    return false;

}






function checkController(){


    if(!controllerConnected){

        requestAnimationFrame(checkController);

        return;

    }



    let pad =
    navigator.getGamepads()[0];



    if(!pad){

        requestAnimationFrame(checkController);

        return;

    }





    // A = Cameras

    if(buttonPressed(pad,0)){

        openCamera();

    }



    // B = Back

    if(buttonPressed(pad,1)){

        closeCamera();

    }



    // X = Light

    if(buttonPressed(pad,2)){

        toggleLight();

    }



    // Y = Door

    if(buttonPressed(pad,3)){

        toggleDoor();

    }



    previousButtons = pad.buttons.map(
        b => b.pressed
    );



    requestAnimationFrame(checkController);

}



checkController();