import {NextRequest, NextResponse} from "next/server";
import { addExercice } from "@/prisma/exerciceManager";


export async function POST (request: NextRequest){
    const data = await request.json();
    const {name, description, firstMuscularGroupId, secondMuscularGroupId, thirdMuscularGroupId, bodyPartId} = data;
    try {
        await addExercice(name, description, firstMuscularGroupId, secondMuscularGroupId, thirdMuscularGroupId, bodyPartId);
        return NextResponse.json({message: "Exercice added"}, {status: 200});
    } catch (error) {
        return NextResponse.json({error}, {status: 400});
    }
    
}