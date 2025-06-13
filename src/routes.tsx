import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EditorPage from "./pages/EditorPage";
import TalesPage from "./pages/TalesPage";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/tales",
    element: <TalesPage />,
  },
  {
    path: "/editor",
    element: <EditorPage />,
  },
]);
