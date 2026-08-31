import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import products from "../data/productData";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AnnouncementBar from "../components/AnnouncementBar.jsx";

import { useAuth } from "../AuthContext.jsx";

import {
  Search,
  Heart,
  ShoppingCart,
  SlidersHorizontal,
  RotateCcw,
  X,
} from "lucide-react";

import "./Shop.css";

function Shop() {
  const { isLoggedIn } = useAuth();

  const [searchParams, setSearchParams] = useSearchParams();

  // =====================================================
  // CATEGORIES
  // =====================================================

  const categories = [
    "All",
    "Living Room",
    "Bedroom",
    "Dining Room",
    "Office",
    "Outdoor",
    "Kitchen",
    "Lighting",
    "Storage",
    "Decor",
    "Kids",
  ];

  // =====================================================
  // FILTER STATES
  // =====================================================

  const [category, setCategory] = useState(
    searchParams.get("category") || "All",
  );

  const [search, setSearch] = useState(searchParams.get("search") || "");

  const [sort, setSort] = useState("Popular");

  const [priceRange, setPriceRange] = useState("All");

  const [ratingFilter, setRatingFilter] = useState("All");

  const [discountOnly, setDiscountOnly] = useState(false);

  const [mobileFilters, setMobileFilters] = useState(false);

  // =====================================================
  // UPDATE FILTERS WHEN URL CHANGES
  // =====================================================

  useEffect(() => {
    const urlSearch = searchParams.get("search") || "";

    const urlCategory = searchParams.get("category") || "All";

    // Make sure category is valid
    const validCategory = categories.includes(urlCategory)
      ? urlCategory
      : "All";

    setSearch(urlSearch);
    setCategory(validCategory);
  }, [searchParams]);

  // =====================================================
  // CART
  // =====================================================

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");

    try {
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  // =====================================================
  // WISHLIST
  // =====================================================

  const [wishlist, setWishlist] = useState([]);
  const [wishlistOwner, setWishlistOwner] = useState(null);

  // =====================================================
  // MESSAGE
  // =====================================================

  const [message, setMessage] = useState("");

  // =====================================================
  // GET CURRENT USER
  // =====================================================

  const getCurrentUserEmail = () => {
    const savedUser = localStorage.getItem("furnitureUser");

    if (!savedUser) {
      return null;
    }

    try {
      const user = JSON.parse(savedUser);

      return user?.email || null;
    } catch {
      return null;
    }
  };

  // =====================================================
  // LOAD WISHLIST
  // =====================================================

  useEffect(() => {
    if (!isLoggedIn) {
      setWishlist([]);
      setWishlistOwner(null);
      return;
    }

    const email = getCurrentUserEmail();

    if (!email) {
      setWishlist([]);
      setWishlistOwner(null);
      return;
    }

    const wishlistKey = `wishlist_${email.toLowerCase()}`;

    const savedWishlist = localStorage.getItem(wishlistKey);

    if (!savedWishlist) {
      setWishlist([]);
    } else {
      try {
        setWishlist(JSON.parse(savedWishlist));
      } catch {
        setWishlist([]);
      }
    }

    setWishlistOwner(email.toLowerCase());
  }, [isLoggedIn]);

  // =====================================================
  // SAVE CART
  // =====================================================

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // =====================================================
  // SAVE WISHLIST
  // =====================================================

  useEffect(() => {
    if (!isLoggedIn || !wishlistOwner) {
      return;
    }

    const currentEmail = getCurrentUserEmail();

    if (!currentEmail || currentEmail.toLowerCase() !== wishlistOwner) {
      return;
    }

    const wishlistKey = `wishlist_${wishlistOwner}`;

    localStorage.setItem(wishlistKey, JSON.stringify(wishlist));
  }, [wishlist, wishlistOwner, isLoggedIn]);

  // =====================================================
  // FILTER PRODUCTS
  // =====================================================

  let filteredProducts = products.filter((product) => {
    const matchesCategory = category === "All" || product.category === category;

    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    let matchesPrice = true;

    if (priceRange === "under200") {
      matchesPrice = product.price < 200;
    }

    if (priceRange === "200-500") {
      matchesPrice = product.price >= 200 && product.price <= 500;
    }

    if (priceRange === "500-1000") {
      matchesPrice = product.price > 500 && product.price <= 1000;
    }

    if (priceRange === "1000+") {
      matchesPrice = product.price > 1000;
    }

    let matchesRating = true;

    if (ratingFilter !== "All") {
      matchesRating = product.rating >= Number(ratingFilter);
    }

    const matchesDiscount = !discountOnly || product.discount > 0;

    return (
      matchesCategory &&
      matchesSearch &&
      matchesPrice &&
      matchesRating &&
      matchesDiscount
    );
  });

  // =====================================================
  // SORT
  // =====================================================

  if (sort === "Low to High") {
    filteredProducts.sort((a, b) => a.price - b.price);
  }

  if (sort === "High to Low") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  if (sort === "Rating") {
    filteredProducts.sort((a, b) => b.rating - a.rating);
  }

  if (sort === "Discount") {
    filteredProducts.sort((a, b) => (b.discount || 0) - (a.discount || 0));
  }

  if (sort === "Newest") {
    filteredProducts.sort((a, b) => b.id - a.id);
  }

  // =====================================================
  // MESSAGE
  // =====================================================

  const showMessage = (text) => {
    setMessage(text);

    setTimeout(() => {
      setMessage("");
    }, 2500);
  };

  // =====================================================
  // CATEGORY CHANGE
  // =====================================================

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);

    const newParams = new URLSearchParams(searchParams);

    if (newCategory === "All") {
      newParams.delete("category");
    } else {
      newParams.set("category", newCategory);
    }

    setSearchParams(newParams);
  };

  // =====================================================
  // ADD TO CART
  // =====================================================

  const addToCart = (product) => {
    if (!isLoggedIn) {
      showMessage("Please login first to add products to your cart.");
      return;
    }

    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);

      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
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

    showMessage(`${product.name} added to cart ✓`);
  };

  // =====================================================
  // WISHLIST
  // =====================================================

  const toggleWishlist = (product) => {
    if (!isLoggedIn) {
      showMessage("Please login first to use your wishlist.");
      return;
    }

    const email = getCurrentUserEmail();

    if (!email) {
      showMessage("Please login first to use your wishlist.");
      return;
    }

    const normalizedEmail = email.toLowerCase();

    if (wishlistOwner && wishlistOwner !== normalizedEmail) {
      showMessage("Please refresh the page and try again.");
      return;
    }

    if (!wishlistOwner) {
      setWishlistOwner(normalizedEmail);
    }

    setWishlist((prevWishlist) => {
      const alreadyExists = prevWishlist.some((item) => item.id === product.id);

      if (alreadyExists) {
        showMessage(`${product.name} removed from wishlist`);

        return prevWishlist.filter((item) => item.id !== product.id);
      }

      showMessage(`${product.name} added to wishlist ♥`);

      return [...prevWishlist, product];
    });
  };

  // =====================================================
  // CHECK WISHLIST
  // =====================================================

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  // =====================================================
  // RESET FILTERS
  // =====================================================

  const resetFilters = () => {
    setCategory("All");
    setSearch("");
    setSort("Popular");
    setPriceRange("All");
    setRatingFilter("All");
    setDiscountOnly(false);

    // Remove search and category from URL
    setSearchParams({});
  };

  // =====================================================
  // SHOP SEARCH CHANGE
  // =====================================================

  const handleShopSearch = (e) => {
    const value = e.target.value;

    setSearch(value);

    const newParams = new URLSearchParams(searchParams);

    if (value.trim()) {
      newParams.set("search", value);
    } else {
      newParams.delete("search");
    }

    setSearchParams(newParams);
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <>
      <AnnouncementBar />

      <Navbar />

      {/* MESSAGE */}

      {message && <div className="cart-message">{message}</div>}

      <div className="shop-page">
        {/* HERO */}

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
              Discover modern furniture designed to make your home beautiful and
              comfortable.
            </p>
          </div>

          <div className="hero-circle">
            <img src="/images/shop-main.jpg" alt="Modern furniture" />
          </div>
        </section>

        {/* CATEGORIES */}

        <section className="categories">
          {categories.map((item) => (
            <button
              key={item}
              className={category === item ? "active" : ""}
              onClick={() => handleCategoryChange(item)}
            >
              {item}
            </button>
          ))}
        </section>

        {/* SHOP CONTAINER */}

        <section className="shop-container">
          {/* MOBILE FILTER */}

          <button
            className="mobile-filter-button"
            onClick={() => setMobileFilters(!mobileFilters)}
          >
            <SlidersHorizontal size={18} />
            Filters
          </button>

          {/* FILTERS */}

          <aside
            className={`filters ${mobileFilters ? "filters-mobile-open" : ""}`}
          >
            <div className="filter-title">
              <div>
                <SlidersHorizontal size={19} />

                <h3>Filters</h3>
              </div>

              <button onClick={resetFilters} className="reset-button">
                <RotateCcw size={15} />
                Reset
              </button>

              <button
                className="close-filters"
                onClick={() => setMobileFilters(false)}
              >
                <X size={20} />
              </button>
            </div>

            {/* CATEGORY */}

            <div className="filter-section">
              <h4>Category</h4>

              <label>
                <input
                  type="radio"
                  name="category"
                  checked={category === "All"}
                  onChange={() => handleCategoryChange("All")}
                />
                All Products
              </label>

              {categories.slice(1).map((item) => (
                <label key={item}>
                  <input
                    type="radio"
                    name="category"
                    checked={category === item}
                    onChange={() => handleCategoryChange(item)}
                  />

                  {item}
                </label>
              ))}
            </div>

            {/* PRICE */}

            <div className="filter-section">
              <h4>Price Range</h4>

              <label>
                <input
                  type="radio"
                  name="price"
                  checked={priceRange === "All"}
                  onChange={() => setPriceRange("All")}
                />
                All Prices
              </label>

              <label>
                <input
                  type="radio"
                  name="price"
                  checked={priceRange === "under200"}
                  onChange={() => setPriceRange("under200")}
                />
                Under $200
              </label>

              <label>
                <input
                  type="radio"
                  name="price"
                  checked={priceRange === "200-500"}
                  onChange={() => setPriceRange("200-500")}
                />
                $200 - $500
              </label>

              <label>
                <input
                  type="radio"
                  name="price"
                  checked={priceRange === "500-1000"}
                  onChange={() => setPriceRange("500-1000")}
                />
                $500 - $1000
              </label>

              <label>
                <input
                  type="radio"
                  name="price"
                  checked={priceRange === "1000+"}
                  onChange={() => setPriceRange("1000+")}
                />
                $1000+
              </label>
            </div>

            {/* RATING */}

            <div className="filter-section">
              <h4>Customer Rating</h4>

              {[5, 4, 3].map((rating) => (
                <label key={rating}>
                  <input
                    type="radio"
                    name="rating"
                    checked={ratingFilter === String(rating)}
                    onChange={() => setRatingFilter(String(rating))}
                  />

                  <span className="rating-filter">
                    <span className="stars">{"★".repeat(rating)}</span>

                    <span>{rating}.0+</span>
                  </span>
                </label>
              ))}

              <label>
                <input
                  type="radio"
                  name="rating"
                  checked={ratingFilter === "All"}
                  onChange={() => setRatingFilter("All")}
                />
                All Ratings
              </label>
            </div>

            {/* DISCOUNT */}

            <div className="filter-section">
              <h4>Special Offers</h4>

              <label className="discount-check">
                <input
                  type="checkbox"
                  checked={discountOnly}
                  onChange={(e) => setDiscountOnly(e.target.checked)}
                />

                <span>On Sale</span>
              </label>
            </div>
          </aside>

          {/* PRODUCTS */}

          <main className="products-area">
            {/* TOP */}

            <div className="shop-top">
              <div className="results">
                <p>
                  Showing <strong>{filteredProducts.length}</strong> of{" "}
                  <strong>{products.length}</strong> Products
                </p>
              </div>

              <div className="shop-actions">
                {/* SHOP SEARCH */}

                <div className="search-box">
                  <Search size={18} />

                  <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={handleShopSearch}
                  />

                  {search && (
                    <button
                      onClick={() => {
                        setSearch("");
                        const newParams = new URLSearchParams(searchParams);

                        newParams.delete("search");

                        setSearchParams(newParams);
                      }}
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>

                {/* SORT */}

                <select value={sort} onChange={(e) => setSort(e.target.value)}>
                  <option value="Popular">Popular</option>

                  <option value="Newest">Newest</option>

                  <option value="Low to High">Price: Low to High</option>

                  <option value="High to Low">Price: High to Low</option>

                  <option value="Rating">Highest Rated</option>

                  <option value="Discount">Biggest Discount</option>
                </select>
              </div>
            </div>

            {/* ACTIVE FILTERS */}

            {(category !== "All" ||
              priceRange !== "All" ||
              ratingFilter !== "All" ||
              discountOnly ||
              search) && (
              <div className="active-filters">
                <span>Active filters:</span>

                {category !== "All" && (
                  <button onClick={() => handleCategoryChange("All")}>
                    {category}

                    <X size={13} />
                  </button>
                )}

                {priceRange !== "All" && (
                  <button onClick={() => setPriceRange("All")}>
                    Price
                    <X size={13} />
                  </button>
                )}

                {ratingFilter !== "All" && (
                  <button onClick={() => setRatingFilter("All")}>
                    {ratingFilter}+ Stars
                    <X size={13} />
                  </button>
                )}

                {discountOnly && (
                  <button onClick={() => setDiscountOnly(false)}>
                    On Sale
                    <X size={13} />
                  </button>
                )}

                {search && (
                  <button
                    onClick={() => {
                      setSearch("");

                      const newParams = new URLSearchParams(searchParams);

                      newParams.delete("search");

                      setSearchParams(newParams);
                    }}
                  >
                    Search
                    <X size={13} />
                  </button>
                )}

                <button className="clear-all" onClick={resetFilters}>
                  Clear all
                </button>
              </div>
            )}

            {/* PRODUCTS GRID */}

            {filteredProducts.length > 0 ? (
              <div className="products-grid">
                {filteredProducts.map((product) => (
                  <div className="product-card" key={product.id}>
                    {/* IMAGE */}

                    <div className="product-image">
                      {product.discount > 0 && (
                        <span className="discount">-{product.discount}%</span>
                      )}

                      <button
                        className={`wishlist ${
                          isInWishlist(product.id) ? "wishlist-active" : ""
                        }`}
                        onClick={() => toggleWishlist(product)}
                        aria-label={
                          isInWishlist(product.id)
                            ? "Remove from wishlist"
                            : "Add to wishlist"
                        }
                      >
                        <Heart
                          size={20}
                          fill={
                            isInWishlist(product.id) ? "currentColor" : "none"
                          }
                        />
                      </button>

                      <img src={product.image} alt={product.name} />
                    </div>

                    {/* INFO */}

                    <div className="product-info">
                      <span className="product-category">
                        {product.category}
                      </span>

                      <h3>{product.name}</h3>

                      {/* RATING */}

                      <div className="rating">
                        <span>{"★".repeat(Math.round(product.rating))}</span>

                        <small>
                          {product.rating} ({product.reviews})
                        </small>
                      </div>

                      {/* PRICE */}

                      <div className="price">
                        <strong>${product.price}</strong>

                        {product.oldPrice && <del>${product.oldPrice}</del>}
                      </div>

                      {/* CART */}

                      <button
                        className="cart-btn"
                        onClick={() => addToCart(product)}
                      >
                        <ShoppingCart size={17} />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-products">
                <Search size={55} />

                <h2>No products found</h2>

                <p>Try changing your search or filters.</p>

                <button onClick={resetFilters}>Reset Filters</button>
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
