import { MdOutlineFilterAlt } from "react-icons/md";
import { RiResetRightLine } from "react-icons/ri";

const FilterBar = () => {
  return (
    <div className="border mt-5 bg-opacity-10 bg-[#28de43] p-4 w-full shadow-lime-500/50 shadow-2xl">
      <div className="flex items-center gap-2">
        <MdOutlineFilterAlt className="text-xl" />
        <h2 className="text-lg font-semibold">Filter</h2>
      </div>

      <div className="flex flex-col items-center gap-2 mt-5 w-full">
        <div className="w-full">
          <select className="w-full max-w-md border p-[11px] border-black rounded-md">
            <option disabled selected>
              Brand
            </option>
            <option value="asc">Low to High</option>
            <option value="des">High to Low</option>
          </select>
        </div>
        <div className="w-full">
          <select className="w-full max-w-md border p-[11px] border-black rounded-md">
            <option disabled selected>
              Category
            </option>
            <option value="asc">Low to High</option>
            <option value="des">High to Low</option>
          </select>
        </div>
        <button type="submit" className="btn border w-full">
          <p>Reset</p>
          <RiResetRightLine />
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
