import { GameManager } from "../generic/managers/gameManager";
import { THGameSettings } from "./THGameSettings";
import { THChipManager } from "./THChipManager";
import { THPlayerManager } from "./THPlayerManager";
import { THCardManager } from "./THCardManager";
import { THRoundManager } from "./THRoundManager";

const BOARD_SIZE = 5;

export class THGameManager extends GameManager {
    private roundManager: THRoundManager;
    private playerManager: THPlayerManager;
	private cardManager: THCardManager;
    private chipManager: THChipManager;

    private smallBlindAmount: number;
    private bigBlindAmount: number;
    private anteAmount: number;

    constructor(settings: THGameSettings) {
        super();
        this.roundManager = new THRoundManager(this.playerManager, this.cardManager, this.chipManager);
        this.playerManager = new THPlayerManager(settings.maxPlayers);
        this.cardManager = new THCardManager(BOARD_SIZE);
        this.chipManager = new THChipManager(settings.smallBlindAmount, settings.bigBlindAmount, settings.anteAmount);

        this.smallBlindAmount = settings.smallBlindAmount;
        this.bigBlindAmount = settings.bigBlindAmount;
        this.anteAmount = settings.anteAmount | 0;
    }

    public startGame(): void {
        this.setDealerStartingPosition();

        while (this.continueAnotherRound()) {
            this.roundManager.playARound(this.smallBlindAmount, this.bigBlindAmount, this.anteAmount);
        }
    }

    private setDealerStartingPosition(): void {
        // TODO: Implement random
        const dealerStartingPosition = 0;
        this.playerManager.setDealerPosition(dealerStartingPosition);
    }

    private continueAnotherRound(): boolean {
        // TODO: Implement whether another round should be played.
        return true;
    }
}
