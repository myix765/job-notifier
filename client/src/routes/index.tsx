import { Routes, Route } from 'react-router';
import Dashboard from '@/pages/Dashboard';
import Signin from '@/components/auth/Signin';
import Signup from '@/components/auth/Signup';
import PageNotFound from '@/pages/PageNotFound';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}

export default Router;