import { Helmet } from "react-helmet-async";
import WishListCard from "../../../components/Dashboard/WishListCard";
import Loading from "../../../components/Loading/Loading";
import useWishList from "../../../hooks/useWishList";

const MyWishList = () => {
  const { wishlist, isLoading } = useWishList();

  return (
    <>
      <Helmet>
        <title>Innovix | My Wishlist</title>
      </Helmet>
      <h2 className="title text-center mb-8">My Wishlist</h2>
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <div className="md:px-16">
          {wishlist.length === 0 ? (
            <div className="flex justify-center items-center h-screen">
              <div className="text-white font-semibold text-lg">
                No product in wishlist
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {wishlist.map((product) => (
                <WishListCard
                  key={product._id}
                  product={product}
                ></WishListCard>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default MyWishList;
