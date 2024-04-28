import {NextRequest, NextResponse} from "next/server";
import { Set } from "@/class/set";
import { addSetUseCase, updateSetUseCase } from "@/usecase/SetUseCase";

export async function POST (request: NextRequest, {params}: {params: {id: string}}){
    return await addSetUseCase(request, {params});
}



