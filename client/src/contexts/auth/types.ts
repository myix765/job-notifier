import type { AuthError, Session, User, WeakPassword } from '@supabase/supabase-js';

export interface SignUpDataType {
  user: User | null;
  session: Session | null;
}

export interface SignInDataType {
  user: User | null;
  session: Session | null;
  weakPassword?: WeakPassword | null;
}

// ? do i even need the return statements
export interface AuthContextType {
  session: Session | null;
  loading: boolean,
  signUp: (email: string, password: string) =>
    Promise<{ success: boolean; data?: SignUpDataType; error?: AuthError | null }>;
  signIn: (email: string, password: string) =>
    Promise<{ success: boolean; data?: SignInDataType; error?: AuthError | null }>;
  signOut: () =>
    Promise<{ success: boolean; error: AuthError | null }>;
  confirmEmail: (email: string) =>
    Promise<{ success: boolean; error: AuthError | null }>;
}

export interface AuthProviderProps {
  children: React.ReactElement;
}