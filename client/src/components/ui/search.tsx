import { LucideSearch } from "lucide-react";

interface SearchProps {
  onSearch: (query: string) => void;
  value: string;
  placeholder: string;
};

const Search = ({ onSearch, value, placeholder }: SearchProps) => {
  return (
    <>
      <div className="bg-gray-200 rounded-md text-sm px-3 py-2 flex row gap-2 w-3/8 focus-within:bg-[#f5f5f5] focus-within:outline-[1.5] focus-within:outline-accent-500">
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onSearch(e.target.value)}
          className="bg-transparent outline-none w-full" />
        <button className="cursor-pointer align-middle" onClick={() => console.log("hi")}>
          <LucideSearch className="text-gray-500" size={20} />
        </button>
      </div>
    </>
  )
}

export default Search;