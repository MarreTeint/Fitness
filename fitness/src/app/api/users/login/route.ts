import {NextRequest, NextResponse} from "next/server";
import { logUser,LogUserError } from "@/prisma/userManager";

//log user with email and password
export async function POST (request: NextRequest){
    if (!request.body) {
        return NextResponse.json({ error: 'Request body is empty' },{status: 400});
    }
    const body = await request.json();
    const { email, password} = body;

    try {
        const user = await logUser(email, password);
        return NextResponse.json(user, {status: 200});
    } catch (error) {
        if (error instanceof LogUserError) {
            return NextResponse.json({ error: error.message }, {status: 400});            
        }
        return NextResponse.json({error}, {status: 400});
    }

}

    