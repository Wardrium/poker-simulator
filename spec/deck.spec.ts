import { expect } from "chai";
import { Deck } from "../src/generic/entities/deck";

describe("Deck", () => {
    let deck: Deck;
    
    beforeEach(() => {
        deck = new Deck;
    });

    it("should start out with 52 cards", () => {
        expect(deck.numberOfRemainingCards).to.equal(52);
    });

    it("should deal all 52 cards", () => {
        deal52CardsFromDeckAndVerifyDealt(deck);
    });

    it("should return null when no more cards left", () => {
        deal52CardsFromDeck(deck);
        expect(deck.dealCard()).to.equal(null);
    });

    it("should deal all 52 cards to the deck after resetting it", () => {
        deal52CardsFromDeck(deck);
        deck.reset();
        deal52CardsFromDeckAndVerifyDealt(deck);
    });
});

function deal52CardsFromDeckAndVerifyDealt(deck: Deck) {
    const dealtCards: boolean[] = [];
    for (let i = 0; i < 52; i++) {
        dealtCards[i] = false;
    }

    for (let i = 0; i < 52; i++) {
        const dealtCardCode = deck.dealCard().code;
        dealtCards[dealtCardCode] = true;
    }

    for (let i = 0; i < 52; i++) {
        expect(dealtCards[i]).to.equal(true);
    }
};

function deal52CardsFromDeck(deck: Deck) {
    for (let i = 0; i < 52; i++) {
        deck.dealCard();
    }
}
