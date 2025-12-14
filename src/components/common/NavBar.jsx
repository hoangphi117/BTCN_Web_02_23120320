import { Link } from "react-router-dom";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

function NavBar() {
  return (
    <nav className="bg-[rgb(var(--nav-bg-rgb))] shadow-md transition-colors duration-300">
      <div className="max-w-[1200px] mx-auto px-4 flex items-center h-14">
        <Link to="/" className="mr-6">
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-transparent cursor-pointer"
          >
            <span className="text-2xl text-[rgb(var(--foreground-rgb))] transition-colors">
              🏠︎
            </span>
          </Button>
        </Link>

        <div className="flex flex-1 justify-end items-center space-x-2">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search"
              className="w-[200px] bg-[rgb(var(--background-rgb))] text-[rgb(var(--foreground-rgb))] focus-visible:ring-0 transition-colors"
            />
          </div>
          <Button className="border rounded cursor-pointer text-[rgb(var(--foreground-rgb))] transition-colors">
            Search
          </Button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
