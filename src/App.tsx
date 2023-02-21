import React, { useCallback } from "react";

import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { IRoute, RouterPaths, routes } from "./routes";
import { Container, Header } from "./components";
import { store, StoreProvider } from "./store";

function App() {
  const renderRoutes = useCallback(
    (_routes: IRoute[]) =>
      _routes.map((route, index) => {
        const Component = route.component;

        return (
          <Route
            index={index === 0}
            path={route.path}
            key={route.path}
            element={
              <>
                <Component />
                <Outlet />
              </>
            }
          >
            {renderRoutes(route.children || [])}
          </Route>
        );
      }),
    []
  );

  return (
    <Container>
      <StoreProvider store={store}>
        <Header />

        <Routes>
          {renderRoutes(routes)}
          <Route
            path={"*"}
            element={<Navigate to={RouterPaths.ABOUT} replace={true} />}
          />
        </Routes>
      </StoreProvider>
    </Container>
  );
}

export default App;
