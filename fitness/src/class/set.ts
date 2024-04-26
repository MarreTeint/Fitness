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

    getReps() {
        //return the a string that represnet a json object of the reps
        return JSON.stringify(this.reps);
    }

    getWeight() {     
        return JSON.stringify(this.weight);
    }

    setReps(reps: string) {
        this.reps = JSON.parse(reps);
    }

    setWeight(weight: string) {
        this.weight = JSON.parse(weight);
    }
}