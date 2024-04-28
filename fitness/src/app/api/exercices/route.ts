import {NextRequest, NextResponse} from "next/server";
import { getExercices } from "@/prisma/exerciceManager";
import { BodyPart } from "@/class/bodyPart";
import { muscularGroups } from "@/class/muscularGroup";
import { Exercice } from "@/class/exercice"
import { getAllExercicesUseCase } from "@/usecase/ExerciceUseCase";


//get all the exercices
export async function GET (request: NextRequest){
    return await getAllExercicesUseCase(request); 
}