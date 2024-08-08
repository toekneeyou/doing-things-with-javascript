import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { reactRouterRoutes } from "../../services/routes";
import { ChangeEventHandler, useState } from "react";
import Search from "../../features/search/Search";
import useRouteSearch from "./useRouteSearch";
import { classnames } from "../../util/classnames";

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
        <h1 className="mb-8 font-bold text-center">
          <span className="text-6xl inline-block mb-2">Doing Things with</span>
          <br />
          <strong className="text-app-yellow text-8xl">JavaScript</strong>
        </h1>

        <div className="w-full flex items-center gap-x-standard">
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
