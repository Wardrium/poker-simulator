import { HandRanker } from "../generic/handRanker";
import { Card } from "../generic/entities/card";
import { HandComboType, HandCombo } from "./THCombo";

interface HandComboAndIndex {
	index: number;
	handCombo: HandCombo;
}

// Mapping from HandComboType to the HandCombo and index of the hand,
type HandCombosTypeMap = {
	[type in HandComboType]?: HandComboAndIndex[];
}

export class THHandRanker implements HandRanker {
	public getBestHandIndices(hands: Card[][], board: Card[]): number[] {
		const handCombosMap = this.getHandCombosMap(hands, board);
		const bestHandCombosCandidates = this.getBestHandCandidates(handCombosMap);
		const bestHandCombos = this.getBestHandsOfSameHandCombo(bestHandCombosCandidates);
		return bestHandCombos.map((handComboAndIndex) => {
			return handComboAndIndex.index;
		});
	}

	private getHandCombosMap(hands: Card[][], board: Card[]): HandCombosTypeMap {
		const handCombosMap: HandCombosTypeMap = {};

		for (let i = 0; i < hands.length; i++) {
			const handCombo = new HandCombo(hands[i].concat(board));
			const handComboAndIndex: HandComboAndIndex = {
				index: i,
				handCombo: handCombo,
			};
			if (handCombo.comboType in handCombosMap) {
				handCombosMap[handCombo.comboType].push(handComboAndIndex);
			} else {
				handCombosMap[handCombo.comboType] = [handComboAndIndex];
			}
		}

		return handCombosMap;
	}

	private getBestHandCandidates(handCombosMap: HandCombosTypeMap): HandComboAndIndex[] {
		if (HandComboType.StraightFlush in handCombosMap) {
			return handCombosMap[HandComboType.StraightFlush];
		} else if (HandComboType.Quad in handCombosMap) {
			return handCombosMap[HandComboType.Quad];
		} else if (HandComboType.FullHouse in handCombosMap) {
			return handCombosMap[HandComboType.FullHouse];
		} else if (HandComboType.Flush in handCombosMap) {
			return handCombosMap[HandComboType.Flush];
		} else if (HandComboType.Straight in handCombosMap) {
			return handCombosMap[HandComboType.Straight];
		} else if (HandComboType.Triple in handCombosMap) {
			return handCombosMap[HandComboType.Triple];
		} else if (HandComboType.TwoPair in handCombosMap) {
			return handCombosMap[HandComboType.TwoPair];
		} else if (HandComboType.Pair in handCombosMap) {
			return handCombosMap[HandComboType.Pair];
		} else if (HandComboType.Single in handCombosMap) {
			return handCombosMap[HandComboType.Single];
		}
	}

	private getBestHandsOfSameHandCombo(handCombosAndIndex: HandComboAndIndex[]): HandComboAndIndex[] {
		let currentBestHands = [handCombosAndIndex[0]];
		for (let i = 1; i < handCombosAndIndex.length; i++) {
			const compareResult = this.compareHandsOfSameComboType(handCombosAndIndex[i].handCombo, currentBestHands[0].handCombo);
			if (compareResult === 1) {
				currentBestHands = [handCombosAndIndex[i]];
			} else if (compareResult === 0) {
				currentBestHands.push(handCombosAndIndex[i]);
			}
		}
		return currentBestHands;
	}

	/**
	 * Compares the two given hands and returns the result.
	 * 1: hand1 > hand2
	 * 0: hand1 === hand2
	 * -1: hand1 < hand2
	 */
	private compareHandsOfSameComboType(hand1: HandCombo, hand2: HandCombo): -1 | 0 | 1 {
		if (hand1.comboType !== hand2.comboType) {
			throw new Error("Cannot compare hands of different combo types.");
		}
		for (let i = 0; i < hand1.comboCards.length && i < hand2.comboCards.length; i++) {
			if (hand1.comboCards[i].rank > hand2.comboCards[i].rank) {
				return 1;
			} else if (hand1.comboCards[i].rank < hand2.comboCards[i].rank) {
				return -1;
			}
		}
		for (let i = 0; i < hand1.kickers.length && i < hand2.kickers.length; i++) {
			if (hand1.kickers[i].rank > hand2.kickers[i].rank) {
				return 1;
			} else if (hand1.kickers[i].rank < hand2.kickers[i].rank) {
				return -1;
			}
		}
		return 0;
	}
}
