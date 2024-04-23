"use client";
import "@/scss/exercisesPage.scss";
import React, { use, useEffect,useState } from "react";
import { Exercice } from "@/class/exercice";

import ExercisePreview from "@/components/exercices/previwExercise";


const Exercises: React.FC = () => {
    const [exercises, setExercises] = useState<Exercice[]>([]);
    const [exrecieIds, setExerciceIds] = useState<number[] | null>(null);

    useEffect(() => {
        fetch('http://localhost:3000/api/exercices')
            .then(response => response.json())
            .then(data => {
            setExercises(data);
            setExerciceIds(data.map((exercise: Exercice) => exercise.id));   
                
            })
            .catch(error => {
            console.error('There was an error!', error);
            });
    }, []);
    //console.log(exercises[0]);     

    // Display the list of exercises
    return (
        <div className="exercices-page">
            <h1>Exercises</h1>
            <div className="exercie-preview-table">
                {exercises.map((exercise, index) => (
                    exrecieIds && <ExercisePreview key={index} exercise={exercise} exercieId={exrecieIds[index]}/>
                ))}
            </div>
        </div>
    );
}

export default Exercises;