import {NextRequest, NextResponse} from "next/server";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

//add user with email and password and username
export async function POST (request: NextRequest){
    if (!request.body) {
        return NextResponse.json({ error: 'Request body is empty' },{status: 400});
    }
    const body = await request.json();
    const { email, password} = body;

    if (!email || !password) {
        return NextResponse.json({ error: 'Email and password are required' },{status: 400});
    }
    //check if user exists in the database
    const user = await prisma.user.findFirst({
        where: {
            email: email
        }
    })

    if(!user){
        return NextResponse.json({ error: 'User unkno' },{status: 400});
    }

    //check if password is correct
    if(user.password === password){
        //return user username
        return NextResponse.json({ username: user.username });
    }
    return NextResponse.json({ error: 'Email or password is incorrect' },{status: 400});
}

    