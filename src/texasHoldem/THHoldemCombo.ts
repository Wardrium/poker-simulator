import { Card, CardSuit, CardRank } from "../generic/entities/card";

export enum HandComboType {
	Single = "Single",
	Pair = "Pair",
	TwoPair = "Two Pair",
	Triple = "Triple",
	Straight = "Straight",
	Flush = "Flush",
	FullHouse = "Full House",
	Quad = "Quad",
	StraightFlush = "Straight Flush"
}

interface CardsSortedBySuitAndDescendingRank {
	[CardSuit.Spade]: Card[];
	[CardSuit.Heart]: Card[];
	[CardSuit.Diamond]: Card[];
	[CardSuit.Club]: Card[];
}

export class HandCombo {
	public comboType: HandComboType;
	public comboCards: Card[];	// Relevant cards for the main combo.
	public kickers: Card[]; // Kickers for breaking ties.

	constructor(cards: Card[]) {
		const cardsSortedByDescendingRank = this.getCardsSortedByDescendingRank(cards);
		const cardsSortedBySuitAndDescendingRank = this.getCardsSortedBySuitAndDescendingRank(cardsSortedByDescendingRank);

		this.setCombo(cardsSortedByDescendingRank, cardsSortedBySuitAndDescendingRank);
		this.setKickers(cardsSortedByDescendingRank);
	}

	private setCombo(cardsSortedByDescendingRank: Card[], cardsSortedBySuitAndDescendingRank: CardsSortedBySuitAndDescendingRank): void {
		if (this.setComboCardsIfFound(this.getStraightFlushCards.bind(this), cardsSortedBySuitAndDescendingRank, HandComboType.StraightFlush)) {
			return;
		}
		if (this.setComboCardsIfFound(this.getQuadCards.bind(this), cardsSortedByDescendingRank, HandComboType.Quad)) {
			return;
		}
		if (this.setComboCardsIfFound(this.getFullHouseCards.bind(this), cardsSortedByDescendingRank, HandComboType.FullHouse)) {
			return;
		}
		if (this.setComboCardsIfFound(this.getFlushCards.bind(this), cardsSortedBySuitAndDescendingRank, HandComboType.Flush)) {
			return;
		}
		if (this.setComboCardsIfFound(this.getStraightCards.bind(this), cardsSortedByDescendingRank, HandComboType.Straight)) {
			return;
		}
		if (this.setComboCardsIfFound(this.getTripleCards.bind(this), cardsSortedByDescendingRank, HandComboType.Triple)) {
			return;
		}
		if (this.setComboCardsIfFound(this.getTwoPairCards.bind(this), cardsSortedByDescendingRank, HandComboType.TwoPair)) {
			return;
		}
		if (this.setComboCardsIfFound(this.getPairCards.bind(this), cardsSortedByDescendingRank, HandComboType.Pair)) {
			return;
		}
		if (this.setComboCardsIfFound(this.getSingleCards.bind(this), cardsSortedByDescendingRank, HandComboType.Single)) {
			return;
		}
	}

	private setComboCardsIfFound(
		getComboFunction: (cardsSorted: Card[] | CardsSortedBySuitAndDescendingRank) => Card[],
		cardsSorted: Card[] | CardsSortedBySuitAndDescendingRank,
		comboType: HandComboType
	): boolean {
		const comboCards = getComboFunction(cardsSorted);
		if (comboCards.length > 0) {
			this.comboType = comboType;
			this.comboCards = comboCards;
			return true;
		} else {
			return false;
		}
	}

	private setKickers(cardsSortedByDescendingRank: Card[]): void {
		const HAND_SIZE = 5;
		this.kickers = [];

		let cardIndex = 0;

		function isCardInCardList(card: Card, cards: Card[]): boolean {
			for (let i = 0; i < cards.length; i++) {
				if (card.rank === cards[i].rank && card.suit === cards[i].suit) {
					return true;
				}
			}
			return false;
		}

		while (cardIndex < cardsSortedByDescendingRank.length && this.comboCards.length + this.kickers.length < HAND_SIZE) {
			const currentCard = cardsSortedByDescendingRank[cardIndex];

			if (!isCardInCardList(currentCard, this.comboCards)) {
				this.kickers.push(currentCard);
			}

			cardIndex += 1;
		}
	}

	private getCardsSortedByDescendingRank(cards: Card[]): Card[] {
		const sortedCards: Card[] = [];

		cards.forEach((card) => {
			let index = 0;
			while (index < sortedCards.length && sortedCards[index].rank > card.rank) {
				index += 1;
			}
			sortedCards.splice(index, 0, card);
		});
	
		return sortedCards;
	}


	private getCardsSortedBySuitAndDescendingRank(cardsSortedByDescendingRank: Card[]): CardsSortedBySuitAndDescendingRank {
		const suitedCards: CardsSortedBySuitAndDescendingRank = {
			[CardSuit.Spade]: [],
			[CardSuit.Heart]: [],
			[CardSuit.Diamond]: [],
			[CardSuit.Club]: [],
		};
		
		cardsSortedByDescendingRank.forEach((card) => {
			suitedCards[card.suit].push(card);
		});

		return suitedCards;
	}

	private getStraightFlushCards(cardsSortedBySuitAndDescendingRank: CardsSortedBySuitAndDescendingRank): Card[] {
		let foundStraightFlush: Card[] = [];

		Object.keys(cardsSortedBySuitAndDescendingRank)
			.forEach((suit: keyof CardsSortedBySuitAndDescendingRank) => {
				const cardsOfOneSuit = cardsSortedBySuitAndDescendingRank[suit];
				const straightFlush = this.getStraightCards(cardsOfOneSuit);
				if (straightFlush.length > 0) {
					foundStraightFlush = straightFlush;
					return;
				}
			});

		return foundStraightFlush;
	}

	private getQuadCards(cardsSortedByDescendingRank: Card[]): Card[] {
		const QUAD_LENGTH = 4;
		return this.getCardRankRepeats(cardsSortedByDescendingRank, QUAD_LENGTH);
	}

	private getFullHouseCards(cardsSortedByDescendingRank: Card[]): Card[] {
		const triple = this.getTripleCards(cardsSortedByDescendingRank);
		if (triple.length !== 0) {
			let cardsWithoutTriple = this.getCardsWithRanksRemoved(cardsSortedByDescendingRank, triple[0].rank);
			const pair = this.getPairCards(cardsWithoutTriple);

			if (pair.length !== 0) {
				return triple.concat(pair);
			}
		}
		return [];
	}

	private getFlushCards(cardsSortedBySuitAndDescendingRank: CardsSortedBySuitAndDescendingRank): Card[] {
		let flushCards: Card[] = [];
		
		Object.keys(cardsSortedBySuitAndDescendingRank)
			.forEach((suit: keyof CardsSortedBySuitAndDescendingRank) => {
				const cardsOfOneSuit = cardsSortedBySuitAndDescendingRank[suit];
				if (cardsOfOneSuit.length >= 5) {
					const cardsCopy = cardsOfOneSuit.slice();
					flushCards = cardsCopy.splice(0, 5);
					return;
				}
			})

		return flushCards;
	}

	private getStraightCards(cardsSortedByDescendingRank: Card[]): Card[] {
		const cardsSortedByDescendingRankCopy = cardsSortedByDescendingRank.slice();

		const STRAIGHT_LENGTH = 5;
		
		let straightCards: Card[] = [cardsSortedByDescendingRankCopy[0]];
		let cardIndex = 1;

		// If first card is Ace, also push copy of it to end for Ace - 5 straights.
		const firstCard = cardsSortedByDescendingRankCopy[0];
		if (firstCard !== undefined && firstCard.rank === CardRank.Ace) {
			cardsSortedByDescendingRankCopy.push(firstCard);
		}

		while (this.cardComboStillPossible(cardIndex, cardsSortedByDescendingRankCopy.length, straightCards.length, STRAIGHT_LENGTH)) {
			const previousCard = cardsSortedByDescendingRankCopy[cardIndex - 1];
			const currentCard = cardsSortedByDescendingRankCopy[cardIndex];

			if (
				currentCard.rank === (previousCard.rank - 1)
				|| currentCard.rank === CardRank.Ace && previousCard.rank === CardRank.Two	// Ace - 5 straight.
			) {
				straightCards.push(currentCard);
			} else if (currentCard.rank !== previousCard.rank) {
				straightCards = [currentCard];
			}

			if (straightCards.length === STRAIGHT_LENGTH) {	// Straight found.
				return straightCards;
			}

			cardIndex += 1;
		}

		return [];	// No straight found.
	}

	private getTripleCards(cardsSortedByDescendingRank: Card[]): Card[] {
		const TRIPLE_LENGTH = 3;
		return this.getCardRankRepeats(cardsSortedByDescendingRank, TRIPLE_LENGTH);
	}

	private getTwoPairCards(cardsSortedByDescendingRank: Card[]): Card[] {
		const firstPair = this.getPairCards(cardsSortedByDescendingRank);
		if (firstPair.length !== 0) {
			let cardsWithoutFirstPair = this.getCardsWithRanksRemoved(cardsSortedByDescendingRank, firstPair[0].rank);
			const secondPair = this.getPairCards(cardsWithoutFirstPair);

			if (secondPair.length !== 0) {
				return firstPair.concat(secondPair);
			}
		}
		return [];
	}

	private getPairCards(cardsSortedByDescendingRank: Card[]): Card[] {
		const PAIR_LENGTH = 2;
		return this.getCardRankRepeats(cardsSortedByDescendingRank, PAIR_LENGTH);
	}

	private getSingleCards(cardsSortedByDescendingRank: Card[]): Card[] {
		return [cardsSortedByDescendingRank[0]];
	}

	// Searches for X repeating cards of the same rank and returns the highest ranked group found.
	private getCardRankRepeats(cardsSortedByDescendingRank: Card[], numberRepeats: number): Card[] {
		let cardRepeats: Card[] = [cardsSortedByDescendingRank[0]];
		let cardIndex = 1;

		while (this.cardComboStillPossible(cardIndex, cardsSortedByDescendingRank.length, cardRepeats.length, numberRepeats)) {
			const cardComboRank = cardRepeats[0].rank;
			const currentCard = cardsSortedByDescendingRank[cardIndex];

			if (currentCard.rank === cardComboRank) {
				cardRepeats.push(currentCard);
			} else {
				cardRepeats = [currentCard];
			}

			if (cardRepeats.length === numberRepeats) {
				return cardRepeats;
			}

			cardIndex += 1;
		}

		return [];
	}

	// Returns list of cards with all cards equal to the given rank removed.
	private getCardsWithRanksRemoved(cardsSortedByDescendingRank: Card[], rankToRemove: CardRank): Card[] {
		const cardsCopy = cardsSortedByDescendingRank.slice();
		
		for (let i = 0; i < cardsCopy.length; i++) {
			if (cardsCopy[i].rank === rankToRemove) {
				cardsCopy.splice(i, 1);
				i -= 1;
			}
		}

		return cardsCopy;
	}

	private cardComboStillPossible(currentIndex: number, totalCardsLength: number, currentComboLength: number, comboLength: number): boolean {
		const remainingComboLength = comboLength - currentComboLength;
		return currentIndex + remainingComboLength <= totalCardsLength;
	}
 }
