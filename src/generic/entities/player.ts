import { Card } from "./card";
import { PlayerAction, PlayerCheckAction, PlayerCallAction, PlayerFoldAction, PlayerRaiseAction, PlayerAllInAction } from "../actions/action";

export abstract class Player {
    private numberChips: number;
    private hand: Card[];

    constructor(numberChips: number = 0) {
        this.numberChips = numberChips;
    }

    public addCardToHand(card: Card): void {
        this.hand.push(card);
    }

    public clearHand(): void {
        this.hand = [];
    }

    public addChips(numberChips: number): void {
        this.numberChips += numberChips;
    }

    public removeChips(numberChips: number): number {
        if (numberChips > this.numberChips) {
            numberChips = this.numberChips;
        }
        this.numberChips -= numberChips;
        return numberChips;
    }

    public abstract makeAction(): PlayerAction;

    protected check(): PlayerAction {
        return new PlayerCheckAction();
    }

    protected call(): PlayerAction {
        return new PlayerCallAction();
    }

    protected fold(): PlayerAction {
        return new PlayerFoldAction();
    }

    protected raise(raiseAmount: number): PlayerAction {
        return new PlayerRaiseAction(raiseAmount);
    }

    protected allIn(): PlayerAction {
        return new PlayerAllInAction(this.numberChips);
    }
}
