import { BodyPart } from "@/class/bodyPart";
import { Exercice } from "@/class/exercice";
import { muscularGroups } from "@/class/muscularGroup";
import { addExercice, deleteExercice, getExercice, getExercices, updateExercice } from "@/prisma/exerciceManager";
import { NextRequest,NextResponse } from "next/server";

export async function addExerciceUseCase(request: NextRequest): Promise<NextResponse> {
    const data = await request.json();
    const {name, description, firstMuscularGroupId, secondMuscularGroupId, thirdMuscularGroupId, bodyPartId} = data;
    try {
        await addExercice(name, description, firstMuscularGroupId, secondMuscularGroupId, thirdMuscularGroupId, bodyPartId);
        return NextResponse.json({message: "Exercice added"}, {status: 200});
    } catch (error) {
        return NextResponse.json({error}, {status: 400});
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
        return NextResponse.json({ error }, { status: 400 });
      }
}
export async function deleteExerciceUseCase(request: NextRequest, { params }: { params: { id: string }}): Promise<NextResponse> {
    try {
        await deleteExercice(parseInt(params.id));
        return NextResponse.json({ message: "Exercice deleted" }, { status: 200 });
      } catch (error) {
        return NextResponse.json({ error }, { status: 400 });
      }
}
export async function updateExerciceUseCase(request: NextRequest, { params }: { params: { id: string }}): Promise<NextResponse> {
    const data = await request.json();
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
    return NextResponse.json({ message: "Exercice updated" }, { status: 200 });
} catch (error) {
    return NextResponse.json({ error }, { status: 400 });
}

}

export async function getAllExercicesUseCase(): Promise<NextResponse> {
    const exercicesData = await getExercices();
    const exercices = exercicesData.map(exerciceData => {
        let firstMuscularGroup = muscularGroups[exerciceData.firstMuscularGroupId];
        let secondMuscularGroup = exerciceData.secondMuscularGroupId !== null ? muscularGroups[exerciceData.secondMuscularGroupId] : undefined;
        let thirdMuscularGroup = exerciceData.thirdMuscularGroupId !== null ? muscularGroups[exerciceData.thirdMuscularGroupId] : undefined;
        const bodyPart: BodyPart = BodyPart[exerciceData.bodyPartId] as unknown as BodyPart;
        return new Exercice(exerciceData.id, exerciceData.name, exerciceData.description, firstMuscularGroup, secondMuscularGroup, thirdMuscularGroup, bodyPart);
    });
    return NextResponse.json(exercices, { status: 200 });
}