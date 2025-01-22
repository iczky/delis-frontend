import logo from "../../public/vite.svg";

const Navbar = () => {
  return (
    <nav className="w-full bg-dark shadow-sm">
      <div className="container mx-auto px-4 h-24 flex items-center justify-center">
        <img src={logo} alt="logo" className="h-full" />
      </div>
    </nav>
  );
};

export default Navbar;
