import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Blog", href: "/blog" },
];

export default function Navbar() {
  const navigate = useNavigate();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // ================= SEARCH =================

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  // ================= SCROLL =================

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // ================= MOBILE MENU =================

  useEffect(() => {
    document.body.style.overflow = isMenuOpen
      ? "hidden"
      : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // ================= SEARCH =================

  const handleSearch = (e) => {
    e.preventDefault();

    const value = searchText.trim();

    if (!value) {
      return;
    }

    // Send search value to Shop
    navigate(
      `/shop?search=${encodeURIComponent(value)}`
    );

    // Close search
    setIsSearchOpen(false);
  };

  return (
    <header
      className={`${styles.navbar} ${
        isScrolled ? styles.scrolled : ""
      }`}
    >
      <div className={`container ${styles.inner}`}>

        {/* ================= LOGO ================= */}

        <Link to="/" className={styles.logo}>
          <span
            className={styles.logoMark}
            aria-hidden="true"
          >
            <Sofa
              size={18}
              strokeWidth={2.5}
            />
          </span>

          FurniHome.
        </Link>

        {/* ================= DESKTOP NAV ================= */}

        <nav
          className={styles.navLinks}
          aria-label="Main navigation"
        >
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link to={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* ================= ACTIONS ================= */}

        <div className={styles.actions}>

          {/* SEARCH */}

          {isSearchOpen ? (
            <form
              className={styles.searchForm}
              onSubmit={handleSearch}
            >
              <input
                type="text"
                placeholder="Search products..."
                value={searchText}
                onChange={(e) =>
                  setSearchText(e.target.value)
                }
                autoFocus
              />

              <button
                type="button"
                className={styles.searchClose}
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchText("");
                }}
                aria-label="Close search"
              >
                <X size={18} />
              </button>
            </form>
          ) : (
            <button
              className={styles.iconBtn}
              aria-label="Search"
              type="button"
              onClick={() =>
                setIsSearchOpen(true)
              }
            >
              <Search
                size={20}
                strokeWidth={1.8}
              />
            </button>
          )}

          {/* CART */}

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

          {/* PROFILE */}

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

          {/* MOBILE MENU */}

          <button
            className={`${styles.iconBtn} ${styles.hamburger}`}
            aria-label={
              isMenuOpen
                ? "Close menu"
                : "Open menu"
            }
            aria-expanded={isMenuOpen}
            type="button"
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

      {/* ================= MOBILE DRAWER ================= */}

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
              <Link
                to={link.href}
                onClick={() =>
                  setIsMenuOpen(false)
                }
              >
                {link.label}
              </Link>
            </li>
          ))}

          {/* PROFILE */}

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