import { BodyPart } from './bodyPart';
import {MuscularGroup,muscularGroups} from './muscularGroup';

export class Exercice {
    id : number;
    name : string;
    description : string;
    firstMuscularGroup : MuscularGroup;
    secondMuscularGroup ?: MuscularGroup;
    thirdMuscularGroup? : MuscularGroup;
    bodyPart : BodyPart;
    constructor(id : number, name : string, description : string, firstMuscularGroup : MuscularGroup, secondMuscularGroup : MuscularGroup|undefined, thirdMuscularGroup : MuscularGroup|undefined, bodyPart : BodyPart) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.firstMuscularGroup = firstMuscularGroup;
        this.secondMuscularGroup = secondMuscularGroup;
        this.thirdMuscularGroup = thirdMuscularGroup;
        this.bodyPart = bodyPart;
    }    
}


export const BaseExercices:Exercice[]=[
    new Exercice(0,"push up","push up description",muscularGroups[0],muscularGroups[1],muscularGroups[3],BodyPart.Chest),
    new Exercice(1,"pull up","pull up description",muscularGroups[13],muscularGroups[14],muscularGroups[15],BodyPart.Back),
    new Exercice(2,"squat","squat description",muscularGroups[10],muscularGroups[11],muscularGroups[12],BodyPart.Legs),
    new Exercice(3,"deadlift","deadlift description",muscularGroups[13],muscularGroups[14],muscularGroups[15],BodyPart.Back),
    new Exercice(4,"bench press","bench press description",muscularGroups[0],muscularGroups[1],muscularGroups[3],BodyPart.Chest),
    new Exercice(5,"military press","military press description",muscularGroups[2],muscularGroups[3],muscularGroups[4],BodyPart.Shoulders),
    new Exercice(6,"dumbell curl","dumbell curl description",muscularGroups[4],muscularGroups[5],muscularGroups[6],BodyPart.Arms),
    new Exercice(7,"leg press","leg press description",muscularGroups[10],muscularGroups[11],muscularGroups[12],BodyPart.Legs),
    new Exercice(8,"plank","plank description",muscularGroups[16],muscularGroups[17],undefined,BodyPart.Core),
]