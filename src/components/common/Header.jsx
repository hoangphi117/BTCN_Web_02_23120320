import { useTheme } from "@/components/theme-provider";
import { Switch } from "../ui/switch";
import { Sun, Moon } from "lucide-react";
import { Link } from "react-router-dom";

function Header() {
  const { setTheme, theme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="bg-[rgb(var(--header-bg-rgb))] rounded shadow-sm transition-colors duration-300">
      <div className="flex items-center justify-between p-3 px-4">
        <div className="flex justify-start">
          <p className="text-sm text-[rgb(var(--foreground-rgb))] transition-colors">
            23120320
          </p>
        </div>

        <div className="flex-1 flex justify-center">
          <h1 className="text-xl font-semibold text-[rgb(var(--primary-rgb))] tracking-wide transition-colors">
            Movies Info
          </h1>
        </div>

        <div className="flex flex-col gap-2 justify-end items-center select-none">
          <div className="flex flex-row">
            <div className="flex items-center gap-2">
              <Switch
                id="mode-switch"
                checked={theme === "dark"}
                onCheckedChange={toggleTheme}
                className="data-[state=unchecked]:bg-gray-300 data-[state=checked]:bg-blue-400"
              />
            </div>

            <div className="p-1 hover:bg-[rgb(var(--foreground-rgb))/10] rounded-full transition-colors">
              {theme === "dark" ? (
                <span className="text-lg text-[rgb(var(--foreground-rgb))]">
                  <Moon />
                </span>
              ) : (
                <span className="text-lg text-[rgb(var(--foreground-rgb))]">
                  <Sun />
                </span>
              )}
            </div>
          </div>
          <div className="flex text-[rgb(var(--foreground-rgb))]">
            <Link to="/login" className="hover:underline">
              Login
            </Link>
            <span className="mx-1 text-muted-foreground">/</span>
            <Link to="/register" className="hover:underline">
              Register
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
