import { LazyRouteFunction, RouteObject } from "react-router-dom";
import App from "../App";

export class SiteRoute<T> {
  name: string;
  path: string;
  element: T | undefined;
  lazy?: LazyRouteFunction<RouteObject>;
  parent: SiteRoute<T> | undefined;
  children: SiteRoute<T>[];
  disabled: boolean;

  constructor({
    name,
    path,
    element,
    lazy,
    parent,
    children,
    disabled,
  }: {
    name: string;
    path: string;
    element?: T | undefined;
    lazy?: LazyRouteFunction<RouteObject>;
    parent?: SiteRoute<T> | undefined;
    children?: SiteRoute<T>[];
    disabled?: boolean;
  }) {
    this.name = name;
    this.path = path;
    this.element = element;
    this.lazy = lazy;
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
  lazy: async () => {
    const { StackView } = await import("../views/stackView/StackView");
    return { Component: StackView };
  },
  parent: dataStructuresRoute,
});
export const queueRoute = new SiteRoute({
  name: "Queue",
  path: "queue",
  lazy: async () => {
    const { QueueView } = await import("../views/queueView/QueueView");
    return { Component: QueueView };
  },
  parent: dataStructuresRoute,
});
dataStructuresRoute.addChild(queueRoute);
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
export const bubbleSortRoute = new SiteRoute({
  name: "Bubble Sort",
  path: "bubble-sort",
  lazy: async () => {
    const { BubbleSortView } = await import(
      "../views/bubbleSortView/BubbleSortView"
    );
    return { Component: BubbleSortView };
  },
  parent: algorithmsRoute,
});
algorithmsRoute.addChild(bubbleSortRoute);
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
  lazy: async () => {
    const { DebounceView } = await import("../views/debounceView/DebounceView");
    return { Component: DebounceView };
  },
  parent: utilityFunctionsRoute,
});
export const throttleRoute = new SiteRoute({
  name: "Throttle",
  path: "throttle",
  lazy: async () => {
    const { ThrottleView } = await import("../views/throttleView/ThrottleView");
    return { Component: ThrottleView };
  },
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
      if (item.lazy) {
        reactRouterRoutes.push({
          path: item.path,
          lazy: item.lazy,
        });
      } else {
        reactRouterRoutes.push({ path: item.path });
      }

      return { name: item.name, path: item.path };
    }),
  };
  navRoutes.push(category);
});
