import { PrismaClient } from "@prisma/client";
import { Seance } from "@/class/seance";
import { Set } from "@/class/set";



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
        throw new SeanceError('User not found');
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

    //test if user exists
    const user = await prisma.user.findUnique({
        where: {
            id: seance.userID
        }
    })

    if (user == null) {
        console.log("User not found")
        await prisma.$disconnect();
        throw  new SeanceError('User not found');
    }


    //test if seance exists
    const seanceTest = await prisma.seance.findUnique({
        where: {
            id: id
        }
    })

    if (seanceTest == null) {
        console.log("Seance not found")
        await prisma.$disconnect();
        throw new SeanceError('Seance not found');
    }

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

    if (seance == null) {
        console.log("Seance not found")
        throw new SeanceError('Seance not found');
    }

    return seance;
}

//get all seances of a user
export async function getSeanceByUserId(id: number) {
    const prisma = new PrismaClient();
    //test if user exists
    const user = await prisma.user.findUnique({
        where: {
            id: id
        }
    })

    if (user == null) {
        console.log("User not found")
        await prisma.$disconnect();
        throw new SeanceError('User not found');
    }


    const seances = await prisma.seance.findMany({
        where: {
            userId: id
        }
    })
    await prisma.$disconnect();
    return seances;
}

//delete a seance by id
export async function deleteSeance(id: number) {
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
        throw new SeanceError('Seance not found');
    }

    //delete all the sets of the seance
    const sets = await prisma.set.deleteMany({
        where: {
            seanceId: id
        }
    })
    const deleteSeance = await prisma.seance.delete({
        where: {
            id: id
        }
    })
    console.log("Seance deleted with the id: ", deleteSeance.id)
    await prisma.$disconnect();
    return deleteSeance;
}


//create Error class for seance
export class SeanceError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'SeanceError';
    }
}




