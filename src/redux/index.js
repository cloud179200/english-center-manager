import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import customizationReducer from "./customization/customizationReducer";
import { connectRouter, routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    customization: customizationReducer,
    router: connectRouter(history),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(routerMiddleware(history)).concat(thunk),
});
