import CanvasCard from "../componnets/editor/CanvasCard";
import SlidesBottomBar from "../componnets/editor/SlidesBottomBar";
import Toolbar from "../componnets/editor/Toolbar";

function EditorPage() {
  return (
    <div className="flex flex-col h-full lg:flex-row-reverse">
      <div className="flex-1 min-h-0 flex flex-col  bg-base-300">
        <div className="flex items-center justify-center lg:mt-5">
          <Toolbar />
        </div>

        <div className="flex justify-center items-center h-full">
          <CanvasCard />
        </div>
      </div>
      <div className="flex flex-col">
        <div className="mb-2 flex gap-2 items-center p-5">
          <h1 className="font-bold">Slides</h1>
          <button className="btn btn-primary text-sm">New +</button>
        </div>
        <div className="divider m-0 p-0"></div>
        <SlidesBottomBar />
      </div>
    </div>
  );
}

export default EditorPage;
