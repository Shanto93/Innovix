// import { Helmet } from "react-helmet-async";
// import ManageProductCard from "../../../components/Dashboard/ManageProductCard";
// import useSellerProducts from "../../../hooks/useSellerProducts";

// const ManageProducts = () => {
//   const { products, isLoading, isError, error, refetch } = useSellerProducts();

//   if (isLoading) {
//     return <p>Loading products...</p>;
//   }

//   if (isError) {
//     return (
//       <div>
//         <p className="text-red-500">Error: {error.message}</p>
//         <button className="btn btn-primary mt-4" onClick={refetch}>
//           Retry
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <Helmet>
//         <title>Innovix | Manage Products</title>
//       </Helmet>
//       <h2 className="title mb-8">Manage Products</h2>

//       {error && <p className="text-red-500">Error: {error}</p>}
//       <div>
//         {products.length > 0 ? (
//           <div className="grid grid-cols-3 gap-5 px-10">
//             {products.map((product) => (
//               <ManageProductCard
//                 key={product._id}
//                 product={product}
//                 refetch={refetch}
//               ></ManageProductCard>
//             ))}
//           </div>
//         ) : (
//           <p>No products found for this seller.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ManageProducts;

import { Helmet } from "react-helmet-async";
import ManageProductCard from "../../../components/Dashboard/ManageProductCard";
import useSellerProducts from "../../../hooks/useSellerProducts";

const ManageProducts = () => {
  const { products, isLoading, isError, error, refetch } = useSellerProducts();

  if (isLoading) {
    return <p>Loading products...</p>;
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center">
        <p className="text-red-500 text-center">Error: {error.message}</p>
        <button className="btn btn-primary mt-4" onClick={refetch}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Helmet>
        <title>Innovix | Manage Products</title>
      </Helmet>
      <h2 className="title text-2xl font-semibold text-center mb-8">
        Manage Products
      </h2>

      {error && <p className="text-red-500 text-center mb-4">Error: {error}</p>}
      <div>
        {products.length > 0 ? (
          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6 md:px-8">
            {products.map((product) => (
              <ManageProductCard
                key={product._id}
                product={product}
                refetch={refetch}
              />
            ))}
          </div>
        ) : (
          <p className="text-center flex justify-center items-center text-white sm:text-2xl md:text-3xl font-bold h-screen">
            No products found for this seller.
          </p>
        )}
      </div>
    </div>
  );
};

export default ManageProducts;
