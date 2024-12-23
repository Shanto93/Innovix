import useAllProducts from "../../hooks/useAllProducts";
import ProductCards from "./Cards/ProductCards";

const FeaturedProduct = () => {
  const { allProducts } = useAllProducts();
  console.log(allProducts?.data?.length);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
      {allProducts?.data?.slice(0, 4).map((product) => (
        <ProductCards key={product._id} product={product}></ProductCards>
      ))}
    </div>
  );
};

export default FeaturedProduct;