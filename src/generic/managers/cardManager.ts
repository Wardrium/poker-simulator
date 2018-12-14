import { Deck } from "../entities/deck";
import { Card } from "../entities/card";
import { Player } from "../entities/player";
import { Board } from "../entities/board";

export abstract class CardManager {
	protected deck: Deck;

	constructor() {
		this.deck = new Deck();
	}

	public dealCardOnBoard(board: Board): void {
		const card = this.deck.dealCard();
		board.addCard(card);
	}

	public dealCardToPlayer(player: Player): void {
		const card = this.deck.dealCard();
		player.addCardToHand(card);
	}

	public clearPlayerHand(player: Player): void {
		player.clearHand();
	}

	public clearPlayerHands(player: Player[]): void {
		player.forEach((player) => {
			this.clearPlayerHand(player);
		});
	}

	public resetDeck(): void {
		this.deck.reset();
	}
}