import Banner from '../banner/Banner';
import FeaturedProducts from '../featuredProducts/FeaturedProducts';
import Testimonials from '../testimonials/Testimonials';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <FeaturedProducts></FeaturedProducts>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;