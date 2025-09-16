import { Navigate, Outlet, useLocation } from "react-router";
import { ListsProvider } from "../context/ListsProvider";
import useAuth from "../hooks/useAuth";

export default function RequireAuth() {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.username ? (
    <ListsProvider>
      <Outlet />
    </ListsProvider>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
