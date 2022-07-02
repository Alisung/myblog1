import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./backupdata/combinedata";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import postSaga from "./saga/backupdatasaga";
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);
console.log(store.getState());
const root = ReactDOM.createRoot(document.getElementById("root"));
sagaMiddleware.run(postSaga);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
