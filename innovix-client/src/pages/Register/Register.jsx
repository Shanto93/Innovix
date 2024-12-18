import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import GoogleLogin from "../../components/Authentication/GoogleLogin";
import { toast } from "sonner";
import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Register = () => {
  const { createUser, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const name = data.name;
    const email = data.email;
    const photoURL = data.photoURL;
    const role = data.role;
    const status = data.role === "buyer" ? "approved" : "pending";
    const wishlist = [];
    const userData = { name, email, photoURL, role, status, wishlist };
    // console.log(userData);

    createUser(email, data.password).then((result) => {
      updateUser(name, photoURL)
        .then(() => {
          axiosPublic.post("/users", userData).then((res) => {
            console.log(res.data);
            if (res.data.insertedId) {
              console.log("User created successfully");
              reset();
              toast.success("User Successfully registered");
              navigate("/");
            }
          });
        })
        .catch((error) => console.log(error));
      console.log(result);
    });
    // const userRegistrationPromise = new Promise((resolve, reject) => {
    //   createUser(data.email, data.password)
    //     .then(() => {
    //       axiosPublic
    //         .post("/users", userData)
    //         .then((res) => {
    //           if (res.data?.insertedId) {
    //             updateUser(name, photoURL)
    //               .then(() => {
    //                 console.log("User Profile Info Updated");
    //               })
    //               .catch((error) => console.log(error));
    //             resolve("User registered successfully");
    //           } else {
    //             reject(new Error("Failed to register user"));
    //           }
    //         })
    //         .catch((err) => {
    //           reject(
    //             new Error(
    //               err.response?.data?.message ||
    //                 "Server error while saving user data"
    //             )
    //           );
    //         });
    //     })
    //     .catch((err) => {
    //       reject(
    //         new Error(err.message || "Server error while registering user")
    //       );
    //     });
    // });

    // toast.promise(
    //   userRegistrationPromise,
    //   {
    //     loading: "Registering user...",
    //     success: (message) => {
    //       reset();
    //       return message;
    //     },
    //     error: (err) => {
    //       reset();
    //       return err.message;
    //     }, // Display the actual error message
    //   },
    //   {
    //     loading: {
    //       className: "bg-blue-500 text-white",
    //     },
    //     success: {
    //       className: "bg-green-500 text-white",
    //     },
    //     error: {
    //       className: "bg-red-500 text-white",
    //     },
    //   }
    // );

    // userRegistrationPromise.then(() => navigate("/"));
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
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="name"
                className="input input-bordered"
                {...register("name", { required: true })}
              />
              {errors.email && (
                <p className="text-sm text-red-600 font-light">
                  Name is required.
                </p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                type="text"
                placeholder="photo url"
                className="input input-bordered"
                {...register("photoURL", { required: true })}
              />
              {errors.photoURL && (
                <p className="text-sm text-red-600 font-light">
                  Photo URL is required.
                </p>
              )}
            </div>
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
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 8 characters",
                  },
                  maxLength: {
                    value: 12,
                    message: "Password cannot exceed 12 characters",
                  },
                  // pattern: {
                  //   value:
                  //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
                  //   message:
                  //     "Password must include uppercase, lowercase, number, and special character",
                  // },
                })}
              />
            </div>
            <p className="text-red-500">
              {errors.password && errors.password.message}
            </p>

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
            <div className="form-control">
              <label className="label">
                <span className="label-text">Role</span>
              </label>
              <select
                className="select select-bordered w-full max-w-xs"
                {...register("role", { required: true })}
              >
                <option defaultValue="buyer">buyer</option>
                <option value="seller">seller</option>
                <option value="admin">admin</option>
              </select>
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </div>
            <GoogleLogin></GoogleLogin>
            <h2 className="my-2">
              Already have account?{" "}
              <Link to="/login">
                <span className="text-blue-500 text-sm">Login</span>
              </Link>
              now
            </h2>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
