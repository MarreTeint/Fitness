import { PrismaClient } from "@prisma/client";
import { BaseExercices } from "@/class/exercice";
import 'dotenv/config';


export  async function seedExercice() {
    const prisma = new PrismaClient();
    // EXERCICES

    // First, we drop the exercices
    await prisma.exercice.deleteMany();

    // Then, we recreate them
    for (let index = 0; index < BaseExercices.length; index++) {
        const createExercice = await prisma.exercice.create({
            data: {
                id: index,
                name: BaseExercices[index].name,
                description: BaseExercices[index].description,
                firstMuscularGroupId: BaseExercices[index].firstMuscularGroup.id,
                secondMuscularGroupId: BaseExercices[index].secondMuscularGroup?.id ?? null,
                thirdMuscularGroupId: BaseExercices[index].thirdMuscularGroup?.id ?? null,
                bodyPartId: BaseExercices[index].bodyPart.valueOf(),
                
            }
        })
        console.log("Exercices created with the ids: ", createExercice.id)
    }



    
    
    await prisma.$disconnect();
}

//add an exercice to the list
export async function addExercice(name: string, description: string, firstMuscularGroupId: number, secondMuscularGroupId: number|undefined, thirdMuscularGroupId: number|undefined, bodyPartId: number) {
    const prisma = new PrismaClient();

    //test if the exercice already exists
    const exerciceTest = await prisma.exercice.findFirst({
        where: {
            name: name
        }
    })

    if(exerciceTest){
        await prisma.$disconnect();
        throw new ExerciceError('Exercice already exists');
    }

    //test if the muscular groups exist
    const firstMuscularGroup = await prisma.muscularGroup.findFirst({
        where: {
            id: firstMuscularGroupId
        }
    })

    if(!firstMuscularGroup){
        await prisma.$disconnect();
        throw new ExerciceError('First muscular group does not exist');
    }

    //test if the second muscular group exists
    if(secondMuscularGroupId){
        const secondMuscularGroup = await prisma.muscularGroup.findFirst({
            where: {
                id: secondMuscularGroupId
            }
        })

        if(!secondMuscularGroup){
            await prisma.$disconnect();
            throw new ExerciceError('Second muscular group does not exist');
        }
    }


    //test if the third muscular group exists
    if(thirdMuscularGroupId){
        const thirdMuscularGroup = await prisma.muscularGroup.findFirst({
            where: {
                id: thirdMuscularGroupId
            }
        })

        if(!thirdMuscularGroup){
            await prisma.$disconnect();
            throw new ExerciceError('Third muscular group does not exist');
        }
    }


    //test if the body part exists
    const bodyPart = await prisma.bodyPart.findFirst({
        where: {
            id: bodyPartId
        }
    })

    if(!bodyPart){
        await prisma.$disconnect();
        throw new ExerciceError('Body part does not exist');
    }


    const createExercice = await prisma.exercice.create({
        data: {
            name: name,
            description: description,
            firstMuscularGroupId: firstMuscularGroupId,
            secondMuscularGroupId: secondMuscularGroupId,
            thirdMuscularGroupId: thirdMuscularGroupId,
            bodyPartId: bodyPartId,
        }
    })
    console.log("Exercice created with the id: ", createExercice.id)
    await prisma.$disconnect();
}

//delete an exercice from the list
export async function deleteExercice(id: number) {
    const prisma = new PrismaClient();

    //test if the exercice exists
    const exerciceTest = await prisma.exercice.findFirst({
        where: {
            id: id
        }
    })

    if(!exerciceTest){
        await prisma.$disconnect();
        throw new ExerciceError('Exercice does not exist');
    }

    await prisma.set.deleteMany({
        where: {
            exerciseId: id
        }
    })
    const deleteExercice = await prisma.exercice.delete({
        where: {
            id: id
        }
    })
    console.log("Exercice deleted with the id: ", deleteExercice.id)
    await prisma.$disconnect();
}

export async function updateExercice(id: number, name: string, description: string, firstMuscularGroupId: number, secondMuscularGroupId: number|undefined, thirdMuscularGroupId: number|undefined, bodyPartId: number) {
    const prisma = new PrismaClient();

    //test if the exercice exists
    const exerciceTest = await prisma.exercice.findFirst({
        where: {
            id: id
        }
    })

    if(!exerciceTest){
        await prisma.$disconnect();
        throw new ExerciceError('Exercice does not exist');
    }

    //test if the muscular groups exist
    const firstMuscularGroup = await prisma.muscularGroup.findFirst({
        where: {
            id: firstMuscularGroupId
        }
    })

    if(!firstMuscularGroup){
        await prisma.$disconnect();
        throw new ExerciceError('First muscular group does not exist');
    }
  


    //test if the second muscular group exists
    if(secondMuscularGroupId){
        const secondMuscularGroup = await prisma.muscularGroup.findFirst({
            where: {
                id: secondMuscularGroupId
            }
        })

        if(!secondMuscularGroup){
            await prisma.$disconnect();
            throw new ExerciceError('Second muscular group does not exist');
        }
    }

    //test if the third muscular group exists
    if(thirdMuscularGroupId){
        const thirdMuscularGroup = await prisma.muscularGroup.findFirst({
            where: {
                id: thirdMuscularGroupId
            }
        })

        if(!thirdMuscularGroup){
            await prisma.$disconnect();
            throw new ExerciceError('Third muscular group does not exist');
        }
    }


    //test if the body part exists
    const bodyPart = await prisma.bodyPart.findFirst({
        where: {
            id: bodyPartId
        }
    })

    if(!bodyPart){
        await prisma.$disconnect();
        throw new ExerciceError('Body part does not exist');
    }



    const updateExercice = await prisma.exercice.update({
        where: {
            id: id
        },
        data: {
            name: name,
            description: description,
            firstMuscularGroupId: firstMuscularGroupId,
            secondMuscularGroupId: secondMuscularGroupId,
            thirdMuscularGroupId: thirdMuscularGroupId,
            bodyPartId: bodyPartId,
        }
    })

    console.log("Exercice updated with the id: ", updateExercice.id)
    await prisma.$disconnect();
}

export async function getExercices() {
    const prisma = new PrismaClient();
    const exercices = await prisma.exercice.findMany();
    await prisma.$disconnect();
    return exercices;
}

//get an exercice by id
export async function getExercice(id: number) {
    const prisma = new PrismaClient();
    const exercice = await prisma.exercice.findFirst({
        where: {
            id: id
        }
    })
    await prisma.$disconnect();

    if(!exercice){
        throw new ExerciceError('Exercice does not exist');
    }

    return exercice;
}

//create exercices acces error
export class ExerciceError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ExerciceError";
    }
}








