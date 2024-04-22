import { Set } from "./set";
export class Seance {
    // Attributs userID,date, set[]
    userID: number;
    date: Date;
    sets: Set[];

    // Constructor
    constructor(userID: number, date: Date, sets: Set[]) {
        this.userID = userID;
        this.date = date;
        this.sets = sets;
    }
}