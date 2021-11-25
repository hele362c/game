window.addEventListener("load", sidenVises);

let liv;
let points;
let rand;
let erSpilletStoppet = false;
let posArray;

function sidenVises() {
    console.log("sidenVises");

    //hide info_skaerm, gameover og levelcomplete, vis start skærme
    document.querySelector("#start").classList.remove("hide");
    document.querySelector("#game_over").classList.add("hide");
    document.querySelector("#level_complete").classList.add("hide");
    document.querySelector("#info_skaerm").classList.add("hide");

    //klik på info_skaerm
    document.querySelector("#start_knap").addEventListener("click", infoSkaerm);

    //knap -> pulse 
    document.querySelector("#start_knap").classList.add("pulse");


    //julemandensøjne blinker
    document.querySelector("#eyes").classList.add("eyeblink");
}

function infoSkaerm() {
    console.log("infoSkaerm");

    //hide start, gameover og levelcomplete, vis info_skaerm
    document.querySelector("#info_skaerm").classList.remove("hide");
    document.querySelector("#start").classList.add("hide");
    document.querySelector("#game_over").classList.add("hide");
    document.querySelector("#level_complete").classList.add("hide");

    //lyd på knap start_knap
    document.querySelector("#lyd_knap").volume = 0.8;
    document.querySelector("#lyd_knap").play();
    document.querySelector("#start_knap").addEventListener("click", spilLyd);

    //klik på start_knap
    document.querySelector("#info_skaerm_start_knap").addEventListener("click", startGame);

    //knap -> pulse 
    document.querySelector("#info_skaerm_start_knap").classList.add("pulse");
}

function startGame() {
    console.log("startGame");

    //oprydning lyd
    document.querySelector("#start_knap").removeEventListener("click", spilLyd);

    //hide gameover, levelcomplete, info_skaerm og start skræme
    document.querySelector("#start").classList.add("hide");
    document.querySelector("#info_skaerm").classList.add("hide");
    document.querySelector("#game_over").classList.add("hide");
    document.querySelector("#level_complete").classList.add("hide");

    //start timer-animation og lyt efter den er færdig.
    document.querySelector("#minut_viser").classList.add("uranimation");
    document.querySelector("#time_viser").classList.add("uranimation2");
    document.querySelector("#minut_viser").addEventListener("animationend", stopSpillet);

    //lyd på knap info_skaerm_start_knap
    document.querySelector("#lyd_knap").volume = 0.8;
    document.querySelector("#lyd_knap").play();
    document.querySelector("#info_skaerm_start_knap").addEventListener("click", spilLyd);
    document.querySelector("#genstart_knap_level_complete").addEventListener("click", spilLyd);
    document.querySelector("#genstart_knap_game_over").addEventListener("click", spilLyd);

    //lyd på spilleskærm
    document.querySelector("#lyd_startgame").volume = 0.08;
    document.querySelector("#lyd_startgame").play();
    document.querySelector("#start").addEventListener("click", spilLyd);

    //nulstil point
    //skriv point ud på siden. 
    points = 0;
    document.querySelector("#point_container").textContent = points;

    //nulstil liv
    //skriv liv ud på siden. 
    liv = 3;
    document.querySelector("#heart1").classList.remove("gray");
    document.querySelector("#heart2").classList.remove("gray");
    document.querySelector("#heart3").classList.remove("gray");

    //alle positioner er lagt ind i en posarray. 
    posArray = ["pos0", "pos1", "pos2", "pos3", "pos4", "pos5", "pos6", "pos7"];

    shuffle(posArray);


    //start up animation på alle rensdyr
    document.querySelector("#rensdyr_container1").classList.add(posArray.shift());
    document.querySelector("#rensdyr_container1").classList.add("up");
    //rand = Math.floor(Math.random() * 8);
    //document.querySelector("#rensdyr_container1").classList.add("delay" + rand);
    document.querySelector("#rensdyr_container1").addEventListener("animationiteration", restartClickRensdyr);


    document.querySelector("#rensdyr_container2").classList.add(posArray.shift());
    document.querySelector("#rensdyr_container2").classList.add("up");
    //rand = Math.floor(Math.random() * 8);
    //document.querySelector("#rensdyr_container2").classList.add("delay" + rand);
    document.querySelector("#rensdyr_container2").addEventListener("animationiteration", restartClickRensdyr);


    //start duk_op animation på alle rudolph
    document.querySelector("#rudolph_container1").classList.add(posArray.shift());
    document.querySelector("#rudolph_container1").classList.add("up");
    //rand = Math.floor(Math.random() * 8);
    //document.querySelector("#rudolph_container1").classList.add("delay" + rand);
    document.querySelector("#rudolph_container1").addEventListener("animationiteration", restartClickRudolph);

    //start duk_op animation på alle alf
    document.querySelector("#alf_container1").classList.add(posArray.shift());
    document.querySelector("#alf_container1").classList.add("up");
    //rand = Math.floor(Math.random() * 8);
    //document.querySelector("#alf_container1").classList.add("delay" + rand);
    document.querySelector("#alf_container1").addEventListener("animationiteration", restartClickAlf);

    document.querySelector("#alf_container2").classList.add(posArray.shift());
    document.querySelector("#alf_container2").classList.add("up");
    //rand = Math.floor(Math.random() * 8);
    //document.querySelector("#alf_container2").classList.add("delay" + rand);
    document.querySelector("#alf_container2").addEventListener("animationiteration", restartClickAlf);


    //-----------------------------TRANSITIONS----------------------------

    //klikker på rensdyr ->clickRensdyr
    document.querySelector("#rensdyr_container1").addEventListener("click", clickRensdyr);
    document.querySelector("#rensdyr_container2").addEventListener("click", clickRensdyr);

    //klikker på rudolph ->clickRudolph
    document.querySelector("#rudolph_container1").addEventListener("click", clickRudolph);

    //klikker på alf ->clickAlf
    document.querySelector("#alf_container1").addEventListener("click", clickAlf);
    document.querySelector("#alf_container2").addEventListener("click", clickAlf);

}

function clickRensdyr() {
    console.log("clickRensdyr");

    //oprydning
    this.removeEventListener("click", clickRensdyr);
    document.querySelector("#start").removeEventListener("click", spilLyd);

    //start forsvind animation på sprite
    this.firstElementChild.classList.add("forsvind");

    //lyd
    document.querySelector("#lyd_rensdyr").play();
    document.querySelector("#rensdyr_container1").addEventListener("click", spilLyd);
    //få 1 point
    //vi samlet antal point
    points++;
    document.querySelector("#point_container").textContent = points;

    //når forsvind animation er færdig ->restartClickRensdyr
    this.addEventListener("animationend", restartClickRensdyr);
}

function restartClickRensdyr() {
    console.log("restartClickRensdyr");

    //oprydning
    this.removeEventListener("animationend", restartClickRensdyr);

    //TODO BRUG this......
    //fjern forsvind classen fra sprite
    this.firstElementChild.classList.remove("forsvind");

    //giv en ny tilfældig position ud af 3
    let test = String(this.classList);

    let matches = test.match(/pos[0-8]/);
    posArray.push(matches);
    this.classList = "";
    shuffle(posArray);
    this.classList.add(posArray.shift());

    //genstart duk_up animation
    this.classList.remove("up");
    this.offsetHeight;
    this.classList.add("up");

    //ved klik på rensdyr --> clickRensdyr
    if (erSpilletStoppet == false) {
        this.addEventListener("click", clickRensdyr);
    }
}

function clickRudolph() {
    console.log("clickRudolph");

    //oprydning
    this.removeEventListener("click", clickRudolph);

    //start forsvind animation på sprite
    this.firstElementChild.classList.add("forsvind");

    //lyd
    document.querySelector("#lyd_rensdyr").play();
    document.querySelector("#rensdyr_container1").addEventListener("click", spilLyd);
    //få 2 point
    //Tæl en ned på points
    points += 2;

    //Udskriv points i htmlen
    document.querySelector("#point_container").textContent = points;

    //Forsvind animationen er færdig --> restartClickRudolph
    this.addEventListener("animationend", restartClickRudolph);
}

function restartClickRudolph() {
    console.log("restartClickRudolph");

    //oprydning
    this.removeEventListener("animationend", restartClickRudolph);

    //fjern forsvind classen fra sprite
    this.firstElementChild.classList.remove("forsvind");

    //giver en ny tilfældig position ud af 3
    let test = String(this.classList);

    let matches = test.match(/pos[0-8]/);
    posArray.push(matches);
    this.classList = "";
    shuffle(posArray);
    this.classList.add(posArray.shift());

    //genstart duk_up animation
    this.classList.remove("up");
    this.offsetHeight;
    this.classList.add("up");

    //ved klik på rudolph --> clickRudolph
    if (erSpilletStoppet == false) {
        this.addEventListener("click", clickRudolph);
    }
}

function clickAlf() {
    console.log("clickAlf");

    //Oprydning: fjern den eventlistener som har ført dig herhen...
    this.removeEventListener("click", clickAlf);

    //start forsvind animation på sprite
    this.firstElementChild.classList.add("shake");

    //lyd
    document.querySelector("#lyd_alf").play();
    document.querySelector("#alf_container1").addEventListener("click", spilLyd);

    //mister 1 liv
    //samlet antal liv
    if (liv > 0) {
        console.log("#heart" + liv);
        document.querySelector("#heart" + liv).classList.add("gray");

        liv--;
        console.log("antal liv:" + liv);
    }


    //Når shake animationen er færdig --> restartClickAlf
    this.addEventListener("animationend", restartClickAlf);
    //ikke flere liv tilbage ->gameOver
    if (liv <= 0) {
        stopSpillet();
    }
}

function restartClickAlf() {
    console.log("restartClickAlf");

    //oprydning
    this.removeEventListener("animationend", restartClickAlf);

    //fjern shake classen fra sprite
    this.firstElementChild.classList.remove("shake");

    //giver en ny tilfældig position ud af 3
    let test = String(this.classList);

    let matches = test.match(/pos[0-8]/);
    posArray.push(matches);
    this.classList = "";
    shuffle(posArray);
    this.classList.add(posArray.shift());

    //genstart duk_up animation
    this.classList.remove("up");
    this.offsetHeight;
    this.classList.add("up");

    // Ved klik på alf --> clickAlf
    if (erSpilletStoppet == false) {
        this.addEventListener("click", clickAlf);
    }
}

function gameOver() {
    console.log("gameOver");
    //skriv "game over - øv, du fik X point" i Console.log
    console.log("Game over - øv, du tabte, du havde: " + points + " point og: " + liv + " liv");

    //taber lyd
    document.querySelector("#taber_lyd").volume = 0.08;
    document.querySelector("#taber_lyd").play();

    //giv Alf en shake animation 
    document.querySelector("#game_over_alf").classList.add("tabershake");

    //få tears til at falde
    document.querySelector("#tears_right").classList.add("falling");
    document.querySelector("#tears_right").classList.add("delayfall");

    document.querySelector("#tears_right2").classList.add("falling");
    document.querySelector("#tears_right2").classList.add("delayfall2");

    document.querySelector("#tears_left").classList.add("falling");
    document.querySelector("#tears_left").classList.add("delayfall");

    document.querySelector("#tears_left2").classList.add("falling");
    document.querySelector("#tears_left2").classList.add("delayfall2");

    //vis taberskærm
    document.querySelector("#game_over").classList.remove("hide");

    //Gør så man kan klikke genstart
    document.querySelector("#genstart_knap_game_over").addEventListener("click", startGame);

    //knap -> pulse 
    document.querySelector("#genstart_knap_game_over").classList.add("pulse");

}

function levelComplete() {
    console.log("levelComplete");

    //Skriv “Level complete - tillykke, du fik XX point” ud i konsollen (XX er antal point)
    console.log("Level complete - tillykke, du har vundet, du havde: " + points + " point og: " + liv + " liv");

    //vinder lyd
    document.querySelector("#vinder_lyd").volume = 1;
    document.querySelector("#vinder_lyd").play();

    //udskriv point på siden -> levelcomplete
    document.querySelector("#score").textContent = points;

    //julemandenskane flyver afsted
    document.querySelector("#julemandenskane").classList.add("flyv");

    //vis vinderskærm
    document.querySelector("#level_complete").classList.remove("hide");

    //Gør så man kan klikke genstart
    document.querySelector("#genstart_knap_level_complete").addEventListener("click", startGame);

    //knap -> pulse 
    document.querySelector("#genstart_knap_level_complete").classList.add("pulse");

}

function stopSpillet() {
    console.log("stopSpillet");

    //stop timer animationen og stop lyt efter den er færdig. 
    document.querySelector("#minut_viser").classList.remove("uranimation");
    document.querySelector("#time_viser").classList.remove("uranimation2");
    document.querySelector("#minut_viser").removeEventListener("animationend", stopSpillet);

    //document.querySelector("#lyd_startgame").pause();
    document.querySelector("#lyd_startgame").volume = 0.03;

    //fjern alle classes på containere og sprite
    document.querySelector("#rensdyr_container1").classList = "";
    document.querySelector("#rensdyr_container2").classList = "";
    document.querySelector("#rudolph_container1").classList = "";
    document.querySelector("#alf_container1").classList = "";
    document.querySelector("#alf_container2").classList = "";

    document.querySelector("#rensdyr_sprite1").classList = "";
    document.querySelector("#rensdyr_sprite2").classList = "";
    document.querySelector("#rudolph_sprite1").classList = "";
    document.querySelector("#alf_sprite1").classList = "";
    document.querySelector("#alf_sprite2").classList = "";

    //fjern alle eventlistner
    document.querySelector("#start").removeEventListener("click", spilLyd);
    document.querySelector("#start_knap").removeEventListener("click", spilLyd);
    document.querySelector("#info_skaerm_start_knap").removeEventListener("click", spilLyd);
    document.querySelector("#genstart_knap_game_over").removeEventListener("click", spilLyd);
    document.querySelector("#genstart_knap_level_complete").removeEventListener("click", spilLyd);

    document.querySelector("#rensdyr_container1").removeEventListener("click", clickRensdyr);
    document.querySelector("#rensdyr_container2").removeEventListener("click", clickRensdyr);
    document.querySelector("#rudolph_container1").removeEventListener("click", clickRudolph);
    document.querySelector("#alf_container1").removeEventListener("click", clickAlf);
    document.querySelector("#alf_container2").removeEventListener("click", clickAlf);

    document.querySelector("#rensdyr_container1").removeEventListener("animationend", restartClickRensdyr);
    document.querySelector("#rensdyr_container2").removeEventListener("animationend", restartClickRensdyr);
    document.querySelector("#rudolph_container1").removeEventListener("animationend", restartClickRudolph);
    document.querySelector("#alf_container1").removeEventListener("animationend", restartClickAlf);
    document.querySelector("#alf_container2").removeEventListener("animationend", restartClickAlf);

    document.querySelector("#rensdyr_container1").removeEventListener("animationiteration", restartClickRensdyr);
    document.querySelector("#rensdyr_container2").removeEventListener("animationiteration", restartClickRensdyr);
    document.querySelector("#rudolph_container1").removeEventListener("animationiteration", restartClickRudolph);
    document.querySelector("#alf_container1").removeEventListener("animationiteration", restartClickAlf);
    document.querySelector("#alf_container2").removeEventListener("animationiteration", restartClickAlf);

    //Undersøger først om der er flere liv, så om man har fået nok point, ellers gameover
    if (liv <= 0) {
        console.log("spillet er allerede stoppet tideligere...");
        gameOver();
    } else if (points >= 10) {
        console.log("spillet stopper og går til levelcomplete");
        levelComplete();
    } else {
        console.log("spillet stopper og går til gameOver");
        gameOver();
    }

}

function spilLyd() {
    console.log("spilLyd");
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
