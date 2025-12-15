import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import router from "@/routes/router";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import { AuthProvider } from "./context/auth";
import ScrollToTop from "./components/common/ScrollToTop";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="app-theme">
      <AuthProvider>
        <RouterProvider router={router}>
          <ScrollToTop />
        </RouterProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
