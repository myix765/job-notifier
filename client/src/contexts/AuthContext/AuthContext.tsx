import { createContext } from 'react';
import type { AuthContextType } from './types';

export const AuthContext = createContext<AuthContextType>({
  session: null,
  loading: true,
  signUp: async () => ({ success: false, error: null }),
  signIn: async () => ({ success: false, error: null }),
  signOut: async () => ({ success: false, error: null }),
});