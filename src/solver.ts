import { board, BOX_SIZE, GRID_SIZE } from "./declarations";

export class Solver {

    public solve(board: board): boolean {
        let valueSet: boolean = true;
        let freeCell: cell | undefined;
        let cells: cell[] = [];
        while (true) {

            if (valueSet === true) {
                freeCell = this.getNextFreeCell(board);
                if (freeCell === undefined) {
                    // all Cells on board set sudoku solved
                    break;
                }
            }

            this.setNextAllowedValue(board, freeCell!);
            if (freeCell!.value != 0) {
                // Set Value on board
                board.rows[freeCell!.rowNo].cols[freeCell!.colNo].value = freeCell!.value;
                cells.push(freeCell!);
                valueSet = true;
            }
            else {
                // No allowed value found
                if (cells.length === 0) {
                    // no valid sudoku
                    console.log("Sudoku not valid");
                    return false;
                }
                // Reset last cell and check it again with next allowed value
                freeCell = cells.pop();
                board.rows[freeCell!.rowNo].cols[freeCell!.colNo].value = 0;
                valueSet = false;
            }
        }
        console.log("Sudoku valid");
        return true;
    }

    private getNextFreeCell(board: board): cell | undefined {
        for (let rowNo = 0; rowNo < GRID_SIZE; rowNo++) {
            for (let colNo = 0; colNo < GRID_SIZE; colNo++) {
                if (board.rows[rowNo].cols[colNo].value === 0) {
                    return { rowNo: rowNo, colNo: colNo, value: 0 };
                }
            }
        }
        return undefined;
    }

    private setNextAllowedValue(board: board, cell: cell) {
        for (let value = cell.value + 1; value <= GRID_SIZE; value++) {
            if (this.isValueAllowed(board, cell.colNo, cell.rowNo, value)) {
                cell.value = value;
                return;
            }
        }
        cell.value = 0;
    }

    private hasRowValue(board: board, rowNo: number, value: number): boolean {
        let found: boolean = false;
        board.rows[rowNo].cols.every(col => {
            if (col.value === value) {
                found = true;
                return false;
            }
            return true;
        })
        return found;
    }

    private hasColValue(board: board, colNo: number, value: number): boolean {
        let found: boolean = false;
        board.rows.every(row => {
            if (row.cols[colNo].value === value) {
                found = true;
                return false;
            }
            return true;
        })
        return found;
    }

    private hasBoxValue(board: board, colNo: number, rowNo: number, value: number): boolean {
        let boxStartRowNo = rowNo - rowNo % BOX_SIZE;
        let boxStartColNo = colNo - colNo % BOX_SIZE;
        let curRowNo = boxStartRowNo - 1;
        let curColNo = boxStartColNo;

        for (let index = 0; index < GRID_SIZE; index++) {
            if (index % BOX_SIZE === 0) {
                curRowNo = curRowNo + 1;
                curColNo = boxStartColNo;
            }
            if (board.rows[curRowNo].cols[curColNo].value === value) {
                return true;
            }
            curColNo = curColNo + 1;
        }
        return false;
    }

    public isValueAllowed(board: board, colNo: number, rowNo: number, value: number) {
        if (!this.hasRowValue(board, rowNo, value) && !this.hasColValue(board, colNo, value) && !this.hasBoxValue(board, colNo, rowNo,
            value)) {
            return true;
        }
        else
            return false;
    }

    public isWon(board: board): boolean {
        for (let rowNo = 0; rowNo < GRID_SIZE; rowNo++) {
            for (let colNo = 0; colNo < GRID_SIZE; colNo++) {
                if (board.rows[rowNo].cols[colNo].value === 0) {
                    return false;
                }
            }
        }
        return true;
    }
}
interface cell {
    rowNo: number,
    colNo: number,
    value: number
}