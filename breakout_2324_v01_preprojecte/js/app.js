/*
* APLICACIÓ
*/

$(document).ready(function() {

    let myCanvas = document.getElementById("joc");
    let ctx = myCanvas.getContext("2d");

    joc = new Joc(myCanvas,ctx);
    joc.inicialitza();
    animacio();

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