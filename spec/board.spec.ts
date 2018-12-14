import { expect } from "chai";
import { Board } from "../src/generic/entities/board";

describe("Board", () => {
	let board: Board;

	beforeEach(() => {
		board = new Board(5);
	});

	it("should initialize as an empty board", () => {
		expect(board.getBoard().length).to.equal(0);
	});
});