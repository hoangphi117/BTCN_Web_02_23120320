import { useTheme } from "@/components/theme-provider";
import { Switch } from "../ui/switch";

function Header() {
  const { setTheme, theme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="bg-[rgb(var(--header-bg-rgb))] rounded shadow-sm transition-colors duration-300">
      <div className="flex items-center justify-between p-3 px-4">
        <div className="w-1/4 flex justify-start">
          <p className="text-sm text-[rgb(var(--foreground-rgb))] transition-colors">
            23120320
          </p>
        </div>

        <div className="flex-1 flex justify-center">
          <h1 className="text-xl font-semibold text-[rgb(var(--primary-rgb))] tracking-wide transition-colors">
            Movies Info
          </h1>
        </div>

        <div className="w-1/4 flex justify-end items-center gap-3 select-none">
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
                ⏾
              </span>
            ) : (
              <span className="text-lg text-[rgb(var(--foreground-rgb))]">
                𖤓
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
