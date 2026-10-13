interface CategoryProps {
  title: string;
  category: string[];
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  selectedCategory: string;
}

function CategoryBox({
  title,
  category,
  setCategory,
  selectedCategory,
}: CategoryProps) {
  return (
    <div className="pt-3">
      <h3 className="text-sm font-medium text-gray-700">{title}</h3>

      <div className="flex gap-2 flex-wrap pt-2">
        {category.map((car_type) => (
          <div
            key={car_type}
            onClick={() => {
              setCategory(car_type);
            }}
            className={`${selectedCategory === car_type ? "bg-gray-800" : "bg-gray-400"} px-3 py-1 rounded-[10px] hover:bg-gray-800 text-white cursor-pointer transition-all duration-200`}
          >
            {car_type}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryBox;
