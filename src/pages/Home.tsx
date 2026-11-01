import { useEffect, useState } from "react";
import Banner from "../components/Banner";
import type { CarProps } from "../components/Card";
import CardList from "../components/CardList";
import { Link } from "react-router";

export interface ApiResponse {
  carData: CarProps[];
  pagination: MetaData;
}

export interface MetaData {
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
  totalCars: number;
  totalPages: number;
}

function Home() {
  const [carData, setCarData] = useState<CarProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const API_URL = import.meta.env.VITE_API_URL;

  async function fetchCars() {
    try {
      const res = await fetch(`${API_URL}/cars`);
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

      <Link
        to="/categories"
        className="rounded-[10px] bg-blue-700 hover:bg-blue-500 text-white h-9 w-25 text-[12px] cursor-pointer transition-colors duration-200 flex items-center justify-center mx-auto"
      >
        See More
      </Link>
    </>
  );
}

export default Home;
