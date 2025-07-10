import { useSlideStore } from "../../store/slideStore";

interface SlideCardProps {
  slideId: number;
}

function SlideCard({ slideId }: SlideCardProps) {
  const activeSlideId = useSlideStore((state) => state.activeSlideId);
  const setActiveSlideId = useSlideStore((state) => state.setActiveSlideId);
  return (
    <div
      className="flex flex-col gap-1 cursor-pointer"
      onClick={() => {
        setActiveSlideId(slideId);
      }}
    >
      <div
        className={`card p-3 border-5  ${
          activeSlideId && activeSlideId === slideId
            ? "border-primary"
            : "border-base-300"
        }`}
      >
        <figure className=" h-20 lg:h-32 aspect-video rounded-none">
          <img
            src="https://redthread.uoregon.edu/files/large/affd16fd5264cab9197da4cd1a996f820e601ee4.jpg"
            alt="Shoes"
            className=""
          />
        </figure>
      </div>
    </div>
  );
}

export default SlideCard;
