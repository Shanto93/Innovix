const SortByPrice = () => {
  return (
    <div>
      <select className="w-full max-w-md border p-[11px] border-black rounded-md">
        <option value="asc">Low to High</option>
        <option value="des">High to Low</option>
      </select>
    </div>
  );
};

export default SortByPrice;
