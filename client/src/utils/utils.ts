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

	return squares;
};
