import { PostType } from "./postType";

// Action required of the player
export enum RequireActionType {
    Post = "Post",
    Bet = "Bet",
}

export abstract class RequireAction {
	public readonly type: RequireActionType
	public readonly amount?: number;
	
	constructor(action: RequireActionType) {
		this.type = action;
	}
}

export abstract class RequirePostAction extends RequireAction {
	public readonly postType: PostType;
	public readonly amount: number;

	constructor(postType: PostType, amount: number) {
		super(RequireActionType.Post);
		this.postType = postType;
		this.amount = amount;
	}
}

export class RequireSmallBlindPostAction extends RequirePostAction {
	constructor(amount: number) {
		super(PostType.SmallBlind, amount);
	}
}

export class RequireBigBlindPostAction extends RequirePostAction {
	constructor(amount: number) {
		super(PostType.BigBlind, amount);
	}
}

export class RequireAntePostAction extends RequirePostAction {
	constructor(amount: number) {
		super(PostType.Ante, amount);
	}
}
