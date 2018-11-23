import { expect } from "chai";
import { Pot } from "../src/generic/entities/pot";

describe ("Pot", () => {
	let pot: Pot;

	beforeEach(() => {
		pot = new Pot();
	});

	it("should start off with 0 chips", () => {
		expect(pot.getChipCount()).to.equal(0);
	});

	it("should add 10 for total of 10 chips", () => {
		pot.addChips(10);
		expect(pot.getChipCount()).to.equal(10);
	});

	it("should add 10 then remove 6 for total of 4", () => {
		pot.addChips(10);
		pot.removeChips(6);
		expect(pot.getChipCount()).to.equal(4);
	});

	it("should add 10 then try to remove 11 but ony remove 10", () => {
		pot.addChips(10);
		const chipsRemoved = pot.removeChips(11);
		expect(chipsRemoved).to.equal(10);
		expect(pot.getChipCount()).to.equal(0);
	});

	it("shoud add 10 then remove them all", () => {
		pot.addChips(10);
		expect(pot.removeAllChips()).to.equal(10);
		expect(pot.getChipCount()).to.equal(0);
	});
});