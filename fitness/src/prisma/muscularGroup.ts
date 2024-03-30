import { PrismaClient } from "@prisma/client";
import 'dotenv/config';

export async function seedMuscularGroup() {
    const prisma = new PrismaClient();
    
    // MUSCULAR GROUPS

    // First, we drop the muscular groups
    const deleteAllMuscularGroups = await prisma.muscularGroup.deleteMany({})

    // Second, we create a list of names of muscular groups
    // TODO base this on the a class function that returns the list of muscular groups
    //const bodyPartNameList = ["arm", "back", "chest", "core", "leg", "shoulder"]
    const muscularGroupNameList = [
        { name: "biceps", bodyPartId: 0},
        { name: "triceps", bodyPartId: 0 },
        { name: "deltoids", bodyPartId: 1 },
        { name: "pectorals", bodyPartId: 2 },
        { name: "latissimus", bodyPartId: 4 }
        // { name: "erector", bodyPartId: 5 },
        // { name: "quadriceps", bodyPartId: 6 },
        // { name: "hamstrings", bodyPartId: 6 },
        // { name: "calves", bodyPartId: 7 },
        // { name: "glutes", bodyPartId: 8 },
        // { name: "abdominals", bodyPartId: 9 },
        // { name: "obliques", bodyPartId: 9 },
        // { name: "trapezius", bodyPartId: 10 },
        // { name: "rhomboids", bodyPartId: 10 },
        // { name: "forearms", bodyPartId: 1 }
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