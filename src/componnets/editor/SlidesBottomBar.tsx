import SlideCard from "./SlideCard";

function SlidesBottomBar() {
  const slidesMock = [1, 2, 3, 4, 5, 6, 7];

  return (
    <div className="flex justify-between overflow-x-auto pb-3 gap-3 lg:flex-col  lg:flex-1 lg:overflow-y-auto p-5">
      {slidesMock.map((mockNum) => (
        <SlideCard mockNum={mockNum} key={mockNum} />
      ))}
    </div>
  );
}

export default SlidesBottomBar;
