import { expect } from "chai";
import { THHandRanker } from "../src/texasHoldem/THHandRanker";
import { Card, CardSuit, CardRank } from "../src/generic/entities/card";

describe("Texas Holdem Hand Ranker", () => {
	let handRanker = new THHandRanker();
	let board: Card[];
	let hands: Card[][];
	let expectedWinnerIndices: number[]

	describe("hands one apart in combo type strength", () => {
		it("should declare straight flush the winner over quad", () => {
			board = [
				Card.createWithSuitAndRank(CardSuit.Spade, CardRank.King),
				Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Queen),
				Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Ten),
				Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Ace),
				Card.createWithSuitAndRank(CardSuit.Club, CardRank.Ace),
			];
			hands = [[
					Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Jack),
					Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Nine),
				], [
					Card.createWithSuitAndRank(CardSuit.Heart, CardRank.Ace),
					Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Ace),
				]
			];
	
			expectedWinnerIndices = [0];
	
			expect(handRanker.getBestHandIndices(hands, board)).to.deep.equal(expectedWinnerIndices);
		});
	
		it("should declare quad the winner over full house", () => {
			board = [
				Card.createWithSuitAndRank(CardSuit.Spade, CardRank.King),
				Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.King),
				Card.createWithSuitAndRank(CardSuit.Heart, CardRank.King),
				Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Eight),
				Card.createWithSuitAndRank(CardSuit.Club, CardRank.Ace),
			];
			hands = [[
					Card.createWithSuitAndRank(CardSuit.Club, CardRank.King),
					Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Nine),
				], [
					Card.createWithSuitAndRank(CardSuit.Heart, CardRank.Ace),
					Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Ace),
				]
			];
	
			expectedWinnerIndices = [0];
	
			expect(handRanker.getBestHandIndices(hands, board)).to.deep.equal(expectedWinnerIndices);
		});

		it("should declare full house the winner over flush", () => {
			board = [
				Card.createWithSuitAndRank(CardSuit.Spade, CardRank.King),
				Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.King),
				Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Seven),
				Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Eight),
				Card.createWithSuitAndRank(CardSuit.Club, CardRank.Ace),
			];
			hands = [[
					Card.createWithSuitAndRank(CardSuit.Club, CardRank.King),
					Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Eight),
				], [
					Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Five),
					Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Ace),
				]
			];
	
			expectedWinnerIndices = [0];
	
			expect(handRanker.getBestHandIndices(hands, board)).to.deep.equal(expectedWinnerIndices);
		});

		it("should declare flush the winner over straight", () => {
			board = [
				Card.createWithSuitAndRank(CardSuit.Spade, CardRank.King),
				Card.createWithSuitAndRank(CardSuit.Club, CardRank.Nine),
				Card.createWithSuitAndRank(CardSuit.Club, CardRank.Ten),
				Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Eight),
				Card.createWithSuitAndRank(CardSuit.Club, CardRank.Ace),
			];
			hands = [[
					Card.createWithSuitAndRank(CardSuit.Club, CardRank.Six),
					Card.createWithSuitAndRank(CardSuit.Club, CardRank.Five),
				], [
					Card.createWithSuitAndRank(CardSuit.Heart, CardRank.Jack),
					Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Seven),
				]
			];
	
			expectedWinnerIndices = [0];
	
			expect(handRanker.getBestHandIndices(hands, board)).to.deep.equal(expectedWinnerIndices);
		});

		it("should declare straight the winner over triple", () => {
			board = [
				Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Ace),
				Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Two),
				Card.createWithSuitAndRank(CardSuit.Heart, CardRank.Three),
				Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Five),
				Card.createWithSuitAndRank(CardSuit.Club, CardRank.Jack),
			];
			hands = [[
					Card.createWithSuitAndRank(CardSuit.Club, CardRank.Four),
					Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Ten),
				], [
					Card.createWithSuitAndRank(CardSuit.Heart, CardRank.Ace),
					Card.createWithSuitAndRank(CardSuit.Club, CardRank.Ace),
				]
			];
	
			expectedWinnerIndices = [0];
	
			expect(handRanker.getBestHandIndices(hands, board)).to.deep.equal(expectedWinnerIndices);
		});

		it("should declare triple the winner over two pair", () => {
			board = [
				Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Two),
				Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Five),
				Card.createWithSuitAndRank(CardSuit.Heart, CardRank.Eight),
				Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Ten),
				Card.createWithSuitAndRank(CardSuit.Club, CardRank.Jack),
			];
			hands = [[
					Card.createWithSuitAndRank(CardSuit.Club, CardRank.Two),
					Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Two),
				], [
					Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Eight),
					Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Jack),
				]
			];
	
			expectedWinnerIndices = [0];
	
			expect(handRanker.getBestHandIndices(hands, board)).to.deep.equal(expectedWinnerIndices);
		});

		it("should declare two pair the winner over pair", () => {
			board = [
				Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Two),
				Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Five),
				Card.createWithSuitAndRank(CardSuit.Heart, CardRank.Eight),
				Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Ten),
				Card.createWithSuitAndRank(CardSuit.Club, CardRank.Jack),
			];
			hands = [[
					Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Eight),
					Card.createWithSuitAndRank(CardSuit.Club, CardRank.Ten),
				], [
					Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Ace),
					Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Jack),
				]
			];
	
			expectedWinnerIndices = [0];
	
			expect(handRanker.getBestHandIndices(hands, board)).to.deep.equal(expectedWinnerIndices);
		});

		it("should declare pair the winner over single", () => {
			board = [
				Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Two),
				Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Five),
				Card.createWithSuitAndRank(CardSuit.Heart, CardRank.Eight),
				Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Ten),
				Card.createWithSuitAndRank(CardSuit.Club, CardRank.Jack),
			];
			hands = [[
					Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Three),
					Card.createWithSuitAndRank(CardSuit.Club, CardRank.Ten),
				], [
					Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Ace),
					Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Three),
				]
			];
	
			expectedWinnerIndices = [0];
	
			expect(handRanker.getBestHandIndices(hands, board)).to.deep.equal(expectedWinnerIndices);
		});
	});

	describe("hands with same combo type", () => {
		it("should declare a straight flush over a lower straight flush", () => {
			board = [
				Card.createWithSuitAndRank(CardSuit.Spade, CardRank.King),
				Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Queen),
				Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Jack),
				Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Ten),
				Card.createWithSuitAndRank(CardSuit.Club, CardRank.Two),
			];
			hands = [[
					Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Ace),
					Card.createWithSuitAndRank(CardSuit.Heart, CardRank.Two),
				], [
					Card.createWithSuitAndRank(CardSuit.Heart, CardRank.Ace),
					Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Nine),
				]
			];

			expectedWinnerIndices = [0];

			expect(handRanker.getBestHandIndices(hands, board)).to.deep.equal(expectedWinnerIndices);
		});

		it("should declare a quad the winner over a lower quad", () => {
			board = [
				Card.createWithSuitAndRank(CardSuit.Spade, CardRank.King),
				Card.createWithSuitAndRank(CardSuit.Club, CardRank.King),
				Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Ten),
				Card.createWithSuitAndRank(CardSuit.Heart, CardRank.Ten),
				Card.createWithSuitAndRank(CardSuit.Club, CardRank.Two),
			];
			hands = [[
					Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.King),
					Card.createWithSuitAndRank(CardSuit.Heart, CardRank.King),
				], [
					Card.createWithSuitAndRank(CardSuit.Club, CardRank.Ten),
					Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Ten),
				]
			];

			expectedWinnerIndices = [0];

			expect(handRanker.getBestHandIndices(hands, board)).to.deep.equal(expectedWinnerIndices);
		});

		it("should declare a quad the winner over a quad with a lower kicker", () => {
			board = [
				Card.createWithSuitAndRank(CardSuit.Spade, CardRank.King),
				Card.createWithSuitAndRank(CardSuit.Club, CardRank.King),
				Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.King),
				Card.createWithSuitAndRank(CardSuit.Heart, CardRank.King),
				Card.createWithSuitAndRank(CardSuit.Club, CardRank.Two),
			];
			hands = [[
					Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Ace),
					Card.createWithSuitAndRank(CardSuit.Heart, CardRank.Three),
				], [
					Card.createWithSuitAndRank(CardSuit.Heart, CardRank.Queen),
					Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Two),
				]
			];

			expectedWinnerIndices = [0];

			expect(handRanker.getBestHandIndices(hands, board)).to.deep.equal(expectedWinnerIndices);
		});
	
		it("should declare full house the winner over full house with a lower triple", () => {
			board = [
				Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Jack),
				Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Jack),
				Card.createWithSuitAndRank(CardSuit.Heart, CardRank.King),
				Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Eight),
				Card.createWithSuitAndRank(CardSuit.Club, CardRank.Ace),
			];
			hands = [[
					Card.createWithSuitAndRank(CardSuit.Heart, CardRank.Ace),
					Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Ace),
				], [
					Card.createWithSuitAndRank(CardSuit.Heart, CardRank.Jack),
					Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.King),
				]
			];

			expectedWinnerIndices = [0];

			expect(handRanker.getBestHandIndices(hands, board)).to.deep.equal(expectedWinnerIndices);
		});

		it("should declare full house the winner over a full house with a lower double", () => {
			board = [
				Card.createWithSuitAndRank(CardSuit.Spade, CardRank.King),
				Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.King),
				Card.createWithSuitAndRank(CardSuit.Heart, CardRank.Queen),
				Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Eight),
				Card.createWithSuitAndRank(CardSuit.Club, CardRank.Ace),
			];
			hands = [[
					Card.createWithSuitAndRank(CardSuit.Heart, CardRank.King),
					Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Ace),
				], [
					Card.createWithSuitAndRank(CardSuit.Club, CardRank.King),
					Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Queen),
				]
			];

			expectedWinnerIndices = [0];

			expect(handRanker.getBestHandIndices(hands, board)).to.deep.equal(expectedWinnerIndices);
		});

		it("should declare a flush the winner over a flush with a lower top card", () => {
			board = [
				Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Three),
				Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Four),
				Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Seven),
				Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Nine),
				Card.createWithSuitAndRank(CardSuit.Club, CardRank.Queen),
			];
			hands = [[
					Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Ace),
					Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Two),
				], [
					Card.createWithSuitAndRank(CardSuit.Spade, CardRank.King),
					Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Queen),
				]
			];

			expectedWinnerIndices = [0];

			expect(handRanker.getBestHandIndices(hands, board)).to.deep.equal(expectedWinnerIndices);
		});

		it("should declare a straight the winner over a lower straight", () => {
			board = [
				Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Three),
				Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Four),
				Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Five),
				Card.createWithSuitAndRank(CardSuit.Heart, CardRank.Six),
				Card.createWithSuitAndRank(CardSuit.Club, CardRank.Queen),
			];
			hands = [[
					Card.createWithSuitAndRank(CardSuit.Club, CardRank.Seven),
					Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Queen),
				], [
					Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.King),
					Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Two),
				]
			];

			expectedWinnerIndices = [0];

			expect(handRanker.getBestHandIndices(hands, board)).to.deep.equal(expectedWinnerIndices);
		});

		it("should declare a 2 - 6 straght the winner over an Ace - 5 straight", () => {
			board = [
				Card.createWithSuitAndRank(CardSuit.Heart, CardRank.Two),
				Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Three),
				Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Four),
				Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Five),
				Card.createWithSuitAndRank(CardSuit.Club, CardRank.Queen),
			];
			hands = [[
					Card.createWithSuitAndRank(CardSuit.Club, CardRank.Six),
					Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Queen),
				], [
					Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.King),
					Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Ace),
				]
			];

			expectedWinnerIndices = [0];

			expect(handRanker.getBestHandIndices(hands, board)).to.deep.equal(expectedWinnerIndices);
		});

		it("should declare a triple the winner over a lower triple", () => {
			board = [
				Card.createWithSuitAndRank(CardSuit.Heart, CardRank.Two),
				Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Three),
				Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Four),
				Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Five),
				Card.createWithSuitAndRank(CardSuit.Club, CardRank.Queen),
			];
			hands = [[
					Card.createWithSuitAndRank(CardSuit.Club, CardRank.Five),
					Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Five),
				], [
					Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Two),
					Card.createWithSuitAndRank(CardSuit.Club, CardRank.Two),
				]
			];

			expectedWinnerIndices = [0];

			expect(handRanker.getBestHandIndices(hands, board)).to.deep.equal(expectedWinnerIndices);
		});

		it("should declare a triple the winner over a triple with a lower second kicker", () => {
			board = [
				Card.createWithSuitAndRank(CardSuit.Heart, CardRank.Two),
				Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Three),
				Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Ace),
				Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Queen),
				Card.createWithSuitAndRank(CardSuit.Club, CardRank.Queen),
			];
			hands = [[
					Card.createWithSuitAndRank(CardSuit.Heart, CardRank.Queen),
					Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Seven),
				], [
					Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Queen),
					Card.createWithSuitAndRank(CardSuit.Club, CardRank.Five),
				]
			];

			expectedWinnerIndices = [0];

			expect(handRanker.getBestHandIndices(hands, board)).to.deep.equal(expectedWinnerIndices);
		});

		it("should declare a two pair the winner over a two pair with a lower top pair but a higher bottom pair", () => {
			board = [
				Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Two),
				Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Four),
				Card.createWithSuitAndRank(CardSuit.Heart, CardRank.Seven),
				Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Nine),
				Card.createWithSuitAndRank(CardSuit.Club, CardRank.Queen),
			];
			hands = [[
					Card.createWithSuitAndRank(CardSuit.Heart, CardRank.Queen),
					Card.createWithSuitAndRank(CardSuit.Club, CardRank.Two),
				], [
					Card.createWithSuitAndRank(CardSuit.Club, CardRank.Nine),
					Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Seven),
				]
			];

			expectedWinnerIndices = [0];

			expect(handRanker.getBestHandIndices(hands, board)).to.deep.equal(expectedWinnerIndices);
		});

		it("should declare a two pair the winner over a two pair with a lower bottom pair", () => {
			board = [
				Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Two),
				Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Four),
				Card.createWithSuitAndRank(CardSuit.Heart, CardRank.Seven),
				Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Nine),
				Card.createWithSuitAndRank(CardSuit.Club, CardRank.Queen),
			];
			hands = [[
					Card.createWithSuitAndRank(CardSuit.Heart, CardRank.Queen),
					Card.createWithSuitAndRank(CardSuit.Club, CardRank.Seven),
				], [
					Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Queen),
					Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Two),
				]
			];

			expectedWinnerIndices = [0];

			expect(handRanker.getBestHandIndices(hands, board)).to.deep.equal(expectedWinnerIndices);
		});

		it("should declare a pair the winner over a lower pair", () => {
			board = [
				Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Two),
				Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Four),
				Card.createWithSuitAndRank(CardSuit.Heart, CardRank.Seven),
				Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Nine),
				Card.createWithSuitAndRank(CardSuit.Club, CardRank.Queen),
			];
			hands = [[
					Card.createWithSuitAndRank(CardSuit.Heart, CardRank.Queen),
					Card.createWithSuitAndRank(CardSuit.Club, CardRank.Eight),
				], [
					Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Nine),
					Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Ace),
				]
			];

			expectedWinnerIndices = [0];

			expect(handRanker.getBestHandIndices(hands, board)).to.deep.equal(expectedWinnerIndices);
		});

		it("should declare a single the winner over a lower single", () => {
			board = [
				Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Two),
				Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Four),
				Card.createWithSuitAndRank(CardSuit.Heart, CardRank.Seven),
				Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Nine),
				Card.createWithSuitAndRank(CardSuit.Club, CardRank.Queen),
			];
			hands = [[
					Card.createWithSuitAndRank(CardSuit.Heart, CardRank.Jack),
					Card.createWithSuitAndRank(CardSuit.Club, CardRank.Eight),
				], [
					Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Ten),
					Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Eight),
				]
			];

			expectedWinnerIndices = [0];

			expect(handRanker.getBestHandIndices(hands, board)).to.deep.equal(expectedWinnerIndices);
		});
	});

	describe("corner cases", () => {
		it("should declare straight flush the winner over flush and straight", () => {
			board = [
				Card.createWithSuitAndRank(CardSuit.Spade, CardRank.King),
				Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Queen),
				Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Jack),
				Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Ten),
				Card.createWithSuitAndRank(CardSuit.Club, CardRank.Eight),
			];
			hands = [[
					Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Jack),
					Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Nine),
				], [
					Card.createWithSuitAndRank(CardSuit.Club, CardRank.Ace),
					Card.createWithSuitAndRank(CardSuit.Heart, CardRank.Nine),
				], [
					Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Ace),
					Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Five),
				]
			];

			expectedWinnerIndices = [0];

			expect(handRanker.getBestHandIndices(hands, board)).to.deep.equal(expectedWinnerIndices);
		});

		it("should declare an Ace - 5 straight the winner over a triple", () => {
			board = [
				Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Two),
				Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Three),
				Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Four),
				Card.createWithSuitAndRank(CardSuit.Heart, CardRank.Ten),
				Card.createWithSuitAndRank(CardSuit.Club, CardRank.Eight),
			];
			hands = [[
					Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Ace),
					Card.createWithSuitAndRank(CardSuit.Club, CardRank.Five),
				], [
					Card.createWithSuitAndRank(CardSuit.Club, CardRank.Ten),
					Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Ten),
				]
			];

			expectedWinnerIndices = [0];

			expect(handRanker.getBestHandIndices(hands, board)).to.deep.equal(expectedWinnerIndices);
		});

		it("should declare a tie if both player's pocket cards don't play (singles)", () => {
			board = [
				Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Eight),
				Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Nine),
				Card.createWithSuitAndRank(CardSuit.Heart, CardRank.Jack),
				Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.King),
				Card.createWithSuitAndRank(CardSuit.Club, CardRank.Ace),
			];
			hands = [[
					Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Seven),
					Card.createWithSuitAndRank(CardSuit.Club, CardRank.Four),
				], [
					Card.createWithSuitAndRank(CardSuit.Club, CardRank.Six),
					Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Two),
				]
			];

			expectedWinnerIndices = [0, 1];

			expect(handRanker.getBestHandIndices(hands, board)).to.deep.equal(expectedWinnerIndices);
		});

		it("should declare a tie if both player's second pocket card doesn't play (singles)", () => {
			board = [
				Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Two),
				Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Five),
				Card.createWithSuitAndRank(CardSuit.Heart, CardRank.Eight),
				Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Ten),
				Card.createWithSuitAndRank(CardSuit.Club, CardRank.Jack),
			];
			hands = [[
					Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Ace),
					Card.createWithSuitAndRank(CardSuit.Club, CardRank.Four),
				], [
					Card.createWithSuitAndRank(CardSuit.Club, CardRank.Ace),
					Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Three),
				]
			];

			expectedWinnerIndices = [0, 1];

			expect(handRanker.getBestHandIndices(hands, board)).to.deep.equal(expectedWinnerIndices);
		});

		it("should declare a tie if best hand is on the board (full house)", () => {
			board = [
				Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Seven),
				Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Seven),
				Card.createWithSuitAndRank(CardSuit.Heart, CardRank.Seven),
				Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Queen),
				Card.createWithSuitAndRank(CardSuit.Club, CardRank.Queen),
			];
			hands = [[
					Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Ace),
					Card.createWithSuitAndRank(CardSuit.Club, CardRank.King),
				], [
					Card.createWithSuitAndRank(CardSuit.Club, CardRank.Two),
					Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Three),
				]
			];

			expectedWinnerIndices = [0, 1];

			expect(handRanker.getBestHandIndices(hands, board)).to.deep.equal(expectedWinnerIndices);
		});
	});

	describe("multiple players", () => {
		it("should chop between all 3 players: board contains best hand", () => {
			board = [
				Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Ace),
				Card.createWithSuitAndRank(CardSuit.Spade, CardRank.King),
				Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Queen),
				Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Jack),
				Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Ten),
			];
			hands = [[
					Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Ace),
					Card.createWithSuitAndRank(CardSuit.Heart, CardRank.Ace),
				], [
					Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.King),
					Card.createWithSuitAndRank(CardSuit.Heart, CardRank.King),
				], [
					Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Queen),
					Card.createWithSuitAndRank(CardSuit.Heart, CardRank.Queen),
				]
			];

			expectedWinnerIndices = [0, 1, 2];

			expect(handRanker.getBestHandIndices(hands, board)).to.deep.equal(expectedWinnerIndices);
		});

		it("should chop between players 1 and 2: both players use board + 2 equivalent kickers", () => {
			board = [
				Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Two),
				Card.createWithSuitAndRank(CardSuit.Heart, CardRank.Two),
				Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Two),
				Card.createWithSuitAndRank(CardSuit.Club, CardRank.Five),
				Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Three),
			];
			hands = [[
					Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Ace),
					Card.createWithSuitAndRank(CardSuit.Heart, CardRank.Queen),
				], [
					Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Ace),
					Card.createWithSuitAndRank(CardSuit.Heart, CardRank.King),
				], [
					Card.createWithSuitAndRank(CardSuit.Club, CardRank.Ace),
					Card.createWithSuitAndRank(CardSuit.Club, CardRank.King),
				]
			];

			expectedWinnerIndices = [1, 2];

			expect(handRanker.getBestHandIndices(hands, board)).to.deep.equal(expectedWinnerIndices);
		});

		it("should chop between players 1 and 2: both players use board + 1 equivalent kicker", () => {
			board = [
				Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Two),
				Card.createWithSuitAndRank(CardSuit.Heart, CardRank.Two),
				Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Two),
				Card.createWithSuitAndRank(CardSuit.Club, CardRank.Two),
				Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Three),
			];
			hands = [[
					Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.King),
					Card.createWithSuitAndRank(CardSuit.Heart, CardRank.Queen),
				], [
					Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Ace),
					Card.createWithSuitAndRank(CardSuit.Heart, CardRank.King),
				], [
					Card.createWithSuitAndRank(CardSuit.Club, CardRank.Ace),
					Card.createWithSuitAndRank(CardSuit.Club, CardRank.Jack),
				]
			];

			expectedWinnerIndices = [1, 2];

			expect(handRanker.getBestHandIndices(hands, board)).to.deep.equal(expectedWinnerIndices);
		});

		it("should chop between all 3 players: all player hands play and are equal", () => {
			board = [
				Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Two),
				Card.createWithSuitAndRank(CardSuit.Heart, CardRank.Three),
				Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Four),
				Card.createWithSuitAndRank(CardSuit.Club, CardRank.Five),
				Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Three),
			];
			hands = [[
					Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Six),
					Card.createWithSuitAndRank(CardSuit.Heart, CardRank.Seven),
				], [
					Card.createWithSuitAndRank(CardSuit.Spade, CardRank.Six),
					Card.createWithSuitAndRank(CardSuit.Diamond, CardRank.Seven),
				], [
					Card.createWithSuitAndRank(CardSuit.Club, CardRank.Six),
					Card.createWithSuitAndRank(CardSuit.Heart, CardRank.Seven),
				]
			];

			expectedWinnerIndices = [0, 1, 2];

			expect(handRanker.getBestHandIndices(hands, board)).to.deep.equal(expectedWinnerIndices);
		});
	});
});
