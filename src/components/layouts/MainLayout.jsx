import { Outlet } from "react-router-dom";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import NavBar from "@/components/common/NavBar";

function MainLayout() {
  return (
    <div className="max-w-[1200px] flex flex-col gap-2 min-h-screen pb-16 mx-auto md:pb-0">
      <Header />
      <NavBar />

      <main className="grow bg-[#ececec] w-full">
        <div className="mx-auto px-4 sm:px-6">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default MainLayout;
