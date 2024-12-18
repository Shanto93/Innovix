import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { FaGoogle } from "react-icons/fa";
import { toast } from "sonner";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const GoogleLogin = () => {
  const { googleLogin } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const handleGoogleLogin = () => {
    googleLogin().then((res) => {
      console.log(res);
      const userData = {
        name: res.displayName,
        email: res.email,
        photoURL: res.photoURL,
        role: "buyer",
        wishlist: [],
        status: "approved",
      };
      axiosPublic.post("/users", userData).then((res) => {
        console.log(res.data);
      });

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
