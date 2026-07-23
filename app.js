// SCHOOL HUB APP


function openPage(page){


    let area = document.getElementById("page");


    if(page === "timetable"){

        area.innerHTML = `
        <h2>📅 Timetable</h2>
        <p>
        Monday:<br>
        Maths<br>
        Science<br>
        English<br>
        PE
        </p>
        `;

    }



    if(page === "subjects"){

        area.innerHTML = `
        <h2>📚 Subjects</h2>

        <p>
        Maths<br>
        English<br>
        Science<br>
        Computing<br>
        Art<br>
        Languages
        </p>
        `;

    }



    if(page === "homework"){

        area.innerHTML = `
        <h2>📝 Homework</h2>

        <p>
        No new homework today.
        </p>
        `;

    }



    if(page === "events"){

        area.innerHTML = `
        <h2>🎉 Events</h2>

        <p>
        School trips<br>
        Sports day<br>
        Clubs<br>
        Assemblies
        </p>
        `;

    }



    if(page === "staff"){

        area.innerHTML = `
        <h2>👩‍🏫 Staff</h2>

        <p>
        Headteacher<br>
        Maths Department<br>
        Science Department<br>
        Student Support
        </p>
        `;

    }



    if(page === "contact"){

        area.innerHTML = `
        <h2>📞 Contact</h2>

        <p>
        Email: school@example.com<br>
        Phone: 0000 000000
        </p>
        `;

    }


}








// RETRO GAME AREA


function openGames(){


document.body.innerHTML = `

<div id="app">


<header>

<h1>🎮 School Arcade</h1>

<p>Retro games zone</p>

</header>



<button onclick="location.reload()">
← Back to School
</button>



<h2>Choose a game</h2>


<button onclick="startSnake()">
🐍 Snake
</button>



<canvas 
id="gameCanvas"
width="400"
height="400">
</canvas>


</div>

`;


}









// SNAKE GAME


function startSnake(){


let canvas =
document.getElementById("gameCanvas");


let ctx =
canvas.getContext("2d");



let snake = [
{
x:200,
y:200
}
];



let food = {

x:100,

y:100

};



let dx = 20;

let dy = 0;



document.onkeydown = function(e){


if(e.key === "ArrowUp"){

dx = 0;
dy = -20;

}


if(e.key === "ArrowDown"){

dx = 0;
dy = 20;

}


if(e.key === "ArrowLeft"){

dx = -20;
dy = 0;

}


if(e.key === "ArrowRight"){

dx = 20;
dy = 0;

}


};






function loop(){



ctx.fillStyle="black";

ctx.fillRect(
0,
0,
400,
400
);




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






let head = {

x: snake[0].x + dx,

y: snake[0].y + dy

};




snake.unshift(head);




if(
head.x === food.x &&
head.y === food.y
){


food.x =
Math.floor(Math.random()*20)*20;


food.y =
Math.floor(Math.random()*20)*20;


}

else{


snake.pop();


}





if(
head.x < 0 ||
head.y < 0 ||
head.x >= 400 ||
head.y >= 400
){


alert("Game Over!");

location.reload();


return;


}



requestAnimationFrame(loop);


}



loop();


}