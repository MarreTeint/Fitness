import { useReducer } from 'react';
import User from '@/app/class/user';

//define user dispatch actions
export const SET_USER = 'SET_USER';
export const CLEAR_USER = 'CLEAR_USER';  

export const userReducer = (state: User, action: {type: string, payload?: User}) => {
    switch(action.type) {
        case SET_USER:
            return action.payload;
        case CLEAR_USER:
            return new User(-1, '', '');
        default:
            return state;
    }
}
