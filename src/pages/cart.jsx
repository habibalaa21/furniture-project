import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowLeft,
} from "lucide-react";

import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import AnnouncementBar from "../components/AnnouncementBar.jsx";

import { useAuth } from "../AuthContext.jsx";

import styles from "./Cart.module.css";

function Cart() {

  const navigate = useNavigate();

  const { isLoggedIn } = useAuth();

  // ================= CHECKOUT MESSAGE =================

  const [checkoutMessage, setCheckoutMessage] = useState(false);

  // ================= CART =================

  const [cart, setCart] = useState(() => {

    const savedCart = localStorage.getItem("cart");

    return savedCart
      ? JSON.parse(savedCart)
      : [];

  });

  // ================= SCROLL TOP =================

  useEffect(() => {

    window.scrollTo(0, 0);

  }, []);

  // ================= SAVE CART =================

  useEffect(() => {

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

  }, [cart]);

  // =====================================================
  // INCREASE QUANTITY
  // =====================================================

  const increaseQuantity = (id) => {

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );

  };

  // =====================================================
  // DECREASE QUANTITY
  // =====================================================

  const decreaseQuantity = (id) => {

    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter(
          (item) => item.quantity > 0
        )
    );

  };

  // =====================================================
  // REMOVE PRODUCT
  // =====================================================

  const removeFromCart = (id) => {

    setCart((prevCart) =>
      prevCart.filter(
        (item) => item.id !== id
      )
    );

  };

  // =====================================================
  // CLEAR CART
  // =====================================================

  const clearCart = () => {

    setCart([]);

  };

  // =====================================================
  // SUBTOTAL
  // =====================================================

  const subtotal = cart.reduce(
    (total, item) =>
      total +
      item.price * item.quantity,
    0
  );

  // =====================================================
  // SHIPPING
  // =====================================================

  const shipping =
    subtotal > 0
      ? 30
      : 0;

  // =====================================================
  // TOTAL
  // =====================================================

  const total =
    subtotal + shipping;

  // =====================================================
  // CHECKOUT
  // =====================================================

  const handleCheckout = () => {

    // User must login first

    if (!isLoggedIn) {

      setCheckoutMessage(true);

      setTimeout(() => {

        setCheckoutMessage(false);

        navigate("/login");

      }, 1500);

      return;
    }

    // Get current user

    const savedUser =
      localStorage.getItem(
        "furnitureUser"
      );

    if (!savedUser) {

      navigate("/login");

      return;
    }

    const user =
      JSON.parse(savedUser);

    // Get old orders for this user

    const ordersKey =
      `orders_${user.email}`;

    const savedOrders =
      localStorage.getItem(
        ordersKey
      );

    const orders = savedOrders
      ? JSON.parse(savedOrders)
      : [];

    // Create new order

    const newOrder = {

      id:
        Date.now(),

      date:
        new Date().toLocaleDateString(),

      items:
        [...cart],

      subtotal:
        subtotal,

      shipping:
        shipping,

      total:
        total,

      status:
        "Confirmed",

    };

    // Add new order

    orders.push(newOrder);

    // Save orders

    localStorage.setItem(
      ordersKey,
      JSON.stringify(orders)
    );

    // Clear cart

    setCart([]);

    // Show success

    setCheckoutMessage(true);

    setTimeout(() => {

      setCheckoutMessage(false);

      // Go to profile orders

      navigate("/profile");

    }, 1500);
  };

  return (
    <>
      <AnnouncementBar />

      <Navbar />

      <div className={styles["cart-page"]}>

        {/* ================= HERO ================= */}

        <section
          className={
            styles["cart-hero"]
          }
        >

          <div
            className={
              styles["cart-breadcrumb"]
            }
          >

            <Link to="/">
              Home
            </Link>

            <span>/</span>

            <span>
              Cart
            </span>

          </div>

          <h1>
            Your{" "}
            <span>
              Shopping Cart
            </span>
          </h1>

          <p>
            Review your items and
            complete your order.
          </p>

        </section>

        {/* ================= CART ================= */}

        <section
          className={
            styles["cart-container"]
          }
        >

          {cart.length === 0 ? (

            /* ================= EMPTY CART ================= */

            <div
              className={
                styles["empty-cart"]
              }
            >

              <ShoppingBag
                size={70}
              />

              <h2>
                Your Cart is Empty
              </h2>

              <p>
                Looks like you haven't
                added anything to your
                cart yet.
              </p>

              <Link
                to="/shop"
                className={
                  styles[
                    "continue-shopping"
                  ]
                }
              >

                <ArrowLeft
                  size={18}
                />

                Continue Shopping

              </Link>

            </div>

          ) : (

            /* ================= CART WITH PRODUCTS ================= */

            <div
              className={
                styles["cart-layout"]
              }
            >

              {/* ================= CART ITEMS ================= */}

              <div
                className={
                  styles["cart-items"]
                }
              >

                <div
                  className={
                    styles["cart-header"]
                  }
                >

                  <h2>
                    Shopping Cart
                  </h2>

                  <button
                    onClick={
                      clearCart
                    }
                    className={
                      styles[
                        "clear-cart"
                      ]
                    }
                  >
                    Clear Cart
                  </button>

                </div>

                {/* PRODUCTS */}

                {cart.map(
                  (item) => (

                    <div
                      className={
                        styles[
                          "cart-item"
                        ]
                      }
                      key={item.id}
                    >

                      {/* Image */}

                      <div
                        className={
                          styles[
                            "cart-image"
                          ]
                        }
                      >

                        <img
                          src={
                            item.image
                          }
                          alt={
                            item.name
                          }
                        />

                      </div>

                      {/* Information */}

                      <div
                        className={
                          styles[
                            "cart-info"
                          ]
                        }
                      >

                        <span>
                          {
                            item.category
                          }
                        </span>

                        <h3>
                          {
                            item.name
                          }
                        </h3>

                        <strong>
                          $
                          {
                            item.price
                          }
                        </strong>

                      </div>

                      {/* Quantity */}

                      <div
                        className={
                          styles[
                            "quantity"
                          ]
                        }
                      >

                        <button
                          onClick={() =>
                            decreaseQuantity(
                              item.id
                            )
                          }
                        >

                          <Minus
                            size={16}
                          />

                        </button>

                        <span>
                          {
                            item.quantity
                          }
                        </span>

                        <button
                          onClick={() =>
                            increaseQuantity(
                              item.id
                            )
                          }
                        >

                          <Plus
                            size={16}
                          />

                        </button>

                      </div>

                      {/* Item Total */}

                      <div
                        className={
                          styles[
                            "item-total"
                          ]
                        }
                      >

                        $
                        {(
                          item.price *
                          item.quantity
                        ).toFixed(2)}

                      </div>

                      {/* Remove */}

                      <button
                        className={
                          styles[
                            "remove-item"
                          ]
                        }
                        onClick={() =>
                          removeFromCart(
                            item.id
                          )
                        }
                      >

                        <Trash2
                          size={19}
                        />

                      </button>

                    </div>

                  )
                )}

                {/* Continue Shopping */}

                <Link
                  to="/shop"
                  className={
                    styles[
                      "continue-link"
                    ]
                  }
                >

                  <ArrowLeft
                    size={17}
                  />

                  Continue Shopping

                </Link>

              </div>

              {/* ================= ORDER SUMMARY ================= */}

              <aside
                className={
                  styles[
                    "cart-summary"
                  ]
                }
              >

                <h2>
                  Order Summary
                </h2>

                <div
                  className={
                    styles[
                      "summary-line"
                    ]
                  }
                >

                  <span>
                    Subtotal
                  </span>

                  <strong>
                    $
                    {subtotal.toFixed(
                      2
                    )}
                  </strong>

                </div>

                <div
                  className={
                    styles[
                      "summary-line"
                    ]
                  }
                >

                  <span>
                    Shipping
                  </span>

                  <strong>
                    $
                    {shipping.toFixed(
                      2
                    )}
                  </strong>

                </div>

                <div
                  className={
                    styles[
                      "summary-divider"
                    ]
                  }
                />

                <div
                  className={
                    styles[
                      "summary-total"
                    ]
                  }
                >

                  <span>
                    Total
                  </span>

                  <strong>
                    $
                    {total.toFixed(
                      2
                    )}
                  </strong>

                </div>

                {/* Checkout */}

                <button
                  className={
                    styles[
                      "checkout-btn"
                    ]
                  }
                  onClick={
                    handleCheckout
                  }
                >

                  Proceed to Checkout

                </button>

                {/* Message */}

                {checkoutMessage && (

                  <div
                    className={
                      styles[
                        "checkout-message"
                      ]
                    }
                  >

                    <span
                      className={
                        styles[
                          "success-icon"
                        ]
                      }
                    >
                      ✓
                    </span>

                    <div>

                      <strong>

                        {isLoggedIn
                          ? "Order Confirmed!"
                          : "Please Login First"}

                      </strong>

                      <p>

                        {isLoggedIn
                          ? "Your order has been placed successfully."
                          : "You need to login before completing your order."}

                      </p>

                    </div>

                  </div>

                )}

                <p
                  className={
                    styles[
                      "secure-text"
                    ]
                  }
                >
                  🔒 Secure checkout
                </p>

              </aside>

            </div>

          )}

        </section>

      </div>

      <Footer />

    </>
  );
}

export default Cart;