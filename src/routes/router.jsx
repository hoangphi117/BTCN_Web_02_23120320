import { createBrowserRouter } from "react-router-dom";
import React, { lazy } from "react";

const Home = lazy(() => import("@/pages/Home"));
const MovieDetail = lazy(() => import("@/pages/movie/MovieDetail"));
const SearchPage = lazy(() => import("@/pages/movie/SearchPage"));
const PersonDetail = lazy(() => import("@/pages/movie/PersonDetail"));
const RegisterPage = lazy(() => import("@/pages/auth/RegisterPage"));
const LoginPage = lazy(() => import("@/pages/auth/LoginPage"));
const ProfilePage = lazy(() => import("@/pages/user/ProfilePage.jsx"));
const FavoritePage = lazy(() => import("@/pages/user/FavoritePage.jsx"));

import MainLayout from "@/components/layouts/MainLayout";

import { homeLoader } from "@/pages/Home";

import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <div>Oops! Đã xảy ra lỗi khi tải trang.</div>,
    children: [
      { index: true, element: <Home />, loader: homeLoader },
      { path: "movie/:id", element: <MovieDetail /> },
      { path: "search", element: <SearchPage /> },
      { path: "persons/:id", element: <PersonDetail /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "users/profile", element: <ProfilePage /> },
          { path: "users/favorites", element: <FavoritePage /> },
        ],
      },
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
