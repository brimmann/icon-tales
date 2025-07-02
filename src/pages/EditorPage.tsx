import {
  type ReactZoomPanPinchRef,
  TransformComponent,
  TransformWrapper,
} from "react-zoom-pan-pinch";
import CanvasCard from "../componnets/editor/CanvasCard";
import SlidesBottomBar from "../componnets/editor/SlidesBottomBar";
import Toolbar from "../componnets/editor/Toolbar";
import { useEffect, useRef } from "react";
import { useCanvasStore } from "../store/canvasStore";

function EditorPage() {
  const wrapperWrapper = useRef<HTMLDivElement | null>(null);
  const scale = useCanvasStore((state) => state.scale);
  const transformInit = useCanvasStore((state) => state.transformInit);
  const setTransformInit = useCanvasStore((state) => state.setTransformInit);
  const setIsEditing = useCanvasStore((state) => state.setIsEditing);
  const setActiveTextBoxId = useCanvasStore(
    (state) => state.setActiveTextBoxId
  );

  const setMinScale = useCanvasStore((state) => state.setMinScale);
  // const setActiveTextBoxId = useCanvasStore(
  //   (state) => state.setActiveTextBoxId
  // );

  const setScale = useCanvasStore((state) => state.setScale);

  const minScale = useRef<number>(0);
  const transofrmWrapperRef = useRef<ReactZoomPanPinchRef>(null);

  useEffect(() => {
    const calculateScale = () => {
      const canvasWidth = 1200;

      if (wrapperWrapper.current) {
        const availableWidth = wrapperWrapper.current?.clientWidth;
        const padding = 40;
        const scaleX = (availableWidth - padding) / canvasWidth;
        const fitScale = Math.round(Math.min(scaleX, 1) * 10) / 10;
        setScale(fitScale);
        setMinScale(fitScale);
        minScale.current = fitScale;
      }
    };

    calculateScale();
  }, []);

  useEffect(() => {
    if (transofrmWrapperRef.current && scale && transformInit) {
      const state = transofrmWrapperRef.current.instance.transformState;

      transofrmWrapperRef.current.setTransform(
        state.positionX,
        state.positionY,
        scale,
        100
      );
      if (scale <= minScale.current) {
        const timeOut = setTimeout(() => {
          if (transofrmWrapperRef.current) {
            transofrmWrapperRef.current.centerView();
            const state = transofrmWrapperRef.current.instance.transformState;
            console.log("min", state);
            clearTimeout(timeOut);
          }
        }, 110);
      }
    }
  }, [scale]);

  return (
    <div className="flex flex-col h-full lg:flex-row-reverse">
      <div className="flex-1 min-h-0 flex flex-col  bg-base-300 overflow-hidden">
        <div
          className="relative w-full flex-1 min-h-0"
          id="wrapper-wrapper"
          ref={wrapperWrapper}
          onClick={(e) => {
            const target = e.target as HTMLDivElement;
            if (!target.closest(".text-box") && !target.closest(".tool-bar")) {
              setIsEditing(false);
              setActiveTextBoxId(null);
            }
          }}
        >
          {scale !== null && (
            <TransformWrapper
              ref={transofrmWrapperRef}
              panning={{ excluded: ["text-box", "tool-bar", "handle"] }}
              initialScale={scale}
              minScale={minScale.current}
              maxScale={3}
              wheel={{ step: 0.1 }}
              doubleClick={{ disabled: true }}
              limitToBounds={false}
              centerOnInit={true}
              onZoomStop={(ref) => {
                console.log("zoomstop");
                setScale(ref.instance.transformState.scale);
                setTransformInit(true);
              }}
              // onPanningStart={() => {
              //   const activeElement = document.activeElement as HTMLElement;
              //   if (activeElement) {
              //     // activeElement.blur();
              //     // setActiveTextBoxId(null);
              //   }
              // }}
            >
              <Toolbar />
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
