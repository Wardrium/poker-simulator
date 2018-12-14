import { Card } from "./card";

export class Board {
    private cards: Card[];

    private maxCards: number;

    constructor(maxCards: number) {
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

    public getCard(cardIndex: number): Card {
        if (cardIndex >= this.cards.length) {
            throw new Error("cardIndex out of bounds.");
        }
        return this.cards[cardIndex];
    }

    public getCards(cardIndicies: number[]): Card[] {
        const cards: Card[] = [];
        for (let i = 0; i < cardIndicies.length; i++) {
            const cardIndex = cardIndicies[i];
            cards.push(this.getCard(cardIndex));
        }
        return cards;
    }
}
