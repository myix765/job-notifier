import { Routes, Route } from 'react-router';
import Dashboard from '@/pages/Dashboard';
import Signin from '@/pages/auth/Signin';
import Signup from '@/pages/auth/Signup';
import AddPhone from '@/pages/auth/AddPhone';
import PageNotFound from '@/pages/PageNotFound';
import { useAuth } from '@/hooks/useAuth';
import PrivateRoutes from '@/routes/components/PrivateRoutes';

const Router = () => {
  const { loading } = useAuth();

  return loading ? <></> : (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route path="/" element={<Dashboard />} />
      </Route>
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/add-phone" element={<AddPhone />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}

export default Router;