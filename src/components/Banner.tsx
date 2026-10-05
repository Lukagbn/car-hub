import porscheImg from "../assets/images/porsche.webp";

function Banner() {
  return (
    <section className="bg-blue-400 rounded-[10px] p-5 h-80 relative">
      <h2 className="text-white font-semibold tracking-[1px] text-[20px]">
        The Best Platform To Rent A Car
      </h2>
      <p className="text-white text-[12px] my-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, omnis.
      </p>
      <button className="bg-blue-700 text-white rounded-sm w-32 h-12 hover:bg-blue-600 transition-all duration-200 cursor-pointer">
        Rent A Car
      </button>
      <img
        className="absolute bottom-0 left-1/2 -translate-x-1/2"
        src={porscheImg}
        width={300}
        height={80}
        alt="porsche"
      />
    </section>
  );
}

export default Banner;
