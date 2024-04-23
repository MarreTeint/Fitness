import { BodyPart } from "./bodyPart";

export class MuscularGroup {
    id : number;
    name : string;
    bodyPart : BodyPart;
    constructor(id : number, name : string, bodyPart : BodyPart) {
        this.id = id;
        this.name = name;
        this.bodyPart = bodyPart;
    }
    
}

export const muscularGroups:MuscularGroup[]=[
    new MuscularGroup(0,"bicpes",BodyPart.Arms),
    new MuscularGroup(1,"tricpes",BodyPart.Arms),
    new MuscularGroup(2,"forearm",BodyPart.Arms),
    new MuscularGroup(3,"upper chest",BodyPart.Chest),
    new MuscularGroup(4,"middle chest",BodyPart.Chest),
    new MuscularGroup(5,"lower chest",BodyPart.Chest),
    new MuscularGroup(6,"trapezius",BodyPart.Shoulders),
    new MuscularGroup(7,"front deltoid",BodyPart.Shoulders),
    new MuscularGroup(8,"side deltoid",BodyPart.Shoulders),
    new MuscularGroup(9,"rear deltoid",BodyPart.Shoulders),
    new MuscularGroup(10,"quadriceps",BodyPart.Legs),
    new MuscularGroup(11,"hamstrings",BodyPart.Legs),
    new MuscularGroup(12,"calves",BodyPart.Legs),
    new MuscularGroup(13,"latissimus dorsi",BodyPart.Back),
    new MuscularGroup(14,"trapzius",BodyPart.Back),
    new MuscularGroup(15,"rhomboids",BodyPart.Back),
    new MuscularGroup(16,"obliques",BodyPart.Core),
    new MuscularGroup(17,"transverse abdominis",BodyPart.Core),
    new MuscularGroup(18,"rectus abdominis",BodyPart.Core),
    new MuscularGroup(29,"heart",BodyPart.Cardio)
]