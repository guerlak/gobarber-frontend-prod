import React, { FunctionComponent } from "react";
import { BrowserRouter } from "react-router-dom";
import Global from "./styles/Global";
import Providers from "./hooks";
import Routes from "./routes";

const App: FunctionComponent = () => {
  return (
    <>
      <Providers>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </Providers>
      <Global />
    </>
  );
};
export default App;
