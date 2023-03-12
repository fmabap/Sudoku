export interface col {
    colNo: number,
    value: number
}

export interface row {
    rowNo: number,
    cols: col[]
}

export interface board {
    rows: row[]
}

export const GRID_SIZE: number = 9;
export const BOX_SIZE: number = 3;