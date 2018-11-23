const NUMBER_OF_RANKS = 13;

export class Card {
    public readonly code: CardCode;

    constructor(code: CardCode) {
        this.code = code;
    }

    public static createWithSuitAndRank(suit: CardSuit, rank: CardRank) {
        let suitBase: number;
        switch(suit) {
            case CardSuit.Spade: 
                suitBase = 0;
                break;
            case CardSuit.Heart:
                suitBase = 1;
                break;
            case CardSuit.Diamond:
                suitBase = 2;
                break;
            case CardSuit.Club:
                suitBase = 3;
                break;
        }

        const code: CardCode = suitBase * NUMBER_OF_RANKS + rank as CardCode;
        return new Card(code);
    }

    public isEqualTo(card: Card): boolean {
        return this.code === card.code;
    }

    get suit(): CardSuit {
        switch (Math.floor(this.code / NUMBER_OF_RANKS)) {
            case 0: return CardSuit.Spade;
            case 1: return CardSuit.Heart;
            case 2: return CardSuit.Diamond;
            case 3: return CardSuit.Club;
        }
    }

    get rank(): CardRank {
        switch (this.code % NUMBER_OF_RANKS) {
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
        return getCardRankDisplay(this.rank) + " of " + this.suit + "s";
    }
}

export enum CardSuit {
    Spade = "Spade",
    Heart = "Heart",
    Diamond = "Diamond",
    Club = "Club",
}

export enum CardRank {
    Two,
    Three,
    Four,
    Five,
    Six,
    Seven,
    Eight,
    Nine,
    Ten,
    Jack,
    Queen,
    King,
    Ace,
}

function getCardRankDisplay(cardRank: CardRank) {
    const CardRankDisplays = {
        [CardRank.Two]: "2",
        [CardRank.Three]: "3",
        [CardRank.Four]: "4",
        [CardRank.Five]: "5",
        [CardRank.Six]: "6",
        [CardRank.Seven]: "7",
        [CardRank.Eight]: "8",
        [CardRank.Nine]: "9",
        [CardRank.Ten]: "10",
        [CardRank.Jack]: "Jack",
        [CardRank.Queen]: "Queen",
        [CardRank.King]: "King",
        [CardRank.Ace]: "Ace",
    }

    return CardRankDisplays[cardRank];
}

export type CardCode = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 |
    13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 |
    26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 |
    39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50 | 51;
