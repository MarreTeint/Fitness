import { logUser } from '@/prisma/userManager';
import joi from 'joi';

export const logUserSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
});

export const signinUserSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
    username: joi.string().required()
});

export const updateUserSchema = joi.object({

    id: joi.number().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    username: joi.string().required()
});