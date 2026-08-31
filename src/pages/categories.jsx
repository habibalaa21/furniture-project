import { Link } from "react-router-dom";
import {
  ArrowRight,
  Truck,
  ShieldCheck,
  RotateCcw,
  Headphones,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AnnouncementBar from "../components/AnnouncementBar.jsx";

import products from "../data/productData";

import "./Categories.css";

function Categories() {
  const categories = [
    {
      name: "Living Room",
      icon: "🛋️",
      description:
        "Comfortable and stylish furniture for your living space.",
    },
    {
      name: "Bedroom",
      icon: "🛏️",
      description:
        "Create a peaceful bedroom with modern furniture.",
    },
    {
      name: "Dining Room",
      icon: "🍽️",
      description:
        "Beautiful furniture for memorable dining moments.",
    },
    {
      name: "Office",
      icon: "💼",
      description:
        "Modern furniture designed for a productive workspace.",
    },
    {
      name: "Outdoor",
      icon: "🌿",
      description:
        "Stylish furniture for relaxing outdoor spaces.",
    },
  ];

  const getCategoryProducts = (categoryName) => {
    return products.filter(
      (product) => product.category === categoryName
    );
  };

  const getCategoryImage = (categoryName) => {
    const categoryProduct = products.find(
      (product) => product.category === categoryName
    );

    return categoryProduct?.image;
  };

  const bestSellers = [...products]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  return (
    <>
      <AnnouncementBar />

      <Navbar />

      <div className="categories-page">

        {/* ================= HERO ================= */}

        <section className="categories-hero">

          <div className="categories-hero-content">

            <div className="categories-breadcrumb">
              <Link to="/">Home</Link>
              <span>/</span>
              <span>Categories</span>
            </div>

            <span className="hero-label">
              EXPLORE OUR COLLECTION
            </span>

            <h1>
              Find Furniture
              <br />
              <span>Made For Your Space.</span>
            </h1>

            <p>
              Explore our carefully selected furniture
              collections and find pieces that make your
              home comfortable, beautiful and uniquely yours.
            </p>

            <Link
              to="/shop"
              className="hero-button"
            >
              Explore All Furniture
              <ArrowRight size={18} />
            </Link>

          </div>

          <div className="hero-shape">
            <span>🛋️</span>
          </div>

        </section>


        {/* ================= SHOP BY ROOM ================= */}

        <section className="room-section">

          <div className="section-heading">

            <div>
              <span>SHOP BY ROOM</span>

              <h2>
                Furniture for
                <br />
                every room.
              </h2>
            </div>

            <p>
              From relaxing living rooms to productive
              home offices, discover furniture designed
              for every part of your home.
            </p>

          </div>


          <div className="category-grid">

            {categories.map((category) => {

              const count = getCategoryProducts(
                category.name
              ).length;

              return (
                <div
                  className="category-card"
                  key={category.name}
                >

                  <div className="category-image">

                    {getCategoryImage(category.name) ? (
                      <img
                        src={getCategoryImage(category.name)}
                        alt={category.name}
                      />
                    ) : (
                      <div className="category-icon">
                        {category.icon}
                      </div>
                    )}

                    <div className="category-overlay">
                      {category.icon}
                    </div>

                  </div>


                  <div className="category-content">

                    <div className="category-top">

                      <h3>
                        {category.name}
                      </h3>

                      <span>
                        {count} Products
                      </span>

                    </div>

                    <p>
                      {category.description}
                    </p>

                    <Link
                      to={`/shop?category=${encodeURIComponent(
                        category.name
                      )}`}
                      className="category-link"
                    >
                      Shop Collection
                      <ArrowRight size={17} />
                    </Link>

                  </div>

                </div>
              );
            })}

          </div>

        </section>


        {/* ================= FEATURED ================= */}

        <section className="featured-section">

          <div className="featured-image">

            {products[0]?.image && (
              <img
                src={products[0].image}
                alt="Featured furniture"
              />
            )}

          </div>


          <div className="featured-content">

            <span>
              FEATURED COLLECTION
            </span>

            <h2>
              Comfort meets
              <br />
              modern design.
            </h2>

            <p>
              Give your home a fresh new look with
              furniture that combines timeless design,
              comfort and quality craftsmanship.
            </p>

            <div className="featured-points">

              <div>
                <span>✓</span>
                <p>Premium quality materials</p>
              </div>

              <div>
                <span>✓</span>
                <p>Modern and timeless designs</p>
              </div>

              <div>
                <span>✓</span>
                <p>Designed for everyday comfort</p>
              </div>

            </div>

            <Link
              to="/shop"
              className="featured-button"
            >
              Explore Collection
              <ArrowRight size={18} />
            </Link>

          </div>

        </section>


        {/* ================= BEST SELLERS ================= */}

        <section className="best-section">

          <div className="section-heading centered">

            <span>OUR FAVORITES</span>

            <h2>
              Best selling furniture
            </h2>

            <p>
              Discover some of our most loved pieces,
              selected by our customers.
            </p>

          </div>


          <div className="best-grid">

            {bestSellers.map((product) => (

              <div
                className="best-card"
                key={product.id}
              >

                <div className="best-image">

                  {product.discount && (
                    <span className="best-discount">
                      -{product.discount}%
                    </span>
                  )}

                  <img
                    src={product.image}
                    alt={product.name}
                  />

                </div>


                <div className="best-info">

                  <span>
                    {product.category}
                  </span>

                  <h3>
                    {product.name}
                  </h3>

                  <div className="best-rating">
                    ★★★★★
                    <small>
                      {product.rating}
                    </small>
                  </div>

                  <strong>
                    ${product.price}
                  </strong>

                </div>

              </div>

            ))}

          </div>


          <div className="center-button">

            <Link
              to="/shop"
              className="view-all-button"
            >
              View All Products
              <ArrowRight size={18} />
            </Link>

          </div>

        </section>


        {/* ================= WHY CHOOSE US ================= */}

        <section className="why-section">

          <div className="section-heading centered">

            <span>WHY FURNITURE.</span>

            <h2>
              Everything you need
              <br />
              for a better home.
            </h2>

          </div>


          <div className="features-grid">

            <div className="feature-card">

              <div className="feature-icon">
                <Truck size={27} />
              </div>

              <h3>
                Fast Delivery
              </h3>

              <p>
                Get your furniture delivered safely
                and quickly to your doorstep.
              </p>

            </div>


            <div className="feature-card">

              <div className="feature-icon">
                <ShieldCheck size={27} />
              </div>

              <h3>
                Quality Guarantee
              </h3>

              <p>
                We carefully select quality furniture
                made to last for years.
              </p>

            </div>


            <div className="feature-card">

              <div className="feature-icon">
                <RotateCcw size={27} />
              </div>

              <h3>
                Easy Returns
              </h3>

              <p>
                Changed your mind? Our return process
                is simple and hassle-free.
              </p>

            </div>


            <div className="feature-card">

              <div className="feature-icon">
                <Headphones size={27} />
              </div>

              <h3>
                Friendly Support
              </h3>

              <p>
                Our team is always ready to help
                whenever you need us.
              </p>

            </div>

          </div>

        </section>


        {/* ================= CTA ================= */}

        <section className="categories-cta">

          <div>

            <span>
              CREATE YOUR PERFECT SPACE
            </span>

            <h2>
              Your home deserves
              <br />
              beautiful furniture.
            </h2>

            <p>
              Explore our complete collection and
              find pieces that fit your style.
            </p>

            <Link
              to="/shop"
              className="cta-button"
            >
              Start Shopping
              <ArrowRight size={18} />
            </Link>

          </div>

        </section>

      </div>

      <Footer />
    </>
  );
}

export default Categories;