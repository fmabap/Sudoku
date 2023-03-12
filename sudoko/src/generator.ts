import { board, row, col, BOX_SIZE, GRID_SIZE } from "./declarations";
import { Solver } from "./solver";

export default class Generator {

    private board: board = { rows: [] };

    public getBoard(): board {
        return this.board;
    }

    private createInitialBoard() {
        for (let rowNo = 0; rowNo < GRID_SIZE; rowNo++) {
            let row: row = { rowNo: rowNo, cols: [] }
            for (let colNo = 0; colNo < GRID_SIZE; colNo++) {
                let col: col = { colNo: colNo, value: 0 };
                row.cols.push(col);
            }
            this.board.rows.push(row);
        }
    }

    public generateSudoko() {
        while (true) {
            this.createInitialBoard();
            this.fillBoxes();
            const solver = new Solver();

            if (solver.solve(this.board) === true) {
                break;
            }
        }
    }

    private fillBoxes() {
        this.generateBox(0, 0, this.board);
        this.generateBox(3, 3, this.board);
        this.generateBox(6, 6, this.board);
        console.log(this.board);
        this.printBoard();
    }

    private generateBox(startRow: number, startCol: number, board: board) {
        const values = this.getRandomArray();
        let indexRow: number = startRow;
        let indexCol: number = startCol;
        let index: number = 0;

        values.forEach(value => {
            board.rows[indexRow].cols[indexCol].value = value
            indexCol = indexCol + 1;
            index = index + 1;
            if (index % BOX_SIZE === 0) {
                indexRow = indexRow + 1;
                indexCol = startCol;
            }
        });
    }

    private getRandomArray(): number[] {
        let values: number[] = [];
        for (let value = 1; value <= GRID_SIZE; value++) {
            values.push(value);
        }

        return this.shuffleArray(values);
    }

    private shuffleArray(array: number[]) {
        let currentIndex = array.length, randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex != 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    }
    public printBoard() {
        let rows: string[] = [];
        let rowStr: string = "";
        let helpLine: string = "_";
        for (let index = 1; index <= GRID_SIZE; index++) {
            helpLine = helpLine + "_";
            if (index % BOX_SIZE === 0) {
                helpLine = helpLine + "_"
            }
        }

        this.board.rows.forEach(row => {
            rowStr = "";
            row.cols.forEach(col => {
                if (col.colNo % BOX_SIZE === 0) {
                    rowStr = rowStr + '|';
                }
                rowStr = rowStr + col.value.toString();
            })
            rowStr = rowStr + "|";
            if (row.rowNo % BOX_SIZE === 0) {
                rows.push(helpLine);
            }
            rows.push(rowStr);

        });
        rows.push(helpLine);
        rows.forEach(row => {
            console.log(row);
        });

    }
}


