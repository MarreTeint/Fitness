import {NextRequest} from "next/server";
import { updateUserUseCase, deleteUserUseCase, getUsersUseCase } from "@/usecase/UserUseCase";




export async function GET (request: NextRequest){
    getUsersUseCase(request);
}


export async function DELETE (request: NextRequest){
  return await deleteUserUseCase(request);
}

export async function PUT (request: NextRequest){
    return await updateUserUseCase(request);
  
}

