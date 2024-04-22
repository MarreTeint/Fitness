//create a set class with the following attributes:  reps, weight, exerciseID
export class Set {
    reps: number[];
    weight: number[];
    exerciseID: number;
    constructor(reps: number[], weight: number[], exerciseID: number) {
        this.reps = reps;
        this.weight = weight;
        this.exerciseID = exerciseID;
    }
}