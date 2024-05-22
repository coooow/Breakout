/*
* CLASSE JOC
*/

class Joc {
    constructor(canvas, ctx , lvl) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.amplada = canvas.width;
        this.alcada = canvas.height;
        this.totxosArray = [];
        this.estatJoc = true;
        this.vides = 3;
        this.punts = 0;
        this.pointMultiplier = 1;
        /*
        this.totxoamplada = 22;
        this.totxoalcada = 10; // MIDES DEL TOTXO EN PÍXELS
        this.totxocolor = 20;
        */


        this.bola = new Bola(new Punt(this.canvas.width / 2, this.canvas.height / 2), 3);
        this.pala = new Pala(new Punt((this.canvas.width - 60) / 2, this.canvas.height - 15), 60, 4);
        this.mur = new Mur();
        this.mur.defineixNivells();
        this.totxosArray = this.mur.generaMur(lvl);

        this.key = {
            LEFT: { code: 37, pressed: false },
            RIGHT: { code: 39, pressed: false }
        };
    }

    draw() {
        this.clearCanvas();
        this.pala.draw(this.ctx);
        this.mur.draw(this.ctx);
        if(this.vides > 0 && this.estatJoc == true){
            this.bola.draw(this.ctx);
        }

    }
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    inicialitza() {
        this.pala.draw(this.ctx);
        this.bola.draw(this.ctx);
        this.mur.draw(this.ctx);

        $("#punts").append("<p>Punts: " + this.punts + "</p>");
        $("#vides").append("<p>Vides: " + this.vides + "</p>");

        $(document).on("keydown", { joc: this }, function (e) {
            //Moviment de la pala
            if (e.which == 39) {
                joc.key.RIGHT.pressed = true;
            } else if (e.which == 37) { //esquerra
                joc.key.LEFT.pressed = true;
            }
        });
        $(document).on("keyup", { joc: this }, function (e) {
            //Moviment de la pala
            if (e.which == 39) {
                joc.key.RIGHT.pressed = false;
            } else if (e.which == 37) { //esquerra
                joc.key.LEFT.pressed = false;
            }
        });
    }

    /*
    addHearts(){
        const myDiv = document.getElementById('myDiv');
        const img = document.createElement('img');
        img.src = 'path/to/your/image.jpg';
        img.width = 300;
        img.height = 200;
        myDiv.appendChild(img);
    }
    */


    update() {
        var p = document.querySelector("#punts p");
        var v = document.querySelector("#vides p");

        this.bola.update();
        this.pala.update();
        this.draw();
        
        p.innerHTML = "Punts: " + this.punts;
        v.innerHTML = "Vides: " + this.vides;
    }
}