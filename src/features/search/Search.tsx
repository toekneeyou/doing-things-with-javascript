import { ChangeEventHandler, useLayoutEffect, useRef, useState } from "react";
import InputGroup from "../../components/inputGroup/InputGroup";
import { classnames } from "../../util/classnames";
import { SearchResultItemProps } from "./SearchResultItem";
import SearchResultsList from "./SearchResults";
import ClickAwayListener from "../../components/clickAwayListener/ClickAwayListener";

const SEARCH_RESULTS_CLASS = "search__results";

interface SearchProps {
  handleChange: ChangeEventHandler<HTMLInputElement>;
  className?: string;
  queryString: string;
  results: SearchResultItemProps[];
}

export default function Search({
  queryString,
  className,
  handleChange,
  results,
}: SearchProps) {
  const [showResults, setShowResults] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleClickAway = () => {
    setShowResults(false);
  };

  useLayoutEffect(() => {
    const addBorderToResultListItems = () => {
      const firstLis =
        resultsRef.current?.querySelectorAll(
          `.${SEARCH_RESULTS_CLASS} > ul > li`
        ) ?? [];

      firstLis.forEach((li, i) => {
        const liEl = li as HTMLLIElement;
        if (i !== firstLis.length - 1) {
          liEl.style.borderBottom = "1px solid #475569";
        } else {
          liEl.style.borderBottom = "";
        }
      });
    };

    const setResultsListMaxHeight = () => {
      const resultsEl = resultsRef.current!;
      const maxHeight =
        window.innerHeight - resultsEl.getBoundingClientRect().top - 32;
      resultsEl.style.maxHeight = `${maxHeight}px`;
    };

    addBorderToResultListItems();
    const observer = new ResizeObserver(setResultsListMaxHeight);
    observer.observe(document.body);

    return () => {
      observer.disconnect();
    };
  }, [results, queryString]);

  return (
    <ClickAwayListener onClickAway={handleClickAway} className="w-full">
      <div className={classnames("search", "w-full relative", className)}>
        <InputGroup
          value={queryString}
          inputGroupClassName="w-full z-[1]"
          placeholder="What are you looking for?"
          autoComplete="off"
          onChange={handleChange}
          onFocus={() => setShowResults(true)}
        />

        <div
          ref={resultsRef}
          className={classnames(
            SEARCH_RESULTS_CLASS,
            "absolute top-6",
            "bg-app-dark-blue w-full pt-4 rounded-b-xl overflow-y-auto overflow-x-hidden shadow-md",
            {
              "opacity-0 pointer-events-none":
                !showResults || queryString.length === 0,
            }
          )}
        >
          <SearchResultsList results={results} />
        </div>
      </div>
    </ClickAwayListener>
  );
}
