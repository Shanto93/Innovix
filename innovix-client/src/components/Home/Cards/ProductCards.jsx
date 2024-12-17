const ProductCards = () => {
  return (
    <div className="card bg-black bg-opacity-15 w-96 shadow-xl border border-[#00BFFF]">
      <figure className="px-10 pt-10">
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt="Shoes"
          className="rounded-xl"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title text-white">Shoes!</h2>
        <p className="text-white">If a dog chews shoes whose shoes does he choose?</p>
        <div className="card-actions">
          <button className="btn btn-primary text-white">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCards;
