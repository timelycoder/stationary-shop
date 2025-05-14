import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <section
      className="relative bg-cover bg-center h-screen md:h-[80vh] flex items-center justify-center"
      style={{
        backgroundImage: `url('https://plus.unsplash.com/premium_photo-1663957923326-f05b0b3912e8?q=80&w=1943&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
      }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-60"></div>

      {/* Content */}
      <div className="relative text-center text-white px-4 sm:px-6 md:px-8 max-w-2xl">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 leading-tight">
          All Your Stationery Needs in One Place
        </h1>
        <p className="text-base sm:text-lg md:text-xl mb-6 leading-relaxed text-gray-200">
          From pens and notebooks to office supplies — find high-quality
          products for school, work, and creativity at affordable prices.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          {/* <button className="px-6 py-3 bg-white hover:bg-transparent border hover:border-white hover:text-white rounded text-black font-semibold transition">
            Shop Now
          </button> */}
          <Link to='/products' className="px-6 py-3 border border-white hover:bg-white hover:text-black rounded text-white font-semibold transition">
            Browse Collection
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Banner;
