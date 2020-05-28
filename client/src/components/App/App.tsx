import React from "react";
import "./App.scss";
import NumberDisplay from "../NumberDisplay/NumberDisplay";

const App: React.FC = () => {
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
