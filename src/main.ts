import { GRID_SIZE } from "./declarations";
import Generator from "./generator";
import Ui from "./ui";

testConv();
const generator = new Generator();
const ui = new Ui(generator);
ui.requestNewGameOptions(showBoard);

function testConv() {
    let bla: string = "";
    let valueStr: string = "";
    for (let idx = 0; idx < 82; idx++) {
        let value = Math.floor(Math.random() * GRID_SIZE);
        valueStr = valueStr + value.toString();
        bla = bla + String.fromCodePoint(value + 65);
    }

    let base64: string = btoa(bla);
    console.log(valueStr);
    console.log(bla);
    console.log(base64);
    let res = atob(base64);
    console.log(res);
    let numStr: string = "";
    let char: string;
    for (let idx = 0; idx < 82; idx++) {
        char = bla.substring(idx, idx + 1);
        numStr = numStr + (char.charCodeAt(0) - 65).toString();
        //    bla = bla + String.fromCharCode(value + 65);

    }
    console.log(numStr);

}

function showBoard() {
    generator.generateSudoku();
    generator.printBoard();
    generator.reduceBoard((GRID_SIZE * GRID_SIZE) - ui.getCountNumbers());
    ui.initBoard(generator.getBoard());
}
