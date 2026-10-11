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
  const loggedIn = Boolean(localStorage.getItem("token"));
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  async function fetchCarData() {
    try {
      const res = await fetch(`https://rentacar-uq9f.onrender.com/cars/${_id}`);
      const response: CarDetails = await res.json();
      setCarData(response.carDetails);
    } catch (error) {
      console.log("error", error);
    }
  }
  async function fetchReviews() {
    try {
      const res = await fetch(
        `https://rentacar-uq9f.onrender.com/review/${_id}`,
      );
      const response: Reviews = await res.json();
      setReviews(response.reviews);
    } catch (error) {
      console.log("error", error);
    }
  }
  async function fetchRecommended() {
    try {
      const res = await fetch("https://rentacar-uq9f.onrender.com/cars");
      const response: ApiResponse = await res.json();

      const filtered = response.carData.filter(
        (carData) => carData._id !== _id,
      );
      setRecommended(filtered);
    } catch (error) {
      console.log("error", error);
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
                    className="w-[30%] max-h-18 rounded-[10px] lg:max-w-37.5 lg:h-25 lg:max-h-none object-cover cursor-pointer"
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
      ;
    </section>
  );
}

export default Details;
