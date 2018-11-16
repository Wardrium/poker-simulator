import { GameManager } from "../generic/gameManager";
import { Board } from "../generic/entities/board";
import { Card } from "../generic/entities/card";
import { Deck } from "../generic/entities/deck";

enum GameState {
    Start,
    FlopDealt,
    RiverDealt,
    TurnDealt,
}

export class TexasHoldemGameManager extends GameManager {
    constructor(numberPlayers: number) {
        super(numberPlayers);
        this.board = new Board();
        this.deck = new Deck();
    }

    protected startNewRound(): void {
        for (let i = 0; i < this.numberPlayers; i++) {
            this.clearPlayerHand(i);
            this.dealStartingHandToPlayer(i);
        }
    }

    protected clearPlayerHand(playerIndex: number): void {
        this.players[playerIndex].clearHand();
    }

    protected dealStartingHandToPlayer(playerIndex: number): void {
        this.dealCardToPlayer(playerIndex);
        this.dealCardToPlayer(playerIndex);
    }

    protected dealCardToPlayer(playerIndex: number): void {
        const dealtCard = this.deck.dealCard();
        this.players[playerIndex].addCardToHand(dealtCard);
    }

    private dealFlop(): void {
        const FLOP_DEAL_SIZE = 3;
        this.board.addCards(this.deck.dealCards(FLOP_DEAL_SIZE));
    }

    private dealTurn(): void {
        this.board.addCard(this.deck.dealCard());
    }

    private dealRiver(): void {
        this.board.addCard(this.deck.dealCard());
    }
}
