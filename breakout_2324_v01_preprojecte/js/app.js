/*
* APLICACIÓ && MENU
*/
let lvl = 3;
let firstPunts = false;
let firstJoc = false;

$(document).ready(function () { //pq cuando inicie el html mostri el ranking actual
    mostrarRanking();
});

function canviMenu() { //gestiona el canvi entre joc i menu
    let myCanvas = document.getElementById("joc");
    let ctx = myCanvas.getContext("2d");
    const playerName = document.getElementById('player-name').value;

    if (document.querySelector("#menu").style.display == "none") { //si estem al joc i donem
        document.querySelector("#menu").style.display = "block";
        document.querySelector("#breakout").style.display = "none";
        guardarYMostrarRanking(playerName);

    } else { //si estem al menu i donem
        if (lvl > 2 || playerName == '') {
            return;
        }

        firstPunts = false;

        document.querySelector("#menu").style.display = "none";
        document.querySelector("#breakout").style.display = "block";

        if (!firstJoc) {
            joc = new Joc(myCanvas, ctx);
            joc.inicialitza(lvl, firstPunts);
            firstJoc = true;
            animacio();
        }
        joc.inicialitza(lvl, firstPunts);
        removerHover();
    }
}

function repetirNivell(){ //per repetir el mateix nivell
    firstPunts = false;
    joc.inicialitza(lvl, firstPunts);
}

function nextNivell(){ //per anar al proxim nivell
    firstPunts = true;
    lvl = lvl - 1;
    joc.inicialitza(lvl, firstPunts);
}

function animacio() { //animació
    joc.update();
    requestAnimationFrame(animacio);
}

//funcions botons

function activarHover1(boton) {
    removerHover();
    boton.classList.add("hover-activado1");
    lvl = 2;
}

function activarHover2(boton) {
    removerHover();
    boton.classList.add("hover-activado2");
    lvl = 1;
}

function activarHover3(boton) {
    removerHover();
    boton.classList.add("hover-activado3");
    lvl = 0;
}

function removerHover() {
    var botones = document.querySelectorAll(".buttoneasy, .buttonmedium, .buttondifi");
    botones.forEach(function (boton) {
        boton.classList.remove("hover-activado1", "hover-activado2", "hover-activado3", "hover-activado4");
    });
}

//funcions pel ranking

function guardarYMostrarRanking(playerName) { //crida les funcions de abaix i ho mostra al menu
    if (playerName.trim() !== "") {
        guardarJugador(playerName);
        mostrarRanking();
        document.getElementById('player-name').value = '';
    }
}

function guardarJugador(nombre) { //guarda el nom del jugador i seus punts
    if (!nombre) return;

    var jugadores = JSON.parse(localStorage.getItem('jugadores')) || [];
    resetStorage();
    jugadores.push({ nombre: nombre, puntuacion: joc.punts });
    jugadores.sort(function(a, b){
        return b.puntuacion - a.puntuacion;
    });
    jugadores = jugadores.slice(0, 5);
    localStorage.setItem('jugadores', JSON.stringify(jugadores));
}

function mostrarRanking() { //mostrar ranking al html
    const puntsList = document.getElementById('punts-list');
    puntsList.innerHTML = '';
    const jugadorList = document.getElementById('jugadors-list');
    jugadorList.innerHTML = '';

    const jugadores = JSON.parse(localStorage.getItem('jugadores')) || [];
    jugadores.forEach(jugador => {
        const li = document.createElement('li');
        li.textContent = jugador.nombre;
        jugadorList.appendChild(li);
    });
    jugadores.forEach(jugador => {
        const li = document.createElement('li');
        li.textContent = jugador.puntuacion;
        puntsList.appendChild(li);
    })
}

function resetStorage() { //resetea el localstorage
    localStorage.clear();
}
