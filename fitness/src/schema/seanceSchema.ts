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

export const SeanceOutputSchema = joi.object({
    sets: joi.array().items(joi.object({
        reps: joi.array().items(joi.number()).required(),
        weight: joi.array().items(joi.number()).required(),
        exerciseID: joi.number().required()
    })).required(),

    userID: joi.number().required(),
    date: joi.date().required()
});

export const SeancesOutputSchema = joi.array().items(SeanceOutputSchema);
