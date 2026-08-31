import { useEffect, useState } from "react";
import { ShoppingCart, ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";

import styles from "./FeaturedProducts.module.css";

import { useAuth } from "../AuthContext.jsx";

const products = [
  {
    id: 1,
    name: "Modern Sofa",
    price: 450,
    image: "/images/modernsofa.jpg",
  },
  {
    id: 2,
    name: "Nordic Chair",
    price: 180,
    image: "/images/nordic-chair.jpg",
  },
  {
    id: 3,
    name: "Wooden Table",
    price: 320,
    image: "/images/wooden-table.jpg",
  },
  {
    id: 4,
    name: "Lounge Chair",
    price: 250,
    image: "/images/lounge-chair.jpg",
  },
];

export default function FeaturedProducts() {
  // =====================================================
  // AUTH
  // =====================================================

  const { isLoggedIn } = useAuth();

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
  // MESSAGE
  // =====================================================

  const [message, setMessage] = useState("");

  // =====================================================
  // SAVE CART TO LOCAL STORAGE
  // =====================================================

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // =====================================================
  // SHOW MESSAGE
  // =====================================================

  const showMessage = (text) => {
    setMessage(text);

    setTimeout(() => {
      setMessage("");
    }, 2500);
  };

  // =====================================================
  // ADD TO CART
  // SAME LOGIC AS SHOP.JSX
  // =====================================================

  const addToCart = (product) => {
    // User is NOT logged in
    if (!isLoggedIn) {
      showMessage(
        "Please login first to add products to your cart."
      );
      return;
    }

    // User IS logged in
    setCart((prevCart) => {
      const existingProduct = prevCart.find(
        (item) => item.id === product.id
      );

      // Product already exists
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

      // New product
      return [
        ...prevCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    });

    // Success message
    showMessage(`${product.name} added to cart ✓`);
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <section className={styles.featured}>

      {/* MESSAGE */}

      {message && (
        <div className={styles.cartMessage}>
          {message}
        </div>
      )}

      <div className="container">

        {/* Section Header */}

        <div className={styles.header}>

          <div className={styles.headerContent}>

            <span className={styles.eyebrow}>
              OUR COLLECTION
            </span>

            <h2 className={styles.title}>
              Featured Products
            </h2>

            <p className={styles.description}>
              Discover our most popular furniture pieces.
            </p>

          </div>

          {/* React Router */}

          <Link
            to="/shop"
            className={styles.viewAll}
          >
            View All Products
            <ArrowRight size={18} />
          </Link>

        </div>

        {/* Products */}

        <div className={styles.productsGrid}>

          {products.map((product) => (

            <article
              className={styles.card}
              key={product.id}
            >

              {/* Product Image */}

              <div className={styles.imageWrapper}>

                <img
                  src={product.image}
                  alt={product.name}
                />

                {/* Add To Cart */}

                <button
                  type="button"
                  className={styles.cartButton}
                  aria-label={`Add ${product.name} to cart`}
                  onClick={() => addToCart(product)}
                >
                  <ShoppingCart size={18} />
                </button>

              </div>

              {/* Product Information */}

              <div className={styles.info}>

                <h3 className={styles.productName}>
                  {product.name}
                </h3>

                {/* Rating */}

                <div className={styles.rating}>

                  <div
                    className={styles.stars}
                    aria-label="5 out of 5 stars"
                  >
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        size={14}
                        fill="currentColor"
                      />
                    ))}
                  </div>

                  <span>5.0</span>

                </div>

                {/* Price */}

                <p className={styles.price}>
                  ${product.price}
                </p>

              </div>

            </article>

          ))}

        </div>

      </div>

    </section>
  );
}

