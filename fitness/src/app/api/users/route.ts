import {NextRequest, NextResponse} from "next/server";
import { deleteUser,getUser,getUsers,updateUser ,UserError} from "@/prisma/userManager";



export async function GET (request: NextRequest){
    console.log(request.url)
    const url = new URL(request.url, 'http://localhost'); // Add a base URL for relative URLs
    const id = Number(url.searchParams.get('id'));

    if (!id) {
        try {
            const users = await getUsers();
            return NextResponse.json(users, {status: 200});
        } catch (error) {
            if (error instanceof UserError) {
                return NextResponse.json({ error: error.message }, {status: 400});            
            }
            return NextResponse.json({error}, {status: 400});

        }
    }else{
        try {
            const user = await getUser(id);
            return NextResponse.json(user, {status: 200});
        } catch (error) {
            if (error instanceof UserError) {
                return NextResponse.json({ error: error.message }, {status: 400});            
            }
            return NextResponse.json({error}, {status: 400});
        }
    }

}


export async function DELETE (request: NextRequest){
    const url = new URL(request.url, 'http://localhost'); // Add a base URL for relative URLs
    const id = Number(url.searchParams.get('id')) ;
    //const id = Number(id);

    if (!id) {
        return NextResponse.json({ error: 'ID is required' },{status: 400});
    }

    try {
        const user = await deleteUser(id);
        return NextResponse.json(user, {status: 200});
    } catch (error) {
        if (error instanceof UserError) {
            return NextResponse.json({ error: error.message }, {status: 400});            
        }
        return NextResponse.json({error}, {status: 400});
    }
}

export async function PUT (request: NextRequest){
    const url = new URL(request.url, 'http://localhost'); // Add a base URL for relative URLs
    const id = Number(url.searchParams.get('id'));
    const email = url.searchParams.get('email');
    const password = url.searchParams.get('password');
    const username = url.searchParams.get('username');

    if (!id || !email || !password || !username) {
        return NextResponse.json({ error: 'ID, email, password, and username are required' },{status: 400});
    }

    try {
        const user = await updateUser(id, email, password, username);
        return NextResponse.json(user, {status: 200});
    } catch (error) {
        if (error instanceof UserError) {
            return NextResponse.json({ error: error.message }, {status: 400});            
        }
        return NextResponse.json({error}, {status: 400});
    }
}

