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

    <p>Learn more by having fun!</p>

    </header>



    <button onclick="location.reload()">
    ← Back to School
    </button>



    <div class="card">

    <h2>🕹️ Coming Soon</h2>

    <p>
    Retro games will be added here.
    </p>

    </div>


    </div>

    `;


}