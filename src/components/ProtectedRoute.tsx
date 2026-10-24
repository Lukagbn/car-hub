import { Navigate, Outlet } from "react-router";

function ProtectedRoute() {
  const loggedIn = Boolean(localStorage.getItem("token"));
  const test = localStorage.getItem("token");

  console.log(Boolean(test), loggedIn, Boolean(undefined), test);

  if (!loggedIn) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
