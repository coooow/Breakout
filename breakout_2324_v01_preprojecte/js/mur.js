/*
* CLASSE MUR
*/

class Mur {
    constructor() {
        defineixNivells();
        let totxos = []
    }

    generaMur(lvl) {
        let totxosArray = [];

        for (let i = 0; i < this.nivells[lvl].totxos.length; i++) {
            for (let j = 0; j < this.nivells[lvl].totxos[i].length; j++) {
                const puntPosicio = { x: i, y: j };
                const amplada = 20;
                const alcada = 5;
                const character = this.nivells[lvl].totxos[i][j];
                if (character == 'a') {
                    const totxo = new Totxo(puntPosicio, amplada, alcada);
                    totxosArray.push(totxo);
                }
            }
        }
    }
    draw(ctx) {
        //for (int i; i < nivells[])
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