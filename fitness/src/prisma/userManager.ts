import { PrismaClient } from "@prisma/client";
import 'dotenv/config';

export async function logUser(email: string, password: string): Promise<{username: string, email: string, id: number}> {

    const prisma = new PrismaClient();
    const user = await prisma.user.findFirst({
        where: {
            email: email
        }
    })
    prisma.$disconnect();

    if(!user){
        throw new LogUserError('User unknow');
    }

    if(user.password === password){
        return { username: user.username , id : user.id , email :user.email};
    }
    throw new LogUserError('Email or password is incorrect');

    
}

export async function addUser(email: string, password: string, username: string): Promise<{username: string, email: string, id: number}> {
    const prisma = new PrismaClient();
    const userTest = await prisma.user.findFirst({
        where: {
            email: email
        }
    })

    if(userTest){
        prisma.$disconnect();
        throw new addUserError('User already exists');
    }

    const usernameTest = await prisma.user.findFirst({
        where: {
            username: username
        }
    })

    if(usernameTest){
        prisma.$disconnect();
        throw new addUserError('Username already exists');
       
    }

    const user = await prisma.user.create({
        data: {
            email,
            password,
            username
        }
    })
    prisma.$disconnect();
    return {username: user.username, email: user.email, id: user.id};
}

export async function deleteUser(id: number) : Promise<{username: string, email: string, id: number}> {
    const prisma = new PrismaClient();
    const user = await prisma.user.findFirst({
        where: {
            id: id
        }
    })

    if(!user){
        prisma.$disconnect();
        throw new UserError('User does not exist');
    }

    const deletedUser = await prisma.user.delete({
        where: {
            id: id
        }
    })
    prisma.$disconnect();
    return {username: deletedUser.username, email: deletedUser.email, id: deletedUser.id};
}

export async function getUser(id: number) : Promise<{username: string, email: string, id: number}> {
    const prisma = new PrismaClient();
    const user = await prisma.user.findFirst({
        where: {
            id: id
        }
    })
    prisma.$disconnect();

    if(!user){
       
        throw new UserError('User does not exist');
    }

    return {username: user.username, email: user.email, id: user.id};
}

export async function getUsers() : Promise<{username: string, email: string, id: number}[]> {
    const prisma = new PrismaClient();
    const users = await prisma.user.findMany();
    prisma.$disconnect();
    return users;
}

export async function updateUser(id: number, email: string, password: string, username: string): Promise<{username: string, email: string, id: number}> {
    const prisma = new PrismaClient();
    const user = await prisma.user.findFirst({
        where: {
            id: id
        }
    })

    if(!user){
        prisma.$disconnect();
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
    prisma.$disconnect();
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












