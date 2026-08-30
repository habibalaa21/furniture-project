import AnnouncementBar from "../components/AnnouncementBar.jsx";
import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import Footer from "../components/Footer";
import Categories from "../components/Categories.jsx";
import FeaturedProducts from "../components/FeaturedProducts.jsx";
import HomeBanner from "../components/HomeBanner.jsx";
import WhyChooseUs from "../components/WhyChooseUs.jsx";


export default function Home() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main>
        <Hero />
        {/* <Categories /> */}
        <FeaturedProducts />
        <HomeBanner />
        <WhyChooseUs />
      </main>
      <Footer />
    </>
  );
}
