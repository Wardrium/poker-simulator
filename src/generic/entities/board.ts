import { Card } from "./card";

export class Board {
    private cards: Card[];

    private maxCards: number;

    constructor(maxCards: number = 5) {
        this.maxCards = maxCards;
        this.cards = [];
    }

    public reset(): void {
        this.cards = [];
    }

    public addCards(cards: Card[]): void {
        if (this.cards.length + cards.length <= this.maxCards){
            this.cards.concat(cards);
        } else {
            throw new Error(`Cannot add cards, will exceed max cards of {this.MAX_CARDS}`);
        }
    }

    public addCard(card: Card): void {
        this.addCards([card]);
    }

    public getBoard(): Card[] {
        return this.cards;
    }

    public getFlop(): Card[] | null {
        if (this.cards.length >= 3) {
            return this.cards.slice(0, 3);
        } else {
            return null;
        }
    }

    public getTurn(): Card | null {
        if (this.cards.length >= 4) {
            return this.cards[4];
        } else {
            return null;
        }
    }

    public getRiver(): Card | null {
        if (this.cards.length === 5) {
            return this.cards[5];
        } else {
            return null;
        }
    }
}
