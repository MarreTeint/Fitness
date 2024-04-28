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