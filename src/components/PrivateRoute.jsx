import useAuthContext from "../hooks/useAuthContext";
import { Navigate } from "react-router";
import ErrorAlert from "./Alert/ErrorAlert";

const PrivateRoute = ({ children }) => {
  const { user } = useAuthContext();
  if (user === null) return <ErrorAlert/>;
  return user ? children : <Navigate to="/login"></Navigate>;
};

export default PrivateRoute;