import { useNavigate } from "react-router-dom";
import { SearchResultItemProps } from "../../features/search/SearchResultItem";
import { homeRoute, SiteRoute } from "../../services/routes";
import { useCallback, useMemo, useState } from "react";

export default function useRouteSearch() {
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState<SearchResultItemProps[]>(
    []
  );

  const standardizedRoutes = useMemo(() => {
    function standardizeRoute<T>(
      siteRoute: SiteRoute<T>
    ): SearchResultItemProps {
      const standardizedPath: SearchResultItemProps = {
        name: siteRoute.name,
      };

      if (!siteRoute.disabled && siteRoute.path) {
        standardizedPath.onClick = function () {
          navigate(siteRoute.path);
        };
      }

      return standardizedPath;
    }

    return homeRoute.children.map((category) => {
      return {
        name: category.name,
        children: category.children.map(standardizeRoute),
      };
    });
  }, [navigate]);

  const searchRoutes = useCallback(
    (queryString: string) => {
      function matchNameToString(name: string) {
        return name.toLowerCase().includes(queryString.toLowerCase());
      }

      const newResults = standardizedRoutes
        .map((categoryRoute) => {
          return {
            name: categoryRoute.name,
            children: categoryRoute.children.filter((c) =>
              matchNameToString(c.name)
            ),
          };
        })
        .filter((cr) => cr.children.length > 0);

      setSearchResults(newResults);
    },
    [standardizedRoutes]
  );

  const routeSearchValues = useMemo(() => {
    return { searchResults, searchRoutes };
  }, [searchResults, searchResults]);

  return routeSearchValues;
}
