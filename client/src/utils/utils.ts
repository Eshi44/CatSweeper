import { MAX_COLS, MAX_ROWS, NO_OF_YARNS } from "../constants/constants";
import { SquareValue, SquareState, Square } from "../types/types";

const getAllNextDoorSquares = (
	squares: Square[][],
	rowParam: number,
	colParam: number
): {
	topLeftYarn: Square | null;
	topYarn: Square | null;
	topRightYarn: Square | null;
	leftYarn: Square | null;
	rightYarn: Square | null;
	bottomLeftYarn: Square | null;
	bottomYarn: Square | null;
	bottomRightYarn: Square | null;
} => {
	const topLeftYarn =
		rowParam > 0 && colParam > 0 ? squares[rowParam - 1][colParam - 1] : null;
	const topYarn = rowParam > 0 ? squares[rowParam - 1][colParam] : null;
	const topRightYarn =
		rowParam > 0 && colParam < MAX_COLS - 1
			? squares[rowParam - 1][colParam + 1]
			: null;
	const leftYarn = rowParam > 0 ? squares[rowParam][colParam - 1] : null;
	const rightYarn =
		rowParam < MAX_COLS - 1 ? squares[rowParam][colParam + 1] : null;
	const bottomLeftYarn =
		rowParam < MAX_ROWS - 1 && colParam > 0
			? squares[rowParam + 1][colParam - 1]
			: null;
	const bottomYarn =
		rowParam < MAX_ROWS - 1 ? squares[rowParam + 1][colParam] : null;
	const bottomRightYarn =
		rowParam < MAX_ROWS - 1 && colParam < MAX_COLS - 1
			? squares[rowParam + 1][colParam + 1]
			: null;

	return {
		topLeftYarn: topLeftYarn,
		topYarn: topYarn,
		topRightYarn: topRightYarn,
		leftYarn: leftYarn,
		rightYarn: rightYarn,
		bottomLeftYarn: bottomLeftYarn,
		bottomYarn: bottomYarn,
		bottomRightYarn: bottomRightYarn,
	};
};

//generating all 81 squares
export const generateSquares = (): Square[][] => {
	// array of an array of squares
	let squares: Square[][] = [];

	for (let i = 0; i < MAX_ROWS; i++) {
		squares.push([]);
		for (let y = 0; y < MAX_COLS; y++) {
			squares[i].push({
				value: SquareValue.none,
				state: SquareState.hidden, //change default back to hidden
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
			const {
				topLeftYarn,
				topYarn,
				topRightYarn,
				leftYarn,
				rightYarn,
				bottomLeftYarn,
				bottomYarn,
				bottomRightYarn,
			} = getAllNextDoorSquares(squares, iIndex, yIndex);

			// add up number of yarns

			if (topLeftYarn && topLeftYarn.value === SquareValue.yarn) {
				numberOfYarns++;
			}
			if (topYarn && topYarn.value === SquareValue.yarn) {
				numberOfYarns++;
			}
			if (topRightYarn && topRightYarn.value === SquareValue.yarn) {
				numberOfYarns++;
			}
			if (leftYarn && leftYarn.value === SquareValue.yarn) {
				numberOfYarns++;
			}
			if (rightYarn && rightYarn.value === SquareValue.yarn) {
				numberOfYarns++;
			}
			if (bottomLeftYarn && bottomLeftYarn.value === SquareValue.yarn) {
				numberOfYarns++;
			}
			if (bottomYarn && bottomYarn.value === SquareValue.yarn) {
				numberOfYarns++;
			}
			if (bottomRightYarn && bottomRightYarn.value === SquareValue.yarn) {
				numberOfYarns++;
			}

			if (numberOfYarns > 0) {
				squares[iIndex][yIndex] = {
					...currentSquare,
					value: numberOfYarns,
				};
			}
		}
	}

	return squares;
};

export const openManySquares = (
	squares: Square[][],
	rowParam: number,
	colParam: number
): Square[][] => {
	let newSquares = squares.slice();

	// calling openManySquares if hidden
	newSquares[rowParam][colParam].state = SquareState.visible;

	const {
		topLeftYarn,
		topYarn,
		topRightYarn,
		leftYarn,
		rightYarn,
		bottomLeftYarn,
		bottomYarn,
		bottomRightYarn,
	} = getAllNextDoorSquares(squares, rowParam, colParam);

	// after we unhide square
	if (
		topLeftYarn?.state === SquareState.hidden &&
		topLeftYarn.value !== SquareValue.yarn
	) {
		if (topLeftYarn.value === SquareValue.none) {
			newSquares = openManySquares(newSquares, rowParam - 1, colParam - 1);
		} else {
			newSquares[rowParam - 1][colParam - 1].state = SquareState.visible;
		}
	}

	if (
		topYarn?.state === SquareState.hidden &&
		topYarn.value !== SquareValue.yarn
	) {
		if (topYarn.value === SquareValue.none) {
			newSquares = openManySquares(newSquares, rowParam - 1, colParam);
		} else {
			newSquares[rowParam - 1][colParam].state = SquareState.visible;
		}
	}

	if (
		topRightYarn?.state === SquareState.hidden &&
		topRightYarn.value !== SquareValue.yarn
	) {
		if (topRightYarn.value === SquareValue.none) {
			newSquares = openManySquares(newSquares, rowParam - 1, colParam + 1);
		} else {
			newSquares[rowParam - 1][colParam + 1].state = SquareState.visible;
		}
	}

	if (
		leftYarn?.state === SquareState.hidden &&
		leftYarn.value !== SquareValue.yarn
	) {
		if (leftYarn.value === SquareValue.none) {
			newSquares = openManySquares(newSquares, rowParam, colParam - 1);
		} else {
			newSquares[rowParam][colParam - 1].state = SquareState.visible;
		}
	}

	if (
		rightYarn?.state === SquareState.hidden &&
		rightYarn.value !== SquareValue.yarn
	) {
		if (rightYarn.value === SquareValue.none) {
			newSquares = openManySquares(newSquares, rowParam, colParam + 1);
		} else {
			newSquares[rowParam][colParam + 1].state = SquareState.visible;
		}
	}

	if (
		bottomLeftYarn?.state === SquareState.hidden &&
		bottomLeftYarn.value !== SquareValue.yarn
	) {
		if (bottomLeftYarn.value === SquareValue.none) {
			newSquares = openManySquares(newSquares, rowParam + 1, colParam - 1);
		} else {
			newSquares[rowParam + 1][colParam - 1].state = SquareState.visible;
		}
	}

	if (
		bottomYarn?.state === SquareState.hidden &&
		bottomYarn.value !== SquareValue.yarn
	) {
		if (bottomYarn.value === SquareValue.none) {
			newSquares = openManySquares(newSquares, rowParam + 1, colParam);
		} else {
			newSquares[rowParam + 1][colParam].state = SquareState.visible;
		}
	}
	
	if (
		bottomRightYarn?.state === SquareState.hidden &&
		bottomRightYarn.value !== SquareValue.yarn
	) {
		if (bottomRightYarn.value === SquareValue.none) {
			newSquares = openManySquares(newSquares, rowParam + 1, colParam + 1);
		} else {
			newSquares[rowParam + 1][colParam + 1].state = SquareState.visible;
		}
	}

		return newSquares;
	
};
