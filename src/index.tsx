import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import { RecoilRoot } from "recoil";
import App from "./App";

import { darkTheme } from "./theme";

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <ThemeProvider theme={darkTheme}>
        <App />
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);
