import { useEffect, useState } from "react";
import profileImg from "../assets/icons/profile.svg";
import searchImg from "../assets/icons/search.svg";
import { Link } from "react-router";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { updateUser } from "../store/slices/userSlice";
import LogIn from "./Modals/LogIn";
import Register from "./Modals/Register";
import Profile from "./Modals/Profile";

function Navbar() {
  const [burger, setBurger] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);
  const [overlay, setOverlay] = useState<boolean>(false);
  const [modal, setModal] = useState<string>();

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const loggedIn: boolean = user.isLoggedIn;

  const NAVIGATION = [
    { label: "Home", path: "/" },
    { label: "Favorites", path: "/favorites" },
    { label: "Categories", path: "/categories" },
  ];

  const test = {
    name: "luka",
    surname: "asdasd",
    age: 22,
    phone: "saasdasd",
    email: "asdasd",
    isLoggedIn: true,
  };

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
    <header className="bg-white">
      <h1 className="hidden">carRent</h1>
      <div className="flex items-center justify-between">
        <div
          className="cursor-pointer relative h-5 w-4"
          style={{ position: active ? "fixed" : "relative", zIndex: 2 }}
          onClick={() => {
            setBurger(!burger);
            setActive(!active);
            dispatch(updateUser(test));
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
          className="rounded-[90px]"
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
        />
      </div>
      {overlay && (
        <div
          className="fixed left-0 top-0 w-full h-full bg-[rgba(0,0,0,0.5)] z-10"
          onClick={() => setOverlay(false)}
        >
          <div
            className="fixed p-4 bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[10px] w-62.5"
            onClick={(e) => e.stopPropagation()}
          >
            {!loggedIn && modal === "login" && (
              <LogIn setModal={() => setModal("signup")} />
            )}
            {!loggedIn && modal === "signup" && <Register />}
            {loggedIn && <Profile />}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
