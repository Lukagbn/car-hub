export interface CarProps {
  id: number;
  make: string;
  model: string;
  year: string;
  createdAt: string;
  images: string[];
  thumbnail_img: string;
  price: number;
  discount: number;
  car_type: string;
  transmission: string;
  fuel_type: string;
  fuel: number;
}

export default function Card({ car }: { car: CarProps }) {
  return (
    <div className="rounded-[10px] bg-white w-full p-4 h-60 flex flex-col">
      <h3 className="mt-2 font-medium">
        {car.make} {car.model}
      </h3>
      <div className="flex justify-between items-center mt-5">
        <img
          src={car.thumbnail_img}
          alt={`${car.make} ${car.model}`}
          className="w-45 h-15"
        />
        <div className="flex flex-col">
          <div className="flex gap-1.5">
            <svg
              width="18"
              height="19"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 1C3.688 1 1 3.688 1 7C1 10.312 3.688 13 7 13C10.312 13 13 10.312 13 7C13 3.688 10.318 1 7 1Z"
                fill="#90A3BF"
              />
              <rect x="2" y="2" width="10" height="10" rx="5" fill="white" />
              <path
                d="M7 3C4.792 3 3 4.792 3 7C3 9.208 4.792 11 7 11C9.208 11 11 9.208 11 7C11 4.792 9.212 3 7 3Z"
                fill="#90A3BF"
              />
              <rect x="8" y="6" width="4" height="2" fill="#90A3BF" />
              <rect x="2" y="6" width="4" height="2" fill="#90A3BF" />
              <rect x="6" y="8" width="2" height="4" fill="#90A3BF" />
              <rect x="4" y="4" width="6" height="6" rx="3" fill="white" />
            </svg>
            <p className="text-[#90A3BF]">{car.car_type}</p>
          </div>
          <div className="flex gap-1.5">
            <svg
              width="18"
              height="19"
              viewBox="0 0 13 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.3025 4.27583L11.1358 3.6925C10.92 3.5875 10.6517 3.66917 10.5467 3.885C10.4358 4.10667 10.5233 4.36917 10.7392 4.47417L11.6667 4.935V7.72917L9.47917 7.735V1.75C9.47917 0.583333 8.6975 0 7.72917 0H3.0625C2.09417 0 1.3125 0.583333 1.3125 1.75V11.2292H0.4375C0.198333 11.2292 0 11.4275 0 11.6667C0 11.9058 0.198333 12.1042 0.4375 12.1042H10.3542C10.5933 12.1042 10.7917 11.9058 10.7917 11.6667C10.7917 11.4275 10.5933 11.2292 10.3542 11.2292H9.47917V8.61L12.1042 8.60417C12.3492 8.60417 12.5417 8.40583 12.5417 8.16667V4.66667C12.5417 4.50333 12.4483 4.35167 12.3025 4.27583ZM2.77083 2.8525C2.77083 2.04167 3.26667 1.75 3.87333 1.75H6.92417C7.525 1.75 8.02083 2.04167 8.02083 2.8525V3.57C8.02083 4.375 7.525 4.66667 6.91833 4.66667H3.87333C3.26667 4.66667 2.77083 4.375 2.77083 3.56417V2.8525ZM3.0625 5.97917H4.8125C5.05167 5.97917 5.25 6.1775 5.25 6.41667C5.25 6.65583 5.05167 6.85417 4.8125 6.85417H3.0625C2.82333 6.85417 2.625 6.65583 2.625 6.41667C2.625 6.1775 2.82333 5.97917 3.0625 5.97917Z"
                fill="#90A3BF"
              />
            </svg>
            <p className="text-[#90A3BF]">{car.fuel}L</p>
          </div>
          <div className="flex gap-1.5">
            <svg
              width="18"
              height="19"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 1C3.688 1 1 3.688 1 7C1 10.312 3.688 13 7 13C10.312 13 13 10.312 13 7C13 3.688 10.318 1 7 1Z"
                fill="#90A3BF"
              />
              <rect x="2" y="2" width="10" height="10" rx="5" fill="white" />
              <path
                d="M7 3C4.792 3 3 4.792 3 7C3 9.208 4.792 11 7 11C9.208 11 11 9.208 11 7C11 4.792 9.212 3 7 3Z"
                fill="#90A3BF"
              />
              <rect x="8" y="6" width="4" height="2" fill="#90A3BF" />
              <rect x="2" y="6" width="4" height="2" fill="#90A3BF" />
              <rect x="6" y="8" width="2" height="4" fill="#90A3BF" />
              <rect x="4" y="4" width="6" height="6" rx="3" fill="white" />
            </svg>
            <p className="text-[#90A3BF]">{car.transmission}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center mt-auto">
        <p className="text-sm text-[#1A202C] font-bold text-[16px]">
          ${car.price}.00/
          <span className="text-[12px] text-[#90A3BF]">day</span>
        </p>
        <button className="rounded-[10px] bg-blue-700 text-white h-9 w-25 text-[12px]">
          Rent Now
        </button>
      </div>
    </div>
  );
}
