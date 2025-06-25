import React, { useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const PhotoshopZoomPan: React.FC = () => {
  const [zoomLevel, setZoomLevel] = useState(1);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "#2d2d2d",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Toolbar */}
      <div
        style={{
          height: "50px",
          background: "#404040",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: "14px",
          borderBottom: "1px solid #555",
        }}
      >
        Zoom: {Math.round(zoomLevel * 100)}% | Mouse wheel to zoom, drag to pan
      </div>

      {/* Main workspace - this is the "big area" like Photoshop */}
      <div
        style={{
          flex: 1,
          background: "#3a3a3a",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <TransformWrapper
          initialScale={1}
          minScale={0.1}
          maxScale={5}
          centerOnInit={true}
          limitToBounds={false}
          onTransformed={(ref, state) => {
            setZoomLevel(state.scale);
          }}
          wheel={{
            wheelDisabled: false,
            touchPadDisabled: false,
            step: 0.1,
          }}
          panning={{
            velocityDisabled: true,
          }}
        >
          <TransformComponent
            wrapperStyle={{
              width: "100%",
              height: "100%",
              cursor: "grab",
            }}
            contentStyle={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* This is our "canvas" - like a Photoshop document */}
            <div
              style={{
                width: "800px",
                height: "600px",
                background: "white",
                border: "1px solid #000",
                boxShadow: "0 0 20px rgba(0,0,0,0.5)",
                position: "relative",
                borderRadius: "2px",
              }}
            >
              {/* Canvas content - this is what you'd be editing */}
              <div
                style={{
                  position: "absolute",
                  top: "20px",
                  left: "20px",
                  fontSize: "24px",
                  fontFamily: "Arial, sans-serif",
                  color: "#333",
                }}
              >
                My Document
              </div>

              {/* Sample design elements */}
              <div
                style={{
                  position: "absolute",
                  top: "80px",
                  left: "50px",
                  width: "200px",
                  height: "100px",
                  background: "linear-gradient(45deg, #ff6b6b, #4ecdc4)",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
              >
                Layer 1
              </div>

              <div
                style={{
                  position: "absolute",
                  top: "220px",
                  right: "80px",
                  width: "150px",
                  height: "150px",
                  background: "linear-gradient(135deg, #667eea, #764ba2)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
              >
                Layer 2
              </div>

              {/* Text element */}
              <div
                style={{
                  position: "absolute",
                  bottom: "100px",
                  left: "50px",
                  fontSize: "18px",
                  color: "#333",
                  fontFamily: "Arial, sans-serif",
                  maxWidth: "300px",
                }}
              >
                This is some text content that would be part of your design. It
                scales and moves with everything else.
              </div>

              {/* Grid pattern overlay */}
              <div
                style={{
                  position: "absolute",
                  bottom: "20px",
                  right: "20px",
                  display: "grid",
                  gridTemplateColumns: "repeat(6, 20px)",
                  gap: "2px",
                }}
              >
                {Array.from({ length: 18 }).map((_, i) => (
                  <div
                    key={i}
                    style={{
                      width: "20px",
                      height: "20px",
                      background: i % 2 === 0 ? "#e0e0e0" : "#f5f5f5",
                      border: "1px solid #ddd",
                    }}
                  />
                ))}
              </div>
            </div>
          </TransformComponent>
        </TransformWrapper>

        {/* Zoom indicator in corner */}
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            right: "20px",
            background: "rgba(0,0,0,0.7)",
            color: "white",
            padding: "8px 12px",
            borderRadius: "4px",
            fontSize: "12px",
            fontFamily: "monospace",
          }}
        >
          {Math.round(zoomLevel * 100)}%
        </div>
      </div>
    </div>
  );
};

export default PhotoshopZoomPan;
