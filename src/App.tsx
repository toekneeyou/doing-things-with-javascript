import { classnames } from "./util/classnames";
import Navigation from "./features/navigation/Navigation";
import { Outlet, useLocation } from "react-router-dom";
import { homeRoute } from "./services/routes";
import HomeView from "./views/homeView/HomeView";

import "./main.css";

export default function App() {
  const location = useLocation();
  const isHome = location.pathname === homeRoute.path;

  return (
    <div
      className={classnames("h-screen w-full overflow-hidden text-white flex")}
      style={{
        background:
          "linear-gradient(126deg, rgba(38,42,50,1) 0%, rgba(42,55,82,1) 100%)",
      }}
    >
      <Navigation />
      <main className="flex-grow">
        {isHome && <HomeView />}
        <Outlet />
      </main>
    </div>
  );
}
