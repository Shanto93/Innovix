import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import GoogleLogin from "../../components/Authentication/GoogleLogin";
import { toast } from "sonner";
import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import registerImage from "./../../assets/register_now_image.svg";
import { Helmet } from "react-helmet-async";

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

  const onSubmit = async (data) => {
    try {
      const imageFile = { image: data.photoURL[0] };
      const res = await axiosPublic.post(image_hosting_api, imageFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      const name = data.name;
      const email = data.email;
      const photoURL = res.data.data.display_url;
      const role = data.role;
      const status = data.role === "buyer" ? "approved" : "pending";
      const wishlist = [];
      const userData = { name, email, photoURL, role, status, wishlist };

      await createUser(email, data.password);
      await updateUser(name, photoURL);
      const userRes = await axiosPublic.post("/users", userData);

      if (userRes.data.insertedId) {
        reset();
        toast.success("User Successfully registered");
        navigate("/");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("An error occurred during registration.");
    }
  };

  return (
    <div className="hero bg-[#1E1E2F] min-h-screen w-full">
      <Helmet>
        <title>Innovix | Register</title>
      </Helmet>
      <div className="hero-content flex-col md:flex-row gap-16 w-11/12 mx-auto">
        <div className="text-center lg:text-left flex-1">
          <img
            src={registerImage}
            alt="Animated Register image"
            className="max-w-full mx-auto lg:mx-0"
          />
        </div>
        <div className="card bg-[#1E1E2F] w-full md:w-auto flex-1">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body w-full">
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text text-white">Name</span>
              </label>
              <input
                type="text"
                placeholder="name"
                className="input input-bordered w-full"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className="text-sm text-red-600 font-light mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text text-white">Upload Photo</span>
              </label>
              <input
                type="file"
                {...register("photoURL", { required: "Photo is required" })}
                className="file-input file-input-bordered w-full text-black"
              />
              {errors.photoURL && (
                <p className="text-sm text-red-600 font-light mt-1">
                  {errors.photoURL.message}
                </p>
              )}
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text text-white">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered w-full"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-sm text-red-600 font-light mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text text-white">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered w-full"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && (
                <p className="text-sm text-red-600 font-light mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text text-white">Confirm Password</span>
              </label>
              <input
                type="password"
                placeholder="Confirm password"
                className="input input-bordered w-full"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-600 font-light mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text text-white">Role</span>
              </label>
              <select
                className="select select-bordered w-full text-black"
                {...register("role", { required: true })}
              >
                <option value="buyer">Buyer</option>
                <option value="seller">Seller</option>
              </select>
            </div>
            <div className="form-control mt-6">
              <button
                type="submit"
                className="bg-[#FFD700] w-full py-2 rounded hover:bg-[#c9af00] text-black"
              >
                Register
              </button>
            </div>
            <GoogleLogin />
            <h2 className="my-2 text-white text-center">
              Already have account?{" "}
              <Link to="/login" className="text-[#FFD700] hover:underline">
                Login
              </Link>
            </h2>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
