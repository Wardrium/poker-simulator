import { Player } from "../generic/entities/player";
import { PlayerManager } from "../generic/managers/playerManager";
import { PlayerAction, PlayerActionType } from "../generic/actions/playerAction";
import { RequireAction } from "../generic/actions/requireAction";

export class THPlayerManager extends PlayerManager {
	private playersInRound: Player[]; // Players still in the round.

	private dealerIndex: number; // Index of playersInRound.
	private actionPlayerIndex: number; // Player with current action. Index of playersInRound.

	public constructor(maxPlayers: number) {
		super(maxPlayers);
		this.dealerIndex = 0;
	}

	public startNewRound(incrementDealerIndex: boolean = true) {
		if (incrementDealerIndex) {
			this.incrementDealer();
		}
		this.putAllActivePlayersInRound();

		const smallBlindIndex = this.getNextPlayerIndex(this.dealerIndex); // Small blind gets first action.
		this.actionPlayerIndex = smallBlindIndex;
	}

	public setDealerPosition(dealerIndex: number) {
		this.dealerIndex = dealerIndex;
	}

	public getActionPlayer(): Player {
		return this.players[this.actionPlayerIndex];
	}

	public setActionPlayerAsInactiveAndSetNextActionPlayer(): void {
		this.playersInRound.splice(this.actionPlayerIndex, 1);
		if (this.actionPlayerIndex >= this.playersInRound.length) { // If player being removed is last element, then set the new action player to the first player.
			this.actionPlayerIndex = 0;
		}
	}

	public setNextActionPlayer(): void {
		this.actionPlayerIndex = this.getNextPlayerIndex(this.actionPlayerIndex);
	}

	public getActionPlayerAction(requireAction: RequireAction): PlayerAction {
		const actionPlayer = this.getActionPlayer();
		return actionPlayer.makeAction(requireAction);
	}

	private incrementDealer(): void {
		this.dealerIndex = this.getNextPlayerIndex(this.dealerIndex);
	}

	private putAllActivePlayersInRound(): void {
		this.playersInRound = super.getAllActivePlayers();
	}

	private removeActionPlayerFromRound(): void {
		this.playersInRound.splice(this.actionPlayerIndex, 1);
	}

	protected getNextPlayerIndex(playerIndex: number): number {
		return super.getNextPlayerIndex(playerIndex, this.playersInRound);
	}
}
