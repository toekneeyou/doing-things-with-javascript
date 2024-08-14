import SideNavigationContextProvider from "./context/SideNavigationContext";
import ViewportContextProvider from "./context/ViewportContext";
import Header from "./features/header/Header";
import SideNavigation from "./features/sideNavigation/SideNavigation";
import Main from "./Main";
import { classnames } from "./util/classnames";

import "./main.css";

export default function App() {
  return (
    <ViewportContextProvider>
      <SideNavigationContextProvider>
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
          <Main />
        </div>
      </SideNavigationContextProvider>
    </ViewportContextProvider>
  );
}
