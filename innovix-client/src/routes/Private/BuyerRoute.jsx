/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router";
import useAuth from "../../hooks/useAuth";
import useUserData from "../../hooks/useUserData";
import Loading from "../../components/Loading/Loading";

const BuyerRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { userData } = useUserData();
  const location = useLocation();

  if (loading || !userData?.role) {
    return <Loading></Loading>;
  }

  if (user && userData?.role === "buyer") {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default BuyerRoute;
