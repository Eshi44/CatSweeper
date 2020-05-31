import React, { useEffect, useState } from "react";
import "./App.scss";
import NumberDisplay from "../NumberDisplay/NumberDisplay";
import { generateSquares, openManySquares } from "../../utils/utils";
import Button from "../Button/Button";
import { CatFace, Square, SquareState, SquareValue } from "../../types/types";

const App: React.FC = () => {
	const [squares, setSquares] = useState<Square[][]>(generateSquares());
	const [Catface, setCatFace] = useState<CatFace>(CatFace.smile);
	const [time, setTime] = useState<number>(0);
	const [running, setRunning] = useState<boolean>(false);
	const [yarnCounter, setYarnCounter] = useState<number>(10);
	const [loser, setLoser] = useState<boolean>(false);

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
	useEffect(()=>{
		if(running && time <999) {
			const timer= setInterval(()=>{
				setTime(time +1);
			}, 1000);

			return () => {
			clearInterval(timer);
		};
	}
	}, [running, time]);

	useEffect(()=> {
		if(loser) {
			setCatFace(CatFace.lost);
			setRunning(false);
		}
	}, [loser]);

	const handleSquareClick = (rowParam: number, colParam: number) => (): void => {
		// console.log(rowParam, colParam);
		// starting the game
		if(!running) {
		setRunning(true);
		}
		const currentSquare = squares[rowParam][colParam];
		let newSquares = squares.slice();

		if (currentSquare.state === SquareState.toy || currentSquare.state === SquareState.visible) {
			return;
		}

		if (currentSquare.value === SquareValue.yarn) {
			// if click on yarn
			setLoser(true);

		} else if (currentSquare.value === SquareValue.none) {

			newSquares = openManySquares(newSquares, rowParam, colParam);
			setSquares(newSquares);

		} else {
			newSquares[rowParam][colParam].state = SquareState.visible;
			setSquares(newSquares);
		}
	};


	const handleSquareContext = (rowParam: number, colParam: number) => (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
		e.preventDefault();
		// console.log("right click is working!");

		// can only place a toy when game is running
		if(!running) {
			return;
		}

		const currentSquares = squares.slice();
		const currentSquare =squares[rowParam][colParam];

		if (currentSquare.state === SquareState.visible) {
			return;
		} else if (currentSquare.state === SquareState.hidden) {
			currentSquares[rowParam][colParam].state = SquareState.toy;
			setSquares(currentSquares);
			setYarnCounter(yarnCounter -1);
		} else if (currentSquare.state === SquareState.toy) {
			currentSquares[rowParam][colParam].state = SquareState.hidden;
			setSquares(currentSquares);
			setYarnCounter(yarnCounter +1);

		}

	};

	const handleCatFaceClick = (): void => {
		if(running) {
			setRunning(false);
			setTime(0);
			setSquares(generateSquares());
			setLoser(false);
		}
	};

	// console.log("squares", squares);
	// console.log("squares", squares);
	const renderSquares = (): React.ReactNode => {
		return squares.map((row, rowIndex) =>
			row.map((square, colIndex) => (
				<Button
					key={`${rowIndex}-${colIndex}`}
					state={square.state}
					onClick = {handleSquareClick}
					onContext = {handleSquareContext}
					value={square.value}
					row={rowIndex}
					col={colIndex}
				/>
			))
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
