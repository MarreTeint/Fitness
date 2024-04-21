import { PrismaClient } from "@prisma/client";
import { BodyPart } from "@/class/bodyPart";
import 'dotenv/config';

export async function seedBodyPart() {
    const prisma = new PrismaClient();
    
    // BODY PARTS
    for (let index = 0; index < Object.keys(BodyPart).length / 2; index++) {
        const createBodyPart = await prisma.bodyPart.create({
            data: {
                id: index,
                name: BodyPart[index]
            }
        })
        console.log("Body parts created with the ids: ", createBodyPart.id)
    }
    

    

    await prisma.$disconnect();
}