import { PrismaClient } from "@prisma/client";
import 'dotenv/config';

export async function seedMuscularGroup() {
    const prisma = new PrismaClient();
    
    // MUSCULAR GROUPS

    // First, we drop the muscular groups
    const deleteAllMuscularGroups = await prisma.muscularGroup.deleteMany({})

    // Second, we create a list of names of muscular groups
    // TODO base this on the a class function that returns the list of muscular groups
    //const bodyPartNameList = ["arm", "back", "chest", "core", "leg", "shoulder"];
    const muscularGroupNameList = [
        { name: "biceps", bodyPartId: 0 },
        { name: "triceps", bodyPartId: 0 },
        { name: "deltoids", bodyPartId: 5 }, 
        { name: "pectorals", bodyPartId: 2 },
        { name: "latissimus", bodyPartId: 1 }, 
        { name: "erector", bodyPartId: 3 },
        { name: "quadriceps", bodyPartId: 4 },
        { name: "hamstrings", bodyPartId: 4 },
        { name: "calves", bodyPartId: 4 },
        { name: "glutes", bodyPartId: 4 },
        { name: "abdominals", bodyPartId: 3 },
        { name: "obliques", bodyPartId: 3 }, 
        { name: "trapezius", bodyPartId: 1 }, 
        { name: "rhomboids", bodyPartId: 1 }, 
        { name: "forearms", bodyPartId: 0 } ,
        { name: "trapezius", bodyPartId: 5 }, // Trapezius, upper fibers primarily
        { name: "rotator cuff muscles", bodyPartId: 5 }, // Includes supraspinatus, infraspinatus, teres minor, and subscapularis
        { name: "levator scapulae", bodyPartId: 5 }, // Levator scapulae, helps elevate the scapula
        { name: "rhomboids", bodyPartId: 5 }, // Rhomboids, both major and minor
        { name: "teres major", bodyPartId: 5 }, // Teres major, assists in arm movements
        { name: "serratus anterior", bodyPartId: 5 } 
    ];

    // Third, we loop on the list and create the muscular groups in the database (note that we use fixed ids here since those datas are constants)
    for (let index = 0; index < muscularGroupNameList.length; index++) {
        const createMuscularGroup = await prisma.muscularGroup.create({
            data: {
                id: index,
                name: muscularGroupNameList[index].name,
                bodyPartId: muscularGroupNameList[index].bodyPartId
            }
        })
        console.log("Muscular groups created with the ids: ", createMuscularGroup.id)
    }

    await prisma.$disconnect();
}