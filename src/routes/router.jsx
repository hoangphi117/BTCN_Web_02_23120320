import { createBrowserRouter } from "react-router-dom";
import React from "react";

import MainLayout from "@/components/layouts/MainLayout";
import Home, { homeLoader } from "@/pages/Home";
import MovieDetail from "@/pages/movie/MovieDetail";
import SearchPage from "@/pages/movie/SearchPage";
import PersonDetail from "@/pages/movie/PersonDetail";
import RegisterPage from "@/pages/auth/RegisterPage";
import LoginPage from "@/pages/auth/LoginPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <div>Oops! Đã xảy ra lỗi khi tải trang.</div>,
    children: [
      { index: true, element: <Home />, loader: homeLoader },
      { path: "/movie/:id", element: <MovieDetail /> },
      { path: "search", element: <SearchPage /> },
      { path: "/persons/:id", element: <PersonDetail /> },
    ],
  },
  {
    path: "register",
    element: <RegisterPage />,
  },
  {
    path: "login",
    element: <LoginPage />,
  },
]);

export default router;
