import { useLoaderData, useNavigate } from "react-router";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const EditUserInfo = () => {
  const loadedData = useLoaderData();
  // console.log(userData?.data?._id);

  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const onSubmit = async (data) => {
    const imageFile = { image: data.photoURL[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    // console.log(res);

    const name = data.name;
    const photoURL = res.data.data.display_url;
    const role = data.role;
    const status =
      data.role === "buyer"
        ? "rejected"
        : data.role === "seller"
        ? "approved"
        : "pending";
    const userData = { name, photoURL, role, status };
    console.log(userData);

    axiosPublic
      .patch(`/dashboard/update-user/${loadedData?.data?._id}`, userData)
      .then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
          toast.success("User Information Successfully Updated");
          navigate("/dashboard/manageUsers");
        }
      });
  };

  return (
    <div>
      <h1 className="title">Update User Information</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="card-body w-full">
        <div className="form-control">
          <label className="label">
            <span className="label-text text-white">Name</span>
          </label>
          <input
            type="text"
            defaultValue={loadedData?.data?.name}
            className="input input-bordered"
            {...register("name", { required: true })}
          />
          {errors.email && (
            <p className="text-sm text-red-600 font-light">Name is required.</p>
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

        <p className="text-red-500">
          {errors.password && errors.password.message}
        </p>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-white">Role</span>
          </label>
          <select
            className="select select-bordered w-full"
            {...register("role", { required: true })}
          >
            <option disabled defaultValue={`${loadedData?.data?.role}`}>
              {loadedData?.data?.role}
            </option>
            <option defaultValue="buyer">buyer</option>
            <option value="seller">seller</option>
            <option value="pending">pending</option>
          </select>
        </div>
        <div className="form-control mt-6">
          <button type="submit" className="bg-[#FFD700]">
            UPDATE INFORMATION
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUserInfo;
