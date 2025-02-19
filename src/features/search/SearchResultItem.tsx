import { ReactNode } from "react";
import { classnames } from "../../lib/util/classnames";
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
    <li
      className={classnames(
        "search-result-item",
        "flex-col text-sm",
        className
      )}
    >
      <div className="h-12 w-full flex items-center gap-x-standard px-2 py-1">
        {icon !== undefined && icon}

        {onClick !== undefined ? (
          <button
            className={classnames(
              "flex-grow h-full flex items-center pl-8 pr-4 rounded-xl",
              "hover:bg-slate-600",
              "focus:bg-slate-600"
            )}
            onClick={onClick}
          >
            {name}
          </button>
        ) : (
          <span className="flex-grow h-full px-4 flex items-center text-gray-400">
            {name}
          </span>
        )}
      </div>

      {children !== undefined && children.length > 0 && (
        <SearchResultsList results={children} />
      )}
    </li>
  );
}
