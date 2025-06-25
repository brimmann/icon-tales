import CanvasDnd from "./CanvasDnd";

function CanvasCard() {
  return (
    <div
      id="canvas-card"
      className=" shadow-sm aspect-video w-11/12 max-w-[880px] bg-white overflow-hidden cursor-grab"
    >
      <CanvasDnd />
    </div>
  );
}
export default CanvasCard;
