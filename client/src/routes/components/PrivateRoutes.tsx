import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "@/hooks/useAuth";

const PrivateRoutes = () => {
  const { session } = useAuth();
  const location = useLocation();

  return session
    ? <Outlet />
    : <Navigate to="/signin" replace state={{ from: location }} />;
};

export default PrivateRoutes;
