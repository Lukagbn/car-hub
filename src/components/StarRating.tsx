function StarRating({ rating }: { rating: number }) {
  const percentage = (rating / 5) * 100;
  return (
    <div className="relative inline-block w-fit">
      <div
        className={"text-amber-300 absolute overflow-clip"}
        style={{ width: `${percentage}%` }}
      >
        ★★★★★
      </div>
      <div className={"text-gray-500"}>★★★★★</div>
    </div>
  );
}

export default StarRating;
