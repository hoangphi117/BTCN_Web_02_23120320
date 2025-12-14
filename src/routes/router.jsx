import { createBrowserRouter } from "react-router-dom";
import React from "react";

import MainLayout from "@/components/layouts/MainLayout";
import Home, { homeLoader } from "@/pages/Home";
import MovieDetail from "@/pages/MovieDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <div>Oops! Đã xảy ra lỗi khi tải trang.</div>,
    children: [
      { index: true, element: <Home />, loader: homeLoader },
      { path: "/movie/:id", element: <MovieDetail /> },
    ],
  },
]);

export default router;
