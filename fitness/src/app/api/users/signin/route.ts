import {NextRequest, NextResponse} from "next/server";
import { addUser ,addUserError} from "@/prisma/userManager";
import { signinUserUseCase } from "@/usecase/UserUseCase";

//add user with email and password and username
export async function POST (request: NextRequest){
    return await signinUserUseCase(request);
}