export class Card {
    public code: CardCode;

    constructor(code: CardCode) {
        this.code = code;
    }

    public isEqualTo(card: Card): boolean {
        return this.code === card.code;
    }

    get suit(): CardSuit {
        switch (Math.floor(this.code / 13)) {
            case 0: return CardSuit.Spade;
            case 1: return CardSuit.Heart;
            case 2: return CardSuit.Diamond;
            case 3: return CardSuit.Club;
        }
    }

    get rank(): CardRank {
        switch (this.code % 13) {
            case 0: return CardRank.Two;
            case 1: return CardRank.Three;
            case 2: return CardRank.Four;
            case 3: return CardRank.Five;
            case 4: return CardRank.Six;
            case 5: return CardRank.Seven;
            case 6: return CardRank.Eight;
            case 7: return CardRank.Nine;
            case 8: return CardRank.Ten;
            case 9: return CardRank.Jack;
            case 10: return CardRank.Queen;
            case 11: return CardRank.King;
            case 12: return CardRank.Ace;
        }
    }

    get displayString(): String {
        return this.rank + " of " + this.suit + "s";
    }
}

export enum CardSuit {
    Spade = "Spade",
    Heart = "Heart",
    Diamond = "Diamond",
    Club = "Club",
}

export enum CardRank {
    Two = "2",
    Three = "3",
    Four = "4",
    Five = "5",
    Six = "6",
    Seven = "7",
    Eight = "8",
    Nine = "9",
    Ten = "10",
    Jack = "Jack",
    Queen = "Queen",
    King = "King",
    Ace = "Ace",
}

export type CardCode = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 |
    13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 |
    26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 |
    39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50 | 51;
