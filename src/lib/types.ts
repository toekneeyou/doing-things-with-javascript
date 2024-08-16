import { PropsWithChildren } from "react";

export interface PropsWithClassName {
  className?: string;
}

export interface PropsWithClassNameAndChildren
  extends PropsWithClassName,
    PropsWithChildren {}
