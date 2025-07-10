import React from "react";
import ReactDOM from "react-dom/client";
import BusinessCard from "./Card";
import "../../src/index.css";

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <BusinessCard />
    </React.StrictMode>
  );
} else {
  console.error("Failed to find the root element");
}
