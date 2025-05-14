const About = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16 space-y-10">
      <h1 className="text-4xl font-bold text-center text-gray-800">About Us</h1>
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <img
            src="https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="About our shop"
            className="w-full h-80 object-cover rounded-lg shadow"
          />
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">Our Mission</h2>
          <p className="text-gray-600">
            Our mission is simple — to provide high-quality, affordable
            stationery and office supplies that help people stay organized,
            inspired, and efficient.
          </p>
          <p className="text-gray-600">
            We carefully curate our collection to ensure each product meets our
            standards of excellence, whether it's a notebook, pen, or planner.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;