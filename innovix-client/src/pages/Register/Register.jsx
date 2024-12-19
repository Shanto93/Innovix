import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import GoogleLogin from "../../components/Authentication/GoogleLogin";
import { toast } from "sonner";
import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import registerImage from "./../../assets/register.gif";

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

  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
  console.log(image_hosting_api, image_hosting_key);

  const onSubmit = async (data) => {
    const imageFile = { image: data.photoURL[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    console.log(res);

    const name = data.name;
    const email = data.email;
    const photoURL = res.data.data.display_url;
    const role = data.role;
    const status = data.role === "buyer" ? "approved" : "pending";
    const wishlist = [];
    const userData = { name, email, photoURL, role, status, wishlist };
    console.log(userData);

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
  };

  return (
    <div className="hero bg-[#1E1E2F] min-h-screen w-full">
      <div className="hero-content md:flex gap-16">
        <div className="text-center lg:text-left flex-1">
          {/* <h1 className=" subtitle text-5xl font-bold text-white">Register now!</h1> */}
          <img src={registerImage} alt="Animated Register image" />
        </div>
        <div className="card bg-[#1E1E2F] w-full  flex-1">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body w-full">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Name</span>
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
                <span className="label-text text-white">Upload Photo</span>
              </label>
              <input
                type="file"
                {...register("photoURL", { required: true })}
                className="file-input file-input-bordered w-full"
              />
              {errors.photoURL && (
                <p className="text-sm text-red-600 font-light">
                  Photo URL is required.
                </p>
              )}
            </div>
            {/* <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Photo URL</span>
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
            </div> */}
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
                <span className="label-text text-white">Confirm Password</span>
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
                <span className="label-text text-white">Role</span>
              </label>
              <select
                className="select select-bordered w-full"
                {...register("role", { required: true })}
              >
                <option defaultValue="buyer">buyer</option>
                <option value="seller">seller</option>
              </select>
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="bg-[#FFD700]">
                Register
              </button>
            </div>
            <GoogleLogin></GoogleLogin>
            <h2 className="my-2 text-white">
              Already have account?{" "}
              <Link to="/login">
                <span className="text-[#FFD700] text-sm">Login </span>
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
