import ProductCards from "./Cards/ProductCards";

const FeaturedProduct = () => {
  return (
    <div className="md:flex justify-between items-center gap-4">
      <ProductCards></ProductCards>
      <ProductCards></ProductCards>
      <ProductCards></ProductCards>
      <ProductCards></ProductCards>
    </div>
  );
};

export default FeaturedProduct;
