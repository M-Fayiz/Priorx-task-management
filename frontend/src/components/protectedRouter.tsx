import { Spinner } from "./spinner";
import { useAuthStore } from "@/store/auth.store";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthStatus } from "@/constant/authStatus.const";

export const Protected_Router = () => {
  const { user, status } = useAuthStore();
  const location = useLocation();
  console.log('user :',user)
  if (status === AuthStatus.CHECKING) {
    return <Spinner variant="theme" size="large" fullScreen />;
  }

  if (status === AuthStatus.GUEST) {
    return <Navigate to="/auth/login" replace />;
  }

  if (!user) {
    return (
      <Navigate
        to="/auth/login"
        state={{ from: location }}
        replace
      />
    );
  }

  return <Outlet />;
};
