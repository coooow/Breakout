/*
* APLICACIÓ && MENU
*/
let lvl = 3;

$(document).ready(function () {
    mostrarRanking();
});

function canviMenu() {
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

        document.querySelector("#menu").style.display = "none";
        document.querySelector("#breakout").style.display = "block";

        joc = new Joc(myCanvas, ctx, lvl);
        joc.inicialitza();
        animacio();
    }
}

function animacio() {
    joc.update();
    requestAnimationFrame(animacio);
}

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

function guardarYMostrarRanking(playerName) {
    if (playerName.trim() !== "") {
        guardarJugador(playerName);
        mostrarRanking();
        document.getElementById('player-name').value = '';
    }
}

function guardarJugador(nombre) {
    if (!nombre) return;

    let jugadores = JSON.parse(localStorage.getItem('jugadores')) || [];
    jugadores.push({ nombre: nombre, puntuacion: joc.punts });
    jugadores = jugadores.slice(0, 5);
    localStorage.setItem('jugadores', JSON.stringify(jugadores));
}

function mostrarRanking() {
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
