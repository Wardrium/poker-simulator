import { PlayerActionRecord } from "./actionRecord";

export class RoundHistory {
	public readonly actionRecords: PlayerActionRecord[];

	constructor() {
		this.actionRecords = [];
	}

	public addNewActionRecord(actionRecord: PlayerActionRecord) {
		this.actionRecords.push(actionRecord);
	}
}