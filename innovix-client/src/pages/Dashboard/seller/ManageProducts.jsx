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
      <div>
        <p className="text-red-500">Error: {error.message}</p>
        <button className="btn btn-primary mt-4" onClick={refetch}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>Innovix | Manage Products</title>
      </Helmet>
      <h2 className="title mb-8">Manage Products</h2>

      {error && <p className="text-red-500">Error: {error}</p>}
      <div>
        {products.length > 0 ? (
          <div className="grid grid-cols-3 gap-5 px-10">
            {products.map((product) => (
              <ManageProductCard
                key={product._id}
                product={product}
                refetch={refetch}
              ></ManageProductCard>
            ))}
          </div>
        ) : (
          <p>No products found for this seller.</p>
        )}
      </div>
    </div>
  );
};

export default ManageProducts;
