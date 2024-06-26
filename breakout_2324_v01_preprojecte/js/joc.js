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
        this.punts = 0;
        /*
        this.totxoamplada = 22;
        this.totxoalcada = 10; // MIDES DEL TOTXO EN PÍXELS
        this.totxocolor = 20;
        */

        $("#punts").append("<p>Punts: " + 0 + "</p>");
        $("#vides").append("<p>Vides: " + 3 + "</p>");
    }

    draw() { //tota la gestio dibuix
        this.clearCanvas();
        this.pala.draw(this.ctx);
        this.mur.draw(this.ctx);

        if(this.totxosArray.length == 0 && this.estatJoc == true || document.querySelector(".winner").style.display == "flex"){ //win
            if(this.lvl == 0){
                document.querySelector("#btnNext").style.display = "none";
            }
            document.querySelector(".winner").style.display = "flex";
            this.estatJoc = false;
        } else if (this.vides == 0){ //lose
            document.querySelector(".loser").style.display = "flex";
            this.estatJoc = false;
        } else if (this.vides > 0 && this.estatJoc == true){ 
            this.bola.draw(this.ctx);
        } else if (this.estatJoc == false){ //si acabes de morir
            document.querySelector(".popup").style.display = "flex";
        } else { 
            document.querySelector(".popup").style.display = "none";
        }

    }
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    inicialitza(lvl, first) { //per inicialitzar cada joc
        this.vides = 3;
        if(!first){
            this.punts = 0;
        } 
        this.pointMultiplier = 1;
        this.lvl = lvl;

        this.bola = new Bola(new Punt(this.canvas.width / 2, this.canvas.height / 2), 3);
        this.pala = new Pala(new Punt((this.canvas.width - 60) / 2, this.canvas.height - 15), 60, 4);
        this.mur = new Mur();
        this.mur.defineixNivells();
        this.totxosArray = this.mur.generaMur(this.lvl);

        document.querySelector(".winner").style.display = "none";
        document.querySelector(".loser").style.display = "none";

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

    
    addHearts(){ //per afegir els cors al menu de joc
        const myDiv = document.getElementById('vides');
        const img = document.createElement('img');
        img.src = 'path/to/your/image.jpg';
        img.width = 300;
        img.height = 200;
        myDiv.appendChild(img);
    }
    


    update() { //update a cada frame
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
            img.src = '../breakout_2324_v01_preprojecte/images/corasonDeMelon.png';  // Path to your life image
            img.alt = '♥';      // Alternative text for the image
            img.style.width = '20px'; // Optional: Set width for the image
            img.style.height = '20px'; // Optional: Set height for the image
            v.appendChild(img);
        }
    }
}


window.onload = function() { //pq quan cargui joc surti el popup de donarli a espai
    var popup = document.getElementById("popup");
    popup.style.display = "flex";
  };
  
  document.addEventListener("keydown", function(event) {
    if (event.code === "Space") { 
      var popup = document.getElementById("popup");
      popup.style.display = "none"; 
    }
  });