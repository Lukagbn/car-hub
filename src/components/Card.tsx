import { useState } from "react";
import { Link } from "react-router";
import { useAppDispatch } from "../store/hooks";
import { addToFavorites } from "../store/slices/carSlice";
import Heart from "./SvgIcons/Heart";
import CarType from "./SvgIcons/CarType";
import Transmission from "./SvgIcons/Transmission";
import Fuel from "./SvgIcons/Fuel";

export interface CarProps {
  _id: string;
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
  rating: number;
  fuel: number;
}

export default function Card({ car }: { car: CarProps }) {
  const dispatch = useAppDispatch();
  const discountPrice = car.price - (car.price * car.discount) / 100;
  const [hover, setHover] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);

  function nextImg() {
    if (car.images.length - 1 <= index) return setIndex(0);
    return setIndex((prev) => prev + 1);
  }

  function prevImg() {
    if (index <= 0) return setIndex(car.images.length - 1);
    return setIndex((prev) => prev - 1);
  }

  return (
    <div className="rounded-[10px] bg-white w-full max-w-77.5 p-3.5 h-70 flex flex-col shrink-0 shadow-md hover:shadow-none transition-all duration-300">
      <div className="flex justify-between items-center">
        <h3 className="mt-2 font-medium text-[#1A202C]">
          {car.make} {car.model}
        </h3>
        <Heart onClick={() => dispatch(addToFavorites(car))} car={car} />
      </div>
      <div className="relative w-full h-32.5">
        {car.images.length !== 1 && (
          <div className="absolute flex justify-between items-center top-1/2 -translate-y-1/2 left-0 w-full p-2">
            <button
              className="cursor-pointer text-[18px] font-bold bg-blue-500 text-white w-7 h-7 rounded-[50%] flex justify-center items-center hover:scale-110 transition-all duration-300"
              onClick={() => prevImg()}
            >
              {"<"}
            </button>
            <button
              className="cursor-pointer text-[18px] font-bold bg-blue-500 text-white w-7 h-7 rounded-[50%] flex justify-center items-center hover:scale-110 transition-all duration-300"
              onClick={() => {
                nextImg();
              }}
            >
              {">"}
            </button>
          </div>
        )}
        <img
          src={car.images[index]}
          alt={`${car.make} ${car.model}`}
          loading="lazy"
          className="w-full h-auto max-h-32.5 m-auto rounded-[10px] object-cover"
        />
      </div>
      <div className="flex flex-col mt-auto">
        <div className="flex justify-between">
          <div className="flex gap-1">
            <CarType />
            <p className="text-[#90A3BF] text-[12px]">{car.car_type}</p>
          </div>
          <div className="flex gap-1">
            <Fuel />
            <p className="text-[#90A3BF] text-[12px]">{car.fuel}L</p>
          </div>
          <div className="flex gap-1">
            <Transmission />
            <p className="text-[#90A3BF] text-[12px]">{car.transmission}</p>
          </div>
        </div>
        <div className="flex justify-between items-center mt-2.5">
          <div className="flex flex-col">
            <p className="text-sm text-[#1A202C] font-bold text-[16px]">
              ${discountPrice.toFixed(2)}/
              <span className="text-[12px] text-[#90A3BF]">day</span>
            </p>
            <p className="text-[14px] line-through text-[#90A3BF]">
              ${discountPrice && car.price.toFixed(2)}
            </p>
          </div>
          <Link to={`/cars/${car._id}`}>
            <button
              className={`rounded-[10px] ${hover ? "bg-blue-500" : "bg-blue-700"}  text-white h-9 w-25 text-[12px] cursor-pointer transition-all duration-200`}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              Rent Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
