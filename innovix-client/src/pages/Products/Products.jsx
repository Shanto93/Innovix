import { useEffect, useState } from "react";
import FilterBar from "../../components/Products/FilterBar";
import SearchBar from "../../components/Products/SearchBar";
import SortByPrice from "../../components/Products/SortByPrice";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Loading from "../../components/Loading/Loading";
import ProductCard from "../../components/Products/ProductCard";

const Products = () => {
  const axiosPublic = useAxiosPublic();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchProducts = async () => {
      axiosPublic.get(`/all-products`).then((res) => {
        // console.log(res.data);
        setProducts(res.data);
        setLoading(false);
      });
    };
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto">
      <h2 className="text-3xl text-center font-semibold">All Products</h2>

      {/* Searching ans sorting */}
      <div className="md:flex justify-between items-center">
        <SearchBar></SearchBar>
        <SortByPrice></SortByPrice>
      </div>

      {/* content */}
      <div className="grid grid-cols-12 mt-6">
        <div className="col-span-2">
          <FilterBar></FilterBar>
        </div>
        <div className="col-span-10 p-5">
          {loading ? (
            <Loading></Loading>
          ) : (
            <>
              {products.length === 0 ? (
                <div className="flex justify-center items-center w-full h-screen">
                  <h2 className="text-2xl font-semibold">No Products found</h2>
                </div>
              ) : (
                <div className="grid md:grid-cols-3 gap-6 min-h-screen">
                  {products.map((product) => (
                    <ProductCard
                      key={product._id}
                      product={product}
                    ></ProductCard>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
