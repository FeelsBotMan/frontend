import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

async function mountApp() {
  if (process.env.NODE_ENV === "development") {
    const { worker } = await import("./mock/browser");
    await worker.start({
      onUnhandledRequest(req, print) {
        const allowedDomain = "https://loremflickr.com/";
        const allowedDomain2 = "https://picsum.photos/";
        const allowedDomain3 = " https://fonts.gstatic.com";

        const pathname = new URL(req.url).pathname;
        const url = new URL(req.url);
        if (
          pathname.startsWith("/public/") ||
          pathname.startsWith("/slideImage/") ||
          pathname.startsWith("/dist/") ||
          pathname.startsWith("/src/assets/") ||
          url.href.startsWith(allowedDomain) ||
          url.href.startsWith(allowedDomain2) ||
          url.href.startsWith(allowedDomain3)
        ) {
          return;
        }

        print.warning();
      },
    });
  }

  const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
  );
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

mountApp();
