import { NextRequest, NextResponse } from "next/server";
import { getExercice, deleteExercice,updateExercice } from "@/prisma/exerciceManager";
import { BodyPart } from "@/class/bodyPart";
import { muscularGroups } from "@/class/muscularGroup";
import { Exercice } from "@/class/exercice";
import { deleteExerciceUseCase, getExerciceUseCase, updateExerciceUseCase } from "@/usecase/ExerciceUseCase";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
return await getExerciceUseCase(request, { params });
 
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return await deleteExerciceUseCase(request, { params });
 
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string }}
) {
  return await updateExerciceUseCase(request, { params })
}
