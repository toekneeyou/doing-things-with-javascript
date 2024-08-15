import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import { reactRouterRoutes } from "../../services/routes";
import { ChangeEventHandler, useState } from "react";
import Search from "../../features/search/Search";
import useRouteSearch from "./useRouteSearch";
import { classnames } from "../../lib/util/classnames";

export default function HomeView() {
  const [queryString, setQueryString] = useState("");
  const { searchResults, searchRoutes } = useRouteSearch();
  const navigate = useNavigate();

  const randomize = () => {
    const randomPath = reactRouterRoutes[
      Math.floor(Math.random() * reactRouterRoutes.length)
    ].path as string;
    navigate(randomPath);
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setQueryString(event.target.value);
    searchRoutes(event.target.value);
  };

  return (
    <div className={classnames("home-view", "h-full w-full centered")}>
      <div className="centered flex-col -mt-20">
        <Title />
        <div
          className={classnames(
            "w-full flex items-center gap-x-standard",
            "gap-y-8 lg:gap-y-0 lg:gap-x-standard",
            "flex-col lg:flex-row"
          )}
        >
          <Search
            handleChange={handleChange}
            queryString={queryString}
            results={searchResults}
          />
          <Button onClick={randomize}>Random</Button>
        </div>
      </div>
    </div>
  );
}

function Title() {
  return (
    <h1 className="mb-8 font-bold text-center">
      <span className={classnames("inline-block mb-2", "text-3xl lg:text-6xl")}>
        Doing Things with
      </span>
      <br />
      <strong className="text-app-yellow text-5xl lg:text-8xl">
        JavaScript
      </strong>
    </h1>
  );
}
