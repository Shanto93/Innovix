import { useEffect, useState } from "react";
import FilterBar from "../../components/Products/FilterBar";
import SearchBar from "../../components/Products/SearchBar";
import SortByPrice from "../../components/Products/SortByPrice";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Loading from "../../components/Loading/Loading";
import ProductCard from "../../components/Products/ProductCard";
import {
  FaRegArrowAltCircleRight,
  FaRegArrowAltCircleLeft,
} from "react-icons/fa";
import { Helmet } from "react-helmet-async";

const Products = () => {
  const axiosPublic = useAxiosPublic();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("asc");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [uniqueBrands, setUniqueBrands] = useState([]);
  const [uniqueCategorys, setUniqueCategorys] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [limit, setLimit] = useState(9);

  useEffect(() => {
    setLoading(true);
    const fetchProducts = async () => {
      try {
        const res = await axiosPublic.get(
          `/all-products?title=${search}&sort=${sort}&page=${page}&limit=${limit}&brand=${brand}&category=${category}`
        );
        setProducts(res.data.products || []);
        setUniqueBrands(res.data.brands || []);
        setUniqueCategorys(res.data.categories || []);
        setTotalPage(Math.ceil(res.data.totalProduct / limit));
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [axiosPublic, sort, search, brand, category, page, limit]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.search.value);
    e.target.search.value = "";
  };

  const handleReset = () => {
    setBrand("");
    setCategory("");
    setSort("asc");
    setSearch("");
    window.location.reload();
  };

  const handlePage = (newPage) => {
    if (newPage > 0 && newPage <= totalPage) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <Helmet>
        <title>Innovix | Products</title>
      </Helmet>
      <h2 className="title text-2xl sm:text-3xl text-center font-semibold mb-4">
        All Products
      </h2>

      {/* Searching and sorting */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <SearchBar handleSearch={handleSearch} />
        <SortByPrice setSort={setSort} />
      </div>

      {/* Content */}
      <div className="grid grid-cols-12 mt-6 gap-4">
        <div className="col-span-12 md:col-span-3 lg:col-span-2">
          <FilterBar
            setBrand={setBrand}
            setCategory={setCategory}
            handleReset={handleReset}
            uniqueBrands={uniqueBrands}
            uniqueCategorys={uniqueCategorys}
          />
        </div>
        <div className="col-span-12 md:col-span-9 lg:col-span-10 p-4">
          {loading ? (
            <Loading />
          ) : (
            <>
              {products.length === 0 ? (
                <div className="flex justify-center items-center w-full h-60">
                  <h2 className="text-lg md:text-2xl font-semibold">
                    No Products found
                  </h2>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          disabled={page === 1}
          onClick={() => handlePage(page - 1)}
          className={`btn ${
            page !== 1
              ? "glow-effect hover:scale-105"
              : "opacity-50 cursor-not-allowed"
          }`}
        >
          <FaRegArrowAltCircleLeft className="text-2xl md:text-3xl text-pink-500" />
        </button>

        <p className="text-base md:text-lg lg:text-xl text-[#FFD700]">
          Page: {page} of {totalPage}
        </p>

        <button
          disabled={page === totalPage}
          onClick={() => handlePage(page + 1)}
          className={`btn ${
            page !== totalPage
              ? "glow-effect hover:scale-105"
              : "opacity-50 cursor-not-allowed"
          }`}
        >
          <FaRegArrowAltCircleRight className="text-2xl md:text-3xl text-pink-500" />
        </button>

        <div>
          <select
            onChange={(e) => setLimit(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          >
            <option disabled defaultValue={9}>
              9
            </option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
            <option value={8}>8</option>
            <option defaultValue={9}>9</option>
            <option value={10}>10</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Products;
