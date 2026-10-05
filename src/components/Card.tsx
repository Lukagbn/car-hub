import { useState } from "react";
import { Link } from "react-router";
import { useAppDispatch } from "../store/hooks";
import { addToFavorites } from "../store/slices/carSlice";
import Hearth from "./SvgIcons/Heart";
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
  return (
    <div className="rounded-[10px] bg-white w-full max-w-77.5 p-4 h-70 flex flex-col">
      <div className="flex justify-between items-center">
        <h3 className="mt-2 font-medium text-[#1A202C]">
          {car.make} {car.model}
        </h3>
        <Hearth onClick={() => dispatch(addToFavorites(car))} car={car} />
      </div>
      <img
        src={car.thumbnail_img}
        alt={`${car.make} ${car.model}`}
        className="w-full max-w-50 h-auto max-h-35 m-auto"
      />
      <div className="flex flex-col mt-auto">
        <div className="flex justify-between">
          <div className="flex gap-1.5">
            <Transmission />
            <p className="text-[#90A3BF]">{car.car_type}</p>
          </div>
          <div className="flex gap-1.5">
            <Fuel />
            <p className="text-[#90A3BF]">{car.fuel}L</p>
          </div>
          <div className="flex gap-1.5">
            <Transmission />
            <p className="text-[#90A3BF]">{car.transmission}</p>
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
