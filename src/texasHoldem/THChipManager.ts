import { Player } from "../generic/entities/player";
import { ChipManager } from "../generic/managers/chipManager";

export class THChipManager extends ChipManager {
	private smallBlindAmount: number;
	private bigBlindAmount: number;
	private anteAmount: number;

	public constructor(smallBlind: number, bigBlind: number, ante: number = 0) {
		super();
		this.smallBlindAmount = smallBlind;
		this.bigBlindAmount = bigBlind;
		this.anteAmount = this.anteAmount;
	}

	public postBlinds(dealerPosition: number) {
		
	}
}
