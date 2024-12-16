/* eslint-disable react/prop-types */
const ProductCard = ({ product }) => {
  const { title, brand, category, description, imageURL, price, stock } =
    product;
  return (
    <div className="card rounded-md border bg-base-100 w-60 shadow-2xl shadow-pink-500/30">
      <div className="relative">
        <div className="">
          <img
            src={`${imageURL}`}
            alt={`${title}'s image`}
            className="rounded-md h-[200px] w-full object-cover"
          />
        </div>
        <div className="absolute bottom-0 py-4 bg-slate-400 bg-opacity-30 rounded-b-md w-full">
          <div className="flex w-full justify-between rounded-b-md">
            <p className="text-sm font-bold text-white ml-3">
              Price: <span className="text-red-500">${price}</span>
            </p>
            <p className="text-sm mr-3 text-white font-bold">
              In Stock: <span className="text-red-500 font-bold">{stock}</span>
            </p>
          </div>
        </div>
      </div>
      <div className="card-body p-2 card">
        <h2 className="text-lg font-semibold text-center">{title} </h2>
        <div className="flex items-center w-full px-4">
          <p className="text-md font-bold">{brand} </p>
          <p className="text-sm font-semibold text-end">{category} </p>
        </div>
        <p className="text-sm text-center">
          {description.length > 50 ? (
            <>
              {description.slice(0, 40)}
              <span className="text-red-500 cursor-pointer"> Read More...</span>
            </>
          ) : (
            description
          )}
        </p>
        <div className="flex justify-center items-center card-actions mb-2">
          <button className="btn btn-secondary btn-sm">ADD TO WISHLIST</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
