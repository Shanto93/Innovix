import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAllProducts = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: allProducts = [],
    refetch,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["allProducts"],
    queryFn: async () => {
      const res = await axiosPublic.get("/all-product-hook");
      return res.data;
    },
    staleTime: 5 * 60 * 1000, // Cache the data for 5 minutes
    onError: (error) => {
      console.error("Error fetching products:", error.message);
    },
  });

  return { allProducts, refetch, isLoading, isError, error };
};

export default useAllProducts;
