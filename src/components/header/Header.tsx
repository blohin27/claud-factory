import React, { FC, PropsWithChildren } from "react";
import "./index.scss";
import { Link } from "../link";
import { useStore } from "../../store";
import { observer } from "mobx-react-lite";

interface IProps {}

export const Header: FC<PropsWithChildren<IProps>> = observer(() => {
  const { quotes } = useStore();

  return (
    <div className={"header"}>
      {!!quotes.error && (
        <div className={"header-error"}>{quotes.error?.message}</div>
      )}
      <div className={"header-menu"}>
        <Link className={"header-menu_item"} to={"/quotes?tab=a"}>
          {"Котировки А"}
        </Link>
        <Link className={"header-menu_item"} to={"/quotes?tab=b"}>
          {"Котировки Б"}
        </Link>
        <Link className={"header-menu_item"} to={"/about"}>
          {"О приложении"}
        </Link>
      </div>
    </div>
  );
});
