import { BodyPart } from '@/class/bodyPart';
import joi from 'joi';

export const addExerciceSchema = joi.object({
    name: joi.string().required(),
    description: joi.string().required(),
    firstMuscularGroupId: joi.number().required(),
    secondMuscularGroupId: joi.number().allow(null),
    thirdMuscularGroupId: joi.number().allow(null),
    bodyPartId: joi.number().required()
});

export const updateExerciceSchema = joi.object({
    name: joi.string().required(),
    description: joi.string().required(),
    firstMuscularGroupId: joi.number().required(),
    secondMuscularGroupId: joi.number().allow(null),
    thirdMuscularGroupId: joi.number().allow(null),
    bodyPartId: joi.number().required()
});

export const ExcerciceOutputSchema = joi.object({
    id: joi.number().required(),
    name: joi.string().required(),
    description: joi.string().required(),
    firstMuscularGroup: joi.object({
        id: joi.number().required(),
        name: joi.string().required(),
        bodyPart: joi.number().required()

    }).required(),
    secondMuscularGroup: joi.object(
        {
            id: joi.number().required(),
            name: joi.string().required(),
            bodyPart: joi.number().required()
        }
    ).allow(null),
    thirdMuscularGroup: joi.object({
        id: joi.number().required(),
        name: joi.string().required(),
        bodyPart: joi.number().required()
    }).allow(null),
    bodyPart: joi.string().required()
});

export const ExercicesOutputSchema = joi.object({
    exercices: joi.array().items(ExcerciceOutputSchema).required()
});