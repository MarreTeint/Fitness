import {NextRequest, NextResponse} from "next/server";
import { Seance } from "@/class/seance";
import { getSeanceByIdUseCase, updateSeanceUseCase } from "@/usecase/SeanceUseCase";


export async function GET (request: NextRequest, {params}: {params: {id: string}}){
    return await  getSeanceByIdUseCase(request, {params});
}


// export async function DELETE (request: NextRequest, {params}: {params: {id: string}}){
//     const id = Number(params.id);
//     console.log(id);
//     try {
//         await deleteSeance(id);
//         return NextResponse.json({status: "Seance deleted"}, {status: 200});
//     } catch (error) {
//         console.log(error);
//         return NextResponse.json({error}, {status: 400});
//     }
// }


export async function PUT (request: NextRequest, {params}: {params: {id: string}}){
    return await updateSeanceUseCase(request, {params});
}

