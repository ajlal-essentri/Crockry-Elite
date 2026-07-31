import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { StoreProvider } from "./context/StoreContext";
import App from "./App.jsx";
import "./Styles/global.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
  <StoreProvider>
    <App />
  </StoreProvider>
</StrictMode>
);