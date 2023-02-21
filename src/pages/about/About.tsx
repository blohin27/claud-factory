import React, { FC, PropsWithChildren } from "react";
import { Content } from "../../components";

interface IProps {}

export const About: FC<PropsWithChildren<IProps>> = () => {
  return <Content>Страница о приложении</Content>;
};
