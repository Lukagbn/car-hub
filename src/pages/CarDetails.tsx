import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { CarProps } from "../components/Card";
import StarRating from "../components/StarRating";
import { useAppDispatch } from "../store/hooks";
import { addToFavorites } from "../store/slices/carSlice";
import Hearth from "../components/SvgIcons/Heart";

interface CarDetails {
  carDetails: CarProps;
}
interface Review {
  rating: number;
  comment: string;
  userId: string;
  carId: string;
}
interface Reviews {
  reviews: Review[];
}

function Details() {
  const { _id } = useParams();
  const [carDetails, setCarDetails] = useState<CarProps>();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [mainImg, setMainImg] = useState<string>();
  const dispatch = useAppDispatch();

  async function fetchCar() {
    try {
      const res = await fetch(`http://localhost:4000/cars/${_id}`);
      const response: CarDetails = await res.json();
      setCarDetails(response.carDetails);
    } catch (error) {
      console.log("error", error);
    }
  }
  async function fetchReviews() {
    try {
      const res = await fetch(`http://localhost:4000/review/${_id}`);
      const response: Reviews = await res.json();
      setReviews(response.reviews);
      console.log(reviews);
    } catch (error) {
      console.log("error", error);
    }
  }
  useEffect(() => {
    fetchCar();
    fetchReviews();
  }, []);

  if (!carDetails) return <div>Loading...</div>;

  const discountPrice =
    carDetails.price - (carDetails.price * carDetails.discount) / 100;

  return (
    <section>
      <div className="md:flex md:justify-between md:w-full md:gap-4">
        <img
          className="mb-4 rounded-[10px] w-full h-auto md:max-w-140"
          src={mainImg ?? carDetails.images[0]}
          alt="car image"
        />
        {carDetails.images.length !== 1 && (
          <div className="flex justify-between mb-4 md:flex-col">
            {carDetails.images.map((img, index) => {
              return (
                <img
                  className="w-[30%] h-auto rounded-[10px] md:h-30 md:w-auto"
                  key={index}
                  src={img}
                  onClick={() => setMainImg(img)}
                />
              );
            })}
          </div>
        )}
      </div>
      <div className="bg-white rounded-[10px] p-4 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h2 className="text-[#1A202C] text-[20px] font-bold">
            {carDetails.make} {carDetails.model}
          </h2>
          <Hearth
            onClick={() => dispatch(addToFavorites(carDetails))}
            car={carDetails}
            width={22}
            height={20}
          />
        </div>
        <div className="flex gap-4 items-center">
          <StarRating rating={carDetails.rating} />
          <p className="text-[#90A3BF] text-[12px]">
            reviews( {reviews.length} )
          </p>
        </div>
        <p className="text-[#1A202C] flex justify-between font-bold">
          Car Make: <span className="text-[#90A3BF]">{carDetails.make}</span>
        </p>
        <p className="text-[#1A202C] flex justify-between font-bold">
          Car Type:{" "}
          <span className="text-[#90A3BF]">{carDetails.car_type}</span>
        </p>
        <p className="text-[#1A202C] flex justify-between font-bold">
          Fuel: <span className="text-[#90A3BF]">{carDetails.fuel}L</span>
        </p>
        <p className="text-[#1A202C] flex justify-between font-bold">
          Fuel Type:{" "}
          <span className="text-[#90A3BF]">{carDetails.fuel_type}</span>
        </p>
        <p className="text-[#1A202C] flex justify-between font-bold">
          Transmission:{" "}
          <span className="text-[#90A3BF]">{carDetails.transmission}</span>
        </p>
        <p className="text-[#1A202C] flex justify-between font-bold">
          Year: <span className="text-[#90A3BF]">{carDetails.year}</span>
        </p>
        <div className="flex justify-between h-15 mt-5">
          <div className="flex flex-col justify-between">
            <p className="font-bold text-[20px] text-[#1A202C]">
              ${discountPrice.toFixed(2)}/
              <span className="text-[#90A3BF] text-[12px]">day</span>
            </p>
            {discountPrice !== 0 && (
              <p className="line-through text-[#90A3BF]">
                ${carDetails.price.toFixed(2)}
              </p>
            )}
          </div>
          <button className="rounded-[10px] bg-blue-700 text-white h-full w-[35%] text-[17px]">
            Rent Now
          </button>
        </div>
      </div>
    </section>
  );
}

export default Details;
