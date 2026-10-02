import { useState } from "react";
import profileImg from "../assets/icons/profile.svg";
import searchImg from "../assets/icons/search.svg";

function Navbar() {
  const [burger, setBurger] = useState<boolean>(false);

  return (
    <header className="bg-white">
      <h1 className="hidden">carRent</h1>
      <div className="flex items-center justify-between">
        <div
          className="cursor-pointer relative h-5 w-4"
          onClick={() => setBurger(!burger)}
        >
          <span
            className={`absolute left-0 w-5 h-0.5 bg-[#596780] rounded-[5px] transition-all duration-400 ${burger ? "rotate-45 top-1/2 -translate-y-1/2" : "top-0"}`}
          ></span>
          <span
            className={`absolute left-0 w-5 h-0.5 top-1/2 -translate-y-1/2 bg-[#596780] rounded-[5px] transition-all duration-400 ${burger ? "opacity-0" : "opacity-100"}`}
          ></span>
          <span
            className={`absolute left-0 w-5 h-0.5 bg-[#596780] rounded-[5px] transition-all duration-400 ${burger ? "-rotate-45 top-1/2 -translate-y-1/2" : "top-full -translate-y-full"}`}
          ></span>
        </div>
        <img
          src={profileImg}
          alt="profile"
          width={28}
          height={28}
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
