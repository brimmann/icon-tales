import { ZoomIn, ZoomOut } from "lucide-react";

import { useCanvasStore } from "../../store/canvasStore";
import { useControls } from "react-zoom-pan-pinch";
function ZoomTools() {
  const scale = useCanvasStore((state) => state.scale);
  const setScale = useCanvasStore((state) => state.setScale);
  const minScale = useCanvasStore((state) => state.minScale);
  const setTransformInit = useCanvasStore((state) => state.setTransformInit);
  const { centerView } = useControls();

  return (
    <div
      className="flex items-center  px-2
    "
    >
      <button
        className="btn btn-ghost"
        onClick={() => {
          if (scale) {
            setScale(Math.min(3, scale + 0.1));
            setTransformInit(true);
          }
        }}
      >
        <ZoomIn />
      </button>
      <button
        className="btn btn-ghost"
        onClick={() => {
          if (scale && minScale) {
            setScale(Math.max(minScale, scale - 0.1));
            setTransformInit(true);
          }
        }}
        disabled={scale === minScale}
      >
        <ZoomOut />
      </button>

      <button
        title="Reset Zoom"
        className="btn btn-ghost"
        onClick={() => {
          if (minScale === scale) {
            centerView();
          }
          if (minScale) {
            setScale(minScale);
          }
        }}
      >
        Center
      </button>
    </div>
  );
}
export default ZoomTools;
