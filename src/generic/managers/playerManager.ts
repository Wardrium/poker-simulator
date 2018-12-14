import { Player } from "../entities/player";
import { PlayerAction } from "../actions/action";

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

	// Returns the index of the next available seat, or -1 if none are available.
	protected getNextAvailableSeatIndex(): number {
		for (let i = 0; i < this.players.length; i++) {
			if (this.players[i] === null) {
				return i;
			}
		}
		return -1;
	}

	public getAllPlayers(): Player[] {
		return this.players.filter((player) => {
			return player !== null;
		});
	}

	public getPlayerAtIndex(playerIndex: number): Player {
		const player = this.players[playerIndex];
		if (player === null) {
			throw new Error("No player at the given index.");
		}
		return player;
	}

	// Gets all active players in seating order, starting with the given start index.
	protected getActivePlayers(startingSeatIndex: number): number[] {
		const activePlayers = [];
		
		let playerIndex = startingSeatIndex;
		if (this.activePlayerIndices.has(playerIndex)) {
			activePlayers.push(playerIndex);
		}
		playerIndex = this.getNextPlayerIndex(playerIndex);
	
		while (playerIndex !== startingSeatIndex) {
			if (this.activePlayerIndices.has(playerIndex)) {
				activePlayers.push(playerIndex);
			}
			playerIndex = this.getNextPlayerIndex(playerIndex);		
		}

		return activePlayers;
	}

	protected getNextPlayerIndex(playerIndex: number) {
		if (playerIndex === this.players.length - 1) {
			return 0;
		} else {
			return playerIndex += 1;
		}
	}
}
