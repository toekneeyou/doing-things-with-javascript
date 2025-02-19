import { Link } from "react-router-dom";
import { classnames } from "../../lib/util/classnames";
import { navRoutes } from "../../services/routes";
import Accordion from "../../components/accordion/Accordion";
import {
  useSideNavigationActionContext,
  useSideNavigationValueContext,
} from "../../context/SideNavigationContext";

export default function SideNavigation() {
  const { isShowing } = useSideNavigationValueContext();
  const { toggleSideNavigation } = useSideNavigationActionContext();

  return (
    <nav
      className={classnames(
        "side-navigation",
        "transition-all h-screen z-10 pt-16 bg-app-dark-blue overflow-hidden transition-setting shadow-md",
        "absolute md:static",
        "w-full md:min-w-52 md:w-52",
        {
          "md:ml-0": isShowing,
          "md:-ml-52": !isShowing,
          "translate-x-[-100%] md:translate-x-0": !isShowing,
        }
      )}
    >
      <ul className={classnames("navigation__list", "h-full overflow-y-auto")}>
        {navRoutes.map((route) => (
          <li
            className={classnames(
              "navigation__list__category",
              "first:border-t-[1px] first:border-t-slate-600 border-b-[1px] border-b-slate-600"
            )}
            key={route.category}
          >
            <Accordion
              initialIsExpanded={true}
              tab={
                <Accordion.Tab
                  title={
                    <h2 className="text-sm text-gray-400">{route.category}</h2>
                  }
                />
              }
              panel={
                <Accordion.Panel>
                  {route.children !== undefined && (
                    <ul
                      className={classnames(
                        "navigation__list__category__links",
                        "pb-2 bg-app-dark-blue"
                      )}
                    >
                      {route.children.map((child) => (
                        <li
                          className={classnames(
                            "navigation__list__category__links__item",
                            "h-12 px-2 py-1"
                          )}
                          key={child.name}
                        >
                          <Link
                            to={child.path}
                            className={classnames(
                              "w-full h-full flex items-center pl-8 pr-4 rounded-xl text-sm",
                              "hover:bg-slate-600"
                            )}
                            onClick={toggleSideNavigation}
                          >
                            {child.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </Accordion.Panel>
              }
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}
