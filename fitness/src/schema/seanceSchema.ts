import joi from 'joi';

export const addSeanceSchema
    = joi.object({
        userId: joi.number().required(),
        date: joi.date().required()
    });


export const updateSeanceSchema
    = joi.object({
        userId: joi.number().required(),
        date: joi.date().required()
    });