import { classnames } from "./util/classnames";
import "./main.css";
import Navigation from "./features/navigation/Navigation";
import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <div
      className={classnames(
        "bg-app-slate-blue h-screen w-full overflow-hidden text-white flex"
      )}
    >
      <Navigation />
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
}
