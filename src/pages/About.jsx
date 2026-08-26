import "./About.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AnnouncementBar from "../components/AnnouncementBar.jsx";

function About() {
  return (
    <>
    <AnnouncementBar />
            <Navbar />
    <div className="about-page">

      {/* Hero */}
      <section className="about-hero">
        <div className="about-hero-content">
          <p className="breadcrumb">
            <span>Home</span> / About Us
          </p>

          <h1>
            About <span>Furniture.</span>
          </h1>

          <p className="hero-text">
            We create modern, comfortable and beautiful furniture
            designed to make your home feel special.
          </p>
        </div>

        <div className="hero-image">
          <img
            src="/images/about-furniture.jpeg"
            alt="Furniture"
          />
        </div>
      </section>


      {/* Our Story */}
      <section className="our-story">
        <div className="story-image">
          <img
            src="/images/furniture-room.jpeg"
            alt="Modern furniture"
          />
        </div>

        <div className="story-content">
          <p className="section-title">OUR STORY</p>

          <h2>
            Furniture that makes
            <span> your house a home.</span>
          </h2>

          <p>
            At Furniture., we believe that furniture is more than
            just something you put in your home. It's part of the
            moments, memories, and comfort that make a house feel
            like home.
          </p>

          <p>
            We bring together modern design, quality materials and
            timeless style to create pieces that fit beautifully
            into your everyday life.
          </p>

          <button>Discover Our Collection →</button>
        </div>
      </section>


      {/* Why Choose Us */}
      <section className="why-us">
        <div className="section-heading">
          <p className="section-title">WHY CHOOSE US</p>
          <h2>Made for your <span>lifestyle.</span></h2>
          <p>
            Everything we create is designed with quality,
            comfort and style in mind.
          </p>
        </div>

        <div className="features">

          <div className="feature-card">
            <div className="feature-icon">🛋️</div>
            <h3>Modern Design</h3>
            <p>
              Simple and elegant designs that fit every modern home.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⭐</div>
            <h3>Premium Quality</h3>
            <p>
              Carefully selected materials built to last for years.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🚚</div>
            <h3>Fast Delivery</h3>
            <p>
              We make getting your favorite furniture simple and fast.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">❤️</div>
            <h3>Customer First</h3>
            <p>
              Your satisfaction is always at the heart of what we do.
            </p>
          </div>

        </div>
      </section>


      {/* Statistics */}
      <section className="statistics">

        <div className="stat">
          <h2>10+</h2>
          <p>Years Experience</p>
        </div>

        <div className="stat">
          <h2>500+</h2>
          <p>Furniture Products</p>
        </div>

        <div className="stat">
          <h2>10K+</h2>
          <p>Happy Customers</p>
        </div>

        <div className="stat">
          <h2>20+</h2>
          <p>Cities Delivered</p>
        </div>

      </section>


      {/* Our Values */}
      <section className="values">

        <div className="section-heading">
          <p className="section-title">OUR VALUES</p>
          <h2>What we <span>believe in.</span></h2>
        </div>

        <div className="values-container">

          <div className="value-card">
            <span>01</span>
            <h3>Quality First</h3>
            <p>
              We carefully select materials to provide furniture
              that lasts.
            </p>
          </div>

          <div className="value-card">
            <span>02</span>
            <h3>Modern Design</h3>
            <p>
              We combine simplicity, comfort and modern style.
            </p>
          </div>

          <div className="value-card">
            <span>03</span>
            <h3>Customer First</h3>
            <p>
              Your satisfaction is always our biggest priority.
            </p>
          </div>

        </div>

      </section>


      {/* CTA */}
      <section className="about-cta">

        <div>
          <h2>Ready to transform your home?</h2>

          <p>
            Discover furniture that matches your style
            and makes your space feel like home.
          </p>

          <button>Shop Now →</button>
        </div>

      </section>

    </div>
    <Footer />
    </>
  );
}

export default About;