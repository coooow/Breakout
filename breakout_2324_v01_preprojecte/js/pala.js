/*
* CLASSE PALA
*/

class Pala {
    constructor(puntPosicio, amplada, alcada) {
        this.amplada = amplada;
        this.alcada = alcada;
        this.posicio = puntPosicio;
        this.vy = 2;
        this.vx = 4;                                                     // velocitat = 10 píxels per fotograma
        this.color = "#D30";
    }

    update() { //mou si LEFT o RIGHT estan apretadas
        if (joc.key.LEFT.pressed) {
            if (this.posicio.x <= 0 || joc.estatJoc == false) {
                return;
            }
            this.mou(-this.vx, 0);
        }
        if (joc.key.RIGHT.pressed) {
            if (this.posicio.x + this.amplada > joc.amplada || joc.estatJoc == false) { //dreta
                return;
            }
            this.mou(this.vx, 0);
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.posicio.x, this.posicio.y, this.amplada, this.alcada);
        ctx.restore();

    }
    mou(x, y) {
        this.posicio.x += x;
        this.posicio.y += y;
    }
}