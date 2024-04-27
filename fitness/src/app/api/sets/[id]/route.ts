import {NextRequest, NextResponse} from "next/server";
import { Set } from "@/class/set";
import { addRepsToSet, updateSetUseCase ,deleteSetUseCase} from "@/usecase/SetUseCase";

// delete a set with the id of the set
export async function DELETE (request: NextRequest, {params}: {params: {id: string}}){  
        return await deleteSetUseCase(request, {params});  
}

// add rep to a set with the id of the set
export async function POST (request: NextRequest, {params}: {params: {id: string}}){
   return await  addRepsToSet(request, {params})
}

//update a set
export async function PUT (request: NextRequest, {params}: {params: {id: string}}){
    return await updateSetUseCase(request, {params});
}