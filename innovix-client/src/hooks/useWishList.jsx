import { useQuery } from "@tanstack/react-query";
import useUserData from "./useUserData";
import useAxiosPublic from "./useAxiosPublic";

const useWishList = () => {
  const { userData } = useUserData();
  const axiosPublic = useAxiosPublic();

  const token = localStorage.getItem("access-token");

  const {
    data: wishlist = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["wishlist", userData?._id],
    queryFn: async () => {
      if (!userData?._id) return [];
      const res = await axiosPublic.get(`/wishlist/${userData._id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      console.log("Wishlist data:", res.data);
      return res.data;
    },
    enabled: Boolean(userData?._id),
  });

  return [wishlist, isLoading, refetch];
};

export default useWishList;
