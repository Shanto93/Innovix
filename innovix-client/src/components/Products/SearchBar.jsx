import { IoSearch } from "react-icons/io5";

const SearchBar = () => {
  return (
    <div>
      <form className="flex items-center gap-[2px]">
        <input
          type="text"
          name="search"
          placeholder="Search"
          className="border p-[11px] max-w-md rounded-l-md border-black"
        />
        <button
          type="submit"
          className="btn border rounded-l-none rounded-r-md bg-gray-300"
        >
          <IoSearch className="text-2xl" />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
