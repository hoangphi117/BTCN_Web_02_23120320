import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

function NavBar() {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search?q=${encodeURIComponent(keyword)}`);
      setKeyword("");
    }
  };

  return (
    <nav className="bg-[rgb(var(--nav-bg-rgb))] shadow-md transition-colors duration-300">
      <div className="max-w-[1200px] mx-auto px-4 flex items-center h-14">
        <Link to="/" className="mr-6">
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-transparent cursor-pointer"
          >
            <span className="text-2xl text-[rgb(var(--foreground-rgb))]">
              🏠︎
            </span>
          </Button>
        </Link>

        <div className="ml-auto flex items-center gap-4">
          <Link
            to="/users/profile"
            className="hover:underline text-[rgb(var(--foreground-rgb))]"
          >
            Profile
          </Link>

          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <Input
              type="text"
              placeholder="Search"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-[200px] bg-[rgb(var(--background-rgb))] text-[rgb(var(--foreground-rgb))] focus-visible:ring-0"
            />
            <Button
              type="submit"
              className="border rounded cursor-pointer text-[rgb(var(--foreground-rgb))]"
            >
              Search
            </Button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
