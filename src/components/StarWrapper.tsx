import { useState } from "react";

interface StarProps {
  setRating: (rating: number) => void;
}

function StarWrapper({ setRating }: StarProps) {
  const [selectedStar, setSelectedStar] = useState<number>(0);
  const [hoveredStar, setHoveredStar] = useState<number>(0);

  const activeStar = hoveredStar || selectedStar;

  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, index) => {
        return (
          <div
            key={index}
            onMouseEnter={() => setHoveredStar(index + 1)}
            onMouseLeave={() => setHoveredStar(0)}
            onClick={() => {
              setSelectedStar(index + 1);
              setRating(index + 1);
            }}
            className={`${activeStar > index ? "text-yellow-300" : "text-gray-500"} cursor-pointer`}
          >
            ★
          </div>
        );
      })}
    </div>
  );
}
export default StarWrapper;
