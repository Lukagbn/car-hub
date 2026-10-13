import { useAppSelector } from "../store/hooks";
import type { CarProps } from "../components/Card";
import CardList from "../components/CardList";
import { Link } from "react-router";

function Favorites() {
  const favoriteCars: CarProps[] = useAppSelector(
    (state) => state.favorites.favCars,
  );
  if (favoriteCars.length === 0) {
    return (
      <section className="flex flex-col items-center justify-center text-center min-h-[70vh] px-4">
        <div>
          <h2 className="text-[20px] text-[#1a202c]">There is nothing here</h2>
          <Link
            className="text-[20px] text-blue-400 hover:text-blue-700 transition-all duration-300"
            to={"/categories"}
          >
            Add Cars From Categories
          </Link>
        </div>
      </section>
    );
  }
  return (
    <div>
      <CardList car={favoriteCars} />
    </div>
  );
}

export default Favorites;
