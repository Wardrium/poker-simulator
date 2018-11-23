export class Pot {
	private numberChips: number;

	constructor() {
		this.numberChips = 0;
	}

	public addChips(numberChips: number): void {
		this.numberChips += numberChips;
	}

	public removeChips(numberChipsToRemove: number): number {
		let removedChips: number;
	
		if (numberChipsToRemove >= this.numberChips) {
			removedChips = this.numberChips;
		} else {
			removedChips = numberChipsToRemove;
		}
		this.numberChips -= removedChips;
		return removedChips;
	}

	public removeAllChips(): number {
		return this.removeChips(this.numberChips);
	}

	public getChipCount(): number {
		return this.numberChips;
	}
}