import { Card } from "./card";
import { PlayerAction, PlayerCheckAction, PlayerCallAction, PlayerFoldAction, PlayerRaiseAction, PlayerAllInAction } from "../actions/playerAction";
import { RequireAction } from "../actions/requireAction";

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

    /**
     * Removes all chips from this player. Returns the number of chips removed.
     */
    public removeAllChips(): number {
        const removedChips = this.numberChips;
        this.removeChipsIfEnough(removedChips);
        return removedChips;
    }

    /**
     * Returns true if the player has enough chips and removes the chips.
     * Otherwise returns false and the amount of chips is unaffected.
     */
    public removeChipsIfEnough(numberChips: number): boolean {
        if (numberChips > this.numberChips) {
            return false;
        }
        this.numberChips -= numberChips;
        return true;
    }

    public abstract makeAction(requireAction: RequireAction): PlayerAction;

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
