import React, { createContext, FC, PropsWithChildren, useContext } from "react";
import { AppStore } from "./types";
import { observer } from "mobx-react-lite";

interface IProps {
  store: AppStore;
}

export const StoreContext = createContext<AppStore>({} as AppStore);
export const useStore = () => useContext(StoreContext);

export const StoreProvider: FC<PropsWithChildren<IProps>> = observer(
  ({ store, children }) => {
    return (
      <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    );
  }
);
