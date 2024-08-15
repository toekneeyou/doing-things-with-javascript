import { PropsWithChildren, ReactNode } from "react";
import { classnames } from "../../lib/util/classnames";

interface CardProps {
  header?: ReactNode;
  body?: ReactNode;
  className?: string;
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

interface CardHeaderProps {
  className?: string;
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

interface CardBodyProps extends PropsWithChildren {
  className?: string;
}

function CardBody({ className, children }: CardBodyProps) {
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
