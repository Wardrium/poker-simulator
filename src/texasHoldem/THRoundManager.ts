import { THPlayerManager } from "./THPlayerManager";
import { THCardManager } from "./THCardManager";
import { ChipTransactionManager } from "../generic/managers/chipTransactionManager";
import { PlayerActionType, PlayerAction } from "../generic/actions/playerAction";
import { Player } from "../generic/entities/player";
import { RequireSmallBlindPostAction, RequireAction, RequireBigBlindPostAction, RequireAntePostAction, RequireActionType } from "../generic/actions/requireAction";

/**
 * Manages a single round of Texas Holdem.
 * A round includes dealing cards to paying out the winner.
 */

 export class THRoundManager {
     private playerManager: THPlayerManager;
     private cardManager: THCardManager;
     private chipTransactionManager: ChipTransactionManager;

    constructor(playerManager: THPlayerManager, cardManager: THCardManager, chipTransactionManager: ChipTransactionManager) {
        this.playerManager = playerManager;
        this.cardManager = cardManager;
        this.chipTransactionManager = chipTransactionManager;
    }

    public playARound(smallBlindAmount: number, bigBlindAmount: number, anteAmount: number): void {
        this.postBlinds(smallBlindAmount, bigBlindAmount, anteAmount);

        this.dealStartingHands();

        if (this.completeRoundOfBettingAndPayoutIfWinnerIsPresent() == true) {
            return;
        }

        this.dealFlop();

        if (this.completeRoundOfBettingAndPayoutIfWinnerIsPresent() == true) {
            return;
        }

        this.dealTurn();

        if (this.completeRoundOfBettingAndPayoutIfWinnerIsPresent() == true) {
            return;
        }

        this.dealRiver();

        if (this.completeRoundOfBettingAndPayoutIfWinnerIsPresent() == true) {
            return;
        }

        this.showdown();
    }

    private postBlinds(smallBlindAmount: number, bigBlindAmount: number, anteAmount: number): void {
        this.postSmallBlinds(smallBlindAmount);
        this.postBigBlinds(bigBlindAmount);
        this.postAnte(anteAmount);
    }
    
    private postSmallBlinds(amount: number): void {
        const requireAction = new RequireSmallBlindPostAction(amount);
        this.fulfillRequireAction(requireAction);
    }

    private postBigBlinds(amount: number): void {
        const requireAction = new RequireBigBlindPostAction(amount);
        this.fulfillRequireAction(requireAction);
    }

    private postAnte(amount: number): void {
        const requireAction = new RequireAntePostAction(amount);
        this.fulfillRequireAction(requireAction);
    }

    private dealStartingHands(): void {

    }

    /**
     * Completes a round of betting and checks if a winner is present.
     * If a winner is present, payout and returns true. Otherwise returns false.
     */
    private completeRoundOfBettingAndPayoutIfWinnerIsPresent(): boolean {
        this.placeBets();
        if (this.getRemainingPlayersInRound() == 1) {
            this.payoutWinner();
    
            return true;
        }
        return false;
    }

    private placeBets(): void {
        let endingBetPlayer = this.playerManager.getActionPlayer();
        this.playerManager.getActionPlayerAction();
        while (this.playerManager.getActionPlayer() !== endingBetPlayer) {
            const actionPlayer = this.playerManager.getActionPlayer();
            const action = this.playerManager.getActionPlayerAction();

            if (action.type === PlayerActionType.AllIn || action.type === PlayerActionType.Raise) {
                endingBetPlayer = actionPlayer;
            }
        }
    }

    private fulfillRequireAction(requireAction: RequireAction): boolean {
        const startingActionPlayer = this.playerManager.getActionPlayer();
        let currentActionPlayer: Player = null;

        while (currentActionPlayer !== startingActionPlayer) {
            const playerAction = this.playerManager.getActionPlayerAction(requireAction);
            const handleActionSuccessful = this.handleActionPlayerAction(this.playerManager.getActionPlayer(), requireAction, playerAction);
            this.playerManager.setNextActionPlayer();

            if (handleActionSuccessful) {
                return true;
            } else {
                currentActionPlayer = this.playerManager.getActionPlayer();
            }
        }

        return false;
    }

    /**
     * Returns true if player action successfully completed the required action, false otherwise.
     */
    private handleActionPlayerAction(actionPlayer: Player, requireAction: RequireAction, playerAction: PlayerAction): boolean {
        switch (requireAction.type) {
            case RequireActionType.Post:
                return this.handleActionPlayerPostAction(actionPlayer, requireAction.amount, playerAction);
            case RequireActionType.Bet:
                return this.handleActionPlayerBetAction(actionPlayer, playerAction);
        }
    }

    private handleActionPlayerPostAction(actionPlayer: Player, requirePostAmount: number, playerAction: PlayerAction): boolean {
        if (playerAction.type === PlayerActionType.Post) {
            return this.chipTransactionManager.moveChipsFromPlayerToPot(actionPlayer, requirePostAmount);
        } else if (playerAction.type === PlayerActionType.DeclinePost) {
            return false;
        } else {
            throw new InvalidPlayerActionResponseError(RequireActionType.Post, playerAction.type);
        }
    }

    private handleActionPlayerBetAction(actionPlayer: Player, playerAction: PlayerAction): boolean {
        return true; //TODO: Implement
    }

    private dealFlop(): void {
        this.cardManager.dealCardOnBoard();
        this.cardManager.dealCardOnBoard();
        this.cardManager.dealCardOnBoard();
    }

    private dealTurn(): void {
        this.cardManager.dealCardOnBoard();
    }
    
    private dealRiver(): void {
        this.cardManager.dealCardOnBoard();
    }

    private declareWinner(): void {

    }

    private payoutWinner(): void {

    }

    private showdown(): void {

    }

    private getRemainingPlayersInRound(): number {
        return 0;
    }
 }

export class InvalidPlayerActionResponseError extends Error {
    constructor(requireActionType: RequireActionType, playerActionType: PlayerActionType) {
        super(`Player action "${playerActionType}" not valid for required action "${requireActionType}"`);
    }
}
