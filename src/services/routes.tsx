import { RouteObject } from "react-router-dom";
import App from "../App";
import DebounceView from "../views/debounceView/DebounceView";
import ThrottleView from "../views/throttleView/ThrottleView";
import MergeSortView from "../views/mergeSortView/MergeSortView";
import TwoSumView from "../views/twoSumView/TwoSumView";
import StackView from "../views/stackView/StackView";

class SiteRoute<T> {
  name: string;
  path: string;
  element: T;
  parent: SiteRoute<T> | undefined;
  children: SiteRoute<T>[];

  constructor(
    name: string,
    path: string,
    element: T,
    parent?: SiteRoute<T> | undefined,
    children?: SiteRoute<T>[]
  ) {
    this.name = name;
    this.path = path;
    this.element = element;
    this.parent = parent;
    this.children = children ?? [];
  }

  addChild(siteRoute: SiteRoute<T>) {
    this.children.push(siteRoute);
  }
}

/**
 * Home
 */
export const homeRoute = new SiteRoute("Home", "/", App);
/**
 * Data Structure Routes
 */
export const dataStructuresRoute = new SiteRoute(
  "Data Structures",
  "data-structure",
  () => <div />, // TODO: No view for this route yet
  homeRoute
);
export const stackRoute = new SiteRoute(
  "Stack",
  "stack",
  StackView,
  dataStructuresRoute
);
dataStructuresRoute.addChild(stackRoute);
/**
 * Algorithm Routes
 */
export const algorithmsRoute = new SiteRoute(
  "Algorithms",
  "algorithms",
  () => <div />, // TODO: No view for this route yet
  homeRoute
);
export const mergeSortRoute = new SiteRoute(
  "Merge Sort",
  "merge-sort",
  MergeSortView,
  algorithmsRoute
);
algorithmsRoute.addChild(mergeSortRoute);
/**
 * Utility Function Routes
 */
export const utilityFunctionsRoute = new SiteRoute(
  "Utility Functions",
  "utility-functions",
  () => <div />, // TODO: No view for this route yet
  homeRoute
);
export const debounceRoute = new SiteRoute(
  "Debounce",
  "debounce",
  DebounceView,
  utilityFunctionsRoute
);
export const throttleRoute = new SiteRoute(
  "Throttle",
  "throttle",
  ThrottleView,
  utilityFunctionsRoute
);
utilityFunctionsRoute.addChild(debounceRoute);
utilityFunctionsRoute.addChild(throttleRoute);
/**
 * Leet Code Routes
 */
export const leetCodeRoute = new SiteRoute(
  "Leet Code",
  "leet-code",
  () => <div />, // TODO: No view for this route yet
  homeRoute
);
export const twoSumRoute = new SiteRoute(
  "Two Sum",
  "two-sum",
  TwoSumView,
  leetCodeRoute
);
leetCodeRoute.addChild(twoSumRoute);

homeRoute.addChild(dataStructuresRoute);
homeRoute.addChild(algorithmsRoute);
homeRoute.addChild(utilityFunctionsRoute);
homeRoute.addChild(leetCodeRoute);

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
      reactRouterRoutes.push({ path: item.path, element: <item.element /> });
      return { name: item.name, path: item.path };
    }),
  };
  navRoutes.push(category);
});
