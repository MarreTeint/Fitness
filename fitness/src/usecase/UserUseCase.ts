import { logUser,addUser,deleteUser,getUser,getUsers,updateUser, LogUserError, UserError, addUserError } from "@/prisma/userManager";
import { NextRequest,NextResponse } from "next/server";

export async function logUserUseCase(request: NextRequest): Promise<NextResponse> {
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

export async function signinUserUseCase(request: NextRequest): Promise<NextResponse> {

 
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

export async function updateUserUseCase(request: NextRequest): Promise<NextResponse> {
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

export async function deleteUserUseCase(request: NextRequest): Promise<NextResponse> {
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

export async function getUsersUseCase(request: NextRequest): Promise<NextResponse> {
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