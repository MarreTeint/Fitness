import { BodyPart } from "@/class/bodyPart";
import { Exercice } from "@/class/exercice";
import { muscularGroups } from "@/class/muscularGroup";
import { addExercice, deleteExercice, ExerciceError, getExercice, getExercices, updateExercice } from "@/prisma/exerciceManager";
import { addExerciceSchema } from "@/schema/exercieSchema";
import { NextRequest,NextResponse } from "next/server";




export async function addExerciceUseCase(request: NextRequest): Promise<NextResponse> {
 let data;
    try{
         data = await request.json();

    }catch(error){
        return NextResponse.json({ error: "Invalid format"}, { status: 400 });
    }
   
    console.log(data);
    const { error } = addExerciceSchema.validate(data);
if (error) {
    return NextResponse.json({ error: error.message}, { status: 400 });
}

  
    const {name, description, firstMuscularGroupId, secondMuscularGroupId, thirdMuscularGroupId, bodyPartId} = data;
    try {
        await addExercice(name, description, firstMuscularGroupId, secondMuscularGroupId, thirdMuscularGroupId, bodyPartId);
        return NextResponse.json({message: "Exercice added"}, {status: 201});
    } catch (error) {
        if (error instanceof ExerciceError) {
            return NextResponse.json({ error: error.message }, {status: 400});            
        }
        return NextResponse.json({error}, {status: 500});
    }    
}
export async function getExerciceUseCase(  request: NextRequest,
    { params }: { params: { id: string } }): Promise<NextResponse> {
    try {
        const exercice = await getExercice(parseInt(params.id));
        let firstMuscularGroup =muscularGroups[exercice.firstMuscularGroupId] 
        let secondMuscularGroup = exercice.secondMuscularGroupId !== null ? muscularGroups[exercice.secondMuscularGroupId] : undefined;
        let thirdMuscularGroup = exercice.thirdMuscularGroupId !== null ? muscularGroups[exercice.thirdMuscularGroupId] : undefined;
        const bodyPart: BodyPart = BodyPart[exercice.bodyPartId] as unknown as BodyPart;
        return NextResponse.json(new Exercice(exercice.id,exercice.name,exercice.description,firstMuscularGroup,secondMuscularGroup,thirdMuscularGroup,bodyPart), { status: 200 });
      } catch (error) {
        if (error instanceof ExerciceError) {
          return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error }, { status: 400 });
      }
}
export async function deleteExerciceUseCase(request: NextRequest, { params }: { params: { id: string }}): Promise<NextResponse> {
    try {
        await deleteExercice(parseInt(params.id));
        return NextResponse.json({ message: "Exercice deleted" }, { status: 200 });
      } catch (error) {
        if (error instanceof ExerciceError) {
          return NextResponse.json({ error: error.message }, { status: 400 });
        }
        return NextResponse.json({ error }, { status: 500 });
      }
}
export async function updateExerciceUseCase(request: NextRequest, { params }: { params: { id: string }}): Promise<NextResponse> {
    let  data ; 

    try {
        data  = await request.json();
    } catch (error) {
        return NextResponse.json({ error: "Invalid format" }, { status: 400 });        
    }
    const { error } = addExerciceSchema.validate(data);
    if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
    
   
    console.log(params);
    console.log(params.id);
    console.log(data);
    const { name, description, firstMuscularGroupId, secondMuscularGroupId, thirdMuscularGroupId, bodyPartId } = data;
try {
    await updateExercice(
        parseInt(params.id),
        name,
        description,
        firstMuscularGroupId,
        secondMuscularGroupId,
        thirdMuscularGroupId,
        bodyPartId
    );
    console.log("Exercice updated");
    return NextResponse.json({ message: "Exercice updated" }, { status: 201 });
} catch (error) {
    if (error instanceof ExerciceError) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error }, { status: 500 });
}

}
export async function getAllExercicesUseCase(request : NextRequest): Promise<NextResponse> {
    //get the page of the query url if it exists
    const url = new URL(request.url, 'http://localhost');
    const page = Number(url.searchParams.get('page'));
    let limit = Number(url.searchParams.get('limit'));
    try {    
        let  exercicesData = await getExercices();

        //if page and limit are defined, we return the exercices of the page
        if (page && limit) {
            exercicesData = exercicesData.slice((page - 1) * limit, page * limit);
        }else if(page && !limit){
            limit = 10;
            exercicesData = exercicesData.slice((page - 1) * limit, page * limit);
        }else if(!page && limit){
            throw new ExerciceError("Limit cannot be defined without a page");
        }else{
            limit = 10;
            exercicesData = exercicesData.slice(0, limit);
        }
        const exercices = exercicesData.map(exerciceData => {
            let firstMuscularGroup = muscularGroups[exerciceData.firstMuscularGroupId];
            let secondMuscularGroup = exerciceData.secondMuscularGroupId !== null ? muscularGroups[exerciceData.secondMuscularGroupId] : undefined;
            let thirdMuscularGroup = exerciceData.thirdMuscularGroupId !== null ? muscularGroups[exerciceData.thirdMuscularGroupId] : undefined;
            const bodyPart: BodyPart = BodyPart[exerciceData.bodyPartId] as unknown as BodyPart;
            return new Exercice(exerciceData.id, exerciceData.name, exerciceData.description, firstMuscularGroup, secondMuscularGroup, thirdMuscularGroup, bodyPart);
        });
        return NextResponse.json(exercices, { status: 200 });
    }catch (error) {
        if (error instanceof ExerciceError) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
        return NextResponse.json({ error }, { status: 500 });
    }


}


