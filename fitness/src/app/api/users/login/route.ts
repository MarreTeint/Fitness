import {NextRequest, NextResponse} from "next/server";
import { logUserUseCase } from "@/usecase/UserUseCase";

//log user with email and password
export async function POST (request: NextRequest){
    return await logUserUseCase(request);
}

    