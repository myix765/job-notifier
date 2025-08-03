import { useState, useEffect } from 'react'
import './App.css'
import { UserContext } from '@/contexts/UserContext';
import Router from '@/routes'
import { supabase } from '@/lib/supabaseClient';
import type { User } from '@supabase/supabase-js';

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      setUser(data?.session?.user ?? null);
    };

    fetchSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        console.log('User signed in:', session?.user);
        setUser(session?.user ?? null);
      } else if (event === 'SIGNED_OUT') {
        console.log('User signed out');
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <>
      <UserContext.Provider value={{ user: user, setUser: setUser }}>
        <div className='flex items-center justify-center min-h-screen p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 2xl:p-14 font-poppins'>
          <Router />
        </div>
      </UserContext.Provider>
    </>
  )
}

export default App
