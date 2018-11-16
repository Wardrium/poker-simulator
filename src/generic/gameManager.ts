import { Card } from "./entities/card";
import { Player } from "./entities/player";
import { Board } from "./entities/board";
import { Deck } from "./entities/deck";

export abstract class GameManager {
    protected players: Player[];
    protected board: Board;
    protected deck: Deck;

    constructor(numberPlayers: number) {
        for (let i = 0; i < numberPlayers; i++) {
            this.players.push(new Player());
        }
    }

    get numberPlayers() {
        return this.players.length;
    }

    protected abstract startNewRound(): void;
    protected abstract clearPlayerHand(playerIndex: number): void;
    protected abstract dealStartingHandToPlayer(playerIndex: number): void;
}
