import {NextRequest, NextResponse} from "next/server";
import { getExercices } from "@/prisma/exerciceManager";
import { BodyPart } from "@/class/bodyPart";
import { muscularGroups } from "@/class/muscularGroup";
import { Exercice } from "@/class/exercice"


//get all the exercices
export async function GET (request: NextRequest){
    const exercicesData = await getExercices();
    const exercices = exercicesData.map(exerciceData => {
        let firstMuscularGroup = muscularGroups[exerciceData.firstMuscularGroupId];
        let secondMuscularGroup = exerciceData.secondMuscularGroupId !== null ? muscularGroups[exerciceData.secondMuscularGroupId] : undefined;
        let thirdMuscularGroup = exerciceData.thirdMuscularGroupId !== null ? muscularGroups[exerciceData.thirdMuscularGroupId] : undefined;
        const bodyPart: BodyPart = BodyPart[exerciceData.bodyPartId] as unknown as BodyPart;
        return new Exercice(exerciceData.id, exerciceData.name, exerciceData.description, firstMuscularGroup, secondMuscularGroup, thirdMuscularGroup, bodyPart);
    });
    return NextResponse.json(exercices, { status: 200 });
}