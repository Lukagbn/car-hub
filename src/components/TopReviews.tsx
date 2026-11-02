import React, { useEffect, useState } from "react";
import TopReviewLoader from "./Skeletons/TopReviewLoader";
import StarRating from "./StarRating";
import { Link } from "react-router";

interface AllReviewApiResponse {
  allReviews: AllReviews[];
}

interface AllReviews {
  carId: "6ac27a1ad4045c973791c1d3";
  comment: "Good car!";
  date: "2026-10-05T22:32:06.208Z";
  nickname: "asdasd";
  rating: 5;
}

function TopReviews() {
  const [reviews, setReviews] = useState<AllReviews[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  async function fetchTopReviews() {
    try {
      const res = await fetch("https://rentacar-uq9f.onrender.com/review/top");
      const response: AllReviewApiResponse = await res.json();
      setReviews(response.allReviews);
      console.log(response);
    } catch (error) {
      console.log("error:", error);
      setError("Failed to load reviews");
    }
  }

  useEffect(() => {
    fetchTopReviews();
  }, []);

  if (error) {
    return <p className="mt-4 text-red-500">{error}</p>;
  }

  if (!reviews) {
    return <TopReviewLoader />;
  }

  return (
    <section className="lg:mx-auto lg:max-w-310 mt-4">
      <h3 className="font-bold text-[#1A202C]">Our Top Reviews</h3>
      <div className="flex gap-2 mt-4 overflow-x-auto h-50">
        {reviews?.map((review, index) => {
          const date = review.date;
          const formattedDate = date.split("T")[0].split("-").join("/");
          return (
            <Link
              to={`/cars/${review.carId}`}
              key={index}
              className="flex flex-col bg-white max-w-70 w-full h-45 rounded-[10px] p-3 shrink-0 justify-between shadow-md hover:shadow-none cursor-pointer select-none transition-all duration-400"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-[#1A202C]">{review.nickname}</h3>
                <StarRating rating={review.rating} />
              </div>
              <p className="text-[#90A3BF] max-h-10">{review.comment}</p>
              <p>Posted on: {formattedDate}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default TopReviews;
