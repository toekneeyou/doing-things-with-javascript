import { createRoot } from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { homeRoute, reactRouterRoutes } from "./services/routes";
import { StrictMode } from "react";

const Home = homeRoute.element!;

const router = createBrowserRouter([
  {
    path: homeRoute.path,
    element: <Home />,
    children: reactRouterRoutes,
  },
]);

const domNode = document.getElementById("root")!;
const root = createRoot(domNode);

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
