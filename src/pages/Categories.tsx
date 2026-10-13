import { useEffect, useState } from "react";
import type { ApiResponse, MetaData } from "./Home";
import type { CarProps } from "../components/Card";
import CategoryBox from "../components/CategoryBox";
import Card from "../components/Card";
import CardLoader from "../components/Skeletons/CardLoader";

function Categories() {
  const [carData, setCarData] = useState<CarProps[]>([]);
  const [metaData, setMetaData] = useState<MetaData>();
  const [page, setPage] = useState<number>(1);
  const [make, setMake] = useState<string>("");
  const [transmission, setTransmission] = useState<string>("");
  const [carType, setCarType] = useState<string>("");
  const [fuelType, setFuelType] = useState<string>("");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");

  const MAKE = [
    "Toyota",
    "BMW",
    "Mercedes-Benz",
    "Audi",
    "Honda",
    "Ford",
    "Tesla",
    "Porsche",
    "Volkswagen",
  ];
  const CAR_TYPE = ["Hatchback", "Sedan", "Suv", "Coupe"];
  const TRANSMISSION = ["Automatic", "CVT", "Manual"];
  const FUEL_TYPE = ["Electric", "Hybrid", "Diesel", "Petrol"];

  async function fetchCars() {
    try {
      const res = await fetch(
        `https://rentacar-uq9f.onrender.com/cars?make=${make}&fuel_type=${fuelType}&car_type=${carType}&transmission=${transmission}&minPrice=${minPrice}&maxPrice=${maxPrice}&page=${page}`,
      );
      const response: ApiResponse = await res.json();
      setMetaData(response.pagination);
      setCarData(response.carData);
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(() => {
    fetchCars();
  }, [make, fuelType, carType, transmission, minPrice, maxPrice, page]);

  return (
    <section className="lg:flex lg:max-w-310 lg:mx-auto lg:justify-between">
      <section className="bg-white mx-auto w-full lg:flex lg:flex-col lg:h-full rounded-[10px] p-4 mt-4 lg:max-w-60 lg:mx-0 xl:max-w-95 shadow-md">
        <div className="flex items-center justify-between pb-3">
          <h2 className="text-[#1A202C] text-[20px] font-bold">Filters</h2>
          <div
            className={`relative w-5 h-6 hover:scale-120 transition-all duration-300 cursor-pointer`}
            onClick={() => {
              setMake("");
              setTransmission("");
              setFuelType("");
              setCarType("");
              setMinPrice("");
              setMaxPrice("");
            }}
          >
            <div className="absolute w-full h-1 bg-red-400 rounded-[10px] top-1/2 left-0 rotate-45 -translate-y-1/2"></div>
            <div className="absolute w-full h-1 bg-red-400 rounded-[10px] top-1/2 left-0 -rotate-45 -translate-y-1/2"></div>
          </div>
        </div>
        <hr className="border-gray-200 pb-3" />
        <CategoryBox
          title="Make"
          category={MAKE}
          selectedCategory={make}
          setCategory={(make) => {
            setPage(1);
            setMake(make);
          }}
        />
        <CategoryBox
          title="Type"
          category={CAR_TYPE}
          selectedCategory={carType}
          setCategory={(carType) => {
            setPage(1);
            setCarType(carType);
          }}
        />
        <CategoryBox
          title="Transmission"
          category={TRANSMISSION}
          selectedCategory={transmission}
          setCategory={(transmission) => {
            setPage(1);
            setTransmission(transmission);
          }}
        />
        <CategoryBox
          title="Fuel Type"
          category={FUEL_TYPE}
          selectedCategory={fuelType}
          setCategory={(fuelType) => {
            setPage(1);
            setFuelType(fuelType);
          }}
        />
        <div className="pt-3">
          <h3 className="text-sm font-medium text-gray-700">Price</h3>
          <div className="flex gap-2">
            <input
              className="w-1/2 h-11 px-3 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-lg outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
              type="text"
              placeholder="min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <input
              className="w-1/2 h-11 px-3 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-lg outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
              type="text"
              placeholder="max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
        </div>
      </section>
      <section className="w-full min-w-0 mt-4 lg:mx-0 xl:max-w-200">
        <div className="grid grid-cols-1 gap-4 justify-items-center sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          {carData.length === 0
            ? Array.from({ length: 9 }).map((_, index) => (
                <CardLoader key={index} />
              ))
            : carData.map((card) => <Card key={card._id} car={card} />)}
        </div>

        {metaData?.hasNextPage === false &&
        metaData.currentPage === 1 ? null : (
          <div className="flex gap-2 justify-center pt-4">
            <button
              disabled={!metaData?.hasPrevPage}
              onClick={() => setPage((prev) => prev - 1)}
              className="px-4 py-2 rounded-lg bg-blue-500 text-white cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-600 transition"
            >
              Previous
            </button>

            <span className="flex items-center px-3 text-sm font-medium">
              Page {page} of {metaData?.totalPages ?? 1}
            </span>

            <button
              disabled={!metaData?.hasNextPage}
              onClick={() => setPage((prev) => prev + 1)}
              className="px-4 py-2 rounded-lg bg-blue-500 text-white cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-600 transition"
            >
              Next
            </button>
          </div>
        )}
      </section>
    </section>
  );
}

export default Categories;
