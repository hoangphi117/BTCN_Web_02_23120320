import { Outlet } from "react-router-dom";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import NavBar from "@/components/common/NavBar";

function MainLayout() {
  return (
    <div className="flex flex-col max-w-[1200px] mx-auto gap-2 min-h-screen bg-[rgb(var(--background-rgb))] transition-colors duration-300">
      <Header />
      <NavBar />

      <main className="grow w-full">
        <div className="mx-auto px-4 sm:px-6">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default MainLayout;
