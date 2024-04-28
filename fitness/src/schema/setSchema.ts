import joi from 'joi';

export const addSetScheam = 
    joi.object({
        reps: joi.number().required(),
        weight: joi.number().required(),
        exerciseID: joi.number().required()
    });

export const updateSetSchema =
    joi.object({
        reps: joi.array().items(joi.number()).required(),
        weight: joi.array().items(joi.number()).required(),
        exerciseID: joi.number().required()
    });

export const addRepsToSetSchema =
    joi.object({
        reps: joi.number().required(),
        weight : joi.number().required()
    });