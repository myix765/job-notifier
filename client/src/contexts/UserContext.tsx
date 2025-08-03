import { createContext } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import type { User } from '@supabase/supabase-js';

interface UserContextType {
    user: User | null;
    setUser: Dispatch<SetStateAction<User | null>>;
}

export const UserContext = createContext<UserContextType>({
    user: null,
    setUser: () => { },
});