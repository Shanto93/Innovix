/* eslint-disable react/prop-types */
import { MdOutlineFilterAlt } from "react-icons/md";
import { RiResetRightLine } from "react-icons/ri";

const FilterBar = ({
  brand,
  category,
  setBrand,
  setCategory,
  handleReset,
  uniqueBrands,
  uniqueCategorys,
}) => {
  return (
    <div className="border border-[#00BFFF] rounded-md mt-5 bg-opacity-10 bg-[#00ffff] p-4 w-full shadow-2xl shadow-sky-500/30">
      <div className="flex items-center gap-2">
        <MdOutlineFilterAlt className="subtitle text-xl" />
        <h2 className="subtitle text-lg font-semibold">Filter</h2>
      </div>

      <div className="flex flex-col items-center gap-2 mt-5 w-full">
        {/* Brand Selector */}
        <div className="w-full">
          <select
            value={brand} // Controlled component for brand
            onChange={(e) => setBrand(e.target.value)}
            className="select w-full max-w-md border p-[11px] border-black rounded-md"
          >
            <option defaultValue="" value="">
              Brand
            </option>
            {uniqueBrands.map((brandd, index) => (
              <option key={index} value={brandd}>
                {brandd}
              </option>
            ))}
          </select>
        </div>

        {/* Category Selector */}
        <div className="w-full">
          <select
            value={category} // Controlled component for category
            onChange={(e) => setCategory(e.target.value)}
            className="select w-full max-w-md border p-[11px] border-black rounded-md"
          >
            <option defaultValue="" value="">
              Category
            </option>

            {uniqueCategorys.map((categiries, i) => (
              <option key={i} value={categiries}>
                {categiries}
              </option>
            ))}
          </select>
        </div>

        {/* Reset Button */}
        <button
          onClick={handleReset}
          type="button"
          className=" w-full flex items-center justify-center gap-2"
        >
          <p>Reset</p>
          <RiResetRightLine />
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
