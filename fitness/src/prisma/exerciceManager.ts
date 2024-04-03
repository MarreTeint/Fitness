import { PrismaClient } from "@prisma/client";
import 'dotenv/config';
const prisma = new PrismaClient();

export  async function seedExercice() {
    // EXERCICES

    // First, we drop the exercices
    const deleteAllExercices = await prisma.exercice.deleteMany({})

    // Second, we create a list of names of exercices
    // TODO base this on the a class function that returns the list of exercices
    const exerciceNameList = [
        { 
            name: "Bench Press",
            description: "The bench press is a compound exercise that targets the pectoral muscles, triceps, and deltoids.",
            muscularGroupId: 2, // Pectorals
            bodyPartId: 2 // Chest
        },
        { 
            name: "Deadlift",
            description: "The deadlift is a full-body exercise that primarily targets the lower back, glutes, hamstrings, and forearms.",
            muscularGroupId: 1, // Latissimus and Erector Spinae
            bodyPartId: 1 // Back
        },
        // Add descriptions and body parts for other exercises...
    ];
    
    // Third, we loop on the list and create the exercises in the database
    for (let i = 0; i < exerciceNameList.length; i++) {
        const exercise = exerciceNameList[i];
        
        // Assuming you have access to `prisma`
        const createExercise = await prisma.exercice.create({
            data: {
                name: exercise.name,
                description: exercise.description,
                firstMuscularGroup: {
                    connect: { id: exercise.muscularGroupId }
                },
                bodyPart: {
                    connect: { id: exercise.bodyPartId }
                }
            }
        });
        console.log("Exercise created: ", createExercise);
    }
    
    await prisma.$disconnect();
}





