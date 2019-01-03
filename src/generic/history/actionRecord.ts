import { PlayerAction } from "../actions/playerAction";

export class PlayerActionRecord {
    public readonly playerId: number;
    public readonly action: PlayerAction;

    constructor(playerId: number, action: PlayerAction) {
        this.playerId = playerId;
        this.action = action;
    }
}
