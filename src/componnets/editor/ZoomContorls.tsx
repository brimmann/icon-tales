import { useControls } from "react-zoom-pan-pinch";
import { useCallback, useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CenterFocusStrongIcon from "@mui/icons-material/CenterFocusStrong";

// Zoom Controls Component
function ZoomControls() {
  const { zoomIn, zoomOut, resetTransform, instance } = useControls();
  const [zoomLevel, setZoomLevel] = useState(100);

  // Update zoom level display when zoom changes
  const handleZoomIn = useCallback(() => {
    zoomIn(0.25);
    if (instance) {
      const newScale = Math.min(instance.transformState.scale * 1.25, 8);
      setZoomLevel(Math.round(newScale * 100));
    }
  }, [zoomIn, instance]);

  const handleZoomOut = useCallback(() => {
    zoomOut(0.25);
    if (instance) {
      const newScale = Math.max(instance.transformState.scale * 0.8, 0.25);
      setZoomLevel(Math.round(newScale * 100));
    }
  }, [zoomOut, instance]);

  const handleReset = useCallback(() => {
    resetTransform();
    setZoomLevel(100);
  }, [resetTransform]);

  // Listen to zoom changes to update the display
  useEffect(() => {
    if (instance) {
      const updateZoomLevel = () => {
        setZoomLevel(Math.round(instance.transformState.scale * 100));
      };

      // Update zoom level when transform changes
      const interval = setInterval(updateZoomLevel, 100);
      return () => clearInterval(interval);
    }
  }, [instance]);

  return (
    <div className="absolute bottom-4 right-4 z-10 rounded-sm border border-gray-200 p-1 flex flex-col items-center gap-1">
      {/* Zoom Out Button */}
      <button
        onClick={handleZoomOut}
        disabled={instance?.transformState.scale <= 0.25}
        className="btn btn-ghost btn-xs"
        title="Zoom Out"
      >
        <RemoveIcon fontSize="small" />
      </button>

      {/* Zoom Level Indicator */}
      <div className="text-xs">{zoomLevel}%</div>

      {/* Zoom In Button */}
      <button
        onClick={handleZoomIn}
        disabled={instance?.transformState.scale >= 8}
        className="btn btn-ghost btn-xs"
        title="Zoom In"
      >
        <AddIcon fontSize="small" />
      </button>

      {/* Reset Zoom Button */}
      <button
        onClick={handleReset}
        className="btn btn-ghost btn-xs"
        title="Reset Zoom"
      >
        <CenterFocusStrongIcon fontSize="small" />
      </button>
    </div>
  );
}

export default ZoomControls;
