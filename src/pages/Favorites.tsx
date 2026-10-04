import { useAppSelector } from "../store/hooks";
import type { CarProps } from "../components/Card";
import CardList from "../components/CardList";

function Favorites() {
  const favoriteCars: CarProps[] = useAppSelector(
    (state) => state.favorites.favCars,
  );
  if (favoriteCars.length === 0) {
    return <div>There is nothing here</div>;
  }
  return (
    <div>
      <CardList car={favoriteCars} />
    </div>
  );
}

export default Favorites;
