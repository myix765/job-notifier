import { useState, useEffect } from 'react';
import { AuthContext } from '@/contexts/AuthContext/AuthContext';
import type { Session } from '@supabase/supabase-js';
import type { AuthProviderProps } from './types';
import { useNavigate, useLocation } from 'react-router';
import { AUTH_ROUTES, PRIVATE_ROUTES } from '@/routes/constants';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/hooks/useToast';

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { showErrorToast, showSuccessToast } = useToast();

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      console.log("session:", data.session);
      setSession(data?.session ?? null);
      setLoading(false);
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        console.log('signed in')
        const auth = new Set(Object.values(AUTH_ROUTES));
        // don't redirect if not on auth page
        if (!auth.has(location.pathname)) return;
        setSession(session ?? null);
        const origin = location.state?.from?.pathname || PRIVATE_ROUTES.DASHBOARD; // not sure if this works yet
        navigate(origin);
      } else if (event === 'SIGNED_OUT') {
        console.log('signed out')
        setSession(null);
        navigate('/signin');
      }
    });

    getSession();

    return () => subscription.unsubscribe();
  }, [navigate, location.pathname, location.state?.from?.pathname])

  // if email already exists will behave as if signing new user but won't send confirmation email
  const signUp = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        showErrorToast("Error signing up", error.message);
      }

      navigate('/confirm-email', { state: email });
      return { success: true, data };
    } catch (err) {
      console.error("Unexpected error during signup:", err);
      showErrorToast("Unexpected error during sign up");
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
        showErrorToast("Error signing in", error.message);
        return { success: false, error };
      }

      return { success: true, data };
    } catch (err) {
      console.error("Unexpected error during signup:", err);
      showErrorToast("Unexpected error during sign in");
      return { success: false, error: null };
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        showErrorToast("Error signing out", error.message);
        return { success: false, error };
      }
      return { success: true, error: null };
    } catch (err) {
      console.error("Unexpected error during signup:", err);
      showErrorToast("Unexpected error during sign out");
      return { success: false, error: null };
    }
  }

  // const addPhone = async ()

  const confirmEmail = async (email: string) => {
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
      })

      if (error) {
        showErrorToast("Error resending confirmation", error.message);
        return { success: false, error: error };
      } else {
        showSuccessToast("Verification email has been resent");
        return { success: true, error: null };
      }
    } catch (err) {
      console.error("Unexpected error when resending confirmation email:", err);
      showErrorToast("Unexpected error when resending confirmation email");
      return { success: false, error: null };
    }
  }

  return (
    <AuthContext.Provider
      value={{
        session,
        loading,
        signUp,
        signIn,
        signOut,
        confirmEmail
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}