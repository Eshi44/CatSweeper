import React, {useState} from "react";
import "./App.scss";
import NumberDisplay from "../NumberDisplay/NumberDisplay";
import {generateSquares} from "../../utils/utils";

const App: React.FC = () => {

const[squares, setSquares] = useState(generateSquares());

console.log("squares", squares);

	return (
		<div className="App">
			<div className="Header">
				<NumberDisplay value={0} />
				<div className="CatFace"><span role="img" aria-label="cat face">🐱</span></div>
				<NumberDisplay value={50} />
			</div>
			<div className="Body">Body</div>
		</div>
	);
};
export default App;
