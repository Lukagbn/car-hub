import type { CarProps } from "./Card";
import Card from "./Card";
import Loading from "./Loading";

interface BannerProps {
  car: CarProps[];
  title?: string;
  loading?: boolean;
}

function CardList({ car, title, loading }: BannerProps) {
  return (
    <section className="pt-5">
      {title && <h3 className="text-[#90A3BF]">{title}</h3>}
      <div className="flex flex-col items-center gap-4 md:grid md:grid-cols-2 md:justify-items-center lg:grid-cols-3 xl:grid-cols-4 mt-4">
        {loading
          ? Array.from({ length: 10 }).map((_, index) => (
              <Loading key={index} />
            ))
          : car.map((car) => <Card car={car} key={car._id} />)}
      </div>
    </section>
  );
}

export default CardList;
