import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import ContextTheme from "./Context/ContextTheme";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ContextTheme>
      <Router>
        <App />
      </Router>
    </ContextTheme>
  </React.StrictMode>
);
