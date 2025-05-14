const testimonials = [
  {
    id: 1,
    name: "Sarah Khan",
    comment: "Amazing products and super fast delivery. I love shopping here!",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    id: 2,
    name: "Arif Rahman",
    comment: "Great quality and support. Definitely recommended!",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 3,
    name: "Maya Hasan",
    comment: "Loved the packaging and quality. Will order again for sure!",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    id: 4,
    name: "Rafiul Islam",
    comment: "Support team is very responsive. Great experience.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
];
// #F3D5C2
const Testimonials = () => {
  return (
    <section className=" bg-[#F3D5C2] ">
      <div className="max-w-7xl mx-auto px-4 py-16 font-[josefin-sans]">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Customer Testimonials
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-6 rounded-2xl shadow-md text-center"
            >
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-lg font-semibold text-gray-900">
                {testimonial.name}
              </h3>
              <p className="text-gray-700 mt-2 text-sm">
                {testimonial.comment}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
