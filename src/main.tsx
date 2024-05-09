import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { InitialProvider } from "./context/InitialProvider.tsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <InitialProvider>
        <App />
      </InitialProvider>
    </BrowserRouter>
  </React.StrictMode>
);
