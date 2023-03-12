import { GRID_SIZE } from "./declarations";
import Generator from "./generator";
import Ui from "./ui";

const generator = new Generator();
const ui = new Ui(generator);
ui.requestCountNumbers(showBoard);


function showBoard() {
    generator.generateSudoko();
    generator.printBoard();
    generator.reduceBoard((GRID_SIZE * GRID_SIZE) - ui.getCountNumbers());
    ui.initBoard(generator.getBoard());
    ui.placeOnBoard();

}
