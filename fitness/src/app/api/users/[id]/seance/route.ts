import {NextRequest, NextResponse} from "next/server";
import {getSeanceByUserId} from "@/prisma/SeanceManager";

export async function GET (request: NextRequest, {params}: {params: {id: string}}){   
    console.log(params.id);
    try {
        const seances = await getSeanceByUserId(parseInt(params.id));
        return NextResponse.json(seances, {status: 200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({error}, {status: 400});
    }
}