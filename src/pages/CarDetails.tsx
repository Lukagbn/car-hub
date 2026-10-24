import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import type { CarProps } from "../components/Card";
import StarRating from "../components/StarRating";
import { useAppDispatch } from "../store/hooks";
import { addToFavorites } from "../store/slices/carSlice";
import Heart from "../components/SvgIcons/Heart";
import CarDetailsLoader from "../components/Skeletons/CarDetailsLoader";
import Card from "../components/Card";
import CardLoader from "../components/Skeletons/CarDetailsLoader";
import Modals from "../components/Modals/Modals";
import type { UserProps } from "../components/Modals/Profile";

export interface CarDetails {
  carDetails: CarProps;
}
interface ApiResponse {
  carData: CarProps[];
}
interface Review {
  rating: number;
  comment: string;
  userId: string;
  carId: string;
  nickname: string;
}
interface Reviews {
  reviews: Review[];
}
function Details() {
  const { _id } = useParams();
  const [recommended, setRecommended] = useState<CarProps[]>([]);
  const [carData, setCarData] = useState<CarProps>();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [mainImg, setMainImg] = useState<string>();
  const [overlay, setOverlay] = useState<boolean>(false);
  const [modal, setModal] = useState<string>("login");
  const [comment, setComment] = useState<string>("");
  const [rating, setRating] = useState<string>("");
  const [userData, setUserData] = useState<UserProps | null>(null);
  const loggedIn = Boolean(localStorage.getItem("token"));
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const API_URL = import.meta.env.VITE_API_URL;

  async function fetchCarData() {
    try {
      const res = await fetch(`${API_URL}/cars/${_id}`);
      const response: CarDetails = await res.json();
      setCarData(response.carDetails);
    } catch (error) {
      console.log("error", error);
    }
  }
  async function fetchReviews() {
    try {
      const res = await fetch(`${API_URL}/review/${_id}`);
      const response: Reviews = await res.json();
      setReviews(response.reviews);
    } catch (error) {
      console.log("error", error);
    }
  }
  async function fetchRecommended() {
    try {
      const res = await fetch(`${API_URL}/cars`);
      const response: ApiResponse = await res.json();

      const filtered = response.carData.filter(
        (carData) => carData._id !== _id,
      );
      setRecommended(filtered);
    } catch (error) {
      console.log("error", error);
    }
  }
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
  async function postComment(data: {
    rating: number;
    comment: string;
    userId: string;
    carId: string;
    nickname: string;
  }) {
    try {
      const res = await fetch(`${API_URL}/review/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        console.error("Failed to post review:", res.status);
        return;
      }

      await fetchReviews();

      setComment("");
      setRating("");
    } catch (error) {
      console.error("Error posting review:", error);
    }
  }
  function handleRentClick() {
    if (loggedIn) {
      navigate(`/checkout/${_id}`);
    } else {
      setModal("login");
      setOverlay(true);
    }
  }
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

  useEffect(() => {
    fetchCarData();
    fetchRecommended();
    fetchReviews();
    fetchUser();
  }, [_id]);

  if (!carData) return <CarDetailsLoader />;

  const discountPrice =
    carData.price - (carData.price * carData.discount) / 100;

  return (
    <section>
      <div className="lg:flex lg:gap-10 lg:max-w-310 lg:mx-auto lg:mb-4 lg:h-112.5">
        <div className="max-w-112.5 mx-auto w-full lg:max-w-110 lg:flex lg:flex-col lg:h-full">
          <img
            className="mb-4 rounded-[10px] w-full h-auto max-h-75 lg:max-h-83.5 lg:h-full lg:object-cover object-cover"
            src={mainImg ?? carData.images[0]}
            alt="car image"
          />
          {carData.images.length !== 1 && (
            <div className="flex justify-between mb-4 gap-2 lg:flex-row lg:mb-0">
              {carData.images.map((img, index) => {
                return (
                  <img
                    className={`${mainImg === img ? "scale-[90%]" : ""} w-[30%] max-h-18 rounded-[10px] lg:max-w-37.5 lg:h-25 lg:max-h-none object-cover cursor-pointer`}
                    key={index}
                    src={img}
                    onClick={() => setMainImg(img)}
                  />
                );
              })}
            </div>
          )}
        </div>
        <div className="bg-white rounded-[10px] p-4 flex flex-col gap-2 lg:w-full lg:h-112.5">
          <div className="flex items-center justify-between">
            <h2 className="text-[#1A202C] text-[20px] font-bold">
              {carData.make} {carData.model}
            </h2>
            <Heart
              onClick={() => dispatch(addToFavorites(carData))}
              car={carData}
              width={22}
              height={20}
            />
          </div>
          <div className="flex gap-4 items-center">
            <StarRating rating={carData.rating} />
            <p className="text-[#90A3BF] text-[12px]">
              reviews( {reviews.length ?? 0} )
            </p>
          </div>
          <p className="text-[#1A202C] flex justify-between font-bold">
            Car Make: <span className="text-[#90A3BF]">{carData.make}</span>
          </p>
          <p className="text-[#1A202C] flex justify-between font-bold">
            Car Type: <span className="text-[#90A3BF]">{carData.car_type}</span>
          </p>
          <p className="text-[#1A202C] flex justify-between font-bold">
            Fuel: <span className="text-[#90A3BF]">{carData.fuel}L</span>
          </p>
          <p className="text-[#1A202C] flex justify-between font-bold">
            Fuel Type:{" "}
            <span className="text-[#90A3BF]">{carData.fuel_type}</span>
          </p>
          <p className="text-[#1A202C] flex justify-between font-bold">
            Transmission:{" "}
            <span className="text-[#90A3BF]">{carData.transmission}</span>
          </p>
          <p className="text-[#1A202C] flex justify-between font-bold">
            Year: <span className="text-[#90A3BF]">{carData.year}</span>
          </p>
          <div className="flex justify-between h-15 mt-5 lg:mt-auto">
            <div className="flex flex-col justify-between">
              <p className="font-bold text-[20px] text-[#1A202C]">
                ${discountPrice.toFixed(2)}/
                <span className="text-[#90A3BF] text-[12px]">day</span>
              </p>
              {discountPrice !== 0 && (
                <p className="line-through text-[#90A3BF]">
                  ${carData.price.toFixed(2)}
                </p>
              )}
            </div>
            <button
              className="rounded-[10px] bg-blue-700 text-white h-full w-35 text-[17px] cursor-pointer hover:bg-blue-500 transition-all duration-200"
              onClick={handleRentClick}
            >
              Rent Now
            </button>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-[10px] p-4 flex flex-col gap-2 mt-4 lg:max-w-310 lg:m-auto">
        <h4 className="font-bold text-[#90A3BF]">Reviews</h4>
        {loggedIn ? (
          <div className="grid grid-cols-2 md:flex">
            <div className="flex flex-col gap-2 pt-3 max-w-70">
              <label
                className="text-sm font-medium text-gray-700"
                htmlFor="comment"
              >
                Write A Comment
              </label>
              <textarea
                id="comment"
                className="w-full h-11 p-3 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-lg outline-none placeholder:text-gray-400 focus:border-green-500 focus:ring-2 focus:ring-red-100 transition max-h-50"
                maxLength={400}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2 pt-3 max-w-15 ml-auto md:ml-10">
              <label
                className="text-sm font-medium text-gray-700"
                htmlFor="rate"
              >
                Rate Car
              </label>
              <input
                type="text"
                inputMode="numeric"
                id="rate"
                value={rating}
                maxLength={1}
                onChange={(e) => {
                  const value = e.target.value;

                  if (/^[1-5]?$/.test(value)) {
                    setRating(value);
                  }
                }}
                className="w-full h-11 px-3 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-lg outline-none"
              />
            </div>
            <button
              disabled={!rating || !comment.trim()}
              onClick={() => {
                if (!userData || !_id || !rating || !comment.trim()) {
                  return;
                }

                postComment({
                  rating: Number(rating),
                  comment: comment.trim(),
                  userId: userData._id,
                  carId: _id,
                  nickname: userData.nickname,
                });
              }}
              className={`bg-blue-700 px-4 py-2 rounded-[10px] text-white mt-3 col-span-2 cursor-pointer ${!rating || !comment.trim() ? "" : "hover:bg-blue-500"}  transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed md:ml-auto md:max-w-75 md:w-full md:h-10 md:self-end`}
            >
              Post
            </button>
          </div>
        ) : null}
        {reviews.map((review) => (
          <div key={review.userId}>
            <div className="flex justify-between items-center">
              <h5 className="font-bold text-[#1A202C]">{review.nickname}</h5>
              <StarRating rating={review.rating} />
            </div>
            <p className="text-[#90A3BF]">{review.comment}</p>
          </div>
        ))}
      </div>
      <h4 className="mt-4 text-[#1A202C] font-medium lg:max-w-310 lg:mx-auto">
        Recommended
      </h4>
      {recommended ? (
        <div className="flex overflow-x-scroll gap-3 mt-4 lg:max-w-310 lg:mx-auto h-75.25">
          {recommended.map((item) => {
            return <Card car={item} key={item._id} />;
          })}
        </div>
      ) : (
        <CardLoader />
      )}
      <Modals
        modal={modal}
        overlay={overlay}
        loggedIn={loggedIn}
        onClose={() => setOverlay(false)}
        onModalChange={setModal}
      />
    </section>
  );
}

export default Details;
