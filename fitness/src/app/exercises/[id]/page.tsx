"use client";
import "@/scss/exercisesPage.scss";
import React, { use, useEffect, useState } from "react";
import { Exercice } from "@/class/exercice";

import ExercisePreview from "@/components/exercices/previwExercise";
import { BodyPart } from "@/class/bodyPart";

const Exercise: React.FC<{ params: { id: number } }> = ({ params }) => {
  const [exercice, setexercice] = useState({} as Exercice);

  useEffect(() => {
    fetch(`http://localhost:3000/api/exercice/${params.id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const newExercice = new Exercice(
            data.id,
            data.name,
            data.description,
            data.firstMuscularGroup,
            undefined,
            undefined,
            BodyPart.Chest
        );
        setexercice(newExercice);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, [params.id]);

  console.log(exercice);

  return <div className="exercice-page">
      <h1>{exercice.name}</h1>
      <p>{exercice.description}</p>

      {/* This exercise targets the following muscle groups:
      <ul>
          <li>{exercice.firstMuscularGroup.name}</li>
          {exercice.secondMuscularGroup && <li>{exercice.secondMuscularGroup.name}</li>}
          {exercice.thirdMuscularGroup && <li>{exercice.thirdMuscularGroup.name}</li>}
      </ul> */}

      <p>Targeted body part: {exercice.bodyPart}</p>
  </div>;
};

export default Exercise;
