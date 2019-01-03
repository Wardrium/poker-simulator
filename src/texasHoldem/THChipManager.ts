import { ChipTransactionManager } from "../generic/managers/chipTransactionManager";
import { Player } from "../generic/entities/player";

export class THChipManager extends ChipTransactionManager {
	private smallBlindAmount: number;
	private bigBlindAmount: number;
	private anteAmount: number;

	public constructor(smallBlind: number, bigBlind: number, ante: number = 0) {
		super();
		this.smallBlindAmount = smallBlind;
		this.bigBlindAmount = bigBlind;
		this.anteAmount = this.anteAmount;
	}
}
