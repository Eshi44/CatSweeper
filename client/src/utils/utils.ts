import { MAX_COLS, MAX_ROWS } from "../constants/constants";
import { SquareValue, SquareState, Square } from "../types/types";

export const generateSquares = (): Square[][] => {
	// array of an array of squares
	const squares: Square[][] = [];

	for (let i = 0; i < MAX_ROWS; i++) {
		squares.push([]);
		for (let y = 0; y < MAX_COLS; y++) {
			squares[i].push({
				value: SquareValue.none,
				state: SquareState.hidden,
			});
		}
	}

	return squares;
};
