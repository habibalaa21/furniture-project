import { useState, useEffect } from "react";
import products from "../data/productData";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AnnouncementBar from "../components/AnnouncementBar.jsx";
import { useAuth } from "../AuthContext.jsx";
import { useNavigate } from "react-router-dom";

import "./Shop.css";

function Shop() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Popular");

  // ================= CART =================

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");

    return savedCart ? JSON.parse(savedCart) : [];
  });

  // ================= WISHLIST =================

  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("wishlist");

    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  // ================= MESSAGE =================

  const [message, setMessage] = useState("");

  const categories = [
    "All",
    "Living Room",
    "Bedroom",
    "Dining Room",
    "Office",
    "Outdoor",
  ];

  // ================= SAVE CART =================

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ================= SAVE WISHLIST =================

  useEffect(() => {
    localStorage.setItem(
      "wishlist",
      JSON.stringify(wishlist)
    );
  }, [wishlist]);

  // ================= FILTER PRODUCTS =================

  let filteredProducts = products.filter((product) => {
    const matchesCategory =
      category === "All" ||
      product.category === category;

    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // ================= SORT =================

  if (sort === "Low to High") {
    filteredProducts.sort(
      (a, b) => a.price - b.price
    );
  }

  if (sort === "High to Low") {
    filteredProducts.sort(
      (a, b) => b.price - a.price
    );
  }

  if (sort === "Rating") {
    filteredProducts.sort(
      (a, b) => b.rating - a.rating
    );
  }

  // =====================================================
  // ADD TO CART
  // =====================================================

  const addToCart = (product) => {

    // IMPORTANT:
    // User must login first

    if (!isLoggedIn) {
      setMessage("Please login first to add products to your cart.");

      setTimeout(() => {
        setMessage("");
      }, 3000);

      return;
    }

    // User is logged in
    setCart((prevCart) => {

      const existingProduct = prevCart.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {

        return prevCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );

      }

      return [
        ...prevCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    });

    setMessage(`${product.name} added to cart ✓`);

    setTimeout(() => {
      setMessage("");
    }, 2500);
  };

  // =====================================================
  // WISHLIST
  // =====================================================

  const toggleWishlist = (product) => {

    setWishlist((prevWishlist) => {

      const alreadyExists = prevWishlist.some(
        (item) => item.id === product.id
      );

      if (alreadyExists) {

        setMessage(
          `${product.name} removed from wishlist`
        );

        return prevWishlist.filter(
          (item) => item.id !== product.id
        );
      }

      setMessage(
        `${product.name} added to wishlist ♥`
      );

      return [...prevWishlist, product];
    });

    setTimeout(() => {
      setMessage("");
    }, 2500);
  };

  // =====================================================
  // CHECK WISHLIST
  // =====================================================

  const isInWishlist = (productId) => {
    return wishlist.some(
      (item) => item.id === productId
    );
  };

  return (
    <>
      <AnnouncementBar />

      <Navbar />

      {/* ================= MESSAGE ================= */}

      {message && (
        <div className="cart-message">
          {message}
        </div>
      )}

      <div className="shop-page">

        {/* ================= HERO ================= */}

        <section className="shop-hero">

          <div className="hero-content">

            <div className="breadcrumb">
              <span>Home</span>
              <i>/</i>
              <span>Shop</span>
            </div>

            <h1>
              Shop <span>Our Furniture</span>
            </h1>

            <p>
              Discover modern furniture designed to make
              your home beautiful and comfortable.
            </p>

          </div>

          <div className="hero-decoration">
            🪑
          </div>

        </section>

        {/* ================= CATEGORIES ================= */}

        <section className="categories">

          {categories.map((item) => (

            <button
              key={item}
              className={
                category === item ? "active" : ""
              }
              onClick={() => setCategory(item)}
            >
              {item}
            </button>

          ))}

        </section>

        {/* ================= SHOP CONTENT ================= */}

        <section className="shop-container">

          {/* ================= SIDEBAR ================= */}

          <aside className="filters">

            <div className="filter-title">
              <h3>Filters</h3>
              <span>☷</span>
            </div>

            {/* Category */}

            <div className="filter-section">

              <h4>Category</h4>

              {categories.slice(1).map((item) => (

                <label key={item}>

                  <input
                    type="radio"
                    name="category"
                    checked={category === item}
                    onChange={() =>
                      setCategory(item)
                    }
                  />

                  {item}

                </label>

              ))}

            </div>

            {/* Price */}

            <div className="filter-section">

              <h4>Price Range</h4>

              <label>
                <input
                  type="radio"
                  name="price"
                />
                $0 - $200
              </label>

              <label>
                <input
                  type="radio"
                  name="price"
                />
                $200 - $500
              </label>

              <label>
                <input
                  type="radio"
                  name="price"
                />
                $500 - $1000
              </label>

              <label>
                <input
                  type="radio"
                  name="price"
                />
                $1000+
              </label>

            </div>

            {/* Rating */}

            <div className="filter-section">

              <h4>Rating</h4>

              <label>
                <input
                  type="radio"
                  name="rating"
                />
                ⭐⭐⭐⭐⭐
              </label>

              <label>
                <input
                  type="radio"
                  name="rating"
                />
                ⭐⭐⭐⭐
              </label>

              <label>
                <input
                  type="radio"
                  name="rating"
                />
                ⭐⭐⭐
              </label>

            </div>

          </aside>

          {/* ================= PRODUCTS ================= */}

          <main className="products-area">

            <div className="shop-top">

              <div>

                <p>
                  Showing{" "}
                  <strong>
                    {filteredProducts.length}
                  </strong>{" "}
                  Products
                </p>

              </div>

              <div className="shop-actions">

                <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                />

                <select
                  value={sort}
                  onChange={(e) =>
                    setSort(e.target.value)
                  }
                >
                  <option>Popular</option>
                  <option>Low to High</option>
                  <option>High to Low</option>
                  <option>Rating</option>
                </select>

              </div>

            </div>

            {/* ================= PRODUCTS GRID ================= */}

            <div className="products-grid">

              {filteredProducts.map((product) => (

                <div
                  className="product-card"
                  key={product.id}
                >

                  {/* Product Image */}

                  <div className="product-image">

                    {product.discount && (
                      <span className="discount">
                        -{product.discount}%
                      </span>
                    )}

                    {/* Wishlist */}

                    <button
                      className={`wishlist ${
                        isInWishlist(product.id)
                          ? "wishlist-active"
                          : ""
                      }`}
                      onClick={() =>
                        toggleWishlist(product)
                      }
                      aria-label={
                        isInWishlist(product.id)
                          ? "Remove from wishlist"
                          : "Add to wishlist"
                      }
                    >
                      {isInWishlist(product.id)
                        ? "♥"
                        : "♡"}
                    </button>

                    <img
                      src={product.image}
                      alt={product.name}
                    />

                  </div>

                  {/* Product Info */}

                  <div className="product-info">

                    <span className="product-category">
                      {product.category}
                    </span>

                    <h3>
                      {product.name}
                    </h3>

                    {/* Rating */}

                    <div className="rating">

                      <span>
                        ★★★★★
                      </span>

                      <small>
                        {product.rating} (
                        {product.reviews})
                      </small>

                    </div>

                    {/* Price */}

                    <div className="price">

                      <strong>
                        ${product.price}
                      </strong>

                      {product.oldPrice && (
                        <del>
                          ${product.oldPrice}
                        </del>
                      )}

                    </div>

                    {/* Add To Cart */}

                    <button
                      className="cart-btn"
                      onClick={() =>
                        addToCart(product)
                      }
                    >
                      🛒 Add to Cart
                    </button>

                  </div>

                </div>

              ))}

            </div>

            {/* No Products */}

            {filteredProducts.length === 0 && (

              <div className="no-products">

                <h2>
                  No products found
                </h2>

                <p>
                  Try another search or category.
                </p>

              </div>

            )}

          </main>

        </section>

      </div>

      <Footer />
    </>
  );
}

export default Shop;