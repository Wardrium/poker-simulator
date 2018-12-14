import { THPlayerManager } from "./THPlayerManager";

/**
 * Manages a single round of Texas Holdem.
 * A round includes dealing cards to paying out the winner.
 */

 export class THRoundManager {
     private playerManager: THPlayerManager;

    constructor(playerManager: THPlayerManager) {
        this.playerManager = playerManager;
    }

    public playARound(): void {
        this.postBlinds();

        this.dealStartingHands();

        if (this.completeRoundOfBettingAndPayoutIfWinnerIsPresent() == true) {
            return;
        }

        this.dealFlop();

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

    private postBlinds(): void {

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

    }

    private dealFlop(): void {

    }

    private dealTurn(): void {

    }
    
    private dealRiver(): void {

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