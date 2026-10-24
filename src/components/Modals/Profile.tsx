import { useEffect, useState } from "react";
import userImg from "../../assets/icons/profile.svg";
import ProfileLoader from "../Skeletons/ProfileLoader";

export interface UserProps {
  _id: string;
  name: string;
  surname: string;
  nickname: string;
  email: string;
  phone: string;
  gender: boolean | string;
}

function Profile() {
  const [userData, setUserData] = useState<UserProps | null>(null);
  const API_URL = import.meta.env.VITE_API_URL;

  async function fetchUser() {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    if (token) {
      const res = await fetch(`${API_URL}/auth/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401) {
        console.log(res);
      } else {
        const result = await res.json();
        setUserData(result.user);
      }
    }
  }
  useEffect(() => {
    fetchUser();
  }, [userData]);

  if (!userData) {
    return <ProfileLoader />;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-3 h-92">
      <h2 className="font-bold text-[18px] text-[#1A202C]">
        Welcome {userData.name}
      </h2>
      <img src={userImg} alt="profile" className="w-25 h-25 rounded-25" />
      <ul className="w-full">
        {Object.entries(userData).map(([key, value]) => {
          if (key === "_id" || key === "createdAt" || key === "__v") return;
          return (
            <li
              key={key}
              className="text-[#1A202C] font-medium flex justify-between"
            >
              {key}:{" "}
              <span className="text-[#90A3BF] font-normal">
                {key === "gender" && value === true
                  ? value === true
                    ? "male"
                    : "female"
                  : String(value)}
              </span>
            </li>
          );
        })}
      </ul>
      <button
        className="flex items-center justify-center mx-auto bg-blue-700 text-white rounded-sm w-32 h-12 hover:bg-blue-600 transition-all duration-200 cursor-pointer"
        type="submit"
        onClick={() => {
          localStorage.removeItem("token");
          window.location.reload();
        }}
      >
        Log Out
      </button>
    </div>
  );
}

export default Profile;
