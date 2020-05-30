import React, { useEffect, useState } from "react";
import "./App.scss";
import NumberDisplay from "../NumberDisplay/NumberDisplay";
import { generateSquares } from "../../utils/utils";
import Button from "../Button/Button";
import { CatFace, Square } from "../../types/types";

const App: React.FC = () => {
	const [squares, setSquares] = useState<Square[][]>(generateSquares());
	const [Catface, setCatFace] = useState<CatFace>(CatFace.smile);
	const [time, setTime] = useState<number>(0);
	const [running, setRunning] = useState<boolean>(false);

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
		if(running) {
			const timer= setInterval(()=>{
				setTime(time +1);
			}, 1000);

			return () => {
			clearInterval(timer);
		};
	}
	}, [running, time]);

	const handleSquareClick = (rowParam: number, colParam: number) => (): void => {
		// console.log(rowParam, colParam);
		// starting the game
		if(!running)
		setRunning(true);
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
				<NumberDisplay value={0} />
				<div className="CatFace">
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
