import { board, GRID_SIZE } from "./declarations";
import { Solver } from "./solver";
import Generator from "./generator";
import { Timer } from "./timer";
export default class Ui {
    board!: board
    curActionNumber!: number
    solver: Solver
    callBackNewGameStart!: Function;
    generator: Generator;
    errNotSolveable: string;
    errNotAllowed: string;
    timer: Timer;
    errors: number;
    isBoardInit: boolean;
    countInitialNumbers: number;

    constructor(generator: Generator, timer: Timer) {
        this.solver = new Solver();
        this.generator = generator;
        this.isBoardInit = false;
        this.errNotSolveable = "Not solveable";
        this.errNotAllowed = "Not allowed"
        this.addClickEvents();
        this.setText();
        this.timer = timer;
        this.errors = 0;
        this.timer.reset();
        this.countInitialNumbers = 0;
        this.showTimeValue();
        this.showErrorCount();
        this.shownCountInitialNumbers();
    }

    private addClickEvents() {
        this.addClickEventNewGame();
        this.addClickEventResetGame();
        this.addClickEventActionNumber();
        this.addClickEventCells();
        this.addClickEventDelete();
        this.addClickEventToHeader();
        this.addClickEventDialogNewGameStart();
        this.addClickEventDialogNewGameCancel();
        this.addClickEventBreak();
        this.addClickEventContinue();
    }

    public initBoard(board: board) {
        this.board = board;
        this.curActionNumber = 1;
        this.placeOnBoard();
        this.removeColorsFromBord();
        this.markActionsDone();
        this.curActionNumber = this.setFreeActionNumber();
        this.setColorOnBoard(this.curActionNumber);
        this.errors = 0;
        this.timer.reset();
        this.timer.start();
        this.showTime();
        this.showErrorCount();
        this.isBoardInit = true;
    }

    private showTime() {
        if (this.timer.isRunning()) {
            this.showTimeValue();
            setTimeout(this.showTime.bind(this), 1000);
        }
    }

    private showTimeValue() {
        const divTime = <HTMLDivElement>document.getElementById("time");
        divTime.innerText = this.getTimeLabel() + this.timer.getRunTime();
    }

    private showErrorCount() {
        const divTime = <HTMLDivElement>document.getElementById("errors");
        divTime.innerText = this.getErrorsLabel() + this.errors;

    }

    private shownCountInitialNumbers() {
        const divTime = <HTMLDivElement>document.getElementById("countInitialNumbers");

        divTime.innerText = this.getCountInitialNumbersLabel() + this.countInitialNumbers;

    }

    private setFreeActionNumber(): number {
        let actionNumber = document.getElementsByClassName("actionNumberSel");

        for (let counter: number = 0; counter < actionNumber.length; counter++) {
            if (!actionNumber.item(counter)?.classList.contains("actionNumberDone")) {
                return counter + 1;
            }
        }
        return 1;
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

    public addClickEventToHeader() {

        let header = <HTMLDivElement>document.getElementById("header");
        header.addEventListener("click", async () => { this.clickOnHeader(); });


    }

    private clickOnHeader() {
        window.location.href = "https://github.com/fmabap/sudoku";
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
            this.clickNewGameStart();
        });

    }

    public addClickEventDialogNewGameCancel() {

        let start = <HTMLDivElement>document.getElementById("dialogNewCancel");
        start.addEventListener("click", () => {
            this.clickNewGameCancel();
        });

    }




    public addClickEventBreak() {
        let breakButton = <HTMLDivElement>document.getElementById("break");
        breakButton.addEventListener("click", () => {
            this.showBreakDialog();
        });
    }

    public addClickEventContinue() {
        let continueButton = <HTMLDivElement>document.getElementById("continue");
        continueButton.addEventListener("click", () => {
            this.hideBreakDialog();
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
        this.timer.stop();
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
                this.markActionsDone();
                if (!this.timer.isRunning()) {
                    this.timer.start();
                    this.showTime();
                }
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
                    this.toastError(this.errNotSolveable);
                }

            }
            else {
                this.toastError(this.errNotAllowed);
            }
        }
        else {
            this.toastError(this.errNotAllowed);
        }
        this.markActionsDone();
    }

    private markActionsDone() {
        const valueCountArray = this.solver.getValueCount(this.board);
        valueCountArray.forEach((valueCount, index) => {
            if (index > 0) {
                let actionNumber = "actionNumber" + index;
                let actionNumberDiv = <HTMLDivElement>document.getElementById(actionNumber);
                if (valueCount.count === GRID_SIZE) {
                    actionNumberDiv.classList.add("actionNumberDone");
                } else {
                    actionNumberDiv.classList.remove("actionNumberDone");
                }
            }
        })
    }

    private showWon() {
        this.timer.stop();
        this.setElementVisible("won");
        setTimeout(() => { this.hideWon() }, 5000);
    }

    private hideWon() {
        this.setElementInvisible("won");
    }

    private showBreakDialog() {
        this.timer.stop();
        let dialog = <HTMLDialogElement>document.getElementById("dialogBreak");
        dialog.showModal();
    }

    private hideBreakDialog() {
        let dialog = <HTMLDialogElement>document.getElementById("dialogBreak");
        if (this.solver.isWon(this.board)) {
            dialog.close();
        }
        else {
            dialog.close();
            this.timer.start();
            this.showTime();
        }
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
        this.errors = this.errors + 1;
        this.showErrorCount();
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
        let cancelButton = <HTMLDivElement>document.getElementById("dialogNewCancel");
        let dialogNewToolbar = <HTMLDivElement>document.getElementById("dialogNewToolbar");
        if (this.isBoardInit) {
            cancelButton.classList.remove("hidden");
            dialogNewToolbar.classList.add("dialogNewToolbar2");
            dialogNewToolbar.classList.remove("dialogNewToolbar1");
        }
        else {
            cancelButton.classList.add("hidden");
            dialogNewToolbar.classList.remove("dialogNewToolbar2");
            dialogNewToolbar.classList.add("dialogNewToolbar1");
        }
        this.callBackNewGameStart = callback;
        dialog.showModal();
    }

    public getCountNumbers(): number {
        let inputCountNumbers = <HTMLInputElement>document.getElementById("inputCountNumbers");
        return parseInt(inputCountNumbers.value)
    }

    private clickNewGameStart() {
        let dialog = <HTMLDialogElement>document.getElementById("dialogNewGame");
        this.countInitialNumbers = this.getCountNumbers();
        this.shownCountInitialNumbers();
        dialog.close();
        this.callBackNewGameStart();
    }
    private clickNewGameCancel() {
        let dialog = <HTMLDialogElement>document.getElementById("dialogNewGame");
        if (this.solver.isWon(this.board)) {
            dialog.close();
        }
        else {
            dialog.close();
            this.timer.start();
            this.showTime();
        }
    }


    private setText() {
        let newGameHeadLine = <HTMLHeadingElement>document.getElementById("newGameHeadLine")
        let labelCountNumbers = <HTMLLabelElement>document.getElementById("labelCountNumbers");
        let labelCheckSolveable = <HTMLLabelElement>document.getElementById("labelCheckSolveable");
        let dialogNewOk = <HTMLDivElement>document.getElementById("dialogNewOk");
        let dialogNewCancel = <HTMLDivElement>document.getElementById("dialogNewCancel");
        let deleteButton = <HTMLDivElement>document.getElementById("delete");
        let resetGame = <HTMLDivElement>document.getElementById("resetGame");
        let newGame = <HTMLDivElement>document.getElementById("newGame");
        let breakButton = <HTMLDivElement>document.getElementById("break");
        let won = <HTMLDivElement>document.getElementById("won");
        let continueButton = <HTMLDivElement>document.getElementById("continue");
        let breakHeadLine = <HTMLHeadingElement>document.getElementById("breakHeadLine");


        if (navigator.language.indexOf("de") > -1) {
            newGameHeadLine.innerText = "Neues Spiel";
            labelCountNumbers.innerText = "Anzahl Zahlen: ";
            labelCheckSolveable.innerText = "Lösbarkeit überprüfen: ";
            dialogNewOk.innerText = "Spiel starten";
            dialogNewCancel.innerText = "Abbrechen";
            deleteButton.innerText = "Entf.";
            resetGame.innerText = "Reset";
            newGame.innerHTML = "Neues Spiel";
            won.innerHTML = "Du hast gewonnen"
            breakButton.innerText = "Pause";
            breakHeadLine.innerText = "Pause";
            this.errNotSolveable = "Nicht lösbar";
            this.errNotAllowed = "Nicht erlaubt";
            continueButton.innerHTML = "Weiter";

        }
    }
    private getTimeLabel() {
        if (navigator.language.indexOf("de") > -1) {
            return "Zeit: "
        }
        else {
            return "Time: "
        }
    }

    private getErrorsLabel() {
        if (navigator.language.indexOf("de") > -1) {
            return "Fehler: "
        }
        else {
            return "Errors: "
        }
    }

    private getCountInitialNumbersLabel() {
        if (navigator.language.indexOf("de") > -1) {
            return "Anz. Nr. : "
        }
        else {
            return "Count No. : "
        }
    }
}
