import { expect } from "chai";
import { Card, CardSuit, CardRank } from "../src/generic/entities/card";

describe("Card", () => {
    describe("creation with card code", () => {
        it("should represent the Two of Spades", () => {
            const card = new Card(0);
            expect(card.suit).to.equal(CardSuit.Spade);
            expect(card.rank).to.equal(CardRank.Two);
        });
        
        it("should represent the Ace of Spades", () => {
            const card = new Card(12);
            expect(card.suit).to.equal(CardSuit.Spade);
            expect(card.rank).to.equal(CardRank.Ace);
        });
    
        it("should represent the Two of Hearts", () => {
            const card = new Card(13);
            expect(card.suit).to.equal(CardSuit.Heart);
            expect(card.rank).to.equal(CardRank.Two);
        });
    
        it("should represent the Ace of Hearts", () => {
            const card = new Card(25);
            expect(card.suit).to.equal(CardSuit.Heart);
            expect(card.rank).to.equal(CardRank.Ace);
        });
        
        it("should represent the Two of Diamonds", () => {
            const card = new Card(26);
            expect(card.suit).to.equal(CardSuit.Diamond);
            expect(card.rank).to.equal(CardRank.Two);
        });
    
        it("should represent the Ace of Diamonds", () => {
            const card = new Card(38);
            expect(card.suit).to.equal(CardSuit.Diamond);
            expect(card.rank).to.equal(CardRank.Ace);
        });
    
        it("should represent the Two of Clubs", () => {
            const card = new Card(39);
            expect(card.suit).to.equal(CardSuit.Club);
            expect(card.rank).to.equal(CardRank.Two);
        });
    
        it("should represent the Ace of Clubs", () => {
            const card = new Card(51);
            expect(card.suit).to.equal(CardSuit.Club);
            expect(card.rank).to.equal(CardRank.Ace);
        });
    
        it("should show the two cards are equal", () => {
            const card1 = new Card(25);
            const card2 = new Card(25);
    
            expect(card1.isEqualTo(card2)).to.equal(true);
        });
    
        it("should have a display string of 2 of Spades", () => {
            const card = new Card(0);
    
            expect(card.displayString).to.equal("2 of Spades");
        });
    
        it("should have a display string of 10 of Spades", () => {
            const card = new Card(8);
    
            expect(card.displayString).to.equal("10 of Spades");
        });
    
        it("should have a display string of Ace of Spades", () => {
            const card = new Card(12);
    
            expect(card.displayString).to.equal("Ace of Spades");
        });
    
        it("should have a display string of Jack of Hearts", () => {
            const card = new Card(22);
    
            expect(card.displayString).to.equal("Jack of Hearts");
        });
    
        it("should have a display string of Queen of Diamonds", () => {
            const card = new Card(36);
    
            expect(card.displayString).to.equal("Queen of Diamonds");
        });
    
        it("should have a display string of King of Clubs", () => {
            const card = new Card(50);
    
            expect(card.displayString).to.equal("King of Clubs");
        });
    });
 
    describe("creation from rank and suit", () => {
        it("should represent the Two of Hearts", () => {
            const card = Card.createWithSuitAndRank(CardSuit.Heart, CardRank.Two);

            expect(card.suit).to.equal(CardSuit.Heart);
            expect(card.rank).to.equal(CardRank.Two);
        });

        it("should represent the Five of Spades", () => {
            const card = Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Five);
            
            expect(card.suit).to.equal(CardSuit.Spade);
            expect(card.rank).to.equal(CardRank.Five);
        });

        it("should represent the Ace of Clubs", () => {
            const card = Card.createWithSuitAndRank(CardSuit.Club, CardRank.Ace);

            expect(card.suit).to.equal(CardSuit.Club);
            expect(card.rank).to.equal(CardRank.Ace);
        });

        it("should represent the King of Diamonds", () => {
            const card = Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.King);

            expect(card.suit).to.equal(CardSuit.Diamond);
            expect(card.rank).to.equal(CardRank.King);
        });
    });
});
