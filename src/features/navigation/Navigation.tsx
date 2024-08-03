import { Link } from "react-router-dom";
import { classnames } from "../../util/classnames";
import { navRoutes } from "../../services/routes";
import Accordion from "../../components/accordion/Accordion";

export default function Navigation() {
  return (
    <nav className={classnames("navigation", "min-w-72 bg-app-dark-blue")}>
      <h1
        className={classnames(
          "navigation__header",
          "flex items-center h-16 px-4 text-xl font-bold text-app-dark-blue bg-app-yellow"
        )}
      >
        <Link to="/">
          <span className="">JS</span> Visual
        </Link>
      </h1>
      <ul className={classnames("navigation__list", "h-full overflow-y-auto")}>
        {navRoutes.map((route) => {
          return (
            <li
              className={classnames(
                "navigation__list__category",
                "border-b-2 border-b-slate-600"
              )}
              key={route.category}
            >
              <Accordion
                title={
                  <h2>
                    {route.category}{" "}
                    <span className="text-app-yellow">
                      {route.children.length}
                    </span>
                  </h2>
                }
              >
                {route.children !== undefined && (
                  <ul className="navigation__list__category__links">
                    {route.children.map((child) => {
                      return (
                        <li
                          className={classnames(
                            "navigation__list__category__links__item",
                            "bg-app-faded-blue h-12",
                            "hover:bg-app-yellow hover:text-black"
                          )}
                          key={child.name}
                        >
                          <Link
                            to={child.path}
                            className="w-full h-full flex items-center pl-8 pr-4"
                          >
                            {child.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}{" "}
              </Accordion>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
