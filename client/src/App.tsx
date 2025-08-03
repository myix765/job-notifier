import { useState, useEffect } from 'react'
import './App.css'
import { UserContext } from '@/contexts/UserContext';
import Router from '@/routes'
import { supabase } from '@/lib/supabaseClient';
import type { User } from '@supabase/supabase-js';
import { toast } from "sonner";
import { useNavigate, useLocation } from 'react-router';
import { paths } from '@/routes/constants';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        toast.error("Error finding account", {
          description: error.message,
          action: {
            label: "Dismiss",
            onClick: () => { },
          },
        });
        setUser(null);
        return;
      }

      if (!data?.session && (Object.values(paths) as string[]).includes(location.pathname)) {
        navigate('/signin');
        setLoading(false);
        return;
      }

      setUser(data?.session?.user ?? null);
      setLoading(false);
    };

    fetchSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if ((Object.values(paths) as string[]).includes(location.pathname)) {
        if (event === 'SIGNED_IN') {
          console.log('User signed in:', session?.user);
          setUser(session?.user ?? null);
          navigate('/');

        } else if (event === 'SIGNED_OUT') {
          console.log('User signed out');
          setUser(null);
          navigate('/signin');
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, location.pathname]);

  return (
    <>
      <UserContext.Provider value={{ user: user, setUser: setUser }}>
        <div className='flex items-center justify-center min-h-screen p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 2xl:p-14 font-poppins'>
          {!loading && <Router />}
        </div>
      </UserContext.Provider>
    </>
  )
}

export default App;
