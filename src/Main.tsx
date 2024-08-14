import { Outlet, useLocation } from "react-router-dom";
import { classnames } from "./util/classnames";
import HomeView from "./views/homeView/HomeView";
import { homeRoute } from "./services/routes";

export default function Main() {
  const location = useLocation();
  const isHome = location.pathname === homeRoute.path;

  return (
    <main
      className={classnames("flex-grow", "overflow-auto lg:overflow-hidden")}
    >
      {isHome && <HomeView />}
      <Outlet />
    </main>
  );
}
