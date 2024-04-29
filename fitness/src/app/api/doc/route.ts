import {NextRequest, NextResponse} from "next/server";
import fs from "fs";

export async function GET(request: NextRequest){
    const doc = require("./doc.json");

    return NextResponse.json(doc, {status: 200});
}