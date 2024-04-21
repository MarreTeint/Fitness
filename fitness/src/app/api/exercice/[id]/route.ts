import { NextRequest, NextResponse } from "next/server";
import { getExercice, deleteExercice,updateExercice } from "@/prisma/exerciceManager";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const exercice = await getExercice(parseInt(params.id));
    return NextResponse.json(exercice, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await deleteExercice(parseInt(params.id));
    return NextResponse.json({ message: "Exercice deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string }}
) {
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
