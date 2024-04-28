import { getSeanceByUserIdUseCase } from "@/usecase/SeanceUseCase";
import {NextRequest, NextResponse} from "next/server";


export async function GET (request: NextRequest, {params}: {params: {id: string}}){   
    return getSeanceByUserIdUseCase(request, {params});
}