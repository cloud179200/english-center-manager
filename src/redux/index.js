import { combineReducers, configureStore } from "@reduxjs/toolkit";
import customizationReducer from "./customization/reducer";
import { connectRouter, routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import userReducer from "./user/reducer";
import utilsReducer from "./utils/reducer";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

export const history = createBrowserHistory();

const persistConfig = {
  key: "root",
  storage: storage,
  stateReconciler: autoMergeLevel2,
  blacklist: ["common", "router", "customization"]
};

const rootReducer = combineReducers({
  customization: customizationReducer,
  router: connectRouter(history),
  user: userReducer,
  common: utilsReducer,
});

const reducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(routerMiddleware(history))
      .concat(thunk),
});

export const persistor = persistStore(store);
