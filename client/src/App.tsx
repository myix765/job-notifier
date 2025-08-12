import './App.css'
import { AuthProvider } from '@/contexts/auth/AuthProvider';
import Router from '@/routes';
import { AlertsProvider } from './contexts/alerts/AlertsProvider';

function App() {
  return (
    <>
      <AuthProvider>
        <AlertsProvider>
          <div className='flex items-center justify-center min-h-screen p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 2xl:p-14 font-poppins'>
            <Router />
          </div>
        </AlertsProvider>
      </AuthProvider>
    </>
  )
}

export default App;
