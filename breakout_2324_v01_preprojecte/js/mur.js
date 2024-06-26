/*
* CLASSE MUR
*/

const separacioVertical = 2, separacioHoritzontal = 14, separacioCanvasHor = 7, separacioCanvasVer = 5;

class Mur {
    constructor() {
        this.totxosArray = [];
    }
    /*
    Això genera els valors d'una array de totxos bassant-se en una String que prové de 
    defineixNivells() si hi ha una 'a' s'afegeix un totxo, sinó simplement avança la
    posició fins trobar una altre 'a' o fins que s'acabi la String
    */

    generaMur(lvl) { //genera el mur depenent del nivel del parametre
        this.totxosArray = [];      //buida la Array per si es necessités tornar a usar el mètode
        for (let i = 0; i < this.nivells[lvl].totxos.length; i++) {
            for (let j = 0; j < this.nivells[lvl].totxos[i].length; j++) {
                const puntPosicio = { x: j*10+separacioCanvasHor + separacioHoritzontal*j, y: i*10+separacioCanvasVer + separacioVertical*i};
                const amplada = 22;     //← i ↓ es poden cambiar segons gust
                const alcada = 10;
                
                const character = this.nivells[lvl].totxos[i][j];
                if (character == 'a') {
                    const totxo = new Totxo(puntPosicio, amplada, alcada, this.nivells[lvl].color);
                    this.totxosArray.push(totxo);
                } else if (character == 'b') {
                    const totxo1 = new Totxo(puntPosicio, amplada, alcada, this.nivells[lvl].color);
                    this.totxosArray.push(totxo1);
                    const totxo2 = new Totxo(puntPosicio, amplada, alcada, "#BF40BF");
                    this.totxosArray.push(totxo2);
                }
                else if (character == 'c') {
                    const totxo1 = new Totxo(puntPosicio, amplada, alcada, "#df912c");
                    this.totxosArray.push(totxo1);
                    const totxo2 = new Totxo(puntPosicio, amplada, alcada, "#df912c");
                    this.totxosArray.push(totxo2);
                    const totxo3 = new Totxo(puntPosicio, amplada, alcada, "#df912c");
                    this.totxosArray.push(totxo3);
                }
            }
        }
        return this.totxosArray;
    }

  
    draw(ctx) { 
        for (let i = 0; i < this.totxosArray.length; i++){
            this.totxosArray[i].draw(ctx);
        }
    }

    defineixNivells() {
        this.nivells = [
            {
                color: "#D30", // vermell
                totxos: [
                    "            ",
                    "bbbbbbbbbbbb",
                    "aaaaaaaaaaaa",
                    "aacaaccaacaa",
                    "aaaaaaaaaaaa",
                ]
            },
            {
                color: "#8D1", // verd
                totxos: [
                    "aaaaaaaaaaaa",
                    "     aa     ",
                    "   aaaaaa   ",
                    "   aaaaaa   ",
                    "     aa     ",
                ]
            },
            {
                color: "#4CF", // blue cel
                totxos: [
                    "aaaaaaaaaaaa",
                    "a          a",
                    " a        a ",
                    "aa        aa",
                    "  aaaaaaaa  ",
                ]
            }
        ];
    }

};