import {NextRequest, NextResponse} from "next/server";
import { addSetToSeance,getSetsFromSeance} from "@/prisma/SeanceManager";
import { Set } from "@/class/set";

export async function POST (request: NextRequest, {params}: {params: {id: string}}){
    const id = Number(params.id);
    const data = await request.json();
    const newSet = new Set([], [], data.exerciseID);
    try {
        await addSetToSeance(id, newSet);
        return NextResponse.json({status: "Set added to seance"}, {status: 200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({error}, {status: 400});
    }
}

//get all sets from a seance
export async function GET (request: NextRequest, {params}: {params: {id: string}}){
    const id = Number(params.id);
    console.log(id);
    try {
        const sets = await getSetsFromSeance(id);
        return NextResponse.json(sets, {status: 200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({error}, {status: 400});
    }
}

