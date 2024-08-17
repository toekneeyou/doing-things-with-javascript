import { ReactNode } from "react";
import { classnames } from "../../lib/util/classnames";
import {
  PropsWithClassName,
  PropsWithClassNameAndChildren,
} from "../../lib/types";
/**
 *
 *
 * Card
 *
 *
 */
interface CardProps extends PropsWithClassName {
  header?: ReactNode;
  body?: ReactNode;
}
const Card = function ({ header, body, className }: CardProps) {
  return (
    <div
      className={classnames(
        "card",
        "flex flex-col rounded-xl overflow-hidden shadow-md",
        className
      )}
    >
      {header}
      {body}
    </div>
  );
};
/**
 *
 *
 * Card Header
 *
 *
 */
interface CardHeaderProps extends PropsWithClassName {
  title: ReactNode;
}
const CardHeader: React.FC<CardHeaderProps> = ({ className, title }) => {
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
};
/**
 *
 *
 * Card Body
 *
 *
 */
const CardBody: React.FC<PropsWithClassNameAndChildren> = ({
  className,
  children,
}) => {
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
};

Card.Header = CardHeader;
Card.Body = CardBody;
export default Card;
