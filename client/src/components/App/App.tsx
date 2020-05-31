import React, { useEffect, useState } from "react";
import "./App.scss";
import NumberDisplay from "../NumberDisplay/NumberDisplay";
import { generateSquares, openManySquares } from "../../utils/utils";
import Button from "../Button/Button";
import { CatFace, Square, SquareState, SquareValue } from "../../types/types";
import {MAX_ROWS, MAX_COLS} from "../../constants/constants";

const App: React.FC = () => {
	const [squares, setSquares] = useState<Square[][]>(generateSquares());
	const [Catface, setCatFace] = useState<CatFace>(CatFace.smile);
	const [time, setTime] = useState<number>(0);
	const [running, setRunning] = useState<boolean>(false);
	const [yarnCounter, setYarnCounter] = useState<number>(10);
	const [loser, setLoser] = useState<boolean>(false);
	const [winner, setWinner] = useState<boolean>(false);

	useEffect(() => {
		const handleMouseDown = () => {
			setCatFace(CatFace.weary);
		};

		const handleMouseUp = () => {
			setCatFace(CatFace.smile);
		};
		window.addEventListener("mousedown", handleMouseDown);
		window.addEventListener("mouseup", handleMouseUp);

		return () => window.removeEventListener("mousedown", handleMouseDown);
		window.removeEventListener("mouseup", handleMouseUp);
	}, []);

	// useEffect will open happen in running state changes
	useEffect(() => {
		if (running && time < 999) {
			const timer = setInterval(() => {
				setTime(time + 1);
			}, 1000);

			return () => {
				clearInterval(timer);
			};
		}
	}, [running, time]);

	useEffect(() => {
		if (loser) {
			setCatFace(CatFace.lost);
			setRunning(false);
		}
	}, [loser]);

	useEffect(()=>{
		if(winner) {
			setRunning(false);
			setCatFace(CatFace.won);
		}
	}, [winner])

	const handleSquareClick = (
		rowParam: number,
		colParam: number
	) => (): void => {
		// console.log(rowParam, colParam);
		
	
		let newSquares = squares.slice();
		// starting the game
		if (!running) {
				
				let isYarn = newSquares[rowParam][colParam].value === SquareValue.yarn;
				while (isYarn) {
					newSquares = generateSquares();
					if (newSquares[rowParam][colParam].value !== SquareValue.yarn) {
						isYarn = false;
						break;
					}
				}
			setRunning(true);
		}
		const currentSquare = newSquares[rowParam][colParam];


		if (
			currentSquare.state === SquareState.toy ||
			currentSquare.state === SquareState.visible
		) {
			return;
		}

		if (currentSquare.value === SquareValue.yarn) {
			// if click on yarn
			setLoser(true);
			newSquares[rowParam][colParam].red = true;
			newSquares =revealYarns();
			setSquares(newSquares);
			return;
		} else if (currentSquare.value === SquareValue.none) {
			newSquares = openManySquares(newSquares, rowParam, colParam);
		} else {
			newSquares[rowParam][colParam].state = SquareState.visible;
		}

		// check to see if user won - check that there are no more available spaces to click(squares without yarns)
		let availableSquaresExist =false;
		for (let row=0;row< MAX_ROWS; row++) {
			for (let col=0; col< MAX_COLS; col++) {
				// check
				const currentSquare = newSquares[row][col];
				if (currentSquare.value !== SquareValue.yarn && currentSquare.state === SquareState.hidden) {
					availableSquaresExist = true;
					break;
				}
			}
		}

		if(!availableSquaresExist) {
			newSquares = newSquares.map (row => row.map(square => {
				if(square.value === SquareValue.yarn) {
					return {
						...square,
						state: SquareState.toy
					}
				}
				return square;
			}))
			setWinner(true);
		}
		setSquares(newSquares);
	
	};

	const handleSquareContext = (rowParam: number, colParam: number) => (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>
	): void => {
		e.preventDefault();
		// console.log("right click is working!");

		// can only place a toy when game is running
		if (!running) {
			return;
		}

		const currentSquares = squares.slice();
		const currentSquare = squares[rowParam][colParam];

		if (currentSquare.state === SquareState.visible) {
			return;
		} else if (currentSquare.state === SquareState.hidden) {
			currentSquares[rowParam][colParam].state = SquareState.toy;
			setSquares(currentSquares);
			setYarnCounter(yarnCounter - 1);
		} else if (currentSquare.state === SquareState.toy) {
			currentSquares[rowParam][colParam].state = SquareState.hidden;
			setSquares(currentSquares);
			setYarnCounter(yarnCounter + 1);
		}
	};

	const handleCatFaceClick = (): void => {

			setRunning(false);
			setTime(0);
			setSquares(generateSquares());
			setLoser(false);
			setWinner(false);
			setYarnCounter(10);
		
	};

	// console.log("squares", squares);
	// console.log("squares", squares);
	const renderSquares = (): React.ReactNode => {
		return squares.map((row, rowIndex) =>
			row.map((square, colIndex) => (
				<Button
					key={`${rowIndex}-${colIndex}`}
					state={square.state}
					onClick={handleSquareClick}
					onContext={handleSquareContext}
					value={square.value}
					row={rowIndex}
					red={square.red}
					col={colIndex}
				/>
			))
		);
	};

	// show yarns in lost
	const revealYarns = (): Square[][] => {
		const currentSquares = squares.slice();
		// loop through each element and if its yarn make it visible
		return currentSquares.map((row) =>
			row.map((square) => {
				if (square.value === SquareValue.yarn) {
					return {
						...square,
						state: SquareState.visible,
					};
				}
				return square;
			})
		);
	};

	return (
		<div className="App">
			<div className="Header">
				<NumberDisplay value={yarnCounter} />
				<div className="CatFace" onClick={handleCatFaceClick}>
					<span role="img" aria-label="cat face">
						{Catface}
					</span>
				</div>
				<NumberDisplay value={time} />
			</div>
			<div className="Body">{renderSquares()}</div>
		</div>
	);
};
export default App;
