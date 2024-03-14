import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

async function main() {

    //First, we drop the bodypart table
    const deleteAllBodyParts = await prisma.bodyPart.deleteMany({})

    //Second, we create a list of names of body parts
    const bodyPartNames = ["Chest", "Back", "Legs", "Arms", "Shoulders", "Abs", "Cardio"]

    //Third, we loop and create body parts in the database using the list
    for (const name of bodyPartNames) {
        const bodyPart = await prisma.bodyPart.create({
            data: {
                name: name,
            },
        })
        console.log(`Created body part with id: ${bodyPart.id}`)
    }
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