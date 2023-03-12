import { board, row, col, BOX_SIZE, GRID_SIZE } from "./declarations";

export default class Ui {
    board: board
    constructor(board: board) {
        this.board = board;
    }
    public placeOnBoard() {
        for (let rowNo = 0; rowNo < GRID_SIZE; rowNo++) {
            for (let colNo = 0; colNo < GRID_SIZE; colNo++) {
                let value = this.board.rows[rowNo].cols[colNo].value
                {
                    let cellName: string = "c" + rowNo.toString() + colNo.toString();
                    let style = "colorNumber" + this.board.rows[rowNo].cols[colNo].value.toString();
                    let cell = <HTMLDivElement>document.getElementById(cellName);
                    cell.innerHTML = value.toString();
                    cell.classList.add(style);
                }
            }
        }
    }
}