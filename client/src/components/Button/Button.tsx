import React from "react";
import "./Button.scss";
import { SquareState, SquareValue } from "../../types/types";
interface ButtonProps {
	row: number;
	col: number;
	state: SquareState;
	value: SquareValue;
}

const Button: React.FC<ButtonProps> = ({ row, col, state, value }) => {
	const renderContect = (): React.ReactNode => {
		if (state === SquareState.visible) {
			if (value === SquareValue.yarn) {
				return (
					<span role="img" aria-label="yarn">
						🧶
					</span>
				);
			}
		} else if (state === SquareState.toy) {
            return (
                <span role="img" aria-label="yarn">
                    🎣
                </span>
            );
		}
		return null;
	};
	return (
		<div className={`Button ${state === SquareState.visible ? "visible" : ""}`}>
			{renderContect()}
		</div>
	);
};

export default Button;
