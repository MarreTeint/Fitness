import { PrismaClient } from "@prisma/client";
import { Seance } from "@/class/seance";
import { Set } from "@/class/set";

//add Set to a Seance
export async function addSetToSeance(seanceId: number, set: Set) {
    const prisma = new PrismaClient();
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
    const set = await prisma.set.findUnique({
        where: {
            id: id
        }
    })
    await prisma.$disconnect();
    return set;
}