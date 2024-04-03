import User from '@/class/user';
import { createContext, Dispatch } from 'react';

//create a context for the user and user dispatch
export const userContext = createContext({ username:'', id:-1, email:'' } as User);
export const userDispatchContext = createContext<Dispatch<{ type: string; payload: User; }>>({} as Dispatch<{ type: string; payload: User; }>);
