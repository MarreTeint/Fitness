import {prisma} from './prismaClientSingleton';
import 'dotenv/config';
import { deleteSeance } from "./SeanceManager";

export async function logUser(email: string, password: string): Promise<{username: string, email: string, id: number}> {

    
    const user = await prisma.user.findFirst({
        where: {
            email: email
        }
    })
    

    if(!user){
        throw new LogUserError('User unknow');
    }

    if(user.password === password){
        return { username: user.username , id : user.id , email :user.email};
    }
    throw new LogUserError('Email or password is incorrect');

    
}

export async function addUser(email: string, password: string, username: string): Promise<{username: string, email: string, id: number}> {
    
    const userTest = await prisma.user.findFirst({
        where: {
            email: email
        }
    })

    if(userTest){
        
        throw new addUserError('User already exists');
    }

    const usernameTest = await prisma.user.findFirst({
        where: {
            username: username
        }
    })

    if(usernameTest){
        
        throw new addUserError('Username already exists');
       
    }

    const user = await prisma.user.create({
        data: {
            email,
            password,
            username
        }
    })
    
    return {username: user.username, email: user.email, id: user.id};
}

export async function deleteUser(id: number) : Promise<{username: string, email: string, id: number}> {
    
    const user = await prisma.user.findFirst({
        where: {
            id: id
        }
    })

    if(!user){
        
        throw new UserError('User does not exist');
    }

    //get all id of user's seances and usit in deleteSeance
    const seances = await prisma.seance.findMany({
        where: {
            userId: id
        }
    })

    for (let i = 0; i < seances.length; i++) {
        await deleteSeance(seances[i].id);
    }
   
    



    const deletedUser = await prisma.user.delete({
        where: {
            id: id
        }
    })
    
    return {username: deletedUser.username, email: deletedUser.email, id: deletedUser.id};
}

export async function getUser(id: number) : Promise<{username: string, email: string, id: number}> {
    
    const user = await prisma.user.findFirst({
        where: {
            id: id
        }
    })
    

    if(!user){
       
        throw new UserError('User does not exist');
    }

    return {username: user.username, email: user.email, id: user.id};
}

export async function getUsers() : Promise<{username: string, email: string, id: number}[]> {
    
    const users = await prisma.user.findMany();
    
    //return all users fields except password
    return users.map((user:any) => {
        return {username: user.username, email: user.email, id: user.id};
    })
}

export async function updateUser(id: number, email: string, password: string, username: string): Promise<{username: string, email: string, id: number}> {
    
    const user = await prisma.user.findFirst({
        where: {
            id: id
        }
    })

    if(!user){
        
        throw new UserError('User does not exist');
    }

    const updatedUser = await prisma.user.update({
        where: {
            id: id
        },
        data: {
            email,
            password,
            username
        }
    })
    
    return {username: updatedUser.username, email: updatedUser.email, id: updatedUser.id};
}


export class UserError extends Error { 
    message: string; 
    constructor(error: string) {
        super(error);
        this.message = error;
    }  
}

export class LogUserError extends UserError {

    constructor(error: string) {
        super(error);
        //this.message = error;

    }
}

export class addUserError extends UserError {
    constructor(error: string) {
        super(error);
        //this.message = error;
    }
}












