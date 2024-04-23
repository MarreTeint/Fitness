import { BodyPart } from './bodyPart';
import {muscularGroup,MuscularGroups} from './muscularGroup';

export class Exercice {
    id : number;
    name : string;
    description : string;
    firstMuscularGroup : muscularGroup;
    secondMuscularGroup ?: muscularGroup;
    thirdMuscularGroup? : muscularGroup;
    bodyPart : BodyPart;
    constructor(id : number, name : string, description : string, firstMuscularGroup : muscularGroup, secondMuscularGroup : muscularGroup|undefined, thirdMuscularGroup : muscularGroup|undefined, bodyPart : BodyPart) {
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
    new Exercice(0,"push up","push up description",MuscularGroups[0],MuscularGroups[1],MuscularGroups[3],BodyPart.Chest),
    new Exercice(1,"pull up","pull up description",MuscularGroups[13],MuscularGroups[14],MuscularGroups[15],BodyPart.Back),
    new Exercice(2,"squat","squat description",MuscularGroups[10],MuscularGroups[11],MuscularGroups[12],BodyPart.Legs),
    new Exercice(3,"deadlift","deadlift description",MuscularGroups[13],MuscularGroups[14],MuscularGroups[15],BodyPart.Back),
    new Exercice(4,"bench press","bench press description",MuscularGroups[0],MuscularGroups[1],MuscularGroups[3],BodyPart.Chest),
    new Exercice(5,"military press","military press description",MuscularGroups[2],MuscularGroups[3],MuscularGroups[4],BodyPart.Shoulders),
    new Exercice(6,"dumbell curl","dumbell curl description",MuscularGroups[4],MuscularGroups[5],MuscularGroups[6],BodyPart.Arms),
    new Exercice(7,"leg press","leg press description",MuscularGroups[10],MuscularGroups[11],MuscularGroups[12],BodyPart.Legs),
    new Exercice(8,"plank","plank description",MuscularGroups[16],MuscularGroups[17],undefined,BodyPart.Core),

]