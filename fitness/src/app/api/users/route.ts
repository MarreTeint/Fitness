import {NextRequest, NextResponse} from "next/server";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


export async function GET (request: NextRequest){
    console.log(request.url)
    const url = new URL(request.url, 'http://localhost'); // Add a base URL for relative URLs
    const id = url.searchParams.get('id');
    console.log("id:", id)
    if (id) {
        const user = await prisma.user.findUnique({
            where: {
                id: Number(id)
            }
        })
        if (user) {
            return NextResponse.json(user)
        } else {
            return NextResponse.json({ error: 'User does not exist' },{status: 400});
        }
    } else {
        const users = await prisma.user.findMany()
        return NextResponse.json(users)
    }
}

//delete user with id
export async function DELETE (request: NextRequest){
    const url = new URL(request.url, 'http://localhost'); // Add a base URL for relative URLs
    const id = url.searchParams.get('id');

     //check if user exists in the database
     const user = await prisma.user.findUnique({
        where: {
            id: Number(id)
        }
    })

    if(!user){
        return NextResponse.json({ error: 'User does not exist' },{status: 400});
    }


    if (id) {
        const user = await prisma.user.delete({
            where: {
                id: Number(id)
            }
        })
        return NextResponse.json(user)
    } else {
        return NextResponse.json({ error: 'User id is required' },{status: 400});
    }
}

