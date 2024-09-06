import Search from "./Search";
import Logo from "./Logo";
const Navbar = () => {
  return (
    <header className="px-1.5 md:px-4 lg:px-8 xl:px-16 w-full sticky top-0 z-50 flex justify-between backdrop-blur-lg shadow-md py-4 items-center">
      <Logo />
      <Search />
      <div>Login</div>
    </header>
  );
};

export default Navbar;
