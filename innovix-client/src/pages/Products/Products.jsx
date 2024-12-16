// import { useEffect, useState } from "react";
// import FilterBar from "../../components/Products/FilterBar";
// import SearchBar from "../../components/Products/SearchBar";
// import SortByPrice from "../../components/Products/SortByPrice";
// import useAxiosPublic from "../../hooks/useAxiosPublic";
// import Loading from "../../components/Loading/Loading";
// import ProductCard from "../../components/Products/ProductCard";

// const Products = () => {
//   const axiosPublic = useAxiosPublic();
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [search, setSearch] = useState("");
//   const [sort, setSort] = useState("asc");
//   const [brand, setBrand] = useState("");
//   const [category, setCategory] = useState("");
//   const [uniqueBrands, setUniqueBrands] = useState([]);
//   const [uniqueCategorys, setUniqueCategorys] = useState([]);

//   useEffect(() => {
//     setLoading(true);
//     const fetchProducts = async () => {
//       axiosPublic
//         .get(
//           `/all-products?title=${search}&sort=${sort}&brand=${brand}&category=${category}`
//         )
//         .then((res) => {
//           setProducts(res.data.products);
//           setUniqueBrands(res.data.brands);
//           setUniqueCategorys(res.data.categories);
//           // console.log(res.data);
//           // setProducts(res.data);
//           setLoading(false);
//         });
//     };
//     fetchProducts();
//   }, [axiosPublic, sort, search, brand, category]);

//   // console.log(uniqueBrands, uniqueCategorys);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     setSearch(e.target.search.value);
//     e.target.search.value = "";
//   };

//   const handleReset = () => {
//     setBrand("");
//     setCategory("");
//     setSort("asc");
//     setSearch("");
//     window.location.reload();
//   };

//   return (
//     <div className="container mx-auto">
//       <h2 className="text-3xl text-center font-semibold">All Products</h2>

//       {/* Searching ans sorting */}
//       <div className="md:flex justify-between items-center">
//         <SearchBar handleSearch={handleSearch}></SearchBar>
//         <SortByPrice setSort={setSort}></SortByPrice>
//       </div>

//       {/* content */}
//       <div className="grid grid-cols-12 mt-6">
//         <div className="col-span-2">
//           <FilterBar
//             setBrand={setBrand}
//             setCategory={setCategory}
//             handleReset={handleReset}
//             uniqueBrands={uniqueBrands}
//             uniqueCategorys={uniqueCategorys}
//           ></FilterBar>
//         </div>
//         <div className="col-span-10 p-5">
//           {loading ? (
//             <Loading></Loading>
//           ) : (
//             <>
//               {products.length === 0 ? (
//                 <div className="flex justify-center items-center w-full h-screen">
//                   <h2 className="text-2xl font-semibold">No Products found</h2>
//                 </div>
//               ) : (
//                 <div className="grid md:grid-cols-3 gap-6">
//                   {products.map((product) => (
//                     <ProductCard
//                       key={product._id}
//                       product={product}
//                     ></ProductCard>
//                   ))}
//                 </div>
//               )}
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Products;

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
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("asc");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [uniqueBrands, setUniqueBrands] = useState([]);
  const [uniqueCategorys, setUniqueCategorys] = useState([]);

  useEffect(() => {
    setLoading(true);
    const fetchProducts = async () => {
      try {
        const res = await axiosPublic.get(
          `/all-products?title=${search}&sort=${sort}&brand=${brand}&category=${category}`
        );
        setProducts(res.data.products || []);
        setUniqueBrands(res.data.brands || []);
        setUniqueCategorys(res.data.categories || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [axiosPublic, sort, search, brand, category]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.search.value);
    e.target.search.value = "";
  };
  console.log(sort);

  const handleReset = () => {
    setBrand("");
    setCategory("");
    setSort("asc");
    setSearch("");
    window.location.reload();
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-3xl text-center font-semibold">All Products</h2>

      {/* Searching and sorting */}
      <div className="md:flex justify-between items-center">
        <SearchBar handleSearch={handleSearch}></SearchBar>
        <SortByPrice setSort={setSort}></SortByPrice>
      </div>

      {/* content */}
      <div className="grid grid-cols-12 mt-6">
        <div className="col-span-2">
          <FilterBar
            setBrand={setBrand}
            setCategory={setCategory}
            handleReset={handleReset}
            uniqueBrands={uniqueBrands}
            uniqueCategorys={uniqueCategorys}
          ></FilterBar>
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
                <div className="grid md:grid-cols-3 gap-6">
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
