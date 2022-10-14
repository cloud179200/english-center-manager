import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "redux/index";
import { BrowserRouter } from "react-router-dom";

import config from "./config";

import App from "./App";

import "assets/scss/style.scss";

const container = document.getElementById("root-english-center-app");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <BrowserRouter basename={config.basename}>
        <App />
    </BrowserRouter>
  </Provider>
);
