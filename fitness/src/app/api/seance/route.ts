import {NextRequest, NextResponse} from "next/server";
import { addSeance } from "@/prisma/SeanceManager";
import { Seance } from "@/class/seance";
import { addSeanceUseCase } from "@/usecase/SeanceUseCase";


export async function POST (request: NextRequest){
    return await addSeanceUseCase(request);
 
}