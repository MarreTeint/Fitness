"use client";
import "@/scss/exercisesPage.scss";
import React, { use, useEffect,useState } from "react";
import { Exercice } from "@/class/exercice";

import ExercisePreview from "@/components/exercices/previwExercise";


const Exercises: React.FC = () => {
    const [exercises, setExercises] = useState<Exercice[]>([]);

    useEffect(() => {
        fetch('http://localhost:3000/api/exercices')
            .then(response => response.json())
            .then(data => {
            console.log(data);
            setExercises(data);                
            })
            .catch(error => {
            console.error('There was an error!', error);
            });
    }, []);

    
   

    // Display the list of exercises
    return (
        <div className="exercices-page">
            <h1>Exercises</h1>
            <div className="exercie-preview-table">
                {exercises.map((exercise, index) => (
                    <ExercisePreview key={index} exercise={exercise}/>
                ))}
            </div>
        </div>
    );
}

export default Exercises;