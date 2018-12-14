import { Pot } from "../entities/pot";
import { Player } from "../entities/player";

export abstract class ChipManager {
	protected pot: Pot;

	constructor() {
		this.pot = new Pot();
	}

	protected moveChipsFromPlayerToPot(player: Player, numberChips: number): void {
		const removedChips = player.removeChips(numberChips);
		this.pot.addChips(removedChips);
	}

	protected moveChipsFromPotToPlayer(player: Player, numberChips: number): void {
		const removedChips = this.pot.removeChips(numberChips);
		player.addChips(removedChips);
	}

	protected moveAllChipsFromPotToPlayer(player: Player): void {
		const removedChips = this.pot.removeAllChips();
		player.addChips(removedChips);
	}
}