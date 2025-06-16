interface SlideCardProps {
  mockNum: number;
}

function SlideCard({ mockNum }: SlideCardProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className="card p-3 border-5 border-base-300">
        <figure className=" h-20 lg:h-32 aspect-video rounded-none">
          <img
            src="https://redthread.uoregon.edu/files/large/affd16fd5264cab9197da4cd1a996f820e601ee4.jpg"
            alt="Shoes"
            className=""
          />
        </figure>
      </div>
      <p className="text-xs text-center">{mockNum}</p>
    </div>
  );
}

export default SlideCard;
