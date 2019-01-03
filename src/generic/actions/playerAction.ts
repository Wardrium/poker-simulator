import { PostType } from "./postType";

// Action the player takes in response to the required action type
export enum PlayerActionType {
    Post = "Post",
    DeclinePost = "Decline Post",
    Check = "Check",
    Call = "Call",
    Fold = "Fold",
    Raise = "Raise",
    AllIn = "All In",
}

export abstract class PlayerAction {
	public readonly type: PlayerActionType;

	constructor(action: PlayerActionType) {
		this.type = action;
	}
}

export class PlayerPostAction extends PlayerAction {
    public readonly postType: PostType;

    constructor(postType: PostType) {
        super(PlayerActionType.Post);
        this.postType = postType;
    }
}

export class PlayerDeclinePostAction extends PlayerAction {
    constructor() {
        super(PlayerActionType.DeclinePost);
    }
}

export class PlayerCheckAction extends PlayerAction {
    constructor() {
        super(PlayerActionType.Check);
    }
}

export class PlayerCallAction extends PlayerAction {
    constructor() {
        super(PlayerActionType.Call);
    }
}

export class PlayerFoldAction extends PlayerAction {
    constructor() {
        super(PlayerActionType.Fold);
    }
}

export class PlayerRaiseAction extends PlayerAction {
    public readonly raiseAmount: number;

    constructor(raiseAmount: number) {
        super(PlayerActionType.Raise);
        this.raiseAmount = raiseAmount;
    }
}

export class PlayerAllInAction extends PlayerAction {
    public readonly allInAmount: number;

    constructor(allInAmount: number) {
        super(PlayerActionType.AllIn);
        this.allInAmount = allInAmount;
    }
}
