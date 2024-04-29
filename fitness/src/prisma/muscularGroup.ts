import {prisma} from './prismaClientSingleton';
import { muscularGroups } from "@/class/muscularGroup";
import 'dotenv/config';

export async function seedMuscularGroup() {
    
    
    // MUSCULAR GROUPS

    // First, we drop the muscular groups
    await prisma.muscularGroup.deleteMany();

    // Then, we recreate them
    for (let index = 0; index < muscularGroups.length; index++) {
        const createMuscularGroup = await prisma.muscularGroup.create({
            data: {
                id: index,
                name: muscularGroups[index].name,
                bodyPartId : muscularGroups[index].bodyPart.valueOf()
                
            }
        })
        console.log("Muscular groups created with the ids: ", createMuscularGroup.id)
    }
    
    
}