// eslint-disable-next-line react/prop-types
const SortByPrice = ({ setSort }) => {
  return (
    <div>
      <select
        onChange={(e) => setSort(e.target.value)}
        className="select w-full max-w-md border p-[11px] border-black rounded-md"
      >
        <option value="des">High to Low</option>
        <option value="asc">Low to High</option>
      </select>
    </div>
  );
};

export default SortByPrice;
