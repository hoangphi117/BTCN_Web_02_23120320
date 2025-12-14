import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import router from "@/routes/router";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="app-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
