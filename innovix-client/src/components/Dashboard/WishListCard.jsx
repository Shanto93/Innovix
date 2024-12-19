import { useMutation } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useUserData from "../../hooks/useUserData";
import { toast } from "sonner";
import useWishList from "../../hooks/useWishList";

/* eslint-disable react/prop-types */
const WishListCard = ({ product }) => {
  const { _id, title, brand, category, description, imageURL, price, stock } =
    product;

  const axiosPublic = useAxiosPublic();
  const { userData } = useUserData();
  const { refetch } = useWishList();
  const token = localStorage.getItem("access-token");

  const { mutate: handleRemoveFromWishList } = useMutation({
    mutationFn: async () => {
      const res = await axiosPublic.patch(
        `/wishlist/remove`,
        {
          productId: _id,
          userEmail: userData.email,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
      return res.data;
    },
    onSuccess: (data) => {
      if (data.modifiedCount > 0) {
        toast.success(`${title} is removed from wishlist`);
        refetch();
      } else {
        toast.info(`${title} is not removed from wishlist`);
      }
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to remove product from wishlist. Please try again.");
    },
  });

  return (
    <div className="bg-opacity-15 card rounded-md bg-black  border border-[#00BFFF] w-60 shadow-2xl shadow-sky-500/30 ">
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
        <div className="flex justify-center items-center card-actions mb-2">
          <button
            onClick={() => handleRemoveFromWishList()}
            className="card-btn btn-sm bg-red-500 py-0"
          >
            REMOVE FROM WISHLIST
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishListCard;
