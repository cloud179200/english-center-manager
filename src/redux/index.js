import { combineReducers, configureStore } from "@reduxjs/toolkit";
import customizationReducer from "./customization/reducer";
import createSagaMiddleware from "redux-saga";
import { createBrowserHistory } from "history";
import userReducer from "./user/reducer";
import utilsReducer from "./utils/reducer";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { authSaga } from "./auth/operators";

export const history = createBrowserHistory();

const persistConfig = {
  key: "root",
  storage: storage,
  stateReconciler: autoMergeLevel2,
  blacklist: ["common", "router", "customization"]
};

const rootReducer = combineReducers({
  customization: customizationReducer,
  user: userReducer,
  common: utilsReducer,
});

const reducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();
sagaMiddleware.run(authSaga)
export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(sagaMiddleware),
});

export const persistor = persistStore(store);
