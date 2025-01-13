import { Search } from "lucide-react";

const NavbarFeature = () => {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search"
          className="border border-blue-200 p-2 rounded-lg w-full pl-10 focus:outline-none focus:ring-1 focus:ring-blue-400"
        />
        <Search
          size={20}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
      </div>
    </div>
  );
};

export default NavbarFeature;
