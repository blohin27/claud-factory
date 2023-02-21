import React from "react";
import { About } from "./pages/about/About";
import { Quotes } from "./pages/quotes/Quotes.component";

export interface IRoute {
  path: RouterPaths;
  component: React.ComponentType<any>;
  children?: IRoute[];
}

export enum RouterPaths {
  ABOUT = "/about",
  QUOTES = "/quotes",
}

export const routes: IRoute[] = [
  { path: RouterPaths.ABOUT, component: About },
  { path: RouterPaths.QUOTES, component: Quotes },
];
