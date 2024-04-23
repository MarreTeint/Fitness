import React from "react";
import { Exercice } from "@/class/exercice";

type ExerciseProps = {
  exercise: Exercice;
};

const ExercisePreview: React.FC<ExerciseProps> = ({ exercise}) => {
  console.log(exercise);
  return (
    <div className="exercice-preview grid grid-cols-3 grid-rows-2 gap-4" onClick={() => window.location.href = `/exercises/${exercise.id}`}>
      <div className="col-span-2 row-span-2">
        <h2>{exercise.name}</h2>
        <p>{exercise.description}</p>
      </div>
      <div className="col-start-3 row-start-1">
        <p>
          Body part: {exercise.bodyPart}
        </p>
      </div>
    </div>
  );
};

export default ExercisePreview;
