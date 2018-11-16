import { Card } from "./card";

export class Player {
    private ID: number;
    private numberChips: number;
    private hand: Card[];

    constructor(numberChips: number = 0) {
        this.numberChips = numberChips;
    }

    public addCardToHand(card: Card): void {
        this.hand.push(card);
    }

    public clearHand(): void {
        this.hand = [];
    }
}
