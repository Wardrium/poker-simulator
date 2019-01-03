import { Player } from "../entities/player";

export abstract class PlayerManager {
	protected players: (Player | null)[]; // Players at the table in order of seating. null means the seat is empty.
	protected activePlayerIndices: Set<number>; // Players who are playing.

	constructor(maxPlayers: number) {
		this.players = [];
		for (let i = 0; i < maxPlayers; i++) {
			this.players.push(null);
			this.activePlayerIndices.add(i);
		}
	}

	// Returns true if adding player was successful, false otherwise.
	public addPlayer(player: Player): boolean {
		const seatIndex = this.getNextAvailableSeatIndex();
		return this.addPlayerAtSeat(player, seatIndex);
	}

	// Returns true if adding player was successful, false otherwise.
	public addPlayerAtSeat(player: Player, seatIndex: number): boolean {
		if (seatIndex === -1 || this.players[seatIndex] !== null) {
			return false;
		}
		this.players[seatIndex] = player;
		return true;
	}

	public getAllPlayers(): Player[] {
		return this.players.filter((player) => {
			return player !== null;
		});
	}

	public getAllActivePlayers(): Player[] {
		const activePlayers: Player[] = [];

		for (let playerIndex = 0; playerIndex < this.players.length; playerIndex++) {
			if (this.activePlayerIndices.has(playerIndex)) {
				activePlayers.push(this.getPlayerAtIndex(playerIndex));
			}
		}

		return activePlayers;
	}

	public getPlayerAtIndex(playerIndex: number): Player {
		const player = this.players[playerIndex];
		if (player === null) {
			throw new Error("No player at the given index.");
		}
		return player;
	}

	// Returns the index of the next available seat, or -1 if none are available.
	protected getNextAvailableSeatIndex(): number {
		for (let i = 0; i < this.players.length; i++) {
			if (this.players[i] === null) {
				return i;
			}
		}
		return -1;
	}

	protected getNextPlayerIndex(playerIndex: number, playersList = this.players) {
		if (playerIndex >= playersList.length - 1) {
			return 0;
		} else {
			return playerIndex += 1;
		}
	}

	private isPlayerActive(playerIndex: number): boolean {
		return this.activePlayerIndices.has(playerIndex);
	}
}
