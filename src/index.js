import { createRoot } from "react-dom/client";
import { store } from "./redux/index";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";

import App from "./App";

import "./assets/scss/style.scss";

const container = document.getElementById("root-english-center-app");
const root = createRoot(container);

root.render(
  <Provider store={store}>
      <App />
  </Provider>
);
