import { Outlet, useLocation } from "react-router-dom";

import { classnames } from "./util/classnames";
import SideNavigation from "./features/sideNavigation/SideNavigation";
import { homeRoute } from "./services/routes";
import HomeView from "./views/homeView/HomeView";
import SideNavigationContextProvider from "./context/SideNavigationContext";
import Header from "./features/header/Header";
import Modal from "./components/modal/Modal";
import ModalContextProvider from "./context/ModalContext";

import "./main.css";

export default function App() {
  const location = useLocation();
  const isHome = location.pathname === homeRoute.path;

  return (
    <SideNavigationContextProvider>
      <ModalContextProvider>
        <div
          className={classnames(
            "app",
            "h-screen w-full overflow-hidden text-white flex"
          )}
          style={{
            background:
              "linear-gradient(126deg, #222 0%, rgba(42,55,82,1) 100%)",
          }}
        >
          <Header />

          <SideNavigation />
          <main className="flex-grow overflow-hidden">
            {isHome && <HomeView />}
            <Outlet />
          </main>
        </div>
        <Modal />
      </ModalContextProvider>
    </SideNavigationContextProvider>
  );
}
