import CanvasDnd from "./CanvasDnd";

function CanvasCard() {
  return (
    <div
      id="canvas-card"
      className=" shadow-sm  bg-white cursor-grab"
      style={{
        width: "1200px",
        height: "675px",
        minWidth: "1200px",
        minHeight: "675px",
      }}
    >
      <CanvasDnd />
    </div>
  );
}
export default CanvasCard;
