import { Navigate, Outlet } from "react-router";

function ProtectedRoute() {
  const loggedIn = Boolean(localStorage.getItem("token"));

  if (!loggedIn) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
