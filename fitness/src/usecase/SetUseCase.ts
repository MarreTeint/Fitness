import { addSetToSeance, deleteSet, getSetById, SetError, updateSet } from "@/prisma/SetManager";
import { NextRequest,NextResponse } from "next/server";
import { Set } from "@/class/set";

export async function addSetUseCase(request: NextRequest, {params}: {params: {id: string}}): Promise<NextResponse> {
    const id = Number(params.id);
    const data = await request.json();
    const newSet = new Set(data.reps, data.weight, data.exerciseID);
    try {
        await addSetToSeance(id, newSet);
        return NextResponse.json({status: "Set added to seance"}, {status: 201});
    } catch (error) {
        if (error instanceof SetError) {
            return NextResponse.json({ error: error.message }, {status: 400});            
        }
        return NextResponse.json({error}, {status: 500});
    }
}

export async function updateSetUseCase(request: NextRequest, {params}: {params: {id: string}}): Promise<NextResponse> {
    const id = Number(params.id);
    const data = await request.json();
    const newSet = new Set(data.reps, data.weight, data.exerciseID);
    try {
        await updateSet(newSet, id);
        return NextResponse.json({status: "Set updated"}, {status: 201});
    } catch (error) {
        if (error instanceof SetError) {
            return NextResponse.json({ error: error.message }, {status: 400});            
        }
        return NextResponse.json({error}, {status: 500});
    }

}

//add rep a rep to a set
export async function addRepsToSet(request: NextRequest, {params}: {params: {id: string}}): Promise<NextResponse> {
    //first get the set by id
    const data = await request.json();
    const id = Number(params.id);
    const setData = await getSetById(id);
    if (setData == null) {
        console.log("Set not found")
        return NextResponse.json({error: "Set not found"}, {status: 400});
    }
    let set :Set = new Set([], [], setData.exerciseId);
    set.setReps(setData.reps);
    set.setWeight(setData.weight);
  // convert the reps and weight to array if they are not
    if (!Array.isArray(set.reps)) {
        set.reps = [set.reps];
    }
    if (!Array.isArray(set.weight)) {
        set.weight = [set.weight];
    }
    console.log(set.reps);

    set.reps.push(data.reps);
    set.weight.push(data.weight);

    //update the set
    try {
        await updateSet(set, id);
        return NextResponse.json({status: "Reps added to set"}, {status: 201});
    } catch (error) {
        if (error instanceof SetError) {
            return NextResponse.json({ error: error.message }, {status: 400});            
        }
        return NextResponse.json({error}, {status: 500});
    }

}

//delete a set
export async function deleteSetUseCase(request: NextRequest, {params}: {params: {id: string}}): Promise<NextResponse>{
    const id = Number(params.id);
    try {
        await deleteSet(id);
        return NextResponse.json({status: "Set deleted"}, {status: 200});
    } catch (error) {
        if (error instanceof SetError) {
            return NextResponse.json({ error: error.message }, {status: 400});
        }
        return NextResponse.json({error}, {status: 500});
    }
}


