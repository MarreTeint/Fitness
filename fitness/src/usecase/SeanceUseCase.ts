import { Seance } from "@/class/seance";
import { Set } from "@/class/set";
import { addSeance, getSeanceByUserId, updateSeance,getSeanceById, deleteSeance ,SeanceError} from "@/prisma/SeanceManager";
import { getSetBySeanceId } from "@/prisma/SetManager";
import { NextRequest,NextResponse } from "next/server";
import {addSeanceSchema,updateSeanceSchema,SeanceOutputSchema,SeancesOutputSchema} from "@/schema/seanceSchema";

export async function addSeanceUseCase(request: NextRequest): Promise<NextResponse> {
    let body;
    try {
        body = await request.json();
        
    } catch (error) {
        return NextResponse.json({error: "Invalid JSON"}, {status: 400});
        
    }
    const {error} = addSeanceSchema.validate(body);
    if (error) {
        return NextResponse.json({error: error.message}, {status: 400});
    }
    console.log(body);
    const newSeance = new Seance(body.userId, new Date(body.date), []);
    console.log(newSeance);
    try {
        const seance = await addSeance(newSeance);
        return NextResponse.json(seance?.id, {status: 201});
    } catch (error) {
        if (error instanceof SeanceError) {
            return NextResponse.json({ error: error.message }, {status: 400});            
        }
        return NextResponse.json({error}, {status: 500});
    }  
}

//update a seance
export async function updateSeanceUseCase(request: NextRequest, {params}: {params: {id: string}}): Promise<NextResponse> {
    const id = Number(params.id);
    let body;
    try {
        body = await request.json();
        
    } catch (error) {
        return NextResponse.json({error: "Invalid JSON"}, {status: 400});
        
    }
    const {error} = updateSeanceSchema.validate(body);
    if (error) {
        return NextResponse.json({error: error.message}, {status: 400});
    }
    
    const newSeance = new Seance(body.userId, new Date(body.date), []);
    try {
        await updateSeance(newSeance, id);
        return NextResponse.json({status: "Seance updated"}, {status: 201});
    } catch (error) {
        if (error instanceof SeanceError) {
            return NextResponse.json({ error: error.message }, {status: 400});            
        }
        return NextResponse.json({error}, {status: 500});
    }
}

//get all seances of a user
export async function getSeanceByUserIdUseCase(request: NextRequest, {params}: {params: {id: string}}): Promise<NextResponse> {
    //declare en emptye array of seances
    let seances :Seance[]= [];

    try {
        const seancesData  = await getSeanceByUserId(Number(params.id));

        //loop through the seances data and create a seance object
        for (let i = 0; i < seancesData.length; i++) {
            //put all the set of the seance in an empty array
            const setsData  = await getSetBySeanceId(seancesData[i].id);
            let sets:Set[] = [];

            //loop through the sets data and create a set object
            for (let j = 0; j < setsData.length; j++) {
                //create a set object
                const set = new Set([], [], setsData[j].exerciseId);
                set.setReps(setsData[j].reps);
                set.setWeight(setsData[j].weight);
                sets.push(set);
            }
            //create a seance object
            const seance = new Seance(seancesData[i].userId, seancesData[i].date, sets);
            seances.push(seance);
            
        }
        const {error} = SeancesOutputSchema.validate(seances);

        if (error) {
            return NextResponse.json({error: error.message}, {status: 400});
        }


        return NextResponse.json(seances, {status: 200});

    } catch (error) {
        if (error instanceof SeanceError) {
            return NextResponse.json({ error: error.message }, {status: 400});            
        }
        return NextResponse.json({error}, {status: 500});
    }
}

//get a seance by id 
export async function getSeanceByIdUseCase(request: NextRequest, {params}: {params: {id: string}}): Promise<NextResponse> {
    try {
        const seanceData  = await getSeanceById(Number(params.id));
        if (!seanceData) {
            return NextResponse.json({error: "Seance not found"}, {status: 404});
        }
        const setsData  = await getSetBySeanceId(seanceData.id);
        let sets:Set[] = [];
        for (let j = 0; j < setsData.length; j++) {
            const set = new Set([], [], setsData[j].exerciseId);
            set.setReps(setsData[j].reps);
            set.setWeight(setsData[j].weight);
            sets.push(set);
        }
        const seance = new Seance(seanceData.userId, seanceData.date, sets);

        const {error} = SeanceOutputSchema.validate(seance);

        if (error) {
            return NextResponse.json({error: error.message}, {status: 400});
        }



        return NextResponse.json(seance, {status: 200});
    } catch (error) {
        if (error instanceof SeanceError) {
            return NextResponse.json({ error: error.message }, {status: 400});            
        }
        return NextResponse.json({error}, {status: 500});
    }
}

//delete a seance
export async function deleteSeanceUseCase(request: NextRequest, {params}: {params: {id: string}}): Promise<NextResponse> {
    const id = Number(params.id);
    try {
        await deleteSeance(id);
        return NextResponse.json({status: "Seance deleted"}, {status: 200});
    } catch (error) {
        if (error instanceof SeanceError) {
            return NextResponse.json({ error: error.message }, {status: 400});            
        }
        return NextResponse.json({error}, {status: 500});
    }
}

