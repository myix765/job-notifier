import { useState, useEffect } from 'react';
import { AuthContext } from '@/contexts/AuthContext/AuthContext';
import type { Session } from '@supabase/supabase-js';
import type { AuthProviderProps } from './types';
import { useNavigate, useLocation } from 'react-router';
import { supabase } from '@/lib/supabaseClient';
import { toast } from "sonner";

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data?.session ?? null);
      setLoading(false);
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        console.log('signed in')
        setSession(session ?? null);
        const origin = location.state?.from?.pathname || '/'; // not sure if this works yet
        navigate(origin);
      } else if (event === 'SIGNED_OUT') {
        setSession(null);
        navigate('/signin');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate])

  // TODO: because of email confirmation no session is created, need to redirect to confirm email page
  const signUp = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        toast.error("Error signing up", {
          description: error.message,
          action: {
            label: "Dismiss",
            onClick: () => { },
          },
        });
        return { success: false, error };
      }

      navigate('/confirm-email');
      return { success: true, data };
    } catch (err) {
      console.error("Unexpected error during signup:", err);
      toast.error("Unexpected error during sign up");
      return { success: false, error: null };
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        toast.error("Error signing in", {
          description: error.message,
          action: {
            label: "Dismiss",
            onClick: () => { },
          },
        })
        return { success: false, error };
      }

      return { success: true, data };
    } catch (err) {
      console.error("Unexpected error during signup:", err);
      toast.error("Unexpected error during sign in");
      return { success: false, error: null };
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        toast.error("Error signing in", {
          description: error.message,
          action: {
            label: "Dismiss",
            onClick: () => { },
          },
        })
        return { success: false, error };
      }
      return { success: true, error: null };
    } catch (err) {
      console.error("Unexpected error during signup:", err);
      toast.error("Unexpected error during sign in");
      return { success: false, error: null };
    }
  }

  // const addPhone = async ()

  return (
    <AuthContext.Provider
      value={{
        session,
        loading,
        signUp,
        signIn,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}