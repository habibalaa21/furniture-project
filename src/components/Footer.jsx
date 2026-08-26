
import {
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>

      <div className={styles.container}>

        {/* Brand */}
        <div className={styles.column}>
          <h2 className={styles.logo}>Furniture.</h2>

          <p>
            Modern furniture designed to make your home
            beautiful, comfortable, and unique.
          </p>

          <div className={styles.socials}>
            <a href="#"><Instagram size={19} /></a>
            <a href="#"><Facebook size={19} /></a>
            <a href="#"><Twitter size={19} /></a>
            <a href="#"><Youtube size={19} /></a>
          </div>
        </div>


        {/* Quick Links */}
        <div className={styles.column}>
          <h3>Quick Links</h3>

          <a href="/">Home</a>
          <a href="/shop">Shop</a>
          <a href="#categories">Categories</a>
          <a href="#about">About Us</a>
          <a href="#contact">Contact Us</a>
        </div>


        {/* Customer Service */}
        <div className={styles.column}>
          <h3>Customer Service</h3>

          <a href="#">FAQs</a>
          <a href="#">Shipping & Delivery</a>
          <a href="#">Returns & Refunds</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms & Conditions</a>
        </div>


        {/* Contact */}
        <div className={styles.column}>
          <h3>Contact Us</h3>

          <div className={styles.contact}>
            <MapPin size={18} />
            <span>Cairo, Egypt</span>
          </div>

          <div className={styles.contact}>
            <Phone size={18} />
            <span>+20 100 000 0000</span>
          </div>

          <div className={styles.contact}>
            <Mail size={18} />
            <span>info@furniture.com</span>
          </div>
        </div>

      </div>


      <div className={styles.bottom}>
        <p>
          © 2026 Furniture. All Rights Reserved.
        </p>
      </div>

    </footer>
  );
}

