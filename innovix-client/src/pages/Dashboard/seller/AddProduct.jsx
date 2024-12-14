import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { toast } from "sonner";

const AddProduct = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const title = data.title;
    const brand = data.brand;
    const price = parseFloat(data.price);
    const stock = parseFloat(data.stock);
    const category = data.category;
    const description = data.description;
    const imageURL = data.imageURL;
    const email = user.email;

    const productData = {
      title,
      brand,
      imageURL,
      price,
      stock,
      category,
      description,
      email,
    };

    const token = localStorage.getItem("access-token");

    axiosPublic
      .post("/add-product", productData, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.insertedId) {
          toast.success(`${title} added successfully`);
        }
      });
  };

  return (
    <div>
      <h2 className="text-2xl text-center">Add Product</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        <div className="md:flex gap-8 w-full">
          {/* title */}
          <div className="flex-1">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                placeholder="Title"
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
                <span className="label-text">Brand</span>
              </label>
              <input
                type="text"
                placeholder="Brand"
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
                <span className="label-text">Price</span>
              </label>
              <input
                type="number"
                placeholder="Price"
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
                <span className="label-text">Stock</span>
              </label>
              <input
                type="number"
                placeholder="Stock"
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
                <span className="label-text">Category</span>
              </label>
              <input
                type="text"
                placeholder="Category"
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
            <div className="form-control">
              <label className="label">
                <span className="label-text">Image URL</span>
              </label>
              <input
                type="text"
                placeholder="Image URL"
                className="input input-bordered"
                {...register("imageURL", { required: true })}
              />
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
            <span className="label-text">Description</span>
          </label>
          <textarea
            type="text"
            placeholder="Product Description"
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
          <button type="submit" className="btn btn-primary">
            ADD PRODUCT
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
