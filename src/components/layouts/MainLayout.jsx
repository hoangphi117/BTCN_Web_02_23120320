import { Outlet, useNavigation } from "react-router-dom";
import { Loader2 } from "lucide-react";

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import NavBar from "@/components/common/NavBar";

function MainLayout() {
  const navigation = useNavigation();
  const isLoading =
    navigation.state === "loading" || navigation.state === "submitting";

  return (
    <div className="flex flex-col max-w-[1200px] mx-auto gap-2 min-h-screen transition-colors duration-300">
      <Header />
      <NavBar />

      <main className="grow w-full">
        <div className="mx-auto px-4 sm:px-6">
          {isLoading && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-[rgb(var(--background-rgb))]/90">
              <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
            </div>
          )}
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default MainLayout;
