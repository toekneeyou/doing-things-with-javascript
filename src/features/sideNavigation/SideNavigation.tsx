import { Link } from "react-router-dom";
import { classnames } from "../../util/classnames";
import { navRoutes } from "../../services/routes";
import Accordion from "../../components/accordion/Accordion";
import { useSideNavigationValueContext } from "../../context/SideNavigationContext";

export default function SideNavigation() {
  const { isShowing } = useSideNavigationValueContext();

  return (
    <nav
      className={classnames(
        "side-navigation",
        "transition-all w-52 pt-16 bg-app-dark-blue overflow-hidden transition-setting shadow-md",
        {
          "ml-0": isShowing,
          "-ml-52": !isShowing,
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
              defaultIsExpanded={true}
              title={
                <h2 className="text-sm text-gray-400">{route.category}</h2>
              }
            >
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
                      >
                        {child.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </Accordion>
          </li>
        ))}
      </ul>
    </nav>
  );
}
