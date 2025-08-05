import './App.css'
import { AuthProvider } from '@/contexts/AuthContext/AuthProvider';
import Router from '@/routes';

function App() {
  return (
    <>
      <AuthProvider>
        <div className='flex items-center justify-center min-h-screen p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 2xl:p-14 font-poppins'>
          <Router />
        </div>
      </AuthProvider>
    </>
  )
}

export default App;
