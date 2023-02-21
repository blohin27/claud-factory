import React, { FC, memo, PropsWithChildren } from "react";
import "./index.scss";

interface IProps {}

export const Container: FC<PropsWithChildren<IProps>> = memo(({ children }) => {
  return <div className={"container"}>{children}</div>;
});
