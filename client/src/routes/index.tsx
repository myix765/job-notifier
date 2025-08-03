import { Routes, Route } from 'react-router';
import Dashboard from '@/pages/Dashboard';
import Signin from '@/components/auth/Signin';
import Signup from '@/components/auth/Signup';
import PageNotFound from '@/pages/PageNotFound';
import { paths } from '@/routes/constants';

const Router = () => {
  return (
    <Routes>
      <Route path={paths.DASHBOARD} element={<Dashboard />} />
      <Route path={paths.SIGNIN} element={<Signin />} />
      <Route path={paths.SIGNUP} element={<Signup />} />
      <Route path={paths.PAGE_NOT_FOUND} element={<PageNotFound />} />
    </Routes>
  )
}

export default Router;