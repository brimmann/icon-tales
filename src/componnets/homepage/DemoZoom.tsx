import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import CanvasDnd from "../editor/CanvasDnd";

const DemoZoom = () => {
  return (
    <TransformWrapper>
      <TransformComponent>
        <CanvasDnd />
      </TransformComponent>
    </TransformWrapper>
  );
};

export default DemoZoom;
