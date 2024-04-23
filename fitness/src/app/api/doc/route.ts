import {NextRequest, NextResponse} from "next/server";

export async function GET(request: NextRequest){
    const doc = {
        swagger: "3.0",
        info: {
            title: "Fitness API Documentation",
            version: "1.0.0"
        }
    }

    return NextResponse.json(doc, {status: 200});
}