import React from "react";
import { createRoot } from "react-dom/client";
import { store, history } from "./redux/index";
import { Provider } from "react-redux";

import App from "./App";

import "./assets/scss/style.scss";
import { ConnectedRouter } from "connected-react-router";
const container = document.getElementById("root-english-center-app");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
);
