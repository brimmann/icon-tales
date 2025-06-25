import React, { useRef, useEffect, useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const transformRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [initialScale, setInitialScale] = useState(1);

  useEffect(() => {
    const calculateScale = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;

        const canvasWidth = 1280;
        const canvasHeight = 720;

        const scaleX = containerWidth / canvasWidth;
        const scaleY = containerHeight / canvasHeight;

        // Use the smaller scale to ensure entire canvas fits
        const scale = Math.min(scaleX, scaleY) * 0.95; // 0.95 for small padding
        setInitialScale(scale);
      }
    };

    calculateScale();
    window.addEventListener("resize", calculateScale);
    return () => window.removeEventListener("resize", calculateScale);
  }, []);

  return (
    <div className="w-full h-screen flex flex-col">
      {/* Toolbar */}
      <div className="bg-gray-800 text-white p-2 flex gap-2">
        <button
          onClick={() => transformRef.current?.zoomIn()}
          className="px-3 py-1 bg-blue-600 rounded"
        >
          Zoom In
        </button>
        <button
          onClick={() => transformRef.current?.zoomOut()}
          className="px-3 py-1 bg-blue-600 rounded"
        >
          Zoom Out
        </button>
        <button
          onClick={() => transformRef.current?.setTransform(0, 0, initialScale)}
          className="px-3 py-1 bg-green-600 rounded"
        >
          Fit to Screen
        </button>
        <button
          onClick={() => transformRef.current?.resetTransform()}
          className="px-3 py-1 bg-orange-600 rounded"
        >
          Reset
        </button>
        <button
          onClick={() => transformRef.current?.centerView()}
          className="px-3 py-1 bg-purple-600 rounded"
        >
          Center
        </button>
      </div>

      {/* Zoom Container */}
      <div ref={containerRef} className="flex-1 overflow-hidden bg-gray-200">
        <TransformWrapper
          ref={transformRef}
          initialScale={initialScale}
          minScale={0.1}
          maxScale={3}
          limitToBounds={true}
          centerOnInit={true}
          wheel={{ step: 0.1 }}
        >
          <TransformComponent wrapperStyle={{ background: "#f0f0f0" }}>
            <CanvasDnd />
          </TransformComponent>
        </TransformWrapper>
      </div>
    </div>
  );
};

const CanvasDnd: React.FC = () => {
  return (
    <div
      className="bg-white border-4 border-red-500 shadow-lg"
      style={{ width: "1280px", height: "720px" }}
    >
      <div
        className="p-8 bg-blue-50"
        style={{ height: "720px", boxSizing: "border-box" }}
      >
        <h1 className="text-4xl font-bold mb-4 text-blue-900">
          Canvas Title (1280x720)
        </h1>
        <h2 className="text-2xl font-semibold mb-3 text-green-700">
          Section 1
        </h2>
        <p className="text-lg mb-4">
          This is a paragraph inside the 1280x720 canvas. The canvas maintains
          its fixed size while the zoom controls affect how it's displayed in
          the viewport.
        </p>

        <h2 className="text-2xl font-semibold mb-3 text-green-700">
          Section 2
        </h2>
        <p className="text-lg mb-4">
          Another paragraph to demonstrate content layout. The descendants
          follow normal layout rules within the fixed canvas dimensions.
        </p>

        <div className="grid grid-cols-2 gap-4 mt-8">
          <div className="bg-yellow-200 p-4 rounded border-2 border-yellow-400">
            <h3 className="text-xl font-medium mb-2">Box 1</h3>
            <p>Content in first box</p>
          </div>
          <div className="bg-pink-200 p-4 rounded border-2 border-pink-400">
            <h3 className="text-xl font-medium mb-2">Box 2</h3>
            <p>Content in second box</p>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mb-3 mt-8 text-green-700">
          Section 3
        </h2>
        <p className="text-lg">
          Final paragraph showing how content flows normally within the fixed
          canvas area. Use the toolbar controls to zoom and pan around this
          content.
        </p>
      </div>
    </div>
  );
};

export default App;
