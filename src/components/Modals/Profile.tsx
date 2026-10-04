import userImg from "../../assets/icons/profile.svg";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { deleteUserData } from "../../store/slices/userSlice";

function Profile() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <h2 className="font-bold text-[18px] text-[#1A202C]">
        Welcome {user.name}
      </h2>
      <img src={userImg} alt="profile" className="w-25 h-25 rounded-25" />
      <ul className="w-full">
        {Object.entries(user).map(([key, value]) => {
          if (key === "isLoggedIn") return;
          return (
            <li
              key={key}
              className="text-[#1A202C] font-medium flex justify-between"
            >
              {key}:{" "}
              <span className="text-[#90A3BF] font-normal">
                {String(value)}
              </span>
            </li>
          );
        })}
      </ul>
      <button
        className="flex items-center justify-center mx-auto bg-blue-700 text-white rounded-sm w-32 h-12 hover:bg-blue-600 transition-all duration-200 cursor-pointer"
        type="submit"
        onClick={() => {
          dispatch(deleteUserData());
        }}
      >
        Log Out
      </button>
    </div>
  );
}

export default Profile;
