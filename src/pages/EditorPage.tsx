import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import CanvasCard from "../componnets/editor/CanvasCard";
import SlidesBottomBar from "../componnets/editor/SlidesBottomBar";
import Toolbar from "../componnets/editor/Toolbar";
import { useEffect, useRef } from "react";
import { useCanvasStore } from "../store/canvasStore";

function EditorPage() {
  const wrapperWrapper = useRef<HTMLDivElement | null>(null);
  const scale = useCanvasStore((state) => state.scale);
  const setScale = useCanvasStore((state) => state.setScale);

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
  }, [setScale]);

  return (
    <div className="flex flex-col h-full lg:flex-row-reverse">
      <div className="flex-1 min-h-0 flex flex-col  bg-base-300 overflow-hidden">
        <div className="flex items-center justify-center lg:mt-5">
          <Toolbar />
        </div>

        <div
          className="w-full flex-1 min-h-0"
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
              doubleClick={{ disabled: true }}
              limitToBounds={false}
              centerZoomedOut={false}
              centerOnInit={true}
              onTransformed={(_, { scale }) => setScale(scale)}
              onPanningStart={() => {
                const activeElement = document.activeElement as HTMLElement;
                if (activeElement) {
                  activeElement.blur();
                }
              }}
            >
              <TransformComponent
                wrapperClass=" !h-full !w-full "
                contentClass=""
              >
                <CanvasCard />
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
