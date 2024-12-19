import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useUserData = () => {
  const axiosPublic = useAxiosPublic();
  const { user, loading } = useAuth();

  const {
    data: userData,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["userData", user?.email],
    queryFn: async () => {
      if (!user?.email) throw new Error("No user email available");
      const res = await axiosPublic.get(`/users/${user.email}`);
      // console.log(res.data);
      return res.data;
    },
    enabled: !!user?.email && !loading,
    retry: 1,
  });
  // console.log(userData)

  return { userData, error, isLoading, refetch };
};

export default useUserData;
