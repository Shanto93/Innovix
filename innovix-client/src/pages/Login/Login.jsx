/* eslint-disable no-unused-vars */
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import GoogleLogin from "../../components/Authentication/GoogleLogin";
import loginImage from "./../../assets/login.gif";
import { Helmet } from "react-helmet-async";
import usePasswordVisibility from "../../hooks/usePasswordVisibility";

const Login = () => {
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [icon, inputType, visible, setVisible] = usePasswordVisibility();

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
    <div className="hero bg-[#1E1E2F] min-h-screen flex flex-col justify-center items-center px-4">
      <Helmet>
        <title>Innovix | Login</title>
      </Helmet>
      <div className="hero-content flex flex-col md:flex-row gap-8 items-center w-full max-w-6xl">
        {/* Left Section: Image */}
        <div className="flex-1 flex justify-center items-center">
          <img
            src={loginImage}
            alt="Login Animated"
            className="w-full max-w-sm md:max-w-md lg:max-w-lg"
          />
        </div>

        {/* Right Section: Login Form */}
        <div className="card bg-[#2B2B40] rounded-lg shadow-lg w-full max-w-sm md:max-w-md lg:max-w-lg flex-1 p-6 ">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered w-full"
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
              <div className="relative">
                <input
                  type={inputType}
                  placeholder="Enter your password"
                  className="input input-bordered w-full"
                  {...register("password", {
                    required: true,
                    maxLength: 12,
                    minLength: 6,
                  })}
                />
                <span
                  onClick={() => setVisible((visible) => !visible)}
                  className="text-[#00ffff] text-2xl absolute right-4 top-3"
                >
                  {icon}
                </span>
              </div>
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

            <div className="form-control mt-4">
              <button
                type="submit"
                className="btn bg-[#FFD700] hover:bg-yellow-500 font-bold w-full"
              >
                Login
              </button>
            </div>

            <GoogleLogin />

            <h2 className="text-white text-center mt-4">
              New here?
              <Link to="/register" className="text-[#FFD700]">
                <span> Register </span>
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
