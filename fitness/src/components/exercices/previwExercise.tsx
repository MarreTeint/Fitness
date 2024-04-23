import React from "react";
import { Exercice } from "@/class/exercice";

type ExerciseProps = {
  exercieId: number;
  exercise: Exercice;
};

const ExercisePreview: React.FC<ExerciseProps> = ({ exercise ,exercieId}) => {
  console.log(exercise);
  return (
    <div className="exercice-preview grid grid-cols-3 grid-rows-2 gap-4" onClick={() => window.location.href = `/exercises/${exercieId}`}>
      <div className="col-span-2 row-span-2">
        <h2>{exercise.name}</h2>
        <p>{exercise.description}</p>
      </div>
      <div className="col-start-3 row-start-1">
      </div>
    </div>
  );
};

export default ExercisePreview;
