import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { state, ThemeContext } from "./context/themeContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeContext.Provider value={state}>
      <App />
    </ThemeContext.Provider>
  </React.StrictMode>
);
