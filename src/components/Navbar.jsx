import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  Sofa,
} from "lucide-react";
import styles from "./Navbar.module.css";

const NAV_LINKS = [
  { label: "Home", href: "/home" },
  { label: "Shop", href: "/shop" },
  { label: "Categories", href: "/categories" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Blog", href: "#blog" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header
      className={`${styles.navbar} ${
        isScrolled ? styles.scrolled : ""
      }`}
    >
      <div className={`container ${styles.inner}`}>

        {/* Logo */}
        <a href="#home" className={styles.logo}>
          <span
            className={styles.logoMark}
            aria-hidden="true"
          >
            <Sofa size={18} strokeWidth={2.5} />
          </span>

          Furniture.
        </a>

        {/* Desktop Navigation */}
        <nav
          className={styles.navLinks}
          aria-label="Main navigation"
        >
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                {link.label === "Shop" ? (
                  <Link to="/shop">Shop</Link>
                ) : link.label === "About Us" ? (
                  <Link to="/about">About Us</Link>
                ) : (
                  <a href={link.href}>{link.label}</a>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Actions */}
        <div className={styles.actions}>

          {/* Search */}
          <button
            className={styles.iconBtn}
            aria-label="Search"
          >
            <Search
              size={20}
              strokeWidth={1.8}
            />
          </button>

          {/* Shopping Cart */}
         <Link
  to="/cart"
  className={styles.iconBtn}
  aria-label="Shopping cart"
>
  <ShoppingCart
    size={20}
    strokeWidth={1.8}
  />
</Link>
          {/* Profile */}
          <Link
            to="/profile"
            className={styles.iconBtn}
            aria-label="Account"
          >
            <User
              size={20}
              strokeWidth={1.8}
            />
          </Link>

          {/* Mobile Menu */}
          <button
            className={`${styles.iconBtn} ${styles.hamburger}`}
            aria-label={
              isMenuOpen
                ? "Close menu"
                : "Open menu"
            }
            aria-expanded={isMenuOpen}
            onClick={() =>
              setIsMenuOpen((open) => !open)
            }
          >
            {isMenuOpen ? (
              <X size={22} />
            ) : (
              <Menu size={22} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`${styles.drawer} ${
          isMenuOpen
            ? styles.drawerOpen
            : ""
        }`}
      >
        <ul>
          {NAV_LINKS.map((link) => (
            <li key={link.label}>

              {link.label === "Shop" ? (
                <Link
                  to="/shop"
                  onClick={() =>
                    setIsMenuOpen(false)
                  }
                >
                  Shop
                </Link>
              ) : link.label === "About Us" ? (
                <Link
                  to="/about"
                  onClick={() =>
                    setIsMenuOpen(false)
                  }
                >
                  About Us
                </Link>
              ) : (
                <a
                  href={link.href}
                  onClick={() =>
                    setIsMenuOpen(false)
                  }
                >
                  {link.label}
                </a>
              )}

            </li>
          ))}

          {/* Profile in Mobile Menu */}
          <li>
            <Link
              to="/profile"
              onClick={() =>
                setIsMenuOpen(false)
              }
            >
              Profile
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}