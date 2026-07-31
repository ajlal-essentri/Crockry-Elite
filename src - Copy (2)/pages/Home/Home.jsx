import Hero from "../../components/home/Hero/Hero";
import Categories from "../../components/home/Categories/Categories";
import FeaturedProducts from "../../components/home/FeaturedProducts/FeaturedProducts";
import WhyChooseUs from "../../components/home/WhyChooseUs/WhyChooseUs";
import NewArrivals from "../../components/home/NewArrivals/NewArrivals";
import Newsletter from "../../components/home/Newsletter/Newsletter";
import Footer from "../../components/layout/Footer/Footer";

function Home() {
  return (
    <>
      <Hero />
      <Categories />
       <FeaturedProducts />
        <WhyChooseUs />
          <NewArrivals />
          <Newsletter />
          <Footer/>
    </>
  );
}

export default Home;