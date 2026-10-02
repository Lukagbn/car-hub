import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { CarProps } from "../components/Card";
import StarRating from "../components/StarRating";

function Details() {
  const { id } = useParams();
  const [carDetails, setCarDetails] = useState<CarProps>();

  async function fetchCar() {
    try {
      const res = await fetch("../carData.json");
      const response: CarProps[] = await res.json();
      const oneCar = response.find((car) => car.id === Number(id));
      setCarDetails(oneCar);
    } catch (error) {
      console.log("error", error);
    }
  }
  useEffect(() => {
    fetchCar();
  }, []);
  if (!carDetails) return <div>Loading...</div>;
  const discountPrice =
    carDetails.price - (carDetails.price * carDetails.discount) / 100;

  return (
    <section>
      <img
        className="mb-4 rounded-[10px] w-full h-50"
        src={carDetails.images[0]}
        alt="car image"
      />
      {carDetails.images.length !== 1 && (
        <div className="flex justify-between mb-4">
          {carDetails.images.map((img, index) => {
            if (index === 0) {
              return;
            }
            return (
              <img
                className="w-[30%] h-20 rounded-[10px]"
                key={index}
                src={img}
              />
            );
          })}
        </div>
      )}
      <div className="bg-white rounded-[10px] p-4 flex flex-col gap-2">
        <h2 className="text-[#1A202C] text-[20px] font-bold">
          {carDetails.make} {carDetails.model}
        </h2>
        <div className="flex gap-4 items-center">
          <StarRating rating={5} />
          <p className="text-[#90A3BF] text-[12px]">reviews( {5} )</p>
        </div>
        <p className="text-[#1A202C] flex justify-between font-bold">
          Car Make: <span className="text-[#90A3BF]">{carDetails.make}</span>
        </p>
        <p className="text-[#1A202C] flex justify-between font-bold">
          Car Type:{" "}
          <span className="text-[#90A3BF]">{carDetails.car_type}</span>
        </p>
        <p className="text-[#1A202C] flex justify-between font-bold">
          Fuel: <span className="text-[#90A3BF]">{carDetails.fuel}L</span>
        </p>
        <p className="text-[#1A202C] flex justify-between font-bold">
          Fuel Type:{" "}
          <span className="text-[#90A3BF]">{carDetails.fuel_type}</span>
        </p>
        <p className="text-[#1A202C] flex justify-between font-bold">
          Transmission:{" "}
          <span className="text-[#90A3BF]">{carDetails.transmission}</span>
        </p>
        <p className="text-[#1A202C] flex justify-between font-bold">
          Year: <span className="text-[#90A3BF]">{carDetails.year}</span>
        </p>
        <div className="flex justify-between h-15 mt-5">
          <div className="flex flex-col justify-between">
            <p className="font-bold text-[20px] text-[#1A202C]">
              ${carDetails.price.toFixed(2)}/
              <span className="text-[#90A3BF] text-[12px]">day</span>
            </p>
            {discountPrice !== 0 && (
              <p className="line-through text-[#90A3BF]">
                ${discountPrice.toFixed(2)}
              </p>
            )}
          </div>
          <button className="rounded-[10px] bg-blue-700 text-white h-full w-[35%] text-[17px]">
            Rent Now
          </button>
        </div>
      </div>
    </section>
  );
}

export default Details;
