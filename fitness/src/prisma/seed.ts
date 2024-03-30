import {seedBodyPart} from './bodyPartManager';
import { seedMuscularGroup } from './muscularGroup';

async function main() {
    console.log("Starting to populate the database...")
    console.log(process.env.DATABASE_URL);
    await seedBodyPart();
    await seedMuscularGroup();
    console.log("Database populated!")
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    