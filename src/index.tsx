import { createRoot } from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { homeRoute, reactRouterRoutes } from "./services/routes";

const router = createBrowserRouter([
  {
    path: homeRoute.path,
    element: <homeRoute.element />,
    children: reactRouterRoutes,
  },
]);

const domNode = document.getElementById("root")!;
const root = createRoot(domNode);

root.render(<RouterProvider router={router} />);
