import { ReactNode } from "react";
import { classnames } from "../../util/classnames";
import SearchResultsList from "./SearchResults";

export interface SearchResultItemProps {
  name: string;
  onClick?: () => void;
  className?: string;
  icon?: ReactNode;
  children?: SearchResultItemProps[];
}

export default function SearchResultItem({
  name,
  onClick,
  className,
  icon,
  children,
}: SearchResultItemProps) {
  return (
    <li className={classnames("search-result-item", "flex-col", className)}>
      <div className="h-12 w-full flex items-center gap-x-4">
        {icon !== undefined && icon}
        {onClick !== undefined ? (
          <button
            className={classnames(
              "flex-grow h-full flex items-center px-4  bg-app-faded-blue",
              "hover:bg-app-yellow hover:text-app-black",
              "focus:bg-app-yellow focus:text-app-black"
            )}
            onClick={onClick}
          >
            {name}
          </button>
        ) : (
          <span className="flex-grow h-full px-4 flex items-center text-gray-400 text-sm">
            {name}
          </span>
        )}
      </div>
      {children !== undefined && children.length > 0 && (
        <SearchResultsList results={children} className="pl-4" />
      )}
    </li>
  );
}
