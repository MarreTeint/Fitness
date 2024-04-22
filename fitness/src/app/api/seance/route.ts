import {NextRequest, NextResponse} from "next/server";
import { addSeance } from "@/prisma/SeanceManager";
import { Seance } from "@/class/seance";


export async function POST (request: NextRequest){
    const body = await request.json();
    console.log(body);
    const newSeance = new Seance(body.userId, new Date(body.date), []);
    console.log(newSeance);
    try {
        const seance = await addSeance(newSeance);
        return NextResponse.json(seance?.id, {status: 200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({error}, {status: 400});
    }
}