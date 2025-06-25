import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import CanvasCard from "../componnets/editor/CanvasCard";
import SlidesBottomBar from "../componnets/editor/SlidesBottomBar";
import Toolbar from "../componnets/editor/Toolbar";
import { useState, useEffect, useRef } from "react";

function EditorPage() {
  const [scale, setScale] = useState<number | null>(null);

  const wrapperWrapper = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const calculateScale = () => {
      const canvasWidth = 1200;

      if (wrapperWrapper.current) {
        const availableWidth = wrapperWrapper.current?.clientWidth;
        const padding = 40;
        const scaleX = (availableWidth - padding) / canvasWidth;
        const fitScale = Math.min(scaleX, 1);

        setScale(fitScale);
      }
    };

    calculateScale();
  }, []);

  return (
    <div className="flex flex-col h-full lg:flex-row-reverse">
      <div className="flex-1 min-h-0 flex flex-col  bg-base-300 overflow-hidden">
        <div className="flex items-center justify-center lg:mt-5">
          <Toolbar />
        </div>

        <div
          className="w-full h-full"
          id="wrapper-wrapper"
          ref={wrapperWrapper}
        >
          {scale !== null && (
            <TransformWrapper
              panning={{ excluded: ["text-box"] }}
              initialScale={scale}
              minScale={scale}
              maxScale={3}
              wheel={{ step: 0.1 }}
              doubleClick={{ disabled: false, step: 0.5 }}
              limitToBounds={false}
              centerZoomedOut={false}
              centerOnInit={true}
            >
              <TransformComponent
                wrapperClass=" !h-full !w-full"
                contentClass="!h-full !w-full"
              >
                <div className="flex justify-center items-center h-full w-full ">
                  <CanvasCard />
                </div>
              </TransformComponent>
            </TransformWrapper>
          )}
        </div>
      </div>
      <div className="flex flex-col  ">
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
