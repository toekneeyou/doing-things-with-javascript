import { Link } from "react-router-dom";
import { classnames } from "../../lib/util/classnames";
import Button from "../../components/button/Button";
import {
  useSideNavigationActionContext,
  useSideNavigationValueContext,
} from "../../context/SideNavigationContext";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import VerticalDivider from "../../components/verticalDivider/VerticalDivider";
/**
 *
 *
 * Header
 *
 *
 */
export default function Header() {
  return (
    <header
      className={classnames(
        "header",
        "fixed left-0 top-0",
        "flex items-center h-16 px-4 gap-x-standard z-50",
        [
          "w-full justify-between flex-row-reverse bg-app-dark-blue",
          "lg:flex-row lg:justify-start lg:bg-transparent",
        ]
      )}
    >
      <ToggleNavButton />

      <VerticalDivider className="mr-2" />

      <LogoLink />
    </header>
  );
}
/**
 *
 *
 * ToggleNavButton shows and hides the Side Navigation
 *
 *
 */
const ToggleNavButton: React.FC = () => {
  const { toggleSideNavigation } = useSideNavigationActionContext();
  const { isShowing } = useSideNavigationValueContext();

  const Icon = (props?: any) =>
    isShowing ? <XMarkIcon {...props} /> : <Bars3Icon {...props} />;

  return (
    <Button
      className="toggle-menu-button"
      onClick={toggleSideNavigation}
      variant="icon"
      icon={Icon}
    />
  );
};
/**
 *
 *
 * LogoLink that redirects user to Home page.
 *
 *
 */
const LogoLink: React.FC = () => {
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
};
