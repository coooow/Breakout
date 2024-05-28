/*
* CLASSE JOC
*/

class Joc {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.amplada = canvas.width;
        this.alcada = canvas.height;
        this.totxosArray = [];
        this.estatJoc = false;
        this.vides;
        this.punts;
        this.pointMultiplier;
        this.lvl;
        this.key;
        /*
        this.totxoamplada = 22;
        this.totxoalcada = 10; // MIDES DEL TOTXO EN PÍXELS
        this.totxocolor = 20;
        */

        $("#punts").append("<p>Punts: " + 0 + "</p>");
        $("#vides").append("<p>Vides: " + 3 + "</p>");
    }

    draw() {
        this.clearCanvas();
        this.pala.draw(this.ctx);
        this.mur.draw(this.ctx);
        if(this.totxosArray.length == 0 && this.estatJoc == true){ //win
            document.querySelector("#winner").style.display = "block";
            this.estatJoc = false;
            canviMenu();
        } else if (this.vides == 0){ //lose
            document.querySelector("#loser").style.display = "block";
            this.estatJoc = false;
        } else if (this.vides > 0 && this.estatJoc == true){ 
            this.bola.draw(this.ctx);
        }

    }
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    inicialitza(lvl, first) {
        this.vides = 3;
        this.punts = 0;
        this.pointMultiplier = 1;

        this.bola = new Bola(new Punt(this.canvas.width / 2, this.canvas.height / 2), 3);
        if(!first){
            this.pala = new Pala(new Punt((this.canvas.width - 60) / 2, this.canvas.height - 15), 60, 4);
        }
        this.mur = new Mur();
        this.mur.defineixNivells();
        this.totxosArray = this.mur.generaMur(lvl);

        document.querySelector("#winner").style.display = "none";
        document.querySelector("#loser").style.display = "none";

        this.bola.vy = 1;
        this.bola.vx = Math.random() > 0.5 ? 1 : -1;
        this.pala.posicio = new Punt((this.canvas.width - 60) / 2, this.canvas.height - 15);

        this.key = {
            LEFT: { code: 37, pressed: false },
            RIGHT: { code: 39, pressed: false }
        };

        this.pala.draw(this.ctx);
        this.bola.draw(this.ctx);
        this.mur.draw(this.ctx);

        $(document).on("keydown", { joc: this }, function (e) {
            //Moviment de la pala
            if (e.which == joc.key.RIGHT.code) {
                joc.key.RIGHT.pressed = true;
            } else if (e.which == joc.key.LEFT.code) { //esquerra
                joc.key.LEFT.pressed = true;
            }
        });
        $(document).on("keyup", { joc: this }, function (e) {
            //Moviment de la pala
            if (e.which == joc.key.RIGHT.code) {
                joc.key.RIGHT.pressed = false;
            } else if (e.which == joc.key.LEFT.code) { //esquerra
                joc.key.LEFT.pressed = false;
            }
        });
    }

    
    addHearts(){
        const myDiv = document.getElementById('vides');
        const img = document.createElement('img');
        img.src = 'path/to/your/image.jpg';
        img.width = 300;
        img.height = 200;
        myDiv.appendChild(img);
    }
    


    update() {
        var p = document.querySelector("#punts p");
        var v = document.querySelector("#vides p");
    
        this.bola.update();
        this.pala.update();
        this.draw();
        
        p.innerHTML = "Punts: " + this.punts;
    
        // Clear the existing lives display
        v.innerHTML = '';
    
        // Add the correct number of life images
        for (let i = 0; i < this.vides; i++) {
            let img = document.createElement('img');
            img.src = '.images/corasonDeMelon.png';  // Path to your life image
            img.alt = '♥';      // Alternative text for the image
            img.style.width = '20px'; // Optional: Set width for the image
            img.style.height = '20px'; // Optional: Set height for the image
            v.appendChild(img);
        }
    }
}