import React, { FC, memo, PropsWithChildren, useCallback } from "react";
import { NavLink, NavLinkProps, useLocation } from "react-router-dom";
import { RouterPaths } from "../../routes";
import "./index.scss";
import classNames from "classnames";

interface IProps
  extends Omit<NavLinkProps, "to" | "className">,
    React.RefAttributes<HTMLAnchorElement> {
  to: RouterPaths | string;
  className?: string;
}

export const Link: FC<PropsWithChildren<IProps>> = memo(
  ({ className, ...props }) => {
    const { pathname, search } = useLocation();

    const _className = useCallback(
      ({ isActive }: { isActive: boolean }) => {
        const active = props.to.includes("?")
          ? pathname + search === props.to
          : isActive;

        return classNames("link", { link__active: active }, className);
      },
      [props.to, search, pathname, className]
    );

    return <NavLink className={_className} {...props} />;
  }
);
