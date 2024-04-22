import {NextRequest, NextResponse} from "next/server";
import {getSeanceById,deleteSeance,updateSeance } from "@/prisma/SeanceManager";
import { Seance } from "@/class/seance";


export async function GET (request: NextRequest, {params}: {params: {id: string}}){
    const id = Number(params.id);
    console.log(id);

    try {
        const seance = await getSeanceById(Number(id));       
        if (seance == null) {
            return NextResponse.json({error: "Seance not found"}, {status: 404});
        }
        return NextResponse.json(seance, {status: 200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({error}, {status: 400});
    }
}


export async function DELETE (request: NextRequest, {params}: {params: {id: string}}){
    const id = Number(params.id);
    console.log(id);
    try {
        await deleteSeance(id);
        return NextResponse.json({status: "Seance deleted"}, {status: 200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({error}, {status: 400});
    }
}


export async function PUT (request: NextRequest, {params}: {params: {id: string}}){
    const id = Number(params.id);
    const body = await request.json();
    const newSeance = new Seance(body.userId, new Date(body.date), body.sets);
    try {
        await updateSeance(newSeance, id);
        return NextResponse.json({status: "Seance updated"}, {status: 200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({error}, {status: 400});
    }
}

