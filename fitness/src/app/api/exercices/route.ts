import {NextRequest, NextResponse} from "next/server";
import { getExercices } from "@/prisma/exerciceManager";


//get all the exercices
export async function GET (request: NextRequest){
    try {
        const exercices = await getExercices();
        return NextResponse.json(exercices, {status: 200});
    } catch (error) {
        return NextResponse.json({error}, {status: 400});
    }
    
}