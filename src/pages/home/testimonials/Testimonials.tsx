

const testimonials = [
  {
    id: 1,
    name: "Sarah Khan",
    comment: "Amazing products and super fast delivery. I love shopping here!",
    image: "/user1.jpg",
  },
  {
    id: 2,
    name: "Arif Rahman",
    comment: "Great quality and support. Definitely recommended!",
    image: "/user2.jpg",
  },
  {
    id: 3,
    name: "Maya Hasan",
    comment: "Loved the packaging and quality. Will order again for sure!",
    image: "/user3.jpg",
  },
  {
    id: 4,
    name: "Rafiul Islam",
    comment: "Support team is very responsive. Great experience.",
    image: "/user4.jpg",
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
      </div>
    </section>
  );
};

export default Testimonials;
