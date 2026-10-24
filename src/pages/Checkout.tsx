import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { CarDetails } from "./CarDetails";
import type { CarProps } from "../components/Card";
import StarRating from "../components/StarRating";
import CheckoutLoader from "../components/Skeletons/CheckoutLoader";

function Checkout() {
  const { _id } = useParams();
  const [carData, setCarData] = useState<CarProps>();
  const [activePickup, setActivePickup] = useState<boolean>(false);
  const [activePickupText, setActivePickupText] =
    useState<string>("Select Location");
  const [activeDropoff, setActiveDropoff] = useState<boolean>(false);
  const [activeDropoffText, setActiveDropoffText] =
    useState<string>("Select Location");
  const FIXED_LOCATIONS = [
    "test1",
    "test2",
    "test3",
    "test4",
    "test5",
    "test6",
  ];
  const API_URL = import.meta.env.VITE_API_URL;

  async function fetchCarData() {
    try {
      const res = await fetch(`${API_URL}/cars/${_id}`);
      const response: CarDetails = await res.json();
      setCarData(response.carDetails);
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(() => {
    fetchCarData();
    console.log(_id);
  }, [_id]);

  if (!carData) {
    return <CheckoutLoader />;
  }
  const discountPrice =
    carData.price - (carData.price * carData.discount) / 100;

  return (
    <section>
      <section className="bg-white max-w-112.5 mx-auto w-full lg:max-w-110 lg:flex lg:flex-col lg:h-full rounded-[10px] p-4">
        <h2 className="text-[20px] font-bold pb-2 text-[#1A202C]">Total</h2>
        <hr className="border-gray-200" />
        <div className="flex gap-3 pt-3 pb-3">
          <img
            className="h-20 w-30 object-cover rounded-[10px]"
            src={carData.images[0]}
            alt="car image"
          />
          <div>
            <h3 className="font-medium text-[#1A202C]">
              {carData.make} {carData.model}
            </h3>
            <StarRating rating={carData.rating} />
          </div>
        </div>
        <hr className="border-gray-200" />
        <div className="pt-3">
          <p className="flex items-center justify-between text-[#90A3BF]">
            Subtotal:{" "}
            <span className="font-medium text-[18px] text-[#1A202C]">
              ${carData.price.toFixed(2)}
            </span>
          </p>
          <p className="flex items-center justify-between pb-3 text-[#90A3BF]">
            Discount:{" "}
            <span className="font-medium text-[18px] text-[#1A202C]">
              {carData.discount.toFixed(2)}%
            </span>
          </p>
          <hr className="border-gray-200" />
          <p className="flex items-center justify-between pt-3 text-[#1A202C]">
            Total rent price:{" "}
            <span className="font-medium text-[18px] text-[#1A202C]">
              ${discountPrice.toFixed(2)}
            </span>
          </p>
        </div>
      </section>
      <section className="bg-white max-w-112.5 mx-auto w-full lg:max-w-110 lg:flex lg:flex-col lg:h-full rounded-[10px] p-4 mt-4">
        <h2 className="text-[20px] font-bold pb-3 text-[#1A202C]">Rent Info</h2>
        <hr className="border-gray-200" />
        <div>
          <p className="pt-4 text-blue-700 font-semibold text-sm uppercase tracking-wide">
            Pick Up
          </p>
          <div className="flex flex-col gap-2 pt-3">
            <label
              className="text-sm font-medium text-gray-700"
              htmlFor="pickUp"
            >
              Location
            </label>
            <div
              className="relative w-full h-11 bg-gray-50 border border-gray-200 rounded-lg flex items-center cursor-pointer hover:border-blue-400 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setActivePickup(!activePickup);
              }}
            >
              <p className="pl-3 text-sm text-gray-800 flex-1">
                {activePickupText}
              </p>
              <span className="pr-3 text-gray-500">⌄</span>
              {activePickup && (
                <ul className="absolute z-50 top-[110%] left-0 w-full max-h-40 overflow-y-auto bg-white border border-gray-200 shadow-lg rounded-lg py-1">
                  {FIXED_LOCATIONS.map((location, index) => (
                    <li
                      key={index}
                      className="px-3 py-2 text-sm text-gray-700 cursor-pointer hover:bg-blue-50 hover:text-blue-700 transition-colors"
                      onClick={(e) => {
                        setActivePickup(false);
                        setActivePickupText(location);
                        e.stopPropagation();
                      }}
                    >
                      {location}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2 pt-3">
            <label
              className="text-sm font-medium text-gray-700"
              htmlFor="pickupDate"
            >
              Select Date
            </label>
            <input
              type="date"
              id="pickupDate"
              className="w-full h-11 px-3 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
            />
          </div>
          <div className="flex flex-col gap-2 pt-3">
            <label
              className="text-sm font-medium text-gray-700"
              htmlFor="pickupTime"
            >
              Pickup Time
            </label>
            <input
              type="text"
              id="pickupTime"
              className="w-full h-11 px-3 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-lg outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
              placeholder="e.g. 14:30"
            />
          </div>
        </div>
        <div>
          <p className="pt-5 text-red-600 font-semibold text-sm uppercase tracking-wide">
            Drop Off
          </p>
          <div className="flex flex-col gap-2 pt-3">
            <label
              className="text-sm font-medium text-gray-700"
              htmlFor="dropOff"
            >
              Location
            </label>
            <div
              className="relative w-full h-11 bg-gray-50 border border-gray-200 rounded-lg flex items-center cursor-pointer hover:border-red-400 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setActiveDropoff(!activeDropoff);
              }}
            >
              <p className="pl-3 text-sm text-gray-800 flex-1">
                {activeDropoffText}
              </p>
              <span className="pr-3 text-gray-500">⌄</span>
              {activeDropoff && (
                <ul className="absolute z-50 top-[110%] left-0 w-full max-h-40 overflow-y-auto bg-white border border-gray-200 shadow-lg rounded-lg py-1">
                  {FIXED_LOCATIONS.map((location, index) => (
                    <li
                      key={index}
                      className="px-3 py-2 text-sm text-gray-700 cursor-pointer hover:bg-red-50 hover:text-red-600 transition-colors"
                      onClick={(e) => {
                        setActiveDropoff(false);
                        setActiveDropoffText(location);
                        e.stopPropagation();
                      }}
                    >
                      {location}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2 pt-3">
            <label
              className="text-sm font-medium text-gray-700"
              htmlFor="dropoffDate"
            >
              Select Date
            </label>
            <input
              type="date"
              id="dropoffDate"
              className="w-full h-11 px-3 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition"
            />
          </div>
          <div className="flex flex-col gap-2 pt-3">
            <label
              className="text-sm font-medium text-gray-700"
              htmlFor="dropoffTime"
            >
              Drop Off Time
            </label>
            <input
              type="text"
              id="dropoffTime"
              className="w-full h-11 px-3 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-lg outline-none placeholder:text-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-100 transition"
              placeholder="e.g. 14:30"
            />
          </div>
        </div>
      </section>
      <section className="bg-white max-w-112.5 mx-auto w-full lg:max-w-110 lg:flex lg:flex-col lg:h-full rounded-[10px] p-4 mt-4">
        <h2 className="text-[20px] font-bold pb-3 text-[#1A202C]">
          Payment Info
        </h2>
        <hr className="border-gray-200" />
        <div className="flex flex-col gap-2 pt-3">
          <label
            className="text-sm font-medium text-gray-700"
            htmlFor="cardNumber"
          >
            Card Number
          </label>
          <input
            type="text"
            id="cardNumber"
            className="w-full h-11 px-3 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-lg outline-none placeholder:text-gray-400 focus:border-green-500 focus:ring-2 focus:ring-red-100 transition"
            placeholder="e.g. 5140-1233-4444"
          />
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col gap-2 pt-3">
            <label
              className="text-sm font-medium text-gray-700"
              htmlFor="expDate"
            >
              Exparation Date
            </label>
            <input
              type="date"
              id="expDate"
              className="w-full h-11 px-3 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-green-500 focus:ring-2 focus:ring-red-100 transition"
            />
          </div>
          <div className="flex flex-col gap-2 pt-3">
            <label className="text-sm font-medium text-gray-700" htmlFor="ccv">
              CCV
            </label>
            <input
              type="text"
              id="ccv"
              className="h-11 px-3 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-green-500 focus:ring-2 focus:ring-red-100 transition w-20"
              placeholder="e.g. 123"
            />
          </div>
        </div>
      </section>
      <section className="bg-white max-w-112.5 mx-auto w-full lg:max-w-110 lg:flex lg:flex-col lg:h-full rounded-[10px] p-4 mt-4">
        <h2 className="text-[20px] font-bold pb-3 text-[#1A202C]">
          Confirmation
        </h2>
        <hr className="border-gray-200" />
        <div>
          <input type="checkbox" id="terms" />
          <label htmlFor="terms">agree to terms</label>
        </div>
      </section>
    </section>
  );
}

export default Checkout;
