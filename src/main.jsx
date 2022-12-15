import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { legacy_createStore as createStore } from "redux";
import rootReducer from "./rootReducer";

const store = createStore(rootReducer);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
