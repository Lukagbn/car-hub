import CardLoader from "./CardLoader";
import StarRating from "../StarRating";
import Heart from "../SvgIcons/Heart";

function CarDetailsLoader() {
  return (
    <section className="animate-pulse w-full">
      <div className="lg:flex lg:gap-10 lg:max-w-310 lg:mx-auto lg:mb-4 lg:h-112.5">
        <div className="lg:max-w-125 lg:w-full lg:flex lg:flex-col sm:max-w-112.5 sm:w-full sm:mx-auto">
          <div className="w-full bg-gray-200 h-52 mb-4 rounded-[10px] md:h-112.5 lg:h-full"></div>
          <div className="flex w-full justify-between mb-4 lg:mb-0">
            <div className="w-[30%] bg-gray-200 min-h-15 h-full rounded-[10px] md:h-37.5 lg:max-w-37.5 lg:h-25"></div>
            <div className="w-[30%] bg-gray-200 min-h-15 h-full rounded-[10px] md:h-37.5 lg:max-w-37.5 lg:h-25"></div>
            <div className="w-[30%] bg-gray-200 min-h-15 h-full rounded-[10px] md:h-37.5 lg:max-w-37.5 lg:h-25"></div>
          </div>
        </div>
        <div className="bg-white rounded-[10px] p-4 flex flex-col gap-2 lg:w-full">
          <div className="flex justify-between">
            <div className="bg-[#1A202C] h-7 w-32.5 rounded-[10px]"></div>
            <Heart width={22} height={20} loading={true} />
          </div>
          <div className="flex gap-4 items-center">
            <StarRating rating={5} />
            <div className="bg-[#90A3BF] w-15 h-4 rounded-[10px]"></div>
          </div>
          <div className="flex justify-between">
            <div className="bg-[#1A202C] w-18.5 h-5 rounded-[10px]"></div>
            <div className="bg-[#90A3BF] w-16 h-5 rounded-[10px]"></div>
          </div>
          <div className="flex justify-between">
            <div className="bg-[#1A202C] w-13.5 h-5 rounded-[10px]"></div>
            <div className="bg-[#90A3BF] w-19 h-5 rounded-[10px]"></div>
          </div>
          <div className="flex justify-between">
            <div className="bg-[#1A202C] w-19.5 h-5 rounded-[10px]"></div>
            <div className="bg-[#90A3BF] w-12 h-5 rounded-[10px]"></div>
          </div>
          <div className="flex justify-between">
            <div className="bg-[#1A202C] w-12.5 h-5 rounded-[10px]"></div>
            <div className="bg-[#90A3BF] w-13 h-5 rounded-[10px]"></div>
          </div>
          <div className="flex justify-between">
            <div className="bg-[#1A202C] w-15.5 h-5 rounded-[10px]"></div>
            <div className="bg-[#90A3BF] w-17 h-5 rounded-[10px]"></div>
          </div>
          <div className="flex justify-between">
            <div className="bg-[#1A202C] w-17.5 h-5 rounded-[10px]"></div>
            <div className="bg-[#90A3BF] w-18 h-5 rounded-[10px]"></div>
          </div>
          <div className="flex h-15 justify-between mt-5 lg:mt-auto">
            <div className="flex flex-col justify-between">
              <div className="bg-[#1A202C] h-7 w-20 rounded-[10px]"></div>
              <div className="bg-[#90A3BF] h-6 w-15 rounded-[10px]"></div>
            </div>
            <div className="bg-blue-700 h-full w-35 rounded-[10px]"></div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-[10px] p-4 flex flex-col gap-2 mt-4 lg:max-w-310 lg:m-auto">
        <div className="bg-[#90A3BF] h-5.5 w-19 rounded-[10px]"></div>
        <div>
          <div className="flex justify-between items-center">
            <div className="bg-[#1A202C] h-5.5 w-15 rounded-[10px]"></div>
            <StarRating rating={5} />
          </div>
          <div className="bg-[#90A3BF] h-5.5 w-1/2 rounded-[10px] mt-1"></div>
        </div>
      </div>
      <div className="lg:max-w-310 lg:mx-auto">
        <div className="mt-4 w-28 h-5 bg-[#1A202C] rounded-[10px]"></div>
        <div className="flex overflow-x-scroll gap-3 mt-4 h-75.25">
          {Array.from({ length: 6 }).map((_, index) => (
            <CardLoader key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default CarDetailsLoader;
