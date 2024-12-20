import { useLoaderData, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const UpdateProduct = () => {
  const productData = useLoaderData();
  const navigate = useNavigate();
  // console.log(productData.data._id);

  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    //upload image to imgbb ang get link
    const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

    const imageFile = { image: data.imageURL[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    // console.log(res.data);

    const title = data.title;
    const brand = data.brand;
    const price = parseFloat(data.price);
    const stock = parseFloat(data.stock);
    const category = data.category;
    const description = data.description;
    const imageURL = res.data.data.display_url;
    const email = user.email;

    const productDataForm = {
      title,
      brand,
      imageURL,
      price,
      stock,
      category,
      description,
      email,
    };
    // console.log(productData);

    axiosPublic
      .patch(`/update-product/${productData?.data?._id}`, productDataForm)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          toast.success(`${title} updated successfully`);
          navigate("/dashboard/manage-products");
        }
      });
  };

  return (
    <div>
      <h2 className="title">Update Product</h2>
      <p className="subtitle">Update your product here</p>
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        <div className="md:flex gap-8 w-full">
          {/* title */}
          <div className="flex-1">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Title</span>
              </label>
              <input
                type="text"
                defaultValue={productData?.data?.title}
                className="input input-bordered"
                {...register("title", { required: true })}
              />
              {errors.title && (
                <p className="text-sm text-red-600 font-light">
                  Title is required.
                </p>
              )}
            </div>
          </div>

          {/* brand */}

          <div className="flex-1">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Brand</span>
              </label>
              <input
                type="text"
                defaultValue={productData?.data?.brand}
                className="input input-bordered"
                {...register("brand", { required: true })}
              />
              {errors.brand && (
                <p className="text-sm text-red-600 font-light">
                  Brand is required.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* ............. */}

        <div className="md:flex gap-8 w-full">
          {/* Price */}
          <div className="flex-1">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Price</span>
              </label>
              <input
                type="number"
                defaultValue={productData?.data?.price}
                className="input input-bordered"
                {...register("price", { required: true })}
              />
              {errors.price && (
                <p className="text-sm text-red-600 font-light">
                  Price is required.
                </p>
              )}
            </div>
          </div>

          {/* Stock */}

          <div className="flex-1">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Stock</span>
              </label>
              <input
                type="number"
                defaultValue={productData?.data?.stock}
                className="input input-bordered"
                {...register("stock", { required: true })}
              />
              {errors.stock && (
                <p className="text-sm text-red-600 font-light">
                  Stock is required.
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="md:flex gap-8 w-full">
          {/* category */}

          <div className="flex-1">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Category</span>
              </label>
              <input
                type="text"
                defaultValue={productData?.data?.category}
                className="input input-bordered"
                {...register("category", { required: true })}
              />
              {errors.category && (
                <p className="text-sm text-red-600 font-light">
                  Category is required.
                </p>
              )}
            </div>
          </div>

          {/* Image URL */}

          <div className="flex-1">
            <div className="form-control w-full">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text text-white">Image</span>
                </div>
                <input
                  {...register("imageURL", { required: true })}
                  type="file"
                  className="file-input file-input-bordered file-input-info  w-full"
                />
              </label>

              {errors.imageURL && (
                <p className="text-sm text-red-600 font-light">
                  Image URL is required.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* ............... */}

        <div className="form-control">
          <label className="label">
            <span className="label-text text-white">Description</span>
          </label>
          <textarea
            type="text"
            defaultValue={productData?.data?.description}
            className="input input-bordered"
            {...register("description", { required: true })}
          />
          {errors.description && (
            <p className="text-sm text-red-600 font-light">
              Description is required.
            </p>
          )}
        </div>

        <div className="form-control mt-6">
          <button type="submit" className="w-full">
            UPDATE PRODUCT
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
