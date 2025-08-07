import { Routes, Route } from 'react-router';
import Dashboard from '@/pages/Dashboard';
import Signin from '@/pages/auth/Signin';
import Signup from '@/pages/auth/Signup';
// import AddPhone from '@/pages/auth/AddPhone';
import ConfirmEmail from '@/pages/auth/ConfirmEmail';
import PageNotFound from '@/pages/PageNotFound';
import { useAuth } from '@/hooks/useAuth';
import PrivateRoutes from '@/routes/components/PrivateRoutes';
import { AUTH_ROUTES, PRIVATE_ROUTES, PUBLIC_ROUTES } from '@/routes/constants';

const priv = [
  { path: PRIVATE_ROUTES.DASHBOARD, element: <Dashboard /> },
]

const auth = [
  { path: AUTH_ROUTES.SIGNIN, element: <Signin /> },
  { path: AUTH_ROUTES.SIGNUP, element: <Signup /> },
  // { path: AUTH_ROUTES.ADD_PHONE, element: <AddPhone /> },
  { path: AUTH_ROUTES.CONFIRM_EMAIL, element: <ConfirmEmail /> },
]

const publ = [
  { path: PUBLIC_ROUTES.PAGE_NOT_FOUND, element: <PageNotFound /> },
]

const Router = () => {
  const { loading } = useAuth();

  return loading ? <></> : (
    <Routes>
      <Route element={<PrivateRoutes />}>
        {priv.map(route =>
          <Route key={route.path} path={route.path} element={route.element} />
        )}
      </Route>
      {auth.map(route =>
        <Route key={route.path} path={route.path} element={route.element} />
      )}
      {publ.map(route =>
        <Route key={route.path} path={route.path} element={route.element} />
      )}
    </Routes>
  )
}

export default Router;