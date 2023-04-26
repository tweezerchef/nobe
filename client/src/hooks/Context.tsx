import { createContext } from 'react';

export interface UserContextType {
    user: any;
    setUser: (user: any) => void;
}

const UserContext = createContext<UserContextType | null>(null);


export default UserContext;