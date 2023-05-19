import { createContext } from 'react';
import { User } from '../typings/types';

export interface UserContextType {
  user: User;
  setUser: (user: any) => void;
}

const UserContext = createContext<UserContextType | null>(null);

export default UserContext;
