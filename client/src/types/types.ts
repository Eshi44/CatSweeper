// enum allows for defining a set of named constants
export enum SquareValue {
	none,
	one,
	two,
	three,
	four,
	five,
	six,
	seven,
	eight,
	yarn,
}
export enum SquareState {
	hidden,
	visible,
	toy,
}
export type Square = { value: SquareValue; state: SquareState; red?: boolean };

export enum CatFace {
	smile = "🐱",
	weary = "🙀",
	lost = "😿",
	won = "😺",
}