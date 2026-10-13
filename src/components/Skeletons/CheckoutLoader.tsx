function CheckoutLoader() {
  return (
    <section className="animate-pulse">
      <section className="bg-white max-w-112.5 mx-auto w-full lg:max-w-110 rounded-[10px] p-4">
        <div className="h-6 w-20 bg-[#1A202C] rounded mb-3" />
        <hr className="border-gray-200" />
        <div className="flex gap-3 pt-3 pb-3">
          <div className="h-20 w-30 shrink-0 bg-gray-200 rounded-[10px]" />
          <div className="flex-1 flex flex-col gap-3 py-1">
            <div className="h-4 w-3/4 bg-[#1A202C] rounded" />
            <div className="h-4 w-1/2 bg-amber-300 rounded" />
          </div>
        </div>
        <hr className="border-gray-200" />
        <div className="flex flex-col gap-4 pt-4">
          <div className="flex justify-between">
            <div className="h-4 w-20 bg-gray-200 rounded" />
            <div className="h-5 w-16 bg-[#1A202C] rounded" />
          </div>
          <div className="flex justify-between">
            <div className="h-4 w-20 bg-gray-200 rounded" />
            <div className="h-5 w-16 bg-[#1A202C] rounded" />
          </div>
          <hr className="border-gray-200" />
          <div className="flex justify-between">
            <div className="h-4 w-28 bg-[#1A202C] rounded" />
            <div className="h-6 w-20 bg-[#1A202C] rounded" />
          </div>
        </div>
      </section>
      <section className="bg-white max-w-112.5 mx-auto w-full lg:max-w-110 rounded-[10px] p-4 mt-4">
        <div className="h-6 w-28 bg-[#1A202C] rounded mb-3" />
        <hr className="border-gray-200" />
        <div className="pt-4">
          <div className="h-4 w-16 bg-blue-700 rounded mb-4" />
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex flex-col gap-2 pt-3">
              <div className="h-4 w-24 bg-gray-700 rounded" />
              <div className="h-11 w-full bg-gray-200 rounded-lg" />
            </div>
          ))}
        </div>
        <div className="pt-5">
          <div className="h-4 w-20 bg-red-700 rounded mb-4" />
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex flex-col gap-2 pt-3">
              <div className="h-4 w-24 bg-gray-700 rounded" />
              <div className="h-11 w-full bg-gray-200 rounded-lg" />
            </div>
          ))}
        </div>
      </section>
      <section className="bg-white max-w-112.5 mx-auto w-full lg:max-w-110 rounded-[10px] p-4 mt-4">
        <div className="h-6 w-32 bg-[#1A202C] rounded mb-3" />
        <hr className="border-gray-200" />

        <div className="flex flex-col gap-2 pt-3">
          <div className="h-4 w-24 bg-gray-700 rounded" />
          <div className="h-11 w-full bg-gray-200 rounded-lg" />
        </div>
        <div className="flex gap-4 pt-3">
          <div className="flex-1 flex flex-col gap-2">
            <div className="h-4 w-28 bg-gray-700 rounded" />
            <div className="h-11 w-full bg-gray-200 rounded-lg" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="h-4 w-10 bg-gray-700 rounded" />
            <div className="h-11 w-20 bg-gray-200 rounded-lg" />
          </div>
        </div>
      </section>
      <section className="bg-white max-w-112.5 mx-auto w-full lg:max-w-110 rounded-[10px] p-4 mt-4">
        <div className="h-6 w-32 bg-[#1A202C] rounded mb-3" />
        <hr className="border-gray-200" />
        <div className="h-11 w-full bg-gray-200 rounded-lg mt-4" />
      </section>
    </section>
  );
}

export default CheckoutLoader;
