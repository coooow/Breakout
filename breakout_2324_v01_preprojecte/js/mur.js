/*
* CLASSE MUR
*/

class Mur {
    constructor() {
        this.totxosArray = [];
    }
    /*
    Això genera els valors d'una array de totxos bassant-se en una String que prové de 
    defineixNivells() si hi ha una 'a' s'afegeix un totxo, sinó simplement avança la
    posició fins trobar una altre 'a' o fins que s'acabi la String
    */

    generaMur(lvl) {
        this.totxosArray = [];      //buida la Array per si es necessités tornar a usar el mètode
        for (let i = 0; i < this.nivells[lvl].totxos.length; i++) {
            for (let j = 0; j < this.nivells[lvl].totxos[i].length; j++) {
                const puntPosicio = { x: j*10+7 + 14*j, y: i*10+10 + 5*i};
                const amplada = 22;     //← i ↓ es poden cambiar segons gust
                const alcada = 10;
                
                const character = this.nivells[lvl].totxos[i][j];
                if (character == 'a') {
                    const totxo = new Totxo(puntPosicio, amplada, alcada, this.nivells[lvl].color);
                    this.totxosArray.push(totxo);
                }
            }
        }
        console.log(this.totxosArray);
    }

    /*
    Segurament malament però ioquese
    */
    draw(ctx) {
        for (let i = 0; i < this.totxosArray.length; i++){
            this.totxosArray[i].draw(ctx);
        }
    }

    defineixNivells() {
        this.nivells = [
            {
                color: "#4CF", // blue cel
                totxos: [
                    "aaaaaaaaaaaa",
                    "aaaaaaaaaaaa",
                    "aaaaaaaaaaaa",
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
                color: "#D30", // vermell
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