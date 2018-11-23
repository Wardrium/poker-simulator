import { Card } from "./card";

export class Player {
    private Id: number;
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

    public addChips(numberChips: number): void {
        this.numberChips += numberChips;
    }

    public removeChips(numberChips: number): number {
        if (numberChips > this.numberChips) {
            numberChips = this.numberChips;
        }
        this.numberChips -= numberChips;
        return numberChips;
    }
}
