import {NextRequest, NextResponse} from "next/server";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

//add user with email and password and username
export async function POST (request: NextRequest){

 
    const body = await request.json();
    const { email, password, username } = body;

    if (!email || !password || !username) {
        return NextResponse.json({ error: 'Email, password, and username are required' },{status: 400});
    }

    //check if user exists in the database
    const userTest = await prisma.user.findFirst({
        where: {
            email: email
        }
    })

    if(userTest){
        return NextResponse.json({ error: 'User already exists' },{status: 400});
    }

    //check if username exists in the database
    const usernameTest = await prisma.user.findFirst({
        where: {
            username: username
        }
    })

    if(usernameTest){
        return NextResponse.json({ error: 'Username already exists' },{status: 400});
    }

    const user = await prisma.user.create({
        data: {
            email,
            password,
            username
        }
    })
    return NextResponse.json(user)
}