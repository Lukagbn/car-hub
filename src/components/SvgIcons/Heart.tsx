import { useEffect, useState } from "react";
import type { CarProps } from "../Card";
import { useAppSelector } from "../../store/hooks";

interface HeartProps {
  onClick?: () => void;
  car?: CarProps;
  width?: number;
  height?: number;
  loading?: boolean;
}

function Hearth({ onClick, car, width, height, loading }: HeartProps) {
  const [hover, setHover] = useState<boolean>(false);
  const [clicked, setClicked] = useState<boolean>(false);

  const favoriteCars: CarProps[] = useAppSelector(
    (state) => state.favorites.favCars,
  );

  const carId = Boolean(favoriteCars.find((item) => item._id === car?._id));

  function handleClick() {
    if (onClick) onClick();
  }
  useEffect(() => {
    setClicked(carId);
  }, [favoriteCars]);
  return (
    <svg
      className={`${loading ? "cursor-default" : "cursor-pointer"} transition-all duration-300`}
      width={`${width ? width : 16}`}
      height={`${height ? height : 14}`}
      viewBox="0 0 15 14"
      fill={hover || clicked || loading ? "red" : "none"}
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={handleClick}
    >
      <path
        d="M7.83 12.5567C7.60333 12.6367 7.23 12.6367 7.00333 12.5567C5.07 11.8967 0.75 9.14333 0.75 4.47667C0.75 2.41667 2.41 0.75 4.45667 0.75C5.67 0.75 6.74333 1.33667 7.41667 2.24333C8.09 1.33667 9.17 0.75 10.3767 0.75C12.4233 0.75 14.0833 2.41667 14.0833 4.47667C14.0833 9.14333 9.76333 11.8967 7.83 12.5567Z"
        stroke="red"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Hearth;
