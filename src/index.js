import React from "react";
import { createRoot } from "react-dom/client";
import { store, history, persistor } from "./redux/index";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import App from "./App";

import "./assets/scss/style.scss";
import { ConnectedRouter } from "connected-react-router";
import LoadingComponent from "./utils/component/Loading";
const container = document.getElementById("root-english-center-app");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <PersistGate loading={<LoadingComponent />} persistor={persistor}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </PersistGate>
  </Provider>
);
