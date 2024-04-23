import { PrismaClient } from "@prisma/client";
import { Seance } from "@/class/seance";
import { Set } from "@/class/set";


// TODO : correct prisma client number of connections
export async function addSeance(seance: Seance) {
    const prisma = new PrismaClient();
    //test if user exists
    const user = await prisma.user.findUnique({
        where: {
            id: seance.userID
        }
    })

    if (user == null) {
        console.log("User not found")
        await prisma.$disconnect();
        return;
    }

    const createSeance = await prisma.seance.create({
        data: {
            userId: seance.userID,
            date: seance.date,
        }
    })
    console.log("Seance created with the id: ", createSeance.id)
    await prisma.$disconnect();
    return createSeance;

}

//update a seance
export async function updateSeance(seance: Seance, id: number) {
    const prisma = new PrismaClient();
    const updateSeance = await prisma.seance.update({
        where: {
            id: id
        },
        data: {
            userId: seance.userID,
            date: seance.date
        }
    })
    console.log("Seance updated with the id: ", updateSeance.id)
    await prisma.$disconnect();
    return updateSeance;
}

//get seance by id
export async function getSeanceById(id: number) {
    const prisma = new PrismaClient();
    const seance = await prisma.seance.findUnique({
        where: {
            id: id
        }
    })
    await prisma.$disconnect();
    return seance;
}

//get all seances of a user
export async function getSeanceByUserId(id: number) {
    const prisma = new PrismaClient();
    const seances = await prisma.seance.findMany({
        where: {
            userId: id
        }
    })
    await prisma.$disconnect();
    return seances;
}





