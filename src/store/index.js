import { composeWithDevTools } from "remote-redux-devtools";
import createSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware } from "redux";
import { persistReducer } from "redux-persist";
import {
  createStateSyncMiddleware,
  initStateWithPrevTab,
} from "redux-state-sync";
import reduxStorage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

import { logger } from "redux-logger";

import sagas from "../sagas";
import { DEV_ENV } from "../constants";

export default function configureStore(reducers, onComplete: Function) {
  const persistConfig = {
    key: "root",
    storage: reduxStorage,
    stateReconciler: autoMergeLevel2, // see "Merge Process" section for details.
    whitelist: ["user", "canvasData", "dmPersist"],
  };

  const syncStateConfig = {
    whitelist: ["user", "canvasData"],
  };

  const sagaMiddleware = createSagaMiddleware();
  const pReducer = persistReducer(persistConfig, reducers);

  const middlewares = [
    createStateSyncMiddleware(syncStateConfig),
    sagaMiddleware,
  ];

  if (process.env.REACT_APP_ENV === DEV_ENV) {
    // middlewares.push(logger);
  }

  const store = createStore(
    pReducer,
    composeWithDevTools(applyMiddleware(...middlewares))
  );
  initStateWithPrevTab(store);

  setTimeout(() => {
    onComplete();
  }, 1000);

  sagaMiddleware.run(sagas);

  return store;
}
