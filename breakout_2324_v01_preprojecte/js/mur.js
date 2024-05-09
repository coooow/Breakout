/*
* CLASSE MUR
*/

class Mur {
    constructor() {
        defineixNivells();
        let totxosArray = [];
    }

    /*
    Això genera els valors d'una array de totxos bassant-se en una String que prové de 
    defineixNivells() si hi ha una 'a' s'afegeix un totxo, sinó simplement avança la
    posició fins trobar una altre 'a' o fins que s'acabi la String
    */
    generaMur(lvl) {
        totxosArray = [];       //buida la Array per si es necessités tornar a usar el mètode
        for (let i = 0; i < this.nivells[lvl].totxos.length; i++) {
            for (let j = 0; j < this.nivells[lvl].totxos[i].length; j++) {

                const puntPosicio = { x: i, y: j };
                const amplada = 20;     //← i ↓ es poden cambiar segons gust
                const alcada = 5;
                
                const character = this.nivells[lvl].totxos[i][j];
                if (character == 'a') {
                    const totxo = new totxo(puntPosicio, amplada, alcada);
                    totxosArray.push(totxo);
                }
            }
        }
    }

    /*
    Segurament malament però ioquese
    */
    draw(ctx) {
        for (let i = 0; i < totxosArray.length; i++){
            totxosArray[i].draw(ctx);
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