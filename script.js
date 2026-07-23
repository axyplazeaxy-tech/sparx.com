const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let currentGame = "";
let animation;
let keys = {};

let score = 0;


// Controls

document.addEventListener("keydown", e => {
    keys[e.key] = true;
});

document.addEventListener("keyup", e => {
    keys[e.key] = false;
});


// Open arcade

function openGames(){
    document.getElementById("arcade").style.display = "flex";
}


// Close arcade

function closeGames(){

    document.getElementById("arcade").style.display = "none";

    cancelAnimationFrame(animation);

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

}



// Touch controls

function move(direction){

    keys[direction] = true;

    setTimeout(()=>{

        keys[direction] = false;

    },100);

}



// Start game

function startGame(game){

    currentGame = game;

    cancelAnimationFrame(animation);

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    if(game === "flappy"){
        flappy();
    }


    if(game === "snake"){
        snake();
    }


    if(game === "pong"){
        pong();
    }


    if(game === "breakout"){
        breakout();
    }


    if(game === "space"){
        spaceDefender();
    }


    if(game === "racer"){
        racer();
    }


    if(game === "runner"){
        runner();
    }


    if(game === "target"){
        targetBlaster();
    }

}



// Draw text helper

function text(message,x,y,size=25){

    ctx.fillStyle="white";

    ctx.font=size+"px Courier New";

    ctx.fillText(
        message,
        x,
        y
    );

}

// =======================
// FLAPPY SPARX
// =======================

function flappy(){

    let bird = {
        x:80,
        y:200,
        size:25,
        velocity:0
    };


    let gravity = 0.5;
    let jumpPower = -8;


    let pipes = [
        {
            x:400,
            gap:150,
            top:Math.random()*150+50
        }
    ];


    score = 0;


    function flap(){

        bird.velocity = jumpPower;

    }


    document.onkeydown = function(e){

        if(e.code==="Space"){
            flap();
        }

    };


    canvas.onclick = flap;


    function loop(){

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        // background

        ctx.fillStyle="#111827";
        ctx.fillRect(
            0,
            0,
            500,
            400
        );


        // bird physics

        bird.velocity += gravity;
        bird.y += bird.velocity;


        // bird

        ctx.fillStyle="yellow";

        ctx.fillRect(
            bird.x,
            bird.y,
            bird.size,
            bird.size
        );



        // pipes

        pipes.forEach(pipe=>{


            pipe.x -= 3;


            ctx.fillStyle="lime";


            ctx.fillRect(
                pipe.x,
                0,
                50,
                pipe.top
            );


            ctx.fillRect(
                pipe.x,
                pipe.top + pipe.gap,
                50,
                400
            );



            // collision

            if(

                bird.x < pipe.x+50 &&

                bird.x+bird.size > pipe.x &&

                (

                bird.y < pipe.top ||

                bird.y+bird.size > pipe.top+pipe.gap

                )

            ){

                gameOver("Flappy Sparx");

                return;

            }



            if(pipe.x===50){

                score++;

            }



        });



        if(pipes[pipes.length-1].x < 250){

            pipes.push({

                x:500,

                gap:150,

                top:Math.random()*150+50

            });

        }



        // remove old pipes

        pipes = pipes.filter(
            p=>p.x>-60
        );



        if(
            bird.y<0 ||
            bird.y>375
        ){

            gameOver("Flappy Sparx");

            return;

        }



        text(
            "Score: "+score,
            10,
            30
        );


        animation=requestAnimationFrame(loop);

    }


    loop();

}



// Game over screen

function gameOver(name){

    cancelAnimationFrame(animation);


    ctx.fillStyle="black";

    ctx.fillRect(
        0,
        0,
        500,
        400
    );


    text(
        "GAME OVER",
        150,
        170,
        35
    );


    text(
        name,
        170,
        220
    );


    text(
        "Score: "+score,
        170,
        260
    );

}

// =======================
// SNAKE
// =======================

function snake(){

    let size = 20;

    let snake = [
        {
            x:200,
            y:200
        }
    ];


    let food = {
        x:Math.floor(Math.random()*20)*size,
        y:Math.floor(Math.random()*20)*size
    };


    let direction = "right";

    score = 0;



    document.onkeydown=function(e){

        if(e.key==="ArrowUp" && direction!=="down")
            direction="up";

        if(e.key==="ArrowDown" && direction!=="up")
            direction="down";

        if(e.key==="ArrowLeft" && direction!=="right")
            direction="left";

        if(e.key==="ArrowRight" && direction!=="left")
            direction="right";

    };



    function moveSnake(){

        let head={
            x:snake[0].x,
            y:snake[0].y
        };


        if(direction==="up")
            head.y-=size;

        if(direction==="down")
            head.y+=size;

        if(direction==="left")
            head.x-=size;

        if(direction==="right")
            head.x+=size;


        snake.unshift(head);



        // eat food

        if(
            head.x===food.x &&
            head.y===food.y
        ){

            score++;

            food={
                x:Math.floor(Math.random()*20)*size,
                y:Math.floor(Math.random()*20)*size
            };

        }

        else{

            snake.pop();

        }



        // collision

        if(
            head.x<0 ||
            head.y<0 ||
            head.x>=canvas.width ||
            head.y>=canvas.height
        ){

            gameOver("Snake");

            return;

        }


        for(let i=1;i<snake.length;i++){

            if(
                head.x===snake[i].x &&
                head.y===snake[i].y
            ){

                gameOver("Snake");

                return;

            }

        }

    }




    function draw(){

        ctx.fillStyle="black";

        ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        // snake

        ctx.fillStyle="lime";

        snake.forEach(part=>{

            ctx.fillRect(
                part.x,
                part.y,
                size,
                size
            );

        });



        // food

        ctx.fillStyle="red";

        ctx.fillRect(
            food.x,
            food.y,
            size,
            size
        );


        text(
            "Score: "+score,
            10,
            25
        );

    }



    function loop(){

        moveSnake();

        draw();

        animation=requestAnimationFrame(loop);

    }


    loop();

}

// =======================
// PONG
// =======================

function pong(){

    let paddleY = 160;
    let ball = {
        x:250,
        y:200,
        dx:4,
        dy:3,
        size:10
    };

    let enemyY = 160;

    let playerScore = 0;
    let enemyScore = 0;


    function loop(){

        ctx.clearRect(0,0,500,400);


        // controls

        if(keys["ArrowUp"]){
            paddleY -= 6;
        }

        if(keys["ArrowDown"]){
            paddleY += 6;
        }


        // ball

        ball.x += ball.dx;
        ball.y += ball.dy;


        if(ball.y <=0 || ball.y>=390){
            ball.dy *= -1;
        }


        // player hit

        if(
            ball.x < 30 &&
            ball.y > paddleY &&
            ball.y < paddleY+80
        ){
            ball.dx *= -1;
        }


        // enemy AI

        if(ball.y > enemyY+40){
            enemyY += 3;
        }

        if(ball.y < enemyY+40){
            enemyY -= 3;
        }


        // enemy hit

        if(
            ball.x > 460 &&
            ball.y > enemyY &&
            ball.y < enemyY+80
        ){
            ball.dx *= -1;
        }


        // scores

        if(ball.x<0){

            enemyScore++;
            resetBall();

        }


        if(ball.x>500){

            playerScore++;
            resetBall();

        }



        // draw

        ctx.fillStyle="white";

        ctx.fillRect(
            10,
            paddleY,
            10,
            80
        );


        ctx.fillRect(
            480,
            enemyY,
            10,
            80
        );


        ctx.fillRect(
            ball.x,
            ball.y,
            ball.size,
            ball.size
        );


        text(
            playerScore+" - "+enemyScore,
            220,
            30
        );


        animation=requestAnimationFrame(loop);

    }


    function resetBall(){

        ball.x=250;
        ball.y=200;
        ball.dx*=-1;

    }


    loop();

}





// =======================
// BREAKOUT
// =======================

function breakout(){

    let paddle={
        x:220,
        y:370,
        width:80,
        height:10
    };


    let ball={
        x:250,
        y:200,
        dx:4,
        dy:-4,
        size:10
    };


    let bricks=[];

    score=0;


    for(let r=0;r<4;r++){

        for(let c=0;c<8;c++){

            bricks.push({

                x:c*60+10,
                y:r*30+30,
                alive:true

            });

        }

    }



    function loop(){

        ctx.clearRect(0,0,500,400);


        // controls

        if(keys["ArrowLeft"]){

            paddle.x-=7;

        }


        if(keys["ArrowRight"]){

            paddle.x+=7;

        }



        ball.x+=ball.dx;
        ball.y+=ball.dy;



        if(ball.x<=0 || ball.x>=490)
            ball.dx*=-1;


        if(ball.y<=0)
            ball.dy*=-1;



        if(
            ball.y>360 &&
            ball.x>paddle.x &&
            ball.x<paddle.x+paddle.width
        ){

            ball.dy*=-1;

        }



        bricks.forEach(brick=>{

            if(brick.alive){

                ctx.fillStyle="cyan";

                ctx.fillRect(
                    brick.x,
                    brick.y,
                    50,
                    20
                );


                if(
                    ball.x>brick.x &&
                    ball.x<brick.x+50 &&
                    ball.y>brick.y &&
                    ball.y<brick.y+20
                ){

                    brick.alive=false;
                    ball.dy*=-1;
                    score++;

                }

            }

        });



        ctx.fillStyle="white";

        ctx.fillRect(
            paddle.x,
            paddle.y,
            paddle.width,
            paddle.height
        );


        ctx.fillRect(
            ball.x,
            ball.y,
            ball.size,
            ball.size
        );


        text(
            "Score: "+score,
            10,
            25
        );


        animation=requestAnimationFrame(loop);

    }


    loop();

}

// =======================
// SPACE DEFENDER
// =======================

function spaceDefender(){

    let ship = {
        x:230,
        y:350,
        width:40,
        height:20
    };

    let bullets=[];
    let enemies=[];

    score=0;


    document.onkeydown=function(e){

        if(e.code==="Space"){

            bullets.push({
                x:ship.x+18,
                y:ship.y
            });

        }

    };


    function loop(){

        ctx.clearRect(0,0,500,400);


        // controls

        if(keys["ArrowLeft"])
            ship.x-=6;

        if(keys["ArrowRight"])
            ship.x+=6;



        // bullets

        bullets.forEach(b=>{

            b.y-=8;

            ctx.fillStyle="yellow";

            ctx.fillRect(
                b.x,
                b.y,
                5,
                15
            );

        });



        // spawn enemies

        if(Math.random()<0.03){

            enemies.push({

                x:Math.random()*460,
                y:-20

            });

        }



        enemies.forEach((enemy,i)=>{

            enemy.y+=3;


            ctx.fillStyle="red";

            ctx.fillRect(
                enemy.x,
                enemy.y,
                30,
                30
            );



            bullets.forEach((b,j)=>{

                if(
                    b.x>enemy.x &&
                    b.x<enemy.x+30 &&
                    b.y>enemy.y &&
                    b.y<enemy.y+30
                ){

                    enemies.splice(i,1);
                    bullets.splice(j,1);
                    score++;

                }

            });



            if(enemy.y>400){

                gameOver("Space Defender");

            }

        });



        // ship

        ctx.fillStyle="cyan";

        ctx.fillRect(
            ship.x,
            ship.y,
            ship.width,
            ship.height
        );


        text(
            "Score: "+score,
            10,
            25
        );


        animation=requestAnimationFrame(loop);

    }


    loop();

}





// =======================
// PIXEL RACER
// =======================

function racer(){

    let car={
        x:230,
        y:330,
        width:40,
        height:60
    };


    let obstacles=[];

    score=0;


    function loop(){

        ctx.clearRect(0,0,500,400);



        if(keys["ArrowLeft"])
            car.x-=6;


        if(keys["ArrowRight"])
            car.x+=6;



        if(Math.random()<0.03){

            obstacles.push({

                x:Math.random()*450,
                y:-60

            });

        }



        obstacles.forEach((o,i)=>{

            o.y+=5;


            ctx.fillStyle="red";

            ctx.fillRect(
                o.x,
                o.y,
                40,
                60
            );


            if(
                car.x<o.x+40 &&
                car.x+40>o.x &&
                car.y<o.y+60 &&
                car.y+60>o.y
            ){

                gameOver("Pixel Racer");

            }



            if(o.y>400){

                obstacles.splice(i,1);
                score++;

            }

        });



        ctx.fillStyle="blue";

        ctx.fillRect(
            car.x,
            car.y,
            car.width,
            car.height
        );



        text(
            "Score: "+score,
            10,
            25
        );



        animation=requestAnimationFrame(loop);

    }


    loop();

}