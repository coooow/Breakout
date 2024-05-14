/*
* APLICACIÓ
*/

$(document).ready(function() {

    let myCanvas = document.getElementById("joc");
    let ctx = myCanvas.getContext("2d");

    joc = new Joc(myCanvas,ctx);
    joc.inicialitza();
    animacio();
    mostrarRanking();

});

function animacio() {
    joc.update();
    requestAnimationFrame(animacio);    
}

function activarHover1(boton) { 
    removerHover();
    boton.classList.add("hover-activado1");
}

function activarHover2(boton) {
    removerHover();
    boton.classList.add("hover-activado2");

}

function activarHover3(boton) {
    removerHover();
    boton.classList.add("hover-activado3");
}

function removerHover() {
    var botones = document.querySelectorAll(".buttoneasy, .buttonmedium, .buttondifi");
    botones.forEach(function (boton) {
        boton.classList.remove("hover-activado1", "hover-activado2", "hover-activado3", "hover-activado4");
    });
}

function guardarYMostrarRanking() {
    const playerName = document.getElementById('player-name').value;
    if (playerName.trim() !== "") {
        guardarJugador(playerName);
        mostrarRanking();
        document.getElementById('player-name').value = '';
    }
}

function guardarJugador(nombre) {
    if (!nombre) return;

    let jugadores = JSON.parse(localStorage.getItem('jugadores')) || [];
    jugadores.push({ nombre: nombre, puntuacion: 0 }); 
    jugadores = jugadores.slice(0, 5);
    localStorage.setItem('jugadores', JSON.stringify(jugadores));
}

function mostrarRanking() {
    const rankingList = document.getElementById('ranking-list');
    rankingList.innerHTML = '';

    const jugadores = JSON.parse(localStorage.getItem('jugadores')) || [];
    jugadores.forEach(jugador => {
        const li = document.createElement('li');
        li.textContent = jugador.nombre;
        rankingList.appendChild(li);
    });
}
