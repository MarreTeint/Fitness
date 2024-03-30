import { PrismaClient } from "@prisma/client";
import 'dotenv/config';

export async function seedBodyPart() {
    const prisma = new PrismaClient();
    
    // BODY PARTS

    // First, we drop the body parts
    const deleteAllBodyParts = await prisma.bodyPart.deleteMany({})

    // Second, we create a list of names of body parts
    // TODO base this on the a class function that returns the list of body parts
    const bodyPartNameList = ["arm", "back", "chest", "core", "leg", "shoulder"]

    // Third, we loop on the list and create the body parts in the database (note that we use fixed ids here since those datas are constants)
    for (let index = 0; index < bodyPartNameList.length; index++) {
        const createBodyPart = await prisma.bodyPart.create({
            data: {
                id: index,
                name: bodyPartNameList[index]
            }
        })
        console.log("Body parts created with the ids: ", createBodyPart.id)
    }

    await prisma.$disconnect();
}