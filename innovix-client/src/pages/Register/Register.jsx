import { Link, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const Register = () => {
  const { createUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const myPromise = createUser(data.email, data.password);
    navigate("/");

    // toast.promise(myPromise, {
    //   loading: "Registering user...",
    //   success: (user) => {
    //     return `${user.email} registered successfully!`;
    //   },
    //   error: "Failed to register user. Please try again.",
    // });

    toast.promise(myPromise, {
      loading: "Registering user...",
      success: (user) => (
        <div
          style={{
            backgroundColor: "green",
            color: "white",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          {user.email} registered successfully!
        </div>
      ),
      error: (
        <div
          style={{
            backgroundColor: "red",
            color: "white",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          Failed to register user. Please try again.
        </div>
      ),
    });

    console.log(data);
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Register now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
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
                <span className="label-text">Password</span>
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
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                placeholder="Confirm password"
                className="input input-bordered"
                {...register("confirmPassword", {
                  required: true,
                  validate: (value) => {
                    if (watch("password") !== value) {
                      return "Your password do not match";
                    }
                  },
                })}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-600 font-light">
                  Both passwords should be same.
                </p>
              )}
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </div>
            <h2 className="my-2">
              Already have account?{" "}
              <Link to="/login">
                <span className="text-blue-500 text-sm">Login</span>
              </Link>{" "}
              now{" "}
            </h2>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
