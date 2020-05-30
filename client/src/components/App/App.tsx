import React, {useEffect, useState} from "react";
import "./App.scss";
import NumberDisplay from "../NumberDisplay/NumberDisplay";
import {generateSquares} from "../../utils/utils";
import Button from "../Button/Button";
import {CatFace} from "../../types/types";

const App: React.FC = () => {

const[squares, setSquares] = useState(generateSquares());
const [Catface, setCatFace] = useState(CatFace.smile);


useEffect(() => {

	const handleMouseDown = () => {
		setCatFace(CatFace.weary);
	};

	const handleMouseUp = () =>{
		setCatFace(CatFace.smile);
	}
window.addEventListener("mousedown", handleMouseDown );
window.addEventListener("mouseup", handleMouseUp);

return () =>
window.removeEventListener("mousedown", handleMouseDown );
window.removeEventListener("mouseup", handleMouseUp);

}, []);

// console.log("squares", squares);
// console.log("squares", squares);
const renderSquares = (): React.ReactNode => {
	return squares.map((row, rowIndex) => row.map((square, colIndex)=>
	<Button key={`${rowIndex}-${colIndex}`} state={square.state} value={square.value} row={rowIndex} col={colIndex}/>));
};

	return (
		<div className="App">
			<div className="Header">
				<NumberDisplay value={0} />
	<div className="CatFace"><span role="img" aria-label="cat face">{Catface}</span></div>
				<NumberDisplay value={50} />
			</div>
	<div className="Body">{renderSquares()}</div>
		</div>
	);
};
export default App;
