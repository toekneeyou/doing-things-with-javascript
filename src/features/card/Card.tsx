import { ReactNode } from "react";
import { classnames } from "../../lib/util/classnames";
import {
  PropsWithClassName,
  PropsWithClassNameAndChildren,
} from "../../lib/types";

interface CardProps extends PropsWithClassName {
  header?: ReactNode;
  body?: ReactNode;
}

const Card = function ({ header, body, className }: CardProps) {
  return (
    <div
      className={classnames(
        "card",
        "flex flex-col rounded-xl overflow-hidden min-w-48 shadow-md",
        className
      )}
    >
      {header}
      {body}
    </div>
  );
};

interface CardHeaderProps extends PropsWithClassName {
  title: ReactNode;
}
function CardHeader({ className, title }: CardHeaderProps) {
  return (
    <div
      className={classnames(
        "card__header",
        "centered px-4 space-x-2 bg-app-dark-blue h-16 text-lg",
        className
      )}
    >
      {title}
    </div>
  );
}

function CardBody({ className, children }: PropsWithClassNameAndChildren) {
  return (
    <div
      className={classnames(
        "card__body",
        "bg-app-faded-blue h-max min-h-24",
        className
      )}
    >
      {children}
    </div>
  );
}

Card.Header = CardHeader;
Card.Body = CardBody;

export default Card;
