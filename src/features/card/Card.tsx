import { ReactNode } from "react";
import { classnames } from "../../util/classnames";

interface CardProps {
  title?: ReactNode;
  cardClassName?: string;
  cardBodyClassName?: string;
  cardHeaderClassname?: string;
  children?: ReactNode;
}

export default function Card({
  cardClassName,
  cardBodyClassName,
  cardHeaderClassname,
  title,
  children,
}: CardProps) {
  return (
    <div
      className={classnames(
        "card",
        "flex flex-col rounded-xl overflow-hidden min-w-48",
        cardClassName
      )}
    >
      {!!title && (
        <div
          className={classnames(
            "card-header",
            "centered px-4 space-x-2 bg-app-dark-blue h-20 text-xl",
            cardHeaderClassname
          )}
        >
          {title}
        </div>
      )}
      <div
        className={classnames(
          "card-body",
          "bg-app-faded-blue h-max min-h-24",
          cardBodyClassName
        )}
      >
        {children}
      </div>
    </div>
  );
}
