import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import type { CarDetails } from "./CarDetails";
import type { CarProps } from "../components/Card";
import StarRating from "../components/StarRating";
import CheckoutLoader from "../components/Skeletons/CheckoutLoader";
import ErrorMessage from "../components/ErrorMessage";

const FIXED_LOCATIONS = [
  "Tbilisi Airport",
  "Tbilisi City Center",
  "Batumi Airport",
  "Batumi City Center",
  "Kutaisi Airport",
  "Kutaisi City Center",
];

type ErrorFields =
  | "pickupLocation"
  | "pickupDate"
  | "pickupTime"
  | "dropoffLocation"
  | "dropoffDate"
  | "dropoffTime"
  | "terms"
  | "form";

type BookingErrors = Partial<Record<ErrorFields, string>>;

function getTodayDate() {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function Checkout() {
  const navigate = useNavigate();
  const { _id } = useParams();

  const API_URL = import.meta.env.VITE_API_URL;

  const [carData, setCarData] = useState<CarProps>();

  const [activePickup, setActivePickup] = useState(false);
  const [activePickupText, setActivePickupText] = useState("Select Location");

  const [activeDropoff, setActiveDropoff] = useState(false);
  const [activeDropoffText, setActiveDropoffText] = useState("Select Location");

  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [dropoffDate, setDropoffDate] = useState("");
  const [dropoffTime, setDropoffTime] = useState("");

  const [termsAccepted, setTermsAccepted] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<BookingErrors>({});
  const [successMessage, setSuccessMessage] = useState("");

  function clearError(field: ErrorFields) {
    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));

    setSuccessMessage("");
  }

  async function fetchCarData() {
    try {
      const res = await fetch(`${API_URL}/cars/${_id}`);

      if (!res.ok) {
        throw new Error("Failed to fetch car information");
      }

      const response: CarDetails = await res.json();
      setCarData(response.carDetails);
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(() => {
    fetchCarData();
  }, [_id]);

  function validateBooking() {
    const newErrors: BookingErrors = {};

    if (activePickupText === "Select Location") {
      newErrors.pickupLocation = "Please select a pickup location";
    }

    if (!pickupDate) {
      newErrors.pickupDate = "Please select pickup date";
    }

    if (!pickupTime) {
      newErrors.pickupTime = "Please select pickup time";
    }

    if (activeDropoffText === "Select Location") {
      newErrors.dropoffLocation = "Please select a dropoff location";
    }

    if (!dropoffDate) {
      newErrors.dropoffDate = "Please select dropoff date";
    }

    if (!dropoffTime) {
      newErrors.dropoffTime = "Please select dropoff time";
    }

    if (!termsAccepted) {
      newErrors.terms = "You must accept the terms and conditions";
    }

    if (pickupDate && pickupTime) {
      const pickupDateTime = new Date(`${pickupDate}T${pickupTime}`);

      if (pickupDateTime < new Date()) {
        newErrors.pickupDate = "Pickup date and time cannot be in the past";
      }
    }

    if (pickupDate && pickupTime && dropoffDate && dropoffTime) {
      const pickupDateTime = new Date(`${pickupDate}T${pickupTime}`);
      const dropoffDateTime = new Date(`${dropoffDate}T${dropoffTime}`);

      if (dropoffDateTime <= pickupDateTime) {
        newErrors.dropoffDate = "Dropoff must be after pickup date and time";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  async function handleBooking() {
    setSuccessMessage("");

    if (!_id) {
      setErrors({ form: "Car not found" });
      return;
    }

    if (!validateBooking()) {
      return;
    }

    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    if (!token) {
      setErrors({ form: "You need to login first" });
      return;
    }

    try {
      setIsLoading(true);

      setErrors({});

      const bookingData = {
        carId: _id,
        pickupLocation: activePickupText,
        pickupDate,
        pickupTime,
        dropoffLocation: activeDropoffText,
        dropoffDate,
        dropoffTime,
      };

      const res = await fetch(`${API_URL}/booking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookingData),
      });

      const response = await res.json();

      if (!res.ok) {
        throw new Error(response.error || response.message || "Booking failed");
      }

      setSuccessMessage("Booking successfully created! Redirecting...");

      console.log("Created booking:", response.booking);
    } catch (error) {
      console.error("Booking error:", error);

      setErrors({
        form: error instanceof Error ? error.message : "Something went wrong",
      });
    } finally {
      setIsLoading(false);
    }
  }
  if (successMessage) {
    setTimeout(() => {
      navigate("/");
    }, 1500);
  }

  if (!carData) {
    return <CheckoutLoader />;
  }
  const discountPrice =
    carData.price - (carData.price * carData.discount) / 100;

  return (
    <section>
      <section className="bg-white max-w-112.5 mx-auto w-full lg:max-w-110 lg:flex lg:flex-col lg:h-full rounded-[10px] p-4">
        <h2 className="text-[20px] font-bold pb-2 text-[#1A202C]">Total</h2>
        <hr className="border-gray-200" />
        <div className="flex gap-3 pt-3 pb-3">
          <img
            className="h-20 w-30 object-cover rounded-[10px]"
            src={carData.images[0]}
            alt="car image"
          />
          <div>
            <h3 className="font-medium text-[#1A202C]">
              {carData.make} {carData.model}
            </h3>
            <StarRating rating={carData.rating} />
          </div>
        </div>
        <hr className="border-gray-200" />
        <div className="pt-3">
          <p className="flex items-center justify-between text-[#90A3BF]">
            Subtotal:
            <span className="font-medium text-[18px] text-[#1A202C]">
              ${carData.price.toFixed(2)}
            </span>
          </p>
          <p className="flex items-center justify-between pb-3 text-[#90A3BF]">
            Discount:
            <span className="font-medium text-[18px] text-[#1A202C]">
              {carData.discount.toFixed(2)}%
            </span>
          </p>
          <hr className="border-gray-200" />
          <p className="flex items-center justify-between pt-3 text-[#1A202C]">
            Daily rent price:
            <span className="font-medium text-[18px] text-[#1A202C]">
              ${discountPrice.toFixed(2)}
            </span>
          </p>
        </div>
      </section>
      <section className="bg-white max-w-112.5 mx-auto w-full lg:max-w-110 lg:flex lg:flex-col lg:h-full rounded-[10px] p-4 mt-4">
        <h2 className="text-[20px] font-bold pb-3 text-[#1A202C]">Rent Info</h2>
        <hr className="border-gray-200" />
        <div>
          <p className="pt-4 text-blue-700 font-semibold text-sm uppercase tracking-wide">
            Pick Up
          </p>
          <div className="flex flex-col gap-2 pt-3">
            <label className="text-sm font-medium text-gray-700">
              Location
            </label>
            <div
              className={`relative w-full h-11 bg-gray-50 border rounded-lg flex items-center cursor-pointer transition-colors ${
                errors.pickupLocation
                  ? "border-red-500"
                  : "border-gray-200 hover:border-blue-400"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                setActivePickup(!activePickup);
                setActiveDropoff(false);
              }}
            >
              <p className="pl-3 text-sm text-gray-800 flex-1">
                {activePickupText}
              </p>
              <span className="pr-3 text-gray-500">⌄</span>
              {activePickup && (
                <ul className="absolute z-50 top-[110%] left-0 w-full max-h-40 overflow-y-auto bg-white border border-gray-200 shadow-lg rounded-lg py-1">
                  {FIXED_LOCATIONS.map((location, index) => (
                    <li
                      key={index}
                      className="px-3 py-2 text-sm text-gray-700 cursor-pointer hover:bg-blue-50 hover:text-blue-700 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActivePickup(false);
                        setActivePickupText(location);
                        clearError("pickupLocation");
                      }}
                    >
                      {location}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <ErrorMessage message={errors.pickupLocation} />
          </div>
          <div className="flex flex-col gap-2 pt-3">
            <label
              className="text-sm font-medium text-gray-700"
              htmlFor="pickupDate"
            >
              Select Date
            </label>
            <input
              type="date"
              id="pickupDate"
              min={getTodayDate()}
              value={pickupDate}
              onChange={(e) => {
                setPickupDate(e.target.value);
                clearError("pickupDate");
                clearError("dropoffDate");
              }}
              className={`w-full h-11 px-3 text-sm text-gray-800 bg-gray-50 border rounded-lg outline-none transition ${
                errors.pickupDate
                  ? "border-red-500"
                  : "border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              }`}
            />

            <ErrorMessage message={errors.pickupDate} />
          </div>
          <div className="flex flex-col gap-2 pt-3">
            <label
              className="text-sm font-medium text-gray-700"
              htmlFor="pickupTime"
            >
              Pickup Time
            </label>
            <input
              type="time"
              id="pickupTime"
              value={pickupTime}
              onChange={(e) => {
                setPickupTime(e.target.value);
                clearError("pickupTime");
                clearError("dropoffDate");
              }}
              className={`w-full h-11 px-3 text-sm text-gray-800 bg-gray-50 border rounded-lg outline-none transition ${
                errors.pickupTime
                  ? "border-red-500"
                  : "border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              }`}
            />

            <ErrorMessage message={errors.pickupTime} />
          </div>
        </div>
        <div>
          <p className="pt-5 text-red-600 font-semibold text-sm uppercase tracking-wide">
            Drop Off
          </p>
          <div className="flex flex-col gap-2 pt-3">
            <label className="text-sm font-medium text-gray-700">
              Location
            </label>
            <div
              className={`relative w-full h-11 bg-gray-50 border rounded-lg flex items-center cursor-pointer transition-colors ${
                errors.dropoffLocation
                  ? "border-red-500"
                  : "border-gray-200 hover:border-red-400"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                setActiveDropoff(!activeDropoff);
                setActivePickup(false);
              }}
            >
              <p className="pl-3 text-sm text-gray-800 flex-1">
                {activeDropoffText}
              </p>
              <span className="pr-3 text-gray-500">⌄</span>
              {activeDropoff && (
                <ul className="absolute z-50 top-[110%] left-0 w-full max-h-40 overflow-y-auto bg-white border border-gray-200 shadow-lg rounded-lg py-1">
                  {FIXED_LOCATIONS.map((location, index) => (
                    <li
                      key={index}
                      className="px-3 py-2 text-sm text-gray-700 cursor-pointer hover:bg-red-50 hover:text-red-600 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();

                        setActiveDropoff(false);
                        setActiveDropoffText(location);
                        clearError("dropoffLocation");
                      }}
                    >
                      {location}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <ErrorMessage message={errors.dropoffLocation} />
          </div>

          <div className="flex flex-col gap-2 pt-3">
            <label
              className="text-sm font-medium text-gray-700"
              htmlFor="dropoffDate"
            >
              Select Date
            </label>

            <input
              type="date"
              id="dropoffDate"
              min={pickupDate || getTodayDate()}
              value={dropoffDate}
              onChange={(e) => {
                setDropoffDate(e.target.value);
                clearError("dropoffDate");
              }}
              className={`w-full h-11 px-3 text-sm text-gray-800 bg-gray-50 border rounded-lg outline-none transition ${
                errors.dropoffDate
                  ? "border-red-500"
                  : "border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100"
              }`}
            />

            <ErrorMessage message={errors.dropoffDate} />
          </div>

          <div className="flex flex-col gap-2 pt-3">
            <label
              className="text-sm font-medium text-gray-700"
              htmlFor="dropoffTime"
            >
              Drop Off Time
            </label>

            <input
              type="time"
              id="dropoffTime"
              value={dropoffTime}
              onChange={(e) => {
                setDropoffTime(e.target.value);
                clearError("dropoffTime");
                clearError("dropoffDate");
              }}
              className={`w-full h-11 px-3 text-sm text-gray-800 bg-gray-50 border rounded-lg outline-none transition ${
                errors.dropoffTime
                  ? "border-red-500"
                  : "border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100"
              }`}
            />

            <ErrorMessage message={errors.dropoffTime} />
          </div>
        </div>
      </section>

      <section className="bg-white max-w-112.5 mx-auto w-full lg:max-w-110 lg:flex lg:flex-col lg:h-full rounded-[10px] p-4 mt-4">
        <h2 className="text-[20px] font-bold pb-3 text-[#1A202C]">
          Confirmation
        </h2>

        <hr className="border-gray-200" />

        <div className="flex items-center gap-2 pt-3">
          <input
            type="checkbox"
            id="terms"
            checked={termsAccepted}
            onChange={(e) => {
              setTermsAccepted(e.target.checked);
              clearError("terms");
            }}
          />

          <label htmlFor="terms" className="text-sm text-gray-700">
            I agree to the terms and conditions
          </label>
        </div>

        <ErrorMessage message={errors.terms} />

        <ErrorMessage message={errors.form} />

        {successMessage && (
          <p className="text-green-600 text-sm mt-3">{successMessage}</p>
        )}

        <button
          type="button"
          onClick={handleBooking}
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3 mt-4 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          {isLoading ? "Processing..." : "Confirm Booking"}
        </button>
      </section>
    </section>
  );
}

export default Checkout;
