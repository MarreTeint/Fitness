import {NextRequest, NextResponse} from "next/server";
import { Set } from "@/class/set";
import { addRepsToSet, updateSetUseCase } from "@/usecase/SetUseCase";

// delete a set with the id of the set
// export async function DELETE (request: NextRequest, {params}: {params: {id: string}}){
//     const id = Number(params.id);
//     try {
//         await deleteSet(id);
//         return NextResponse.json({status: "Set deleted"}, {status: 200});
//     } catch (error) {
//         console.log(error);
//         return NextResponse.json({error}, {status: 400});
//     }
// }

// add rep to a set with the id of the set
export async function POST (request: NextRequest, {params}: {params: {id: string}}){
   return await  addRepsToSet(request, {params})
}

//update a set
export async function PUT (request: NextRequest, {params}: {params: {id: string}}){
    return await updateSetUseCase(request, {params});
}