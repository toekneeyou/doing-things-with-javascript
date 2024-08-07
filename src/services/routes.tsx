import { RouteObject } from "react-router-dom";
import App from "../App";
import DebounceView from "../views/debounceView/DebounceView";
import ThrottleView from "../views/throttleView/ThrottleView";
import MergeSortView from "../views/mergeSortView/MergeSortView";
import StackView from "../views/stackView/StackView";

export class SiteRoute<T> {
  name: string;
  path: string;
  element: T | undefined;
  parent: SiteRoute<T> | undefined;
  children: SiteRoute<T>[];
  disabled: boolean;

  constructor({
    name,
    path,
    element,
    parent,
    children,
    disabled,
  }: {
    name: string;
    path: string;
    element?: T | undefined;
    parent?: SiteRoute<T> | undefined;
    children?: SiteRoute<T>[];
    disabled?: boolean;
  }) {
    this.name = name;
    this.path = path;
    this.element = element;
    this.parent = parent;
    this.children = children ?? [];
    this.disabled = disabled ?? false;
  }

  addChild(siteRoute: SiteRoute<T>) {
    this.children.push(siteRoute);
  }

  disableRoute() {
    this.disabled = true;
  }

  enableRoute() {
    this.disabled = false;
  }
}

/**
 * Home
 */
export const homeRoute = new SiteRoute({
  name: "Home",
  path: "/",
  element: App,
});
/**
 * Data Structure Routes
 */
export const dataStructuresRoute = new SiteRoute({
  name: "Data Structures",
  path: "data-structure",
  disabled: true,
  parent: homeRoute,
});

export const stackRoute = new SiteRoute({
  name: "Stack",
  path: "stack",
  element: StackView,
  parent: dataStructuresRoute,
});
dataStructuresRoute.addChild(stackRoute);
/**
 * Algorithm Routes
 */
export const algorithmsRoute = new SiteRoute({
  name: "Algorithms",
  path: "algorithms",
  disabled: true,
  parent: homeRoute,
});
export const mergeSortRoute = new SiteRoute({
  name: "Merge Sort",
  path: "merge-sort",
  element: MergeSortView,
  parent: algorithmsRoute,
});
algorithmsRoute.addChild(mergeSortRoute);
/**
 * Utility Function Routes
 */
export const utilityFunctionsRoute = new SiteRoute({
  name: "Utility Functions",
  path: "utility-functions",
  disabled: true,
  parent: homeRoute,
});
export const debounceRoute = new SiteRoute({
  name: "Debounce",
  path: "debounce",
  element: DebounceView,
  parent: utilityFunctionsRoute,
});
export const throttleRoute = new SiteRoute({
  name: "Throttle",
  path: "throttle",
  element: ThrottleView,
  parent: utilityFunctionsRoute,
});
utilityFunctionsRoute.addChild(debounceRoute);
utilityFunctionsRoute.addChild(throttleRoute);

homeRoute.addChild(dataStructuresRoute);
homeRoute.addChild(algorithmsRoute);
homeRoute.addChild(utilityFunctionsRoute);

// Used for Navigation component
export const navRoutes: {
  category: string;
  children: { name: string; path: string }[];
}[] = [];
// Used for React Router
export const reactRouterRoutes: RouteObject[] = [];

homeRoute.children.forEach((categoryRoute) => {
  const category = {
    category: categoryRoute.name,
    children: categoryRoute.children.map((item) => {
      if (item.element) {
        reactRouterRoutes.push({ path: item.path, element: <item.element /> });
      } else {
        reactRouterRoutes.push({ path: item.path });
      }

      return { name: item.name, path: item.path };
    }),
  };
  navRoutes.push(category);
});
