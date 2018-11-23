export enum Action {
    Check,
    Call,
    Fold,
    Raise,
    AllIn
}

export abstract class PlayerActionRecord {
    public readonly playerId: number;
    public readonly action: Action;

    constructor(playerId: number, action: Action) {
        this.playerId = playerId;
        this.action = action;
    }
}

export class PlayerCheckActionRecord extends PlayerActionRecord {
    constructor(playerId: number) {
        super(playerId, Action.Check);
    }
}

export class PlayerCallActionRecord extends PlayerActionRecord {
    constructor(playerId: number) {
        super(playerId, Action.Call);
    }
}

export class PlayerFoldActionRecord extends PlayerActionRecord {
    constructor(playerId: number) {
        super(playerId, Action.Fold);
    }
}

export class PlayerRaiseActionRecord extends PlayerActionRecord {
    public readonly raiseAmount: number;

    constructor(playerId: number, raiseAmount: number) {
        super(playerId, Action.Raise);
        this.raiseAmount = raiseAmount;
    }
}

export class PlayerAllInActionRecord extends PlayerActionRecord {
    public readonly allInAmount: number;

    constructor(playerId: number, allInAmount: number) {
        super(playerId, Action.AllIn);
        this.allInAmount = allInAmount;
    }
}
