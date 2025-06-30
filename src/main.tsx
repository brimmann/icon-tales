// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import MainLayout from "./MainLayout";

createRoot(document.getElementById("root")!).render(
  <MainLayout>
    <RouterProvider router={routes} />
  </MainLayout>
);
