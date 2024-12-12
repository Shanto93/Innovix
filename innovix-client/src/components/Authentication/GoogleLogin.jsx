import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { FaGoogle } from "react-icons/fa";
import { toast } from "sonner";

const GoogleLogin = () => {
  const { googleLogin } = useAuth();
  const navigate = useNavigate();
  const handleGoogleLogin = () => {
    googleLogin().then(() => {
      navigate("/");
      toast.success("User sucessfully logged in");
    });
  };
  return (
    <div>
      <div className="divider"></div>
      <button
        onClick={handleGoogleLogin}
        className="btn btn-outline btn-secondary w-full"
      >
        <FaGoogle className="text-2xl" /> GOOGLE
      </button>
    </div>
  );
};

export default GoogleLogin;
