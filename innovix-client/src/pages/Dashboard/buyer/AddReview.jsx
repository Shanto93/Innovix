import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { toast } from "sonner";
import { Helmet } from "react-helmet-async";

const AddReview = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    const name = user.displayName;
    const photoURL = user.photoURL;
    const title = data.title;
    const description = data.description;
    const email = user.email;

    const productData = {
      name,
      photoURL,
      title,
      description,
      email,
    };
    // console.log(productData);

    const token = localStorage.getItem("access-token");

    axiosPublic
      .post("/add-review", productData, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.insertedId) {
          toast.success(`${title} added successfully`);
          reset();
        }
      });
  };

  return (
    <div>
      <h2 className="title">Add Review</h2>
      <Helmet>
        <title>Innovix | Add Review</title>
      </Helmet>
      <p className="subtitle">Add your review here</p>
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        {/* title */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-white">Product Title</span>
          </label>
          <input
            type="text"
            placeholder="Product Title"
            className="input input-bordered"
            {...register("title", { required: true })}
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text text-white ">Write Review</span>
          </label>
          <textarea
            type="text"
            placeholder="Write your opinion here..."
            className="input input-bordered h-28"
            {...register("description", { required: true })}
          />
        </div>

        <div className="form-control mt-6">
          <button type="submit" className="w-full">
            ADD REVIEW
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddReview;
