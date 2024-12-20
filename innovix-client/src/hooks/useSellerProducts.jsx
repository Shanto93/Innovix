import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useSellerProducts = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  const fetchProducts = async () => {
    if (!user?.email) throw new Error("User email is required");
    const response = await axiosPublic.get(
      `/all-products-posted-by-seller?email=${user.email}`
    );
    return response.data;
  };

  const {
    data: products = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["sellerProducts", user?.email],
    queryFn: fetchProducts,
    enabled: !!user?.email,
  });

  return { products, isLoading, isError, error, refetch };
};

export default useSellerProducts;
