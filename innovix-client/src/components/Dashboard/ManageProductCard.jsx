import { toast } from "sonner";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link } from "react-router";

/* eslint-disable react/prop-types */
const ManageProductCard = ({ product, refetch }) => {
  const axiosPublic = useAxiosPublic();
  const { _id, title, brand, category, description, imageURL, price, stock } =
    product;

  const handleDeleteProduct = (uId) => {
    axiosPublic.delete(`/delete-produce/${uId}`).then((res) => {
      console.log(res.data);
      if (res.data.deletedCount > 0) {
        refetch();
        toast.success(`${title} successfully deleted`);
      }
    });
  };

  return (
    <div className="bg-opacity-15 hover:scale-105  hover:skew-x-3 card rounded-md bg-black  border border-[#00BFFF] w-60 shadow-2xl shadow-sky-500/30 ">
      <div className="relative">
        <div className="">
          <img
            src={`${imageURL}`}
            alt={`${title}'s image`}
            className="rounded-md h-[200px] w-full object-cover"
          />
        </div>
        <div className="absolute bottom-0 py-4 bg-slate-400 bg-opacity-30 rounded-b-md w-full">
          <div className="flex w-full justify-between rounded-b-md">
            <p className="text-sm font-bold text-white ml-3">
              Price: <span className="text-red-500">${price}</span>
            </p>
            <p className="text-sm mr-3 text-white font-bold">
              In Stock: <span className="text-red-500 font-bold">{stock}</span>
            </p>
          </div>
        </div>
      </div>
      <div className="card-body p-2 card">
        <h2 className="card-title text-lg text-center text-white">{title} </h2>
        <div className="flex items-center w-full px-4">
          <p className="text-md font-bold text-white ">{brand} </p>
          <p className="text-sm font-semibold text-end text-white">
            {category}{" "}
          </p>
        </div>
        <p className="text-sm text-center text-white">
          {description.length > 50 ? (
            <>
              {description.slice(0, 40)}
              <span className="text-[#FFD700] cursor-pointer">
                Read More...
              </span>
            </>
          ) : (
            description
          )}
        </p>
        <div className="flex justify-between items-center card-actions mb-2 px-3">
          <Link to={`/dashboard/update-product/${_id}`}>
            <button className="card-btn btn-sm py-0 bg-green-600 border-none shadow-2xl">
              UPDATE
            </button>
          </Link>
          <button
            onClick={() => handleDeleteProduct(_id)}
            className="card-btn btn-sm py-0 bg-[#fc0505] border-none shadow-2xl"
          >
            DELETE
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageProductCard;
