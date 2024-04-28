import {NextRequest, NextResponse} from "next/server";
import { addExercice } from "@/prisma/exerciceManager";
import { addExerciceUseCase } from "@/usecase/ExerciceUseCase";


export async function POST (request: NextRequest){
    return await addExerciceUseCase(request)
}