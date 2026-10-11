import { useEffect, useState } from "react";
import profileImg from "../assets/icons/profile.svg";
import searchImg from "../assets/icons/search.svg";
import { Link } from "react-router";
import Modals from "./Modals/Modals";
import type { CarProps } from "./Card";
import type { ApiResponse } from "../pages/Home";
import StarRating from "./StarRating";

function Navbar() {
  const [burger, setBurger] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);
  const [overlay, setOverlay] = useState<boolean>(false);
  const [modal, setModal] = useState<string>("none");
  const [params, setParams] = useState<string>("");
  const [searchData, setSearchData] = useState<CarProps[]>();

  const loggedIn = Boolean(localStorage.getItem("token"));

  const NAVIGATION = [
    { label: "Home", path: "/" },
    { label: "Favorites", path: "/favorites" },
    { label: "Categories", path: "/categories" },
    { label: "Contact", path: "/contact" },
  ];

  async function fetchCars() {
    if (!params.trim()) {
      setSearchData(undefined);
      return;
    }
    try {
      const res = await fetch(
        `https://rentacar-uq9f.onrender.com/cars?search=${encodeURIComponent(params)}`,
      );
      const response: ApiResponse = await res.json();
      setSearchData(response.carData);
    } catch (error) {
      console.log("error:", error);
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCars();
    }, 400);
    return () => clearTimeout(timer);
  }, [params]);

  useEffect(() => {
    if (overlay) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [overlay]);

  return (
    <header className="bg-white sticky top-0 z-1000 p-6">
      <div className="lg:max-w-310 lg:m-auto">
        <h1 className="hidden">carRent</h1>
        <div className="flex items-center justify-between">
          <h2 className="text-blue-600 text-[20px] font-bold max-sm:hidden select-none cursor-pointer">
            <Link to={"/"}>CarRent</Link>
          </h2>
          <ul className="flex gap-2 max-sm:hidden">
            {NAVIGATION.map((item) => (
              <li className="text-[#1A202C] select-none cursor-pointer hover:text-[#90A3BF] transition-all duration-300">
                <Link to={`${item.path}`}>{item.label}</Link>
              </li>
            ))}
          </ul>
          <div
            className="cursor-pointer relative h-5 w-4 sm:hidden"
            style={{ position: active ? "fixed" : "relative", zIndex: 2 }}
            onClick={() => {
              setBurger(!burger);
              setActive(!active);
            }}
          >
            <span
              className={`absolute left-0 w-5 h-0.5 ${burger ? "bg-white" : "bg-[#596780]"} rounded-[5px] transition-all duration-400 ${burger ? "rotate-45 top-1/2 -translate-y-1/2" : "top-0"}`}
            ></span>
            <span
              className={`absolute left-0 w-5 h-0.5 top-1/2 -translate-y-1/2 bg-[#596780] rounded-[5px] transition-all duration-400 ${burger ? "opacity-0" : "opacity-100"}`}
            ></span>
            <span
              className={`absolute left-0 w-5 h-0.5 ${burger ? "bg-white" : "bg-[#596780]"} rounded-[5px] transition-all duration-400 ${burger ? "-rotate-45 top-1/2 -translate-y-1/2" : "top-full -translate-y-full"}`}
            ></span>
          </div>
          <div
            className="fixed bg-blue-700 left-0 top-0 py-15 pl-15 pr-10 z-1 transition-all duration-400 rounded-br-[15px]"
            style={{
              opacity: active ? 1 : 0,
              pointerEvents: active ? "auto" : "none",
            }}
          >
            <ul className="flex flex-col gap-2.5">
              {NAVIGATION.map((item) => {
                return (
                  <li className="text-white hover:underline" key={item.label}>
                    <Link
                      to={item.path}
                      onClick={() => {
                        setActive(!active);
                        setBurger(!burger);
                      }}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <img
            src={profileImg}
            alt="profile"
            width={28}
            height={28}
            style={{ marginLeft: active ? "auto" : "0px" }}
            className="rounded-[90px] cursor-pointer"
            onClick={() => {
              setOverlay(true);
              setModal("login");
            }}
          />
        </div>
        <div className="relative mt-4">
          <img
            className="absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer"
            src={searchImg}
            width={19}
            height={19}
            alt="search"
          />
          <input
            className="border border-[#C3D4E9] rounded-[10px] h-12 w-full p-3 pl-10"
            type="search"
            placeholder="Search car here"
            onChange={(e) => setParams(e.target.value)}
          />
          {searchData && (
            <div className="absolute flex flex-col gap-3 bg-[#f6f7f9] p-3 w-full max-h-60 top-[110%] shadow-2xl rounded-[10px] overflow-y-auto">
              {searchData?.map((car) => (
                <Link
                  key={car._id}
                  to={`cars/${car._id}`}
                  onClick={() => setSearchData(undefined)}
                >
                  <div className="flex gap-3 pb-2">
                    <img
                      className="h-20 w-35 object-cover rounded-[10px]"
                      src={car.images[0]}
                      alt="car image"
                    />
                    <div className="flex flex-col">
                      <h3 className="font-medium text-[#1A202C]">
                        {car.make} {car.model}
                      </h3>
                      <StarRating rating={car.rating} />
                    </div>
                  </div>
                  <hr className="border-gray-200" />
                </Link>
              ))}
            </div>
          )}
        </div>
        <Modals
          loggedIn={loggedIn}
          modal={modal}
          overlay={overlay}
          onClose={() => setOverlay(false)}
          onModalChange={setModal}
        />
      </div>
    </header>
  );
}

export default Navbar;
