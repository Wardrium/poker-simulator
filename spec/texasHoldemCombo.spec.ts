import { expect } from "chai";
import { Card, CardSuit, CardRank } from "../src/generic/entities/card";
import { HandCombo, HandComboType } from "../src/texasHoldem/THHoldemCombo";

interface ExpectedHandCombo {
	comboType: HandComboType;
	comboCards: Card[];
	kickers: Card[];
}

function comboCardsMatchExpectedRank(comboCards: Card[], expectedCards: Card[]): boolean {
	return comboCardsMatchExpected(comboCards, expectedCards, false);
}

function comboCardsMatchExpectedRankAndSuit(comboCards: Card[], expectedCards: Card[]): boolean {
	return comboCardsMatchExpected(comboCards, expectedCards, true);
}

function comboCardsMatchExpected(comboCards: Card[], expectedCards: Card[], checkSuit: boolean): boolean {
	if (comboCards.length !== expectedCards.length) {
		return false;
	}

	for (let i = 0; i < expectedCards.length; i++) {
		const expectedCard = expectedCards[i];

		if (!isExpectedCardInComboCards(expectedCard, comboCards, checkSuit)) {
			return false;
		}
	}

	return true;
}

function isExpectedCardInComboCards(expectedCard: Card, comboCards: Card[], checkSuit: boolean): boolean {
	for (let i = 0; i < comboCards.length; i++) {
		const comboCard = comboCards[i];

		let rankMatch = false;
		if (comboCard.rank === expectedCard.rank) {
			rankMatch = true;
		}

		let suitMatch = true;
		if (checkSuit && comboCard.suit !== expectedCard.suit) {
			suitMatch = false;
		}

		if (rankMatch && suitMatch) {
			return true;
		}
	}

	return false;
}

describe("Texas Holdem Hand Combos", () => {
	let cards: Card[];
	let handCombo: HandCombo;
	let expectedHandCombo: ExpectedHandCombo;

	describe("Straight Flush", () => {
		describe("with only necessary cards", () => {
			describe("10 - Ace", () => {
				before(() => {
					cards = [
						Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Ace),
						Card.createWithSuitAndRank(CardSuit.Spade, CardRank.King),
						Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Queen),
						Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Jack),
						Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Ten),
					];
					handCombo = new HandCombo(cards);

					expectedHandCombo = {
						comboType: HandComboType.StraightFlush,
						comboCards: cards,
						kickers: [],
					};
				});

				it(`should classify the combo type`, () => {
					expect(handCombo.comboType).to.equal(expectedHandCombo.comboType);
				});
			
				it("should set the combo cards", () => {
					expect(comboCardsMatchExpectedRankAndSuit(handCombo.comboCards, expectedHandCombo.comboCards)).to.equal(true);
				});
			
				it("should set the kickers", () => {
					expect(comboCardsMatchExpectedRank(handCombo.kickers, expectedHandCombo.kickers)).to.equal(true);
				});
			});

			describe("Ace - 5", () => {
				before(() => {
					cards = [
						Card.createWithSuitAndRank(CardSuit.Heart, CardRank.Ace),
						Card.createWithSuitAndRank(CardSuit.Heart, CardRank.Two),
						Card.createWithSuitAndRank(CardSuit.Heart, CardRank.Three),
						Card.createWithSuitAndRank(CardSuit.Heart, CardRank.Four),
						Card.createWithSuitAndRank(CardSuit.Heart, CardRank.Five),
					];
					handCombo = new HandCombo(cards);

					expectedHandCombo = {
						comboType: HandComboType.StraightFlush,
						comboCards: cards,
						kickers: [],
					};
				});
	
				it(`should classify the combo type`, () => {
					expect(handCombo.comboType).to.equal(expectedHandCombo.comboType);
				});
			
				it("should set the combo cards", () => {
					expect(comboCardsMatchExpectedRankAndSuit(handCombo.comboCards, expectedHandCombo.comboCards)).to.equal(true);
				});
			
				it("should set the kickers", () => {
					expect(comboCardsMatchExpectedRank(handCombo.kickers, expectedHandCombo.kickers)).to.equal(true);
				});
			});

			describe("5 - 9 unordered", () => {
				before(() => {
					cards = [
						Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Eight),
						Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Six),
						Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Five),
						Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Nine),
						Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Seven),
					];
					handCombo = new HandCombo(cards);

					expectedHandCombo = {
						comboType: HandComboType.StraightFlush,
						comboCards: cards,
						kickers: [],
					};
				});
	
				it(`should classify the combo type`, () => {
					expect(handCombo.comboType).to.equal(expectedHandCombo.comboType);
				});
			
				it("should set the combo cards", () => {
					expect(comboCardsMatchExpectedRankAndSuit(handCombo.comboCards, expectedHandCombo.comboCards)).to.equal(true);
				});
			
				it("should set the kickers", () => {
					expect(comboCardsMatchExpectedRank(handCombo.kickers, expectedHandCombo.kickers)).to.equal(true);
				});
			});
		});

		describe("with extra cards", () => {
			describe("9 - King unordered", () => {
				before(() => {
					cards = [
						Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Two),
						Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Jack),
						Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Queen),
						Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Nine),
						Card.createWithSuitAndRank(CardSuit.Heart, CardRank.Nine),
						Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Ten),
						Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.King),
					];
					handCombo = new HandCombo(cards);

					expectedHandCombo = {
						comboType: HandComboType.StraightFlush,
						comboCards: [
							Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Nine),
							Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Ten),
							Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Jack),
							Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Queen),
							Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.King),
						],
						kickers: [],
					}
				});

				it(`should classify the combo type`, () => {
					expect(handCombo.comboType).to.equal(expectedHandCombo.comboType);
				});
			
				it("should set the combo cards", () => {
					expect(comboCardsMatchExpectedRankAndSuit(handCombo.comboCards, expectedHandCombo.comboCards)).to.equal(true);
				});
			
				it("should set the kickers", () => {
					expect(comboCardsMatchExpectedRank(handCombo.kickers, expectedHandCombo.kickers)).to.equal(true);
				});
			});

			describe("Ace - 5 with extra cards forming a triple", () => {
				before(() => {
					cards = [
						Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Ace),
						Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Ace),
						Card.createWithSuitAndRank(CardSuit.Heart, CardRank.Ace),
						Card.createWithSuitAndRank(CardSuit.Heart, CardRank.Two),
						Card.createWithSuitAndRank(CardSuit.Heart, CardRank.Three),
						Card.createWithSuitAndRank(CardSuit.Heart, CardRank.Four),
						Card.createWithSuitAndRank(CardSuit.Heart, CardRank.Five),
					];
					handCombo = new HandCombo(cards);

					expectedHandCombo = {
						comboType: HandComboType.StraightFlush,
						comboCards: [
							Card.createWithSuitAndRank(CardSuit.Heart, CardRank.Ace),
							Card.createWithSuitAndRank(CardSuit.Heart, CardRank.Two),
							Card.createWithSuitAndRank(CardSuit.Heart, CardRank.Three),
							Card.createWithSuitAndRank(CardSuit.Heart, CardRank.Four),
							Card.createWithSuitAndRank(CardSuit.Heart, CardRank.Five),
						],
						kickers: [],
					};
				});


				it(`should classify the combo type`, () => {
					expect(handCombo.comboType).to.equal(expectedHandCombo.comboType);
				});
			
				it("should set the combo cards", () => {
					expect(comboCardsMatchExpectedRankAndSuit(handCombo.comboCards, expectedHandCombo.comboCards)).to.equal(true);
				});
			
				it("should set the kickers", () => {
					expect(comboCardsMatchExpectedRank(handCombo.kickers, expectedHandCombo.kickers)).to.equal(true);
				});
			});
		});
	});

	describe("Quad", () => {
		describe("with only the necessary cards", () => {
			describe("Quad Kings", () => {
				before(() => {
					cards = [
						Card.createWithSuitAndRank(CardSuit.Spade, CardRank.King),
						Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.King),
						Card.createWithSuitAndRank(CardSuit.Heart, CardRank.King),
						Card.createWithSuitAndRank(CardSuit.Club, CardRank.King),
					];
					handCombo = new HandCombo(cards);
	
					expectedHandCombo = {
						comboType: HandComboType.Quad,
						comboCards: cards,
						kickers: [],
					};
				});
	
				it(`should classify the combo type`, () => {
					expect(handCombo.comboType).to.equal(expectedHandCombo.comboType);
				});
			
				it("should set the combo cards", () => {
					
					expect(comboCardsMatchExpectedRankAndSuit(handCombo.comboCards, expectedHandCombo.comboCards)).to.equal(true);
				});
			
				it("should set the kickers", () => {
					
					expect(comboCardsMatchExpectedRank(handCombo.kickers, expectedHandCombo.kickers)).to.equal(true);
				});
			});
		});

		describe("with extra cards", () => {
			describe("Quad Aces with King kicker", () => {
				before(() => {
					cards = [
						Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Ace),
						Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Ace),
						Card.createWithSuitAndRank(CardSuit.Heart, CardRank.Ace),
						Card.createWithSuitAndRank(CardSuit.Club, CardRank.Ace),
						Card.createWithSuitAndRank(CardSuit.Club, CardRank.Queen),
						Card.createWithSuitAndRank(CardSuit.Club, CardRank.King),
					];
					handCombo = new HandCombo(cards);
	
					expectedHandCombo = {
						comboType: HandComboType.Quad,
						comboCards: cards.slice(0, 4),
						kickers: [Card.createWithSuitAndRank(CardSuit.Club, CardRank.King)],
					};
				});
	
				it(`should classify the combo type`, () => {
					expect(handCombo.comboType).to.equal(expectedHandCombo.comboType);
				});
			
				it("should set the combo cards", () => {
					expect(comboCardsMatchExpectedRankAndSuit(handCombo.comboCards, expectedHandCombo.comboCards)).to.equal(true);
				});
			
				it("should set the kickers", () => {
					expect(comboCardsMatchExpectedRank(handCombo.kickers, expectedHandCombo.kickers)).to.equal(true);
				});
			});

			describe("Quad Jacks with three Queens", () => {
				before(() => {
					cards = [
						Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Jack),
						Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Jack),
						Card.createWithSuitAndRank(CardSuit.Heart, CardRank.Jack),
						Card.createWithSuitAndRank(CardSuit.Club, CardRank.Jack),
						Card.createWithSuitAndRank(CardSuit.Club, CardRank.Queen),
						Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Queen),
						Card.createWithSuitAndRank(CardSuit.Heart, CardRank.Queen),
					];
					handCombo = new HandCombo(cards);
	
					expectedHandCombo = {
						comboType: HandComboType.Quad,
						comboCards: cards.slice(0, 4),
						kickers: [Card.createWithSuitAndRank(CardSuit.Club, CardRank.Queen)],
					};
				});
	
				it(`should classify the combo type`, () => {
					expect(handCombo.comboType).to.equal(expectedHandCombo.comboType);
				});
			
				it("should set the combo cards", () => {
					expect(comboCardsMatchExpectedRankAndSuit(handCombo.comboCards, expectedHandCombo.comboCards)).to.equal(true);
				});
			
				it("should set the kickers", () => {
					expect(comboCardsMatchExpectedRank(handCombo.kickers, expectedHandCombo.kickers)).to.equal(true);
				});
			});
		});
	});

	describe("Full House", () => {
		describe("with only the necessary cards", () => {
			describe("Kings full of Queens", () => {
				before(() => {
					cards = [
						Card.createWithSuitAndRank(CardSuit.Spade, CardRank.King),
						Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.King),
						Card.createWithSuitAndRank(CardSuit.Heart, CardRank.King),
						Card.createWithSuitAndRank(CardSuit.Club, CardRank.Queen),
						Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Queen),
					];
					handCombo = new HandCombo(cards);
	
					expectedHandCombo = {
						comboType: HandComboType.FullHouse,
						comboCards: cards,
						kickers: [],
					};
				});
	
				it(`should classify the combo type`, () => {
					expect(handCombo.comboType).to.equal(expectedHandCombo.comboType);
				});
			
				it("should set the combo cards", () => {
					expect(comboCardsMatchExpectedRankAndSuit(handCombo.comboCards, expectedHandCombo.comboCards)).to.equal(true);
				});
			
				it("should set the kickers", () => {
					expect(comboCardsMatchExpectedRank(handCombo.kickers, expectedHandCombo.kickers)).to.equal(true);
				});
			});

			describe("Kings full of Aces", () => {
				before(() => {
					cards = [
						Card.createWithSuitAndRank(CardSuit.Spade, CardRank.King),
						Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.King),
						Card.createWithSuitAndRank(CardSuit.Heart, CardRank.King),
						Card.createWithSuitAndRank(CardSuit.Club, CardRank.Ace),
						Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Ace),
					];
					handCombo = new HandCombo(cards);
	
					expectedHandCombo = {
						comboType: HandComboType.FullHouse,
						comboCards: cards,
						kickers: [],
					};
				});
	
				it(`should classify the combo type`, () => {
					expect(handCombo.comboType).to.equal(expectedHandCombo.comboType);
				});
			
				it("should set the combo cards", () => {
					expect(comboCardsMatchExpectedRankAndSuit(handCombo.comboCards, expectedHandCombo.comboCards)).to.equal(true);
				});
			
				it("should set the kickers", () => {
					expect(comboCardsMatchExpectedRank(handCombo.kickers, expectedHandCombo.kickers)).to.equal(true);
				});
			});
		});

		describe("with extra cards", () => {
			describe("Queens full of Jacks with extra third Jack", () => {
				before(() => {
					cards = [
						Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Queen),
						Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Queen),
						Card.createWithSuitAndRank(CardSuit.Heart, CardRank.Queen),
						Card.createWithSuitAndRank(CardSuit.Club, CardRank.Jack),
						Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Jack),
						Card.createWithSuitAndRank(CardSuit.Club, CardRank.Jack),
					];
					handCombo = new HandCombo(cards);
	
					expectedHandCombo = {
						comboType: HandComboType.FullHouse,
						comboCards: cards.slice(0, 5),
						kickers: [],
					};
				});
	
				it(`should classify the combo type`, () => {
					expect(handCombo.comboType).to.equal(expectedHandCombo.comboType);
				});
			
				it("should set the combo cards", () => {
					expect(comboCardsMatchExpectedRankAndSuit(handCombo.comboCards, expectedHandCombo.comboCards)).to.equal(true);
				});
			
				it("should set the kickers", () => {
					expect(comboCardsMatchExpectedRank(handCombo.kickers, expectedHandCombo.kickers)).to.equal(true);
				});
			});
		});
	});

	describe("Flush", () => {
		describe("with only the necessary cards", () => {
			describe("2 5 9 10 Ace", () => {
				before(() => {
					cards = [
						Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Two),
						Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Five),
						Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Nine),
						Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Ten),
						Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Ace),
					];
					handCombo = new HandCombo(cards);
	
					expectedHandCombo = {
						comboType: HandComboType.Flush,
						comboCards: cards,
						kickers: [],
					};
				});
	
				it(`should classify the combo type`, () => {
					expect(handCombo.comboType).to.equal(expectedHandCombo.comboType);
				});
			
				it("should set the combo cards", () => {
					expect(comboCardsMatchExpectedRankAndSuit(handCombo.comboCards, expectedHandCombo.comboCards)).to.equal(true);
				});
			
				it("should set the kickers", () => {
					expect(comboCardsMatchExpectedRank(handCombo.kickers, expectedHandCombo.kickers)).to.equal(true);
				});
			});
		});

		describe("with extra cards", () => {
			describe("2 3 4 5 7 flush with a straight present", () => {
				before(() => {
					cards = [
						Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Two),
						Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Three),
						Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Four),
						Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Five),
						Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Six),
						Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Seven),
					];
					handCombo = new HandCombo(cards);
	
					expectedHandCombo = {
						comboType: HandComboType.Flush,
						comboCards: [
							Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Two),
							Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Three),
							Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Four),
							Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Five),
							Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Seven),
						],
						kickers: [],
					};
				});
	
				it(`should classify the combo type`, () => {
					expect(handCombo.comboType).to.equal(expectedHandCombo.comboType);
				});
			
				it("should set the combo cards", () => {
					expect(comboCardsMatchExpectedRankAndSuit(handCombo.comboCards, expectedHandCombo.comboCards)).to.equal(true);
				});
			
				it("should set the kickers", () => {
					expect(comboCardsMatchExpectedRank(handCombo.kickers, expectedHandCombo.kickers)).to.equal(true);
				});
			});
		});
	});

	describe("Straight", () => {
		describe("with only the necessary cards", () => {
			describe("10 - Ace", () => {
				before(() => {
					cards = [
						Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Ten),
						Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Jack),
						Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Queen),
						Card.createWithSuitAndRank(CardSuit.Club, CardRank.King),
						Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Ace),
					];
					handCombo = new HandCombo(cards);
	
					expectedHandCombo = {
						comboType: HandComboType.Straight,
						comboCards: cards,
						kickers: [],
					};
				});
	
				it(`should classify the combo type`, () => {
					expect(handCombo.comboType).to.equal(expectedHandCombo.comboType);
				});
			
				it("should set the combo cards", () => {
					expect(comboCardsMatchExpectedRank(handCombo.comboCards, expectedHandCombo.comboCards)).to.equal(true);
				});
			
				it("should set the kickers", () => {
					expect(comboCardsMatchExpectedRank(handCombo.kickers, expectedHandCombo.kickers)).to.equal(true);
				});
			});
		});

		describe("with extra cards", () => {
			describe("Ace - 5", () => {
				before(() => {
					cards = [
						Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Ace),
						Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Two),
						Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Three),
						Card.createWithSuitAndRank(CardSuit.Club, CardRank.Four),
						Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Five),
						Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.King),
						Card.createWithSuitAndRank(CardSuit.Heart, CardRank.Queen),
					];
					handCombo = new HandCombo(cards);
	
					expectedHandCombo = {
						comboType: HandComboType.Straight,
						comboCards: cards.slice(0, 5),
						kickers: [],
					};
				});
	
				it(`should classify the combo type`, () => {
					expect(handCombo.comboType).to.equal(expectedHandCombo.comboType);
				});
			
				it("should set the combo cards", () => {
					expect(comboCardsMatchExpectedRank(handCombo.comboCards, expectedHandCombo.comboCards)).to.equal(true);
				});
			
				it("should set the kickers", () => {
					expect(comboCardsMatchExpectedRank(handCombo.kickers, expectedHandCombo.kickers)).to.equal(true);
				});
			});

			describe("6 - 10 with triple present", () => {
				before(() => {
					cards = [
						Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Six),
						Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Seven),
						Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Eight),
						Card.createWithSuitAndRank(CardSuit.Club, CardRank.Nine),
						Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Ten),
						Card.createWithSuitAndRank(CardSuit.Heart, CardRank.Eight),
						Card.createWithSuitAndRank(CardSuit.Club, CardRank.Eight),
					];
					handCombo = new HandCombo(cards);
	
					expectedHandCombo = {
						comboType: HandComboType.Straight,
						comboCards: cards.slice(0, 5),
						kickers: [],
					};
				});
	
				it(`should classify the combo type`, () => {
					expect(handCombo.comboType).to.equal(expectedHandCombo.comboType);
				});
			
				it("should set the combo cards", () => {
					expect(comboCardsMatchExpectedRank(handCombo.comboCards, expectedHandCombo.comboCards)).to.equal(true);
				});
			
				it("should set the kickers", () => {
					expect(comboCardsMatchExpectedRank(handCombo.kickers, expectedHandCombo.kickers)).to.equal(true);
				});
			});
		});
	});

	describe("Triple", () => {
		describe("with only the necessary cards", () => {
			describe("Triple Kings", () => {
				before(() => {
					cards = [
						Card.createWithSuitAndRank(CardSuit.Spade, CardRank.King),
						Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.King),
						Card.createWithSuitAndRank(CardSuit.Heart, CardRank.King),
					];
					handCombo = new HandCombo(cards);
	
					expectedHandCombo = {
						comboType: HandComboType.Triple,
						comboCards: cards,
						kickers: [],
					};
				});
	
				it(`should classify the combo type`, () => {
					expect(handCombo.comboType).to.equal(expectedHandCombo.comboType);
				});
			
				it("should set the combo cards", () => {
					expect(comboCardsMatchExpectedRankAndSuit(handCombo.comboCards, expectedHandCombo.comboCards)).to.equal(true);
				});
			
				it("should set the kickers", () => {
					expect(comboCardsMatchExpectedRank(handCombo.kickers, expectedHandCombo.kickers)).to.equal(true);
				});
			});
		});

		describe("with extra cards", () => {
			describe("Triple Kings with Ace Jack kickers", () => {
				before(() => {
					cards = [
						Card.createWithSuitAndRank(CardSuit.Spade, CardRank.King),
						Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.King),
						Card.createWithSuitAndRank(CardSuit.Heart, CardRank.King),
						Card.createWithSuitAndRank(CardSuit.Heart, CardRank.Ace),
						Card.createWithSuitAndRank(CardSuit.Heart, CardRank.Jack),
						Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Nine),
						Card.createWithSuitAndRank(CardSuit.Club, CardRank.Eight),
					];
					handCombo = new HandCombo(cards);
	
					expectedHandCombo = {
						comboType: HandComboType.Triple,
						comboCards: cards.slice(0, 3),
						kickers: cards.slice(3, 5),
					};
				});
	
				it(`should classify the combo type`, () => {
					expect(handCombo.comboType).to.equal(expectedHandCombo.comboType);
				});
			
				it("should set the combo cards", () => {
					expect(comboCardsMatchExpectedRankAndSuit(handCombo.comboCards, expectedHandCombo.comboCards)).to.equal(true);
				});
			
				it("should set the kickers", () => {
					expect(comboCardsMatchExpectedRank(handCombo.kickers, expectedHandCombo.kickers)).to.equal(true);
				});
			});
		});
	});

	describe("Two Pair", () => {
		describe("with only the necessary cards", () => {
			describe("5 and 8 two pair", () => {
				before(() => {
					cards = [
						Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Five),
						Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Five),
						Card.createWithSuitAndRank(CardSuit.Heart, CardRank.Eight),
						Card.createWithSuitAndRank(CardSuit.Club, CardRank.Eight),
					];
					handCombo = new HandCombo(cards);
	
					expectedHandCombo = {
						comboType: HandComboType.TwoPair,
						comboCards: cards,
						kickers: [],
					};
				});
	
				it(`should classify the combo type`, () => {
					expect(handCombo.comboType).to.equal(expectedHandCombo.comboType);
				});
			
				it("should set the combo cards", () => {
					expect(comboCardsMatchExpectedRankAndSuit(handCombo.comboCards, expectedHandCombo.comboCards)).to.equal(true);
				});
			
				it("should set the kickers", () => {
					expect(comboCardsMatchExpectedRank(handCombo.kickers, expectedHandCombo.kickers)).to.equal(true);
				});
			});
		});

		describe("with extra cards", () => {
			describe("10 and Ace two pair with extra 3 pair ignored", () => {
				before(() => {
					cards = [
						Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Ten),
						Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Ten),
						Card.createWithSuitAndRank(CardSuit.Heart, CardRank.Ace),
						Card.createWithSuitAndRank(CardSuit.Club, CardRank.Ace),
						Card.createWithSuitAndRank(CardSuit.Club, CardRank.Three),
						Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Three),
					];
					handCombo = new HandCombo(cards);
	
					expectedHandCombo = {
						comboType: HandComboType.TwoPair,
						comboCards: cards.slice(0, 4),
						kickers: cards.slice(4, 5),
					};
				});
	
				it(`should classify the combo type`, () => {
					expect(handCombo.comboType).to.equal(expectedHandCombo.comboType);
				});
			
				it("should set the combo cards", () => {
					expect(comboCardsMatchExpectedRankAndSuit(handCombo.comboCards, expectedHandCombo.comboCards)).to.equal(true);
				});
			
				it("should set the kickers", () => {
					expect(comboCardsMatchExpectedRank(handCombo.kickers, expectedHandCombo.kickers)).to.equal(true);
				});
			});
		});
	});

	describe("Pair", () => {
		describe("with only the necessary cards", () => {
			describe("King pair", () => {
				before(() => {
					cards = [
						Card.createWithSuitAndRank(CardSuit.Spade, CardRank.King),
						Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.King),
					];
					handCombo = new HandCombo(cards);
	
					expectedHandCombo = {
						comboType: HandComboType.Pair,
						comboCards: cards,
						kickers: [],
					};
				});
	
				it(`should classify the combo type`, () => {
					expect(handCombo.comboType).to.equal(expectedHandCombo.comboType);
				});
			
				it("should set the combo cards", () => {
					expect(comboCardsMatchExpectedRankAndSuit(handCombo.comboCards, expectedHandCombo.comboCards)).to.equal(true);
				});
			
				it("should set the kickers", () => {
					expect(comboCardsMatchExpectedRank(handCombo.kickers, expectedHandCombo.kickers)).to.equal(true);
				});
			});
		});

		describe("with extra cards", () => {
			describe("10 pair with Ace King Jack kickers", () => {
				before(() => {
					cards = [
						Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Ten),
						Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Ten),
						Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Ace),
						Card.createWithSuitAndRank(CardSuit.Heart, CardRank.King),
						Card.createWithSuitAndRank(CardSuit.Club, CardRank.Jack),
						Card.createWithSuitAndRank(CardSuit.Heart, CardRank.Nine),
						Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Five),
					];
					handCombo = new HandCombo(cards);
	
					expectedHandCombo = {
						comboType: HandComboType.Pair,
						comboCards: cards.slice(0, 2),
						kickers: cards.slice(2, 5),
					};
				});
	
				it(`should classify the combo type`, () => {
					expect(handCombo.comboType).to.equal(expectedHandCombo.comboType);
				});
			
				it("should set the combo cards", () => {
					expect(comboCardsMatchExpectedRankAndSuit(handCombo.comboCards, expectedHandCombo.comboCards)).to.equal(true);
				});
			
				it("should set the kickers", () => {
					expect(comboCardsMatchExpectedRank(handCombo.kickers, expectedHandCombo.kickers)).to.equal(true);
				});
			});
		});
	});

	describe("Single", () => {
		describe("with only the necessary cards", () => {
			describe("Ace high", () => {
				before(() => {
					cards = [
						Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Ace),
					];
					handCombo = new HandCombo(cards);
	
					expectedHandCombo = {
						comboType: HandComboType.Single,
						comboCards: cards,
						kickers: [],
					};
				});
	
				it(`should classify the combo type`, () => {
					expect(handCombo.comboType).to.equal(expectedHandCombo.comboType);
				});
			
				it("should set the combo cards", () => {
					expect(comboCardsMatchExpectedRank(handCombo.comboCards, expectedHandCombo.comboCards)).to.equal(true);
				});
			
				it("should set the kickers", () => {
					expect(comboCardsMatchExpectedRank(handCombo.kickers, expectedHandCombo.kickers)).to.equal(true);
				});
			});
		});

		describe("with extra cards", () => {
			describe("10 high with 9 7 6 5 kickers with 3 and 2 ignored", () => {
				before(() => {
					cards = [
						Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Ten),
						Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Nine),
						Card.createWithSuitAndRank(CardSuit.Heart, CardRank.Seven),
						Card.createWithSuitAndRank(CardSuit.Club, CardRank.Six),
						Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Five),
						Card.createWithSuitAndRank(CardSuit.Club, CardRank.Three),
						Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Two),

					];
					handCombo = new HandCombo(cards);
	
					expectedHandCombo = {
						comboType: HandComboType.Single,
						comboCards: [cards[0]],
						kickers: cards.slice(1,5),
					};
				});
	
				it(`should classify the combo type`, () => {
					expect(handCombo.comboType).to.equal(expectedHandCombo.comboType);
				});
			
				it("should set the combo cards", () => {
					expect(comboCardsMatchExpectedRank(handCombo.comboCards, expectedHandCombo.comboCards)).to.equal(true);
				});
			
				it("should set the kickers", () => {
					expect(comboCardsMatchExpectedRank(handCombo.kickers, expectedHandCombo.kickers)).to.equal(true);
				});
			});
		});
	});
});
