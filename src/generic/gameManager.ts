import { Player } from "./entities/player";
import { Board } from "./entities/board";
import { Deck } from "./entities/deck";
import { Pot } from "./entities/pot";

export class GameManager {
	private players: Player[];
	private board: Board;
	private deck: Deck;
	private pot: Pot;

	constructor() {
		this.players = [];
		this.board = new Board();
		this.deck = new Deck();
		this.pot = new Pot();
	}

	protected addPlayer(): void {
		this.players.push(new Player());
	}

	protected removePlayer(playerIndex: number): void {
		this.players.splice(playerIndex, 1);
	}

	protected resetDeck(): void {
		this.deck.reset();
	}

	protected dealCardOnBoard(): void {
		const card = this.deck.dealCard();
		this.board.addCard(card);
	}

	protected dealCardToPlayer(playerIndex: number): void {
		const card = this.deck.dealCard();
		this.players[playerIndex].addCardToHand(card);
	}

	protected clearPlayerHand(playerIndex: number): void {
		this.players[playerIndex].clearHand();
	}

	protected moveChipsFromPlayerToPot(playerIndex: number, numberChips: number): void {
		const removedChips = this.players[playerIndex].removeChips(numberChips);
		this.pot.addChips(removedChips);
	}

	protected moveChipsFromPotToPlayer(playerIndex: number, numberChips: number): void {
		const removedChips = this.pot.removeChips(numberChips);
		this.players[playerIndex].addChips(removedChips);
	}

	protected moveAllChipsFromPotToPlayer(playerIndex: number) {
		const removedChips = this.pot.removeAllChips();
		this.players[playerIndex].addChips(removedChips);
	}
 }
