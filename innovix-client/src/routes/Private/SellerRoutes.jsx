import { Navigate, useLocation } from "react-router";
import useAuth from "../../hooks/useAuth";
import Loading from "../../components/Loading/Loading";
import useUserData from "./../../hooks/useUserData";

// eslint-disable-next-line react/prop-types
const SellerRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const { userData } = useUserData();
  const location = useLocation();

  if (loading || !userData?.role) {
    return <Loading></Loading>;
  }

  if (user && userData?.role === "seller") {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace />;
};

export default SellerRoutes;
