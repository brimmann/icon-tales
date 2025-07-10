import { useEffect } from "react";
import { useDataStore } from "../../store/dataStore";
import SlideCard from "./SlideCard";
import { useSlideStore } from "../../store/slideStore";
import { useCanvasStore } from "../../store/canvasStore";

function SlidesBottomBar() {
  const activeTale = useDataStore((state) => state.activeTale);
  const setActiveSlideId = useSlideStore((state) => state.setActiveSlideId);
  const activeSlideId = useSlideStore((state) => state.activeSlideId);
  const setTextBoxes = useCanvasStore((state) => state.setTextBoxes);

  // initial loading
  useEffect(() => {
    if (activeTale) {
      const id = activeTale.slides[0].id;
      setTextBoxes(activeTale.slides[0].textBoxes);
      if (id) {
        setActiveSlideId(id);
      }
    }
  }, [activeTale]);

  // when slide changes
  useEffect(() => {
    if (activeTale && activeSlideId) {
      const slide = activeTale.slides.find((s) => s.id === activeSlideId);
      if (slide) {
        setTextBoxes(slide.textBoxes);
      }
    }
  }, [activeSlideId]);

  if (!activeTale) return <div>active tale null</div>;

  return (
    <div className="flex  overflow-x-auto pb-3 gap-3 lg:flex-col  lg:flex-1 lg:overflow-y-auto p-5">
      {activeTale.slides.map((slide) => {
        if (slide.id) {
          return <SlideCard slideId={slide.id} key={slide.id} />;
        }
      })}
    </div>
  );
}

export default SlidesBottomBar;
