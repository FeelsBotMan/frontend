import ReactDOM from "react-dom/client";
import App from "./App";
import { state, ThemeContext } from "./context/themeContext";
import React from "react";

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
