import ReactDOM from "react-dom/client";
import App from "./App";
import { BookStoreThemeProvider } from "./context/themeContext";
import React from "react";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BookStoreThemeProvider>
      <App />
    </BookStoreThemeProvider>
  </React.StrictMode>
);
