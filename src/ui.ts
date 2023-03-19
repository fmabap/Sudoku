import { board, GRID_SIZE } from "./declarations";
import { Solver } from "./solver";
import Generator from "./generator";

export default class Ui {
    board!: board
    curActionNumber!: number
    solver: Solver
    callBackNewGameStart!: Function;
    generator: Generator;
    constructor(generator: Generator) {
        this.solver = new Solver();
        this.addClickEventDialogNewGameStart();
        this.addClickEventNewGame();
        this.addClickEventResetGame();
        this.addClickEventActionNumber();
        this.addClickEventCells();
        this.addClickEventDelete();
        this.generator = generator;
    }

    public initBoard(board: board) {
        this.board = board;
        this.curActionNumber = 1;
        this.placeOnBoard();
        this.removeColorsFromBord();
        this.setColorOnBoard(this.curActionNumber);
    }
    public placeOnBoard() {
        this.clearBoard();
        for (let rowNo = 0; rowNo < GRID_SIZE; rowNo++) {
            for (let colNo = 0; colNo < GRID_SIZE; colNo++) {

                let value = this.board.rows[rowNo].cols[colNo].value;
                if (value != 0) {
                    let cellName: string = "c" + rowNo.toString() + colNo.toString();
                    let cell = <HTMLDivElement>document.getElementById(cellName);
                    cell.innerText = value.toString();
                    if (this.board.rows[rowNo].cols[colNo].fix === true) {
                        cell.classList.add("fixCell");
                    }
                }
            }
        }
    }

    private clearBoard() {
        for (let rowNo = 0; rowNo < GRID_SIZE; rowNo++) {
            for (let colNo = 0; colNo < GRID_SIZE; colNo++) {
                let cellName: string = "c" + rowNo.toString() + colNo.toString();
                let cell = <HTMLDivElement>document.getElementById(cellName);
                cell.innerText = ""
                cell.classList.remove("fixCell");
            }
        }
    }

    public addClickEventActionNumber() {

        let actionNumber = document.getElementsByClassName("actionNumberSel");

        for (let counter: number = 0; counter < actionNumber.length; counter++) {
            actionNumber.item(counter)?.addEventListener("click", () => { this.clickActionNumber(actionNumber.item(counter)!); });
        }
    }

    public addClickEventDialogNewGameStart() {

        let start = <HTMLDivElement>document.getElementById("dialogNewOk");
        start.addEventListener("click", () => {
            this.clickNewGameStart()
        });

    }

    public addClickEventDelete() {

        let deleteButton = <HTMLDivElement>document.getElementById("delete");
        deleteButton.addEventListener("click", () => {
            this.clickDelete()
        });

    }

    public addClickEventNewGame() {

        let start = <HTMLDivElement>document.getElementById("newGame");
        start.addEventListener("click", () => {
            this.clickNewGame()
        });

    }

    private clickDelete() {
        this.removeColorsFromBord();
        this.curActionNumber = 0;
        for (let rowNo = 0; rowNo < GRID_SIZE; rowNo++) {
            for (let colNo = 0; colNo < GRID_SIZE; colNo++) {

                let value = this.board.rows[rowNo].cols[colNo].value;
                if (value != 0 && this.board.rows[rowNo].cols[colNo].fix === false) {
                    let cellName: string = "c" + rowNo.toString() + colNo.toString();
                    let cell = <HTMLDivElement>document.getElementById(cellName);
                    cell.classList.add("delete");
                }
            }
        }
    }



    private clickNewGame() {
        this.requestNewGameOptions(this.callBackNewGameStart);
    }

    public addClickEventResetGame() {

        let start = <HTMLDivElement>document.getElementById("resetGame");
        start.addEventListener("click", () => {
            this.clickResetGame()
        });

    }

    private clickResetGame() {
        this.generator.resetBoard();
        this.initBoard(this.generator.getBoard());
    }

    public addClickEventCells() {

        let boardCells = document.getElementsByClassName("boardCell");

        for (let counter: number = 0; counter < boardCells.length; counter++) {
            boardCells.item(counter)?.addEventListener("click", () => { this.clickCell(boardCells.item(counter)!); });
        }
    }
    public isSolveableCheckRequired(): boolean {
        let solveCheckBox = <HTMLInputElement>document.getElementById("checkSolveable");
        console.log(solveCheckBox.value);
        return solveCheckBox.checked;
    }


    public clickCell(cell: Element) {
        let rowNo = parseInt(cell.id.substring(1, 2));
        let colNo = parseInt(cell.id.substring(2, 3));
        let divCell = <HTMLDivElement>cell;
        let boardCopy: board = JSON.parse(JSON.stringify(this.board));
        if (this.board.rows[rowNo].cols[colNo].fix === false || this.board.rows[rowNo].cols[colNo].value === this.curActionNumber) {
            if (this.curActionNumber === 0) {
                this.board.rows[rowNo].cols[colNo].value = this.curActionNumber;
                divCell.innerText = "";
                divCell.classList.remove("delete");
                this.setColorOnBoard(this.curActionNumber);
                return;
            }


            boardCopy.rows[rowNo].cols[colNo].value = 0;
            if (this.solver.isValueAllowed(boardCopy, colNo, rowNo, this.curActionNumber)) {

                boardCopy.rows[rowNo].cols[colNo].value = this.curActionNumber;
                if (this.isSolveableCheckRequired() === false || this.solver.solve(boardCopy)) {
                    this.board.rows[rowNo].cols[colNo].value = this.curActionNumber;
                    divCell.innerText = this.curActionNumber.toString();
                    this.setColorOnBoard(this.curActionNumber);
                    if (this.solver.isWon(this.board)) {
                        this.showWon();
                    }
                }
                else {
                    this.toastError("not solveable");
                }

            }
            else {
                this.toastError("not allowed");
            }
        }
        else {
            this.toastError("not allowed");
        }
    }

    private showWon() {
        this.setElementVisible("won");
        setTimeout(() => { this.hideWon() }, 5000);
    }

    private hideWon() {
        this.setElementInvisible("won");
    }
    public clickActionNumber(actionNumber: Element) {

        this.removeColorsFromBord();

        for (let color = 0; color <= GRID_SIZE; color++) {
            let colorName = "colorNumber" + color.toString();

            if (actionNumber.classList.contains(colorName)) {
                this.setColorOnBoard(color)
                break;
            }
        }
    }
    private removeColorsFromBord() {
        let boardCells = document.getElementsByClassName("boardCell");
        for (let color = 1; color <= GRID_SIZE; color++) {
            let colorName = "colorNumber" + color.toString();
            for (let counter: number = 0; counter < boardCells.length; counter++) {
                boardCells.item(counter)?.classList.remove(colorName);
                boardCells.item(counter)?.classList.remove("delete");
            }
        }
    }
    private setColorOnBoard(color: number) {
        this.curActionNumber = color;
        let colorName = "colorNumber" + color.toString();
        for (let rowNo = 0; rowNo < GRID_SIZE; rowNo++) {
            for (let colNo = 0; colNo < GRID_SIZE; colNo++) {

                if (this.board.rows[rowNo].cols[colNo].value === color) {
                    let cellName: string = "c" + rowNo.toString() + colNo.toString();
                    let cell = <HTMLDivElement>document.getElementById(cellName);
                    cell.classList.add(colorName);
                }


            }
        }
    }
    private toastError(error: string, time: number = 1000) {
        let divError = <HTMLDivElement>document.getElementById("error");
        divError.innerText = error;
        this.setElementVisible("error");
        setTimeout(() => { this.hideError() }, time);
    }
    private hideError() {
        this.setElementInvisible("error");
    }
    private setElementInvisible(elementId: string) {
        let element = document.getElementById(elementId);
        if (element?.classList.contains("hidden") !== true) {
            element?.classList.add("hidden");
        }
    }
    private setElementVisible(elementId: string) {
        let element = document.getElementById(elementId);
        element?.classList.remove("hidden");
    }

    public requestNewGameOptions(callback: Function) {
        let dialog = <HTMLDialogElement>document.getElementById("dialogNewGame");
        this.callBackNewGameStart = callback;
        dialog.showModal();
    }

    public getCountNumbers(): number {
        let inputCountNumbers = <HTMLInputElement>document.getElementById("inputCountNumbers");
        return parseInt(inputCountNumbers.value)
    }

    private clickNewGameStart() {
        let dialog = <HTMLDialogElement>document.getElementById("dialogNewGame");
        dialog.close();
        this.callBackNewGameStart();
    }

}
