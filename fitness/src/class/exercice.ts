import { BodyPart } from './bodyPart';
import {muscularGroup,MuscularGroups} from './muscularGroup';

export class exercice {
    id : number;
    name : string;
    description : string;
    firstMuscularGroup : muscularGroup;
    secondMuscularGroup : muscularGroup;
    thirdMuscularGroup : muscularGroup;
    bodyPart : BodyPart;
    constructor(id : number, name : string, description : string, firstMuscularGroup : muscularGroup, secondMuscularGroup : muscularGroup, thirdMuscularGroup : muscularGroup, bodyPart : BodyPart) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.firstMuscularGroup = firstMuscularGroup;
        this.secondMuscularGroup = secondMuscularGroup;
        this.thirdMuscularGroup = thirdMuscularGroup;
        this.bodyPart = bodyPart;
    }    
}


export const BaseExercices:exercice[]=[
    new exercice(0,"push up","push up description",MuscularGroups[0],MuscularGroups[1],MuscularGroups[3],BodyPart.Chest),
    new exercice(1,"pull up","pull up description",MuscularGroups[13],MuscularGroups[14],MuscularGroups[15],BodyPart.Back),
    new exercice(2,"squat","squat description",MuscularGroups[10],MuscularGroups[11],MuscularGroups[12],BodyPart.Legs),
    new exercice(3,"deadlift","deadlift description",MuscularGroups[13],MuscularGroups[14],MuscularGroups[15],BodyPart.Back),
    new exercice(4,"plank","plank description",MuscularGroups[17],MuscularGroups[18],MuscularGroups[19],BodyPart.Core),
    new exercice(5,"running","running description",MuscularGroups[20],MuscularGroups[20],MuscularGroups[20],BodyPart.Cardio),
    new exercice(6,"bicep curl","bicep curl description",MuscularGroups[0],MuscularGroups[0],MuscularGroups[0],BodyPart.Arms),
    new exercice(7,"tricep extension","tricep extension description",MuscularGroups[1],MuscularGroups[1],MuscularGroups[1],BodyPart.Arms),
    new exercice(8,"shoulder press","shoulder press description",MuscularGroups[6],MuscularGroups[7],MuscularGroups[8],BodyPart.Shoulders),
    new exercice(9,"leg press","leg press description",MuscularGroups[10],MuscularGroups[10],MuscularGroups[10],BodyPart.Legs),
    new exercice(10,"leg curl","leg curl description",MuscularGroups[11],MuscularGroups[11],MuscularGroups[11],BodyPart.Legs),
    new exercice(11,"leg extension","leg extension description",MuscularGroups[10],MuscularGroups[10],MuscularGroups[10],BodyPart.Legs),
    new exercice(12,"calf raise","calf raise description",MuscularGroups[12],MuscularGroups[12],MuscularGroups[12],BodyPart.Legs),
    new exercice(13,"lat pulldown","lat pulldown description",MuscularGroups[13],MuscularGroups[13],MuscularGroups[13],BodyPart.Back),
    new exercice(14,"seated row","seated row description",MuscularGroups[15],MuscularGroups[15],MuscularGroups[15],BodyPart.Back),
    new exercice(15,"chest press","chest press description",MuscularGroups[3],MuscularGroups[3],MuscularGroups[3],BodyPart.Chest),
    new exercice(16,"chest fly","chest fly description",MuscularGroups[3],MuscularGroups[3],MuscularGroups[3],BodyPart.Chest),
    new exercice(17,"shoulder fly","shoulder fly description",MuscularGroups[6],MuscularGroups[6],MuscularGroups[6],BodyPart.Shoulders),
    new exercice(18,"front raise","front raise description",MuscularGroups[7],MuscularGroups[7],MuscularGroups[7],BodyPart.Shoulders),
    new exercice(19,"lateral raise","lateral raise description",MuscularGroups[8],MuscularGroups[8],MuscularGroups[8],BodyPart.Shoulders),
]