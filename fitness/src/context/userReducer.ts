import { useReducer } from 'react';
import User from '@/class/user';

//define user dispatch actions
export const SET_USER = 'SET_USER';
export const CLEAR_USER = 'CLEAR_USER';  

const initialState: User = new User(-1, '', '');

export const userReducer = (state: User, action: { type: string; payload?: User }): User => {
    switch(action.type) {
        case SET_USER:
            return action.payload ?? new User(-1, '', '');
        case CLEAR_USER:
            return new User(-1, '', '');
        default:
            return state;
    }
}


