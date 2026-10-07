import type { CarProps } from "./Card";
import Card from "./Card";
import CardLoader from "./Skeletons/CardLoader";

interface BannerProps {
  car: CarProps[];
  title?: string;
  loading?: boolean;
}

function CardList({ car, title, loading }: BannerProps) {
  return (
    <section className="pt-5">
      <div className="lg:mx-auto lg:max-w-310">
        {title && <h3 className="text-[#90A3BF]">{title}</h3>}
      </div>
      <div className="flex flex-col gap-4 mx-auto items-center mt-4 md:grid md:grid-cols-3 md:justify-items-center lg:grid-cols-4 lg:max-w-310">
        {loading
          ? Array.from({ length: 10 }).map((_, index) => (
              <CardLoader key={index} />
            ))
          : car.map((car) => <Card car={car} key={car._id} />)}
      </div>
    </section>
  );
}

export default CardList;
