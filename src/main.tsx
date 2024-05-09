import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { InitialProvider } from "./context/InitialProvider.tsx";
import { BrowserRouter } from "react-router-dom";
import { QueryProvider } from "./lib/tanstack/QueryProvider.tsx";
import { AuthProvider } from "./context/AuthProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryProvider>
        <InitialProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </InitialProvider>
      </QueryProvider>
    </BrowserRouter>
  </React.StrictMode>
);
