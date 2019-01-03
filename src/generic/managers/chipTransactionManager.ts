import { Pot } from "../entities/pot";
import { Player } from "../entities/player";

export class ChipTransactionManager {
	protected pot: Pot;

	constructor() {
		this.pot = new Pot();
	}

	/**
	 * Returns true if player has enough chips and moves the chips.
	 * Otherwise returns false and no chips are moved.
	 */
	public moveChipsFromPlayerToPot(player: Player, numberChips: number): boolean {
		if (player.removeChipsIfEnough(numberChips)) {
			this.pot.addChips(numberChips);
			return true;
		}
		return false;
	}

	/**
	 * Moves all chips from the player to the pot.
	 * Returns the number of chips moved.
	 */
	public moveAllChipsFromPlayerToPot(player: Player): number {
		const removedChips = player.removeAllChips();
		this.pot.addChips(removedChips);
		return removedChips;
	}

	/**
	 * Returns true if pot has enough chips and moves the chips.
	 * Otherwise returns false and no chips are moved.
	 */
	public moveChipsFromPotToPlayer(player: Player, numberChips: number): boolean {
		if (this.pot.removeChips(numberChips)) {
			player.addChips(numberChips);
			return true;
		}
		return false;
	}

	/**
	 * Moves all chips from the pot to the player.
	 * Returns the number of chips moved.
	 */
	public moveAllChipsFromPotToPlayer(player: Player): number {
		const removedChips = this.pot.removeAllChips();
		player.addChips(removedChips);
		return removedChips;
	}
}