import { useEffect, useState } from "react";
import Banner from "../components/Banner";
import type { CarProps } from "../components/Card";
import CardList from "../components/CardList";

interface ApiResponse {
  carData: CarProps[];
}

function Home() {
  const [carData, setCarData] = useState<CarProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  async function fetchCars() {
    try {
      const res = await fetch("https://rentacar-uq9f.onrender.com/cars");
      const response: ApiResponse = await res.json();
      if (!res.ok) {
        console.log(res);
        setLoading(true);
      }
      setCarData(response.carData);
      setLoading(false);
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <>
      <Banner />
      <CardList car={carData} title="Recommended Cars" loading={loading} />
      <button className="rounded-[10px] bg-blue-500 text-white h-9 w-25 text-[12px] flex mx-auto my-4 items-center justify-center hover:bg-blue-700 transition-all duration-200 cursor-pointer">
        See More
      </button>
    </>
  );
}

export default Home;
