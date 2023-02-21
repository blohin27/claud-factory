import React, { FC, memo, PropsWithChildren } from "react";
import "./index.scss";

interface IProps {}

export const Content: FC<PropsWithChildren<IProps>> = memo(({ children }) => {
  return <div className={"content"}>{children}</div>;
});
