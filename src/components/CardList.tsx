import type { CarProps } from "./Card";
import Card from "./Card";

function CardList({ car }: { car: CarProps[] }) {
  return (
    <section className="flex flex-col gap-4 pt-5">
      {car.map((car) => (
        <Card car={car} key={car.id} />
      ))}
    </section>
  );
}

export default CardList;
