import { classnames } from "../../util/classnames";
import SearchResultItem, { SearchResultItemProps } from "./SearchResultItem";

interface SearchResultsListProps {
  results: SearchResultItemProps[];
  className?: string;
}

export default function SearchResultsList({
  results,
  className,
}: SearchResultsListProps) {
  return (
    <ul className={classnames("search-results-list", className)}>
      {results.length > 0 ? (
        results.map((result) => {
          return <SearchResultItem key={result.name} {...result} />;
        })
      ) : (
        <SearchResultItem name="No Results" />
      )}
    </ul>
  );
}
