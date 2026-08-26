import AnnouncementBar from "../components/AnnouncementBar.jsx";
import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import Footer from "../components/Footer";
import Categories from "../components/Categories.jsx";

export default function Home() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main>
        <Hero />
        <Categories />
      </main>
      <Footer />
    </>
  );
}
