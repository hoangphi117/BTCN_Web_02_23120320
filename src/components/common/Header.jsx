import { Switch } from "../ui/switch";

function Header() {
  return (
    <header className="bg-[#f0dbda] rounded shadow-sm">
      <div className="flex items-center justify-between p-3 px-4">
        <div className="w-1/4 flex justify-start">
          <p className="text-sm">23120320</p>
        </div>

        <div className="flex-1 flex justify-center">
          <h1 className="text-xl font-bold text-red-950">Movies Info</h1>
        </div>

        <div className="w-1/4 flex justify-end items-center gap-3 select-none">
          <div className="flex items-center gap-2">
            <Switch className="data-[state=unchecked]:bg-gray-300 data-[state=checked]:bg-black" />
          </div>

          <button className="p-1 rounded-full">
            <span className="text-lg">𖤓</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
