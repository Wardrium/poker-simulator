import { Card, CardCode, CardRank, CardSuit } from "./card";

export class Deck {
    private cards: Card[];
    
    constructor() {
        this.reset();
    }

    public reset(): void {
        this.cards = [];
        for (let i = 0; i < 52; i++) {
            this.cards.push(new Card(i as CardCode));
        }
    }

    get numberOfRemainingCards(): number {
        return this.cards.length;
    }

    public dealCards(numberToDeal: number): (Card | null)[] {
        const dealtCards: (Card | null)[] = [];
        for (let i = 0; i < numberToDeal; i++) {
            dealtCards.push(this.dealCard());
        }
        return dealtCards;
    }

    public dealCard(): Card | null {
        if (this.cards.length > 0) {
            const dealIndex = Math.floor(Math.random()* this.cards.length);
            return this.cards.splice(dealIndex, 1)[0];
        } else {
            return null;
        }
    }
}
