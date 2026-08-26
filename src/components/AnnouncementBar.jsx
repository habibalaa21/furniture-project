import { Phone, Facebook, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import styles from "./AnnouncementBar.module.css";

export default function AnnouncementBar() {
  return (
    <div className={styles.bar}>
      <div className={`container ${styles.inner}`}>
        <a href="tel:+123456789" className={styles.callUs}>
          <Phone size={14} aria-hidden="true" />
          <span>Call Us: +123-456-789</span>
        </a>

        <p className={styles.promo}>
          Sign up and GET 25% OFF your first order.{" "}
          <Link to="/signup" className={styles.signupLink}>
            Sign up now
          </Link>
        </p>

        <ul className={styles.social} aria-label="Social media links">
          <li>
            <a href="#" aria-label="Facebook">
              <Facebook size={14} aria-hidden="true" />
            </a>
          </li>
          <li>
            <a href="#" aria-label="Instagram">
              <Instagram size={14} aria-hidden="true" />
            </a>
          </li>
          <li>
            <a href="#" aria-label="Twitter">
              <Twitter size={14} aria-hidden="true" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
