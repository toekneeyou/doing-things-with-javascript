import { Link } from "react-router-dom";
import { classnames } from "../../util/classnames";
import Button from "../../components/Button";
import {
  useSideNavigationActionContext,
  useSideNavigationValueContext,
} from "../../context/SideNavigationContext";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

export default function Header() {
  const { isShowing } = useSideNavigationValueContext();

  return (
    <header
      className={classnames(
        "header",
        "fixed left-0 top-0",
        "flex items-center h-16 px-4 gap-x-standard z-50"
      )}
    >
      <ToggleMenuButton isShowing={isShowing} />

      <div className="opacity-50 mr-2">|</div>

      <LogoLink />
    </header>
  );
}

interface ToggleMenuButtonProps {
  isShowing: boolean;
}

function ToggleMenuButton({ isShowing }: ToggleMenuButtonProps) {
  const { toggleSideNavigation } = useSideNavigationActionContext();

  return (
    <Button
      className="toggle-menu-button"
      onClick={toggleSideNavigation}
      variant="icon"
    >
      {isShowing ? (
        <XMarkIcon className="size-6 text-app-yellow" />
      ) : (
        <Bars3Icon className="size-6 text-app-yellow" />
      )}
    </Button>
  );
}

function LogoLink() {
  return (
    <h1 className={classnames("logo-link", "font-bold")}>
      <Link to="/" className="flex items-center">
        <span className="text-xs leading-none flex-col flex">
          <span>
            Doing <span className="text-gray-500"> w/</span>
          </span>
          <span>Things</span>
        </span>
        <span className="text-app-yellow text-3xl">JS</span>
      </Link>
    </h1>
  );
}
