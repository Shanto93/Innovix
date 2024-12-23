// const categories = [
//   {
//     id: 1,
//     title: "Smartphones",
//     photoURL: "https://i.ibb.co.com/YP0vz13/smartphone.jpg",
//   },
//   {
//     id: 2,
//     title: "Feature Phones",
//     photoURL: "https://i.ibb.co.com/Q6YN5DP/featured-Phone.jpg",
//   },
//   {
//     id: 2,
//     title: "Tablets",
//     photoURL: "https://i.ibb.co.com/N3qS4Dy/tablet.jpg",
//   },
//   {
//     id: 4,
//     title: "Foldable Phones",
//     photoURL: "https://i.ibb.co.com/G3XYy3s/Foldable.jpg",
//   },
//   {
//     id: 5,
//     title: "Gaming Phones",
//     photoURL: "https://i.ibb.co.com/yPVdsB2/gaming-Mobile.jpg",
//   },
// ];

// const CategoryPage = () => {
//   return (
//     <div className="container mx-auto p-6">
//       <div className="grid grid-cols-3 gap-8">
//         {categories.map((category) => (
//           <div
//             key={category.id}
//             className="cardd p-2 border border-[#00BFFF] rounded-lg shadow-lg transition-shadow duration-300 ease-in-out hover:shadow-[0_0_20px_#00FFFF]"
//           >
//             <div className="text-center">
//               <img
//                 src={category.photoURL}
//                 alt={category}
//                 className="w-full object-cover h-48 mx-auto mb-4 rounded-lg"
//               />
//               <h2 className="text-xl mb-3 font-semibold text-[#FF007F] hover:text-[#00FFFF] transition-all duration-300">
//                 {category.title}
//               </h2>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CategoryPage;






const categories = [
  {
    id: 1,
    title: "Smartphones",
    photoURL: "https://i.ibb.co.com/W2vNnmD/rami-al-zayat-w33-zg-d-NL4-unsplash.jpg",
  },
  {
    id: 2,
    title: "Feature Phones",
    photoURL: "https://i.ibb.co.com/BL8yCRf/1920-top-view-landscape-old-hand-phone-isolated-on-white-background.jpg",
  },
  {
    id: 3,
    title: "Tablets",
    photoURL: "https://i.ibb.co.com/ZcKS4Gf/freepik-a-black-tablet-device-floating-in-the-air-with-var-20303.jpg",
  },
  {
    id: 4,
    title: "Foldable Phones",
    photoURL: "https://i.ibb.co.com/30D09MS/onur-binay-uk5-Frh-Ktr7-E-unsplash.jpg",
  },
  {
    id: 5,
    title: "Gaming Phones",
    photoURL: "https://i.ibb.co.com/n0cNgMD/56076.jpg",
  },
];

const CategoryPage = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="cardd p-2 border border-[#00BFFF] rounded-lg shadow-lg transition-shadow duration-300 ease-in-out hover:shadow-[0_0_20px_#00FFFF]"
          >
            <div className="text-center">
              <img
                src={category.photoURL}
                alt={category.title}
                className="w-full object-cover h-48 mx-auto mb-4 rounded-lg"
              />
              <h2 className="text-xl mb-3 font-semibold text-[#FF007F] hover:text-[#00FFFF] transition-all duration-300">
                {category.title}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
