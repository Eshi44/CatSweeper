import React from "react";
import "./Button.scss";
import { SquareState, SquareValue } from "../../types/types";
interface ButtonProps {
	row: number;
	col: number;
	state: SquareState;
	value: SquareValue;
	// generic void function that takes in any amount of arguments and returns void
	onClick(rowParam: number, colParam: number): (...args: any[]) => void;
}

const Button: React.FC<ButtonProps> = ({ row, col, onClick, state, value }) => {
	const renderContect = (): React.ReactNode => {
		if (state === SquareState.visible) {
			if (value === SquareValue.yarn) {
				return (
					<span role="img" aria-label="yarn">
						🧶
					</span>
				);
			} else if (value === SquareValue.none) {
				return null;
			}
			return value;
		} else if (state === SquareState.toy) {
			return (
				<span role="img" aria-label="toy">
					🎣
				</span>
			);
		}
		return null;
	};
	return (
		<div
			className={`Button ${
				state === SquareState.visible ? "visible" : ""
			} value-${value}`}
			onClick={onClick(row, col)}
		>
			{renderContect()}
		</div>
	);
};

export default Button;
