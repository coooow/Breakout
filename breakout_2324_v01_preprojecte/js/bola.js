class Bola {
    constructor(puntPosicio, radi) {
        this.radi = radi;
        this.posicio = puntPosicio;
        this.vx = Math.random() > 0.5 ? 1 : -1;
        this.vy = 1;
        this.color = "#fff";
        this.punts = 0;
        this.vides = 3;
    };

    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.posicio.x, this.posicio.y, this.radi, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    }
    mou(x, y) {
        this.posicio.x += x;
        this.posicio.y += y;
    }
    update() {

        let puntActual = this.posicio;
        let puntSeguent = new Punt(this.posicio.x + this.vx,
            this.posicio.y + this.vy);
        let trajectoria = new Segment(puntActual, puntSeguent);
        let exces;
        let xoc = false;
        let toxtoXoc = false;
        let i = 0;
        
        $(document).on("keypress", {joc: this}, function (e) {
            if(e.which == 32){
                joc.estatJoc = true;
            }
        });

        if(this.vides <= 0 || joc.estatJoc == false){
            return;
        }


        //Xoc amb els laterals del canvas
        //Xoc lateral superior
        if (trajectoria.puntB.y - this.radi < 0) {
            exces = (trajectoria.puntB.y - this.radi) / this.vy;
            this.posicio.x = trajectoria.puntB.x - exces * this.vx;
            this.posicio.y = this.radi;
            xoc = true;
            this.vy = -this.vy;
        }
        //Xoc lateral dret 
        if (trajectoria.puntB.x + this.radi > joc.canvas.width) {
            exces = (trajectoria.puntB.x - this.radi) / this.vx;
            this.posicio.x = joc.canvas.width - this.radi;
            this.vx = -this.vx;
            xoc = true;
        }
        //Xoc lateral esquerra 
        if (trajectoria.puntB.x - this.radi < 0) {
            exces = (trajectoria.puntB.x - this.radi) / this.vx;
            this.posicio.x = this.radi;
            this.posicio.y = trajectoria.puntB.y - exces * this.vy;
            this.vx = -this.vx;
            xoc = true;
        }
        //Xoc lateral inferior
        if (trajectoria.puntB.y + this.radi > joc.canvas.height) {
            this.posicio.x = joc.canvas.width / 2;
            this.posicio.y = joc.canvas.height / 2;
            this.vx = Math.random() > 0.5 ? 1 : -1;
            this.vy = 1;
            xoc = true;
            this.vides--;
            joc.estatJoc = false;
            return;
        }

        //Xoc amb la pala
        if (this.interseccioSegmentRectangle(trajectoria, joc.pala)) {
            exces = (trajectoria.puntB.y - this.radi) / this.vy;
            this.posicio.y = joc.pala.posicio.y - this.radi;
            xoc = true;
            this.vy = -this.vy;
        }
        //Xoc amb els totxos del mur
        while (!toxtoXoc && i < joc.totxosArray.length) {
            if (this.interseccioSegmentRectangle(trajectoria, joc.totxosArray[i])) {
                switch (this.interseccioSegmentRectangle(trajectoria, joc.totxosArray[i]).vora) {
                    case "superior":
                        exces = (trajectoria.puntB.y - this.radi) / this.vy;
                        this.posicio.y = this.posicio.y - this.radi;
                        xoc = true;
                        this.vy = -this.vy;
                        break;
                    case "esquerra":
                        this.posicio.x = this.posicio.x + this.radi;
                        this.vx = -this.vx;
                        xoc = true;
                        break;
                    case "dreta":
                        this.posicio.x = this.posicio.x - this.radi;
                        this.vx = -this.vx;
                        xoc = true;
                        break;
                    case "inferior":
                        this.posicio.y = this.posicio.y + this.radi;
                        this.vy = -this.vy;
                        xoc = true;
                        break;
                }
                toxtoXoc = true;
                joc.totxosArray[i].tocat = true;
                joc.totxosArray.splice(i, 1);
                this.vx += 0.05;
                this.vy += 0.05;
                this.punts += 10;
            }

            i++;
        }
        //Utilitzem el mètode INTERSECCIOSEGMENTRECTANGLE


        if (!xoc) {
            this.posicio.x = trajectoria.puntB.x;
            this.posicio.y = trajectoria.puntB.y;
        }

    }

    interseccioSegmentRectangle(segment, rectangle) {

        //1r REVISAR SI EXISTEIX UN PUNT D'INTERSECCIÓ EN UN DELS 4 SEGMENTS
        //SI EXISTEIX, QUIN ÉS AQUEST PUNT
        //si hi ha més d'un, el més ajustat
        let puntI;
        let distanciaI;
        let puntIMin;
        let distanciaIMin = Infinity;
        let voraI;
        //calcular punt d'intersecció amb les 4 vores del rectangle
        //necessitem coneixer els 4 segments del rectangle
        //vora superior
        let segmentVoraSuperior = new Segment(rectangle.posicio,
            new Punt(rectangle.posicio.x + rectangle.amplada, rectangle.posicio.y));
        //vora inferior
        let segmentVoraInferior = new Segment(new Punt(rectangle.posicio.x, rectangle.posicio.y + rectangle.alcada),
            new Punt(rectangle.posicio.x + rectangle.amplada, rectangle.posicio.y + rectangle.alcada));
        //vora esquerra
        let segmentVoraEsquerra = new Segment(rectangle.posicio,
            new Punt(rectangle.posicio.x, rectangle.posicio.y + rectangle.alcada));
        //vora dreta
        let segmentVoraDreta = new Segment(new Punt(rectangle.posicio.x + rectangle.amplada, rectangle.posicio.y),
            new Punt(rectangle.posicio.x + rectangle.amplada, rectangle.posicio.y + rectangle.alcada));


        //2n REVISAR SI EXISTEIX UN PUNT D'INTERSECCIÓ EN UN DELS 4 SEGMENTS
        //SI EXISTEIX, QUIN ÉS AQUEST PUNT
        //si hi ha més d'n, el més ajustat

        //vora superior
        puntI = segment.puntInterseccio(segmentVoraSuperior);
        if (puntI) {
            //distancia entre dos punts, el punt inicial del segment i el punt d'intersecció
            distanciaI = Punt.distanciaDosPunts(segment.puntA, puntI);
            if (distanciaI < distanciaIMin) {
                distanciaIMin = distanciaI;
                puntIMin = puntI;
                voraI = "superior";
            }
        }
        //vora inferior
        puntI = segment.puntInterseccio(segmentVoraInferior);
        if (puntI) {
            distanciaI = Punt.distanciaDosPunts(segment.puntA, puntI);
            if (distanciaI < distanciaIMin) {
                distanciaIMin = distanciaI;
                puntIMin = puntI;
                voraI = "inferior";
            }
        }

        //vora esquerra
        puntI = segment.puntInterseccio(segmentVoraEsquerra);
        if (puntI) {
            distanciaI = Punt.distanciaDosPunts(segment.puntA, puntI);
            if (distanciaI < distanciaIMin) {
                distanciaIMin = distanciaI;
                puntIMin = puntI;
                voraI = "esquerra";
            }
        }
        //vora dreta
        puntI = segment.puntInterseccio(segmentVoraDreta);
        if (puntI) {
            distanciaI = Punt.distanciaDosPunts(segment.puntA, puntI);
            if (distanciaI < distanciaIMin) {
                distanciaIMin = distanciaI;
                puntIMin = puntI;
                voraI = "dreta";
            }
        }

        //Retorna la vora on s'ha produït la col·lisió, i el punt (x,y)
        if (voraI) {
            return { pI: puntIMin, vora: voraI };
        }
    }

    distancia = function (p1, p2) {
        return Math.sqrt((p2.x - p1.x) * (p2.x - p1.x) + (p2.y - p1.y) * (p2.y - p1.y));
    }
}

