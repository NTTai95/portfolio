import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element, requireStaff = false }) => {
  const logined = JSON.parse(sessionStorage.getItem("logined"));

  const urlPrev = window.location.pathname;

  if (!logined) {
    sessionStorage.setItem("urlPrev", urlPrev);
    return <Navigate to="/login" />;
  }

  if (requireStaff && !logined.isStaff) {
    return <Navigate to="/404" />;
  }

  return element;
};

export default PrivateRoute;
