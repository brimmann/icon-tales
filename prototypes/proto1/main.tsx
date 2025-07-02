import React from "react";
import ReactDOM from "react-dom/client";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";

// Ensure the root element exists before rendering
const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ResizableBox
        width={200}
        height={200}
        minConstraints={[100, 100]}
        maxConstraints={[500, 500]}
      >
        <div
          className="box"
          style={{
            border: "1px solid #ccc",
            background: "#f0f0f0",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span contentEditable={true} suppressContentEditableWarning={true}>
            Contents
          </span>
        </div>
      </ResizableBox>
    </React.StrictMode>
  );
} else {
  console.error("Failed to find the root element");
}
