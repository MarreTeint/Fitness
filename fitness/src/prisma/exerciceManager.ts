import {prisma} from './prismaClientSingleton';
import { BaseExercices } from "@/class/exercice";
import 'dotenv/config';


export  async function seedExercice() {
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



    
    
    
}

//add an exercice to the list
export async function addExercice(name: string, description: string, firstMuscularGroupId: number, secondMuscularGroupId: number|undefined, thirdMuscularGroupId: number|undefined, bodyPartId: number) {
    

    //test if the exercice already exists
    const exerciceTest = await prisma.exercice.findFirst({
        where: {
            name: name
        }
    })

    if(exerciceTest){
        
        throw new ExerciceError('Exercice already exists');
    }

    //test if the muscular groups exist
    const firstMuscularGroup = await prisma.muscularGroup.findFirst({
        where: {
            id: firstMuscularGroupId
        }
    })

    if(!firstMuscularGroup){
        
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
    
}

//delete an exercice from the list
export async function deleteExercice(id: number) {
    

    //test if the exercice exists
    const exerciceTest = await prisma.exercice.findFirst({
        where: {
            id: id
        }
    })

    if(!exerciceTest){
        
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
    
}

export async function updateExercice(id: number, name: string, description: string, firstMuscularGroupId: number, secondMuscularGroupId: number|undefined, thirdMuscularGroupId: number|undefined, bodyPartId: number) {
    

    //test if the exercice exists
    const exerciceTest = await prisma.exercice.findFirst({
        where: {
            id: id
        }
    })

    if(!exerciceTest){
        
        throw new ExerciceError('Exercice does not exist');
    }

    //test if the muscular groups exist
    const firstMuscularGroup = await prisma.muscularGroup.findFirst({
        where: {
            id: firstMuscularGroupId
        }
    })

    if(!firstMuscularGroup){
        
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
    
}

export async function getExercices() {
    
    const exercices = await prisma.exercice.findMany();
    
    return exercices;
}

//get an exercice by id
export async function getExercice(id: number) {
    
    const exercice = await prisma.exercice.findFirst({
        where: {
            id: id
        }
    })
    

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








