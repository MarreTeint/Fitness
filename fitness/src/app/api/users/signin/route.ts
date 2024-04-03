import {NextRequest, NextResponse} from "next/server";
import { addUser ,addUserError} from "@/prisma/userManager";

//add user with email and password and username
export async function POST (request: NextRequest){

 
    const body = await request.json();
    const { email, password, username } = body;

    if (!email || !password || !username) {
        return NextResponse.json({ error: 'Email, password, and username are required' },{status: 400});
    }

    try {
        const user = await addUser(email, password, username);
        return NextResponse.json(user, {status: 200});
    } catch (error) {
        if (error instanceof addUserError) {
            return NextResponse.json({ error: error.message }, {status: 400});            
        }
        return NextResponse.json({error}, {status: 400});
    }
}