import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { InitialProvider } from "./context/InitialProvider.tsx";
import { BrowserRouter } from "react-router-dom";
import { QueryProvider } from "./lib/tanstack/QueryProvider.tsx";
import { AuthProvider } from "./context/AuthProvider.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryProvider>
        <AuthProvider>
          <InitialProvider>
            <App />
            <ToastContainer position="top-center" />
          </InitialProvider>
        </AuthProvider>
      </QueryProvider>
    </BrowserRouter>
  </React.StrictMode>
);
