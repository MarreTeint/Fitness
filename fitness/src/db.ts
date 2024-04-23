import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

async function main() {

    //BODY PARTS

    //First, we drop the body parts
    const deleteAllBodyParts = await prisma.bodyPart.deleteMany({})

    //Second, we create a list of names of body parts
    const bodyPartNameList = ["Deltoid", "Biceps", "Triceps", "Forearm", "Chest", "Abs", "Side abs", "Upper back", "Infraspinatus", "Middle back", "Lower back", "Quadriceps", "Tibialis anterior", "Hamstring group", "Gluteus maximus", "Calf", "Heart"]

    //Third, we loop on the list and create the body parts in the database (note that we use fixed ids here since those datas are constants)
    bodyPartNameList.forEach(async (bodyPartName, index) => {
        const createBodyPart = await prisma.bodyPart.create({
            data: {
                id: index,
                name: bodyPartName
            }
        })
        console.log("Body parts created with the ids: ", createBodyPart.id)
    })

    // MUSCULAR GROUPS

    //First, we drop the muscular groups
    const deleteAllMuscularGroups = await prisma.muscularGroup.deleteMany({})

    //Second, we objects for each muscular group tied to their body parts (body part id from bodyPartNameList)
    const muscularGroupShoulders = {
        name: "Shoulders",
        bodyParts: {
            connect: [{ id: 0 }]
        }
    }

    const muscularGroupArms = {
        name: "Arms",
        bodyParts: {
            connect: [{ id: 1 }, { id: 2 }, { id: 3 }]
        }
    }

    const muscularGroupChest = {
        name: "Chest",
        bodyParts: {
            connect: [{ id: 4 }, { id: 5 }, { id: 6 }]
        }
    }

    const muscularGroupBack = {
        name: "Back",
        bodyParts: {
            connect: [{ id: 7 }, { id: 8 }, { id: 9 }, { id: 10 }]
        }
    }

    const muscularGroupLegs = {
        name: "Legs",
        bodyParts: {
            connect: [{ id: 11 }, { id: 12 }, { id: 13 }, { id: 14 }, { id: 15 }]
        }
    }

    const muscularGroupCardio = {
        name: "Cardio",
        bodyParts: {
            connect: [{ id: 16 }]
        }
    }

    //Third, we create a list containing all of the muscular groups objects
    const muscularGroupsList = [muscularGroupShoulders, muscularGroupArms, muscularGroupChest, muscularGroupBack, muscularGroupLegs, muscularGroupCardio]

    //Fourth, we loop on muscularGroupsList and create the muscular groups in the database



}


main()

    .then(async () => {

        await prisma.$disconnect()

    })

    .catch(async (e) => {

        console.error(e)

        await prisma.$disconnect()

        process.exit(1)

    })