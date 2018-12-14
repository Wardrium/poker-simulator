import { Player } from "../generic/entities/player";
import { PlayerManager } from "../generic/managers/playerManager";
import { PlayerAction, Action } from "../generic/actions/action";

export class THPlayerManager extends PlayerManager {
	private dealerIndex: number;

	// Players still in the round, in order of action. Active player is the first index in this array.
	private playersInRoundIndices: number[];

	public constructor(maxPlayers: number) {
		super(maxPlayers);
		this.dealerIndex = 0;
	}

	public startNewRound(incrementDealerIndex: boolean = true) {
		if (incrementDealerIndex) {
			this.dealerIndex = super.getNextPlayerIndex(this.dealerIndex);
		}
		this.putAllActivePlayersInStartingWithSmallBlind();
	}

	private putAllActivePlayersInStartingWithSmallBlind() {
		const smallBlindPosition = super.getNextPlayerIndex(this.dealerIndex);
		this.playersInRoundIndices = super.getActivePlayers(smallBlindPosition);
	}

	public setDealerPosition(dealerIndex: number) {
		this.dealerIndex = dealerIndex;
	}

	public getActionPlayer(): Player {
		const actionPlayerIndex = this.playersInRoundIndices[0];
		return this.players[actionPlayerIndex];
	}

	public completeActionPlayerAction(): PlayerAction {
		const playerAction = this.getActionPlayerAction();

		const playerStillInRound = (playerAction.action !== Action.Fold)
		this.setActivePlayer(playerStillInRound);

		return playerAction;
	}

	private getActionPlayerAction(): PlayerAction {
		const actionPlayer = this.getActionPlayer();
		return actionPlayer.makeAction();
	}

	/**
	 * Moves the active player in playerInRoundIndices to the end if player still in round.
	 * Otherwise removes the active player altogether.
	 */
	private setActivePlayer(playerStillInRound: boolean): void {
		const removedPlayerIndex = this.playersInRoundIndices.splice(0, 1)[0];

		if (playerStillInRound) {
			this.playersInRoundIndices.push(removedPlayerIndex);
		}
	}
}
