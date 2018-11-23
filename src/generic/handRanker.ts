import { Card } from "./entities/card";

export interface HandRanker {
	getBestHandIndices(hands: Card[][], board: Card[]): number[];
}
