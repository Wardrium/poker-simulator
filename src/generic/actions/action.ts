export enum Action {
    Check,
    Call,
    Fold,
    Raise,
    AllIn
}

export abstract class PlayerAction {
	public readonly action: Action;

	constructor(action: Action) {
		this.action = action;
	}
}

export class PlayerCheckAction extends PlayerAction {
    constructor() {
        super(Action.Check);
    }
}

export class PlayerCallAction extends PlayerAction {
    constructor() {
        super(Action.Call);
    }
}

export class PlayerFoldAction extends PlayerAction {
    constructor() {
        super(Action.Fold);
    }
}

export class PlayerRaiseAction extends PlayerAction {
    public readonly raiseAmount: number;

    constructor(raiseAmount: number) {
        super(Action.Raise);
        this.raiseAmount = raiseAmount;
    }
}

export class PlayerAllInAction extends PlayerAction {
    public readonly allInAmount: number;

    constructor(allInAmount: number) {
        super(Action.AllIn);
        this.allInAmount = allInAmount;
    }
}
