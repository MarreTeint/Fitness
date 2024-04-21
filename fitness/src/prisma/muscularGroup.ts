import { PrismaClient } from "@prisma/client";
import { MuscularGroups } from "@/class/muscularGroup";
import 'dotenv/config';

export async function seedMuscularGroup() {
    const prisma = new PrismaClient();
    
    // MUSCULAR GROUPS

    // First, we drop the muscular groups
    await prisma.muscularGroup.deleteMany();

    // Then, we recreate them
    for (let index = 0; index < MuscularGroups.length; index++) {
        const createMuscularGroup = await prisma.muscularGroup.create({
            data: {
                id: index,
                name: MuscularGroups[index].name,
                bodyPartId : MuscularGroups[index].bodyPart.valueOf()
                
            }
        })
        console.log("Muscular groups created with the ids: ", createMuscularGroup.id)
    }
    
    await prisma.$disconnect();
}