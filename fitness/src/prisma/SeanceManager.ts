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

export async function deleteSeance(id: number) {
    const prisma = new PrismaClient();
    const deleteSeance = await prisma.seance.delete({
        where: {
            id: id
        }
    })
    console.log("Seance deleted with the id: ", deleteSeance.id)
    await prisma.$disconnect();
}

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

export async function getSeanceByUserId(userId: number) {
    const prisma = new PrismaClient();
    const seance = await prisma.seance.findMany({
        where: {
            userId: userId
        }
    })
    await prisma.$disconnect();
    
    return seance;
}

export async function updateSeance(seance: Seance,id: number) {
    const prisma = new PrismaClient();
    const updateSeance = await prisma.seance.update({
        where: {
            id: id
        },
        data: {
            userId: seance.userID,
            date: seance.date,
        }
    })
    console.log("Seance updated with the id: ", updateSeance.id)
    await prisma.$disconnect();
}

//add a set to a seance
export async function addSetToSeance(seanceId: number, set: Set) {
    const prisma = new PrismaClient();
    const createSet = await prisma.set.create({
        data: {
            seanceId: seanceId,
            exerciseId: set.exerciseID,
        }
    })
    console.log("Set created with the id: ", createSet.id)
    await prisma.$disconnect();
    return createSet;

}

//delete a set from a seance
export async function deleteSet(setId: number) {
    const prisma = new PrismaClient();
    const deleteSet = await prisma.set.delete({
        where: {
            id: setId
        }
    })
    console.log("Set deleted with the id: ", deleteSet.id)
    await prisma.$disconnect();
}

//get all sets from a seance
export async function getSetsFromSeance(seanceId: number) {
    const prisma = new PrismaClient();
    const sets = await prisma.set.findMany({
        where: {
            seanceId: seanceId
        }
    })
    await prisma.$disconnect();
    return sets;
}

//add reps to a set in a seance
export async function addRepsToSet(setId: number, reps: number, weight: number) {
    const prisma = new PrismaClient();
    const updateSet = await prisma.set.update({
        where: {
            id: setId
        },
        data: {
            reps: {
                create: [
                    {
                        reps: reps,
                        weight: weight
                    }
                ]
            },
        }
    })
    console.log("Set updated with the id: ", updateSet.id)
    await prisma.$disconnect();
}


