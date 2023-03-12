import Generator from "./generator";
import Ui from "./ui";

const generator = new Generator();
generator.generateSudoko();
generator.printBoard();

const ui = new Ui(generator.getBoard());
ui.placeOnBoard();

