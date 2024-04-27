import { PrismaClient } from "@prisma/client";
import { Seance } from "@/class/seance";
import { Set } from "@/class/set";

//add Set to a Seance
export async function addSetToSeance(seanceId: number, set: Set) {
    const prisma = new PrismaClient();
    //test if seance exists
    const seance = await prisma.seance.findUnique({
        where: {
            id: seanceId
        }
    })
    if (seance == null) {
        console.log("Seance not found")
        await prisma.$disconnect();
        throw new SetError('Seance not found');
    }

    const createSet = await prisma.set.create({
        data: {
            reps: set.getReps(),
            weight: set.getWeight(),
            exerciseId: set.exerciseID,
            seanceId: seanceId
        }
    })
    console.log("Set created with the id: ", createSet.id)
    await prisma.$disconnect();
    return createSet;
}

//update a set
export async function updateSet(set: Set, id: number) {
    const prisma = new PrismaClient();
    //test if set exists
    const setTest = await prisma.set.findUnique({
        where: {
            id: id
        }
    })

    if (setTest == null) {
        console.log("Set not found")
        await prisma.$disconnect();
        throw new SetError('Set not found');
    }


    const updateSet = await prisma.set.update({
        where: {
            id: id
        },
        data: {
            reps: set.getReps(),
            weight: set.getWeight(),
            exerciseId: set.exerciseID
        }
    })
    console.log("Set updated with the id: ", updateSet.id)
    await prisma.$disconnect();
    return updateSet;
}

//get all sets of a seance
export async function getSetBySeanceId(id: number) {
    const prisma = new PrismaClient();
    //test if seance exists
    const seance = await prisma.seance.findUnique({
        where: {
            id: id
        }
    })

    if (seance == null) {
        console.log("Seance not found")
        await prisma.$disconnect();
        throw new SetError('Seance not found');
    }
    const sets = await prisma.set.findMany({
        where: {
            seanceId: id
        }
    })
    await prisma.$disconnect();
    return sets;
}

//get set by id
export async function getSetById(id: number) {
    const prisma = new PrismaClient();
    //test if set exists
    const set = await prisma.set.findUnique({
        where: {
            id: id
        }
    })
    await prisma.$disconnect();
    return set;
}

//delete a set by id
export async function deleteSet(id: number) {
    const prisma = new PrismaClient();
    //test if set exists
    const set = await prisma.set.findUnique({
        where: {
            id: id
        }
    })

    if (set == null) {
        console.log("Set not found")
        await prisma.$disconnect();
        throw new SetError('Set not found');
    }

    const deletedSet = await prisma.set.delete({
        where: {
            id: id
        }
    })
    await prisma.$disconnect();
    return deletedSet;
}


//create a set error
export class SetError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "SetError";
    }
}