import TextBox from "./TextBox";

function Canvas() {
  return (
    <div className="relative w-full h-full">
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(to right, #000 1px, transparent 1px),
            linear-gradient(to bottom, #000 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
        }}
      />
      <TextBox />
    </div>
  );
}
export default Canvas;
