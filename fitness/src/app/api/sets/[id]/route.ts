import {NextRequest, NextResponse} from "next/server";
import { deleteSet,addRepsToSet} from "@/prisma/SeanceManager";
import { Set } from "@/class/set";

//delete a set with the id of the set
export async function DELETE (request: NextRequest, {params}: {params: {id: string}}){
    const id = Number(params.id);
    try {
        await deleteSet(id);
        return NextResponse.json({status: "Set deleted"}, {status: 200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({error}, {status: 400});
    }
}

//add rep to a set with the id of the set
export async function POST (request: NextRequest, {params}: {params: {id: string}}){
    const id = Number(params.id);
    const body = await request.json();
    try {
        await addRepsToSet(id,body.reps,body.weight);
        return NextResponse.json({status: "Reps added to set"}, {status: 200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({error}, {status: 400});
    }
}