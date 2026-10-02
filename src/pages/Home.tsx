import { useEffect, useState } from "react";
import Banner from "../components/Banner";
import type { CarProps } from "../components/Card";
import Card from "../components/Card";
import CardList from "../components/CardList";

function Home() {
  const [carData, setCarData] = useState<CarProps[]>([]);

  async function fetchCars() {
    try {
      const res = await fetch("../carData.json");
      const response: CarProps[] = await res.json();
      setCarData(response);
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
      <CardList car={carData} />
      <button className="rounded-[10px] bg-blue-500 text-white h-9 w-25 text-[12px] flex mx-auto my-4 items-center justify-center">
        See More
      </button>
    </>
  );
}

export default Home;
