// import { Helmet } from "react-helmet-async";
// import Banner from "../../components/Home/Banner";
// import CategoryPage from "../../components/Home/CategoryPage";
// import ContactInfo from "../../components/Home/ContactInfo";
// import FAQ from "../../components/Home/FAQ";
// import FeaturedProduct from "../../components/Home/FeaturedProduct";
// import Reviews from "../../components/Home/Reviews";

// const Home = () => {
//   return (
//     <div>
//       <Helmet>
//         <title>Innovix | Home</title>
//       </Helmet>
//       <Banner></Banner>
//       <div className="max-w-screen-lg mx-auto">
//         <div className="my-16">
//           <h2 className="title md:text-3xl font-bold text-wrap text-center mb-10 text-[#00BFFF]">
//             Featured Products
//           </h2>
//           <FeaturedProduct></FeaturedProduct>
//         </div>
//         <div className="my-16">
//           <h2 className="title text-3xl font-bold text-wrap text-center mb-10 text-[#1E90FF] ">
//             Words from Happy Customers
//           </h2>
//           <Reviews></Reviews>
//         </div>
//         <div className="my-16">
//           <h2 className="title text-3xl font-bold text-wrap text-center mb-10">
//             Frequently Asked Questions
//           </h2>
//           <FAQ></FAQ>
//         </div>
//         <div className="my-16">
//           <h2 className="title text-3xl font-bold text-wrap text-center mb-10">
//           Shop by Category
//           </h2>
//           <CategoryPage></CategoryPage>
//         </div>
//         <div className="my-16">
//           <h2 className="title text-3xl font-bold text-wrap text-center mb-10">
//             Contact Info
//           </h2>
//           <ContactInfo></ContactInfo>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;

import { Helmet } from "react-helmet-async";
import Banner from "../../components/Home/Banner";
import CategoryPage from "../../components/Home/CategoryPage";
import ContactInfo from "../../components/Home/ContactInfo";
import FAQ from "../../components/Home/FAQ";
import FeaturedProduct from "../../components/Home/FeaturedProduct";
import Reviews from "../../components/Home/Reviews";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Innovix | Home</title>
      </Helmet>
      <Banner />
      {/* Responsive Wrapper */}
      <div className="max-w-screen-lg px-4 sm:px-6 md:px-8 mx-auto">
        <div className="my-16">
          <h2 className="title text-2xl sm:text-3xl font-bold text-wrap text-center mb-10 text-[#00BFFF]">
            Featured Products
          </h2>
          <FeaturedProduct />
        </div>
        <div className="my-16">
          <h2 className="title text-2xl sm:text-3xl font-bold text-wrap text-center mb-10 text-[#1E90FF]">
            Words from Happy Customers
          </h2>
          <Reviews />
        </div>
        <div className="my-16">
          <h2 className="title text-2xl sm:text-3xl font-bold text-wrap text-center mb-10">
            Frequently Asked Questions
          </h2>
          <FAQ />
        </div>
        <div className="my-16">
          <h2 className="title text-2xl sm:text-3xl font-bold text-wrap text-center mb-10">
            Shop by Category
          </h2>
          <CategoryPage />
        </div>
        <div className="my-16">
          <h2 className="title text-2xl sm:text-3xl font-bold text-wrap text-center mb-10">
            Contact Info
          </h2>
          <ContactInfo />
        </div>
      </div>
    </div>
  );
};

export default Home;
