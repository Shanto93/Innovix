// import { useEffect, useState } from "react";
// import useAuth from "./useAuth";
// import useAxiosPublic from "./useAxiosPublic";

// const useUserData = () => {
//   const axiosPublic = useAxiosPublic();
//   const { user, loading } = useAuth();
//   const [userData, setUserData] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const res = await axiosPublic.get(`/users/${user.email}`);
//         setUserData(res.data);
//         setError(null);
//       } catch (err) {
//         console.error("Failed to fetch user data:", err);
//         setError(err);
//       }
//     };

//     if (user?.email && !loading) {
//       fetchUserData();
//     }
//   }, [axiosPublic, user?.email, loading]);

//   return { userData, error };
// };

// export default useUserData;

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
      return res.data;
    },
    enabled: !!user?.email && !loading, 
    retry: 1, 
  });

  return { userData, error, isLoading, refetch };
};

export default useUserData;
