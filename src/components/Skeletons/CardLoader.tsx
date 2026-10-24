import Heart from "../SvgIcons/Heart";

function CardLoader() {
  return (
    <div className="rounded-[10px] bg-white w-full max-w-77.5 p-4 h-70 flex flex-col animate-pulse shrink-0">
      <div className="flex justify-between">
        <div className="h-4 bg-[#1A202C] rounded w-2/4 mb-4"></div>
        <Heart loading={true} />
      </div>
      <div className="h-1/2 bg-gray-200 rounded w-full mx-auto mb-4"></div>
      <div className="flex justify-between mb-4">
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2 w-1/3">
          <div className="h-4 bg-[#1A202C] rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
        </div>
        <div className={`rounded-[10px] bg-blue-700 h-9 w-25`}></div>
      </div>
    </div>
  );
}

export default CardLoader;
