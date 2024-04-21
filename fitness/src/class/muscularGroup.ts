import { BodyPart } from "./bodyPart";

export class muscularGroup {
    id : number;
    name : string;
    bodyPart : BodyPart;
    constructor(id : number, name : string, bodyPart : BodyPart) {
        this.id = id;
        this.name = name;
        this.bodyPart = bodyPart;
    }
    
}

export const MuscularGroups:muscularGroup[]=[
    new muscularGroup(0,"bicpes",BodyPart.Arms),
    new muscularGroup(1,"tricpes",BodyPart.Arms),
    new muscularGroup(2,"forearm",BodyPart.Arms),
    new muscularGroup(3,"upper chest",BodyPart.Chest),
    new muscularGroup(4,"middle chest",BodyPart.Chest),
    new muscularGroup(5,"lower chest",BodyPart.Chest),
    new muscularGroup(6,"trapezius",BodyPart.Shoulders),
    new muscularGroup(7,"front deltoid",BodyPart.Shoulders),
    new muscularGroup(8,"side deltoid",BodyPart.Shoulders),
    new muscularGroup(9,"rear deltoid",BodyPart.Shoulders),
    new muscularGroup(10,"quadriceps",BodyPart.Legs),
    new muscularGroup(11,"hamstrings",BodyPart.Legs),
    new muscularGroup(12,"calves",BodyPart.Legs),
    new muscularGroup(13,"latissimus dorsi",BodyPart.Back),
    new muscularGroup(14,"trapzius",BodyPart.Back),
    new muscularGroup(15,"rhomboids",BodyPart.Back),
    new muscularGroup(16,"obliques",BodyPart.Core),
    new muscularGroup(17,"transverse abdominis",BodyPart.Core),
    new muscularGroup(18,"rectus abdominis",BodyPart.Core),
    new muscularGroup(29,"heart",BodyPart.Cardio)
]