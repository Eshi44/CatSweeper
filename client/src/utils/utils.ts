import { MAX_COLS, MAX_ROWS, NO_OF_YARNS } from "../constants/constants";
import { SquareValue, SquareState, Square } from "../types/types";

//generating all 81 squares
export const generateSquares = (): Square[][] => {
	// array of an array of squares
	let squares: Square[][] = [];

	for (let i = 0; i < MAX_ROWS; i++) {
		squares.push([]);
		for (let y = 0; y < MAX_COLS; y++) {
			squares[i].push({
				value: SquareValue.none,
				state: SquareState.visible,  //change default back to hidden
			});
		}
	}

	//random 10 yarns
	let yarns = 0;
	while (yarns < NO_OF_YARNS) {
		const iRandom = Math.floor(Math.random() * MAX_ROWS);
		const yRandom = Math.floor(Math.random() * MAX_COLS);

		const currentSquare = squares[iRandom][yRandom];
		if (currentSquare.value !== SquareValue.yarn) {
			squares = squares.map((i, iIndex) =>
				i.map((square, yIndex) => {
					if (iRandom === iIndex && yRandom === yIndex) {
						return {
							...square,
							value: SquareValue.yarn,
						};
					}
					return square;
				})
            );
            yarns++;
		}
	}

// calculate numbers for each square
for (let iIndex = 0; iIndex < MAX_ROWS; iIndex++) {
	for (let yIndex = 0; yIndex < MAX_COLS; yIndex++) {
		const currentSquare = squares[iIndex][yIndex];
		if (currentSquare.value === SquareValue.yarn) {
			continue;
		}

		// take into account squares with a border
		let numberOfYarns = 0;
		const topLeftYarn = iIndex>0 && yIndex >0 ? squares[iIndex - 1][yIndex -1]: null;
		const topYarn = iIndex>0 ? squares[iIndex - 1][yIndex] :null;
		const topRightYarn = iIndex>0 && yIndex < MAX_COLS - 1 ? squares[iIndex - 1][yIndex +1]: null;
		const leftYarn = iIndex>0 ? squares[iIndex][yIndex - 1] :null;
		const rightYarn = iIndex < MAX_COLS -1 ? squares[iIndex][yIndex + 1]: null;
		const bottomLeftYarn = iIndex < MAX_ROWS - 1 && yIndex > 0 ? squares[iIndex + 1][yIndex -1]: null;
		const bottomYarn =iIndex < MAX_ROWS - 1 ? squares[iIndex + 1][yIndex]: null;
		const bottomRightYarn = iIndex < MAX_ROWS - 1 && yIndex < MAX_COLS -1 ? squares[iIndex +1][yIndex + 1] : null;


		// add up number of yarns



	}
}

	return squares;
};
