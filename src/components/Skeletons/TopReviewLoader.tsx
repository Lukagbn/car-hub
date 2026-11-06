import StarRating from "../StarRating";

function TopReviewLoader() {
  return (
    <section className="lg:mx-auto lg:max-w-310 mt-4">
      <div className="w-1/6 h-4 bg-[#1A202C] rounded mt-4"></div>
      <div className="flex gap-2 mt-4 overflow-x-auto animate-pulse">
        {Array.from({ length: 6 }).map((_, index) => {
          return (
            <div
              key={index}
              className="flex flex-col bg-white max-w-70 w-full h-45 rounded-[10px] p-3 shrink-0 justify-between"
            >
              <div className="flex justify-between items-center">
                <h3 className="w-15 h-4 bg-[#1A202C] rounded"></h3>
                <StarRating rating={5} />
              </div>
              <p className="h-4 bg-gray-200 rounded w-1/4"></p>
              <p className="h-4 bg-gray-200 rounded w-2/4"></p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default TopReviewLoader;
