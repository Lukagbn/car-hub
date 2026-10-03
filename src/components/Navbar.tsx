import { useState } from "react";
import profileImg from "../assets/icons/profile.svg";
import searchImg from "../assets/icons/search.svg";
import { Link } from "react-router";

function Navbar() {
  const [burger, setBurger] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);

  const NAVIGATION = [
    { label: "Home", path: "/" },
    { label: "Favorites", path: "/favorites" },
    { label: "Categories", path: "/categories" },
  ];

  return (
    <header className="bg-white">
      <h1 className="hidden">carRent</h1>
      <div className="flex items-center justify-between">
        <div
          className="cursor-pointer relative h-5 w-4"
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
                <li className="text-white hover:underline">
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
          className="rounded-[90px]"
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
        />
      </div>
    </header>
  );
}

export default Navbar;
