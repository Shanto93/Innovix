import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import GoogleLogin from "../../components/Authentication/GoogleLogin";
import loginImage from "./../../assets/login.gif";

const Login = () => {
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    loginUser(data.email, data.password).then((res) => {
      navigate(from, { replace: true });
      toast.success(`${res.displayName} successfully logged in`);
    });
  };
  return (
    <div className="hero bg-[#1E1E2F] min-h-screen">
      <div className="hero-content md:flex gap-16">
        <div className="text-center lg:text-left flex-1">
          <img src={loginImage} alt="Login Animated Picture" />
        </div>
        <div className="card bg-[#1E1E2F] w-full  flex-1">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <p className="text-sm text-red-600 font-light">
                  Email is required.
                </p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                {...register("password", {
                  required: true,
                  maxLength: 12,
                  minLength: 6,
                })}
              />
              {errors.password?.type === "required" && (
                <p className="text-sm text-red-600 font-light">
                  Password is required.
                </p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-sm text-red-600 font-light">
                  Password must have at least 6 characters.
                </p>
              )}
              {errors.password?.type === "maxLength" && (
                <p className="text-sm text-red-600 font-light">
                  Password exceeded 12 characters.
                </p>
              )}
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="bg-[#FFD700]">
                Login
              </button>
            </div>
            <GoogleLogin></GoogleLogin>
            <h2 className="my-2 text-white">
              New here?
              <Link to="/register">
                <span className="text-[#FFD700] text-sm"> Register </span>
              </Link>
              now
            </h2>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
