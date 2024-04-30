import { logUser,addUser,deleteUser,getUser,getUsers,updateUser, LogUserError, UserError, addUserError } from "@/prisma/userManager";
import { logUserSchema ,signinUserSchema,updateUserSchema,OutUserSchema,OutUsersSchema} from "@/schema/userSchema";
import { NextRequest,NextResponse } from "next/server";

export async function logUserUseCase(request: NextRequest): Promise<NextResponse> {
    if (!request.body) {
        return NextResponse.json({ error: 'Request body is empty' },{status: 400});
    }
    let  body 
    try {
        body  = await request.json();
    } catch (error) {
        return NextResponse.json({ error: 'Invalid format' },{status: 400});
        
    }
    const {error} =logUserSchema.validate(body);
    if (error) {
        return NextResponse.json({ error: error.message },{status: 400});
    }

   
    const { email, password} = body;

    try {
        const user = await logUser(email, password);
        const {error} = OutUserSchema.validate(user);

        if (error) {
            return NextResponse.json({ error: error.message },{status: 500});
        }
        
        return NextResponse.json(user, {status: 200});
    } catch (error) {
        if (error instanceof LogUserError) {
            return NextResponse.json({ error: error.message }, {status: 400});            
        }
        return NextResponse.json({error}, {status: 500});
    }
}

export async function signinUserUseCase(request: NextRequest): Promise<NextResponse> {

 
    let  body 
    try {
        body = await request.json();
    } catch (error) {
        return NextResponse.json({ error: 'Invalid format' },{status: 400});
        
    }

    const {error} =signinUserSchema.validate(body);
    if (error) {
        return NextResponse.json({ error: error.message },{status: 400});
    }

    const { email, password, username } = body;

    if (!email || !password || !username) {
        return NextResponse.json({ error: 'Email, password, and username are required' },{status: 400});
    }

    try {
        const user = await addUser(email, password, username);

        const {error} = OutUserSchema.validate(user);

        if (error) {
            return NextResponse.json({ error: error.message },{status: 500});
        }


        return NextResponse.json(user, {status: 201});
    } catch (error) {
        if (error instanceof addUserError) {
            return NextResponse.json({ error: error.message }, {status: 400});            
        }
        return NextResponse.json({error}, {status: 500});
    }
}

export async function updateUserUseCase(request: NextRequest): Promise<NextResponse> {
    let  body
    try {
        body = await request.json();
    } catch (error) {
        return NextResponse.json({ error: 'Invalid format' },{status: 400});
        
    }

    const {error} =updateUserSchema.validate(body);
    if (error) {
        return NextResponse.json({ error: error.message },{status: 400});
    }

    const { id, email, password, username } = body;



    if (!id || !email || !password || !username) {
        return NextResponse.json({ error: 'ID, email, password, and username are required' },{status: 400});
    }

    try {
        const user = await updateUser(parseInt(id), email, password, username);

        const {error} = OutUserSchema.validate(user);

        if (error) {
            return NextResponse.json({ error: error.message },{status: 500});
        }

        return NextResponse.json(user, {status: 201});
    } catch (error) {
        if (error instanceof UserError) {
            return NextResponse.json({ error: error.message }, {status: 400});            
        }
        return NextResponse.json({error}, {status: 500});
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

        const {error} = OutUserSchema.validate(user);

        if (error) {
            return NextResponse.json({ error: error.message },{status: 500});
        }

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

            const {error} = OutUsersSchema.validate(users);

            if (error) {
                return NextResponse.json({ error: error.message },{status: 500});
            }

            return NextResponse.json(users, {status: 200});
        } catch (error) {
            if (error instanceof UserError) {
                return NextResponse.json({ error: error.message }, {status: 400});            
            }
            return NextResponse.json({error}, {status: 500});

        }
    }else{
        try {
            const user = await getUser(id);

            const {error} = OutUsersSchema.validate([user]);

            if (error) {
                return NextResponse.json({ error: error.message },{status: 500});
            }

            
            
            return NextResponse.json([user], {status: 200});
        } catch (error) {
            if (error instanceof UserError) {
                return NextResponse.json({ error: error.message }, {status: 400});            
            }
            return NextResponse.json({error}, {status: 500});
        }
    }

}