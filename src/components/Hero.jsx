import { Home as HomeIcon } from "lucide-react";
import Button from "./Button.jsx";
import Rating from "./Rating.jsx";
import FurnitureShowcase from "./FurnitureShowcase.jsx";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section id="home" className={styles.hero}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.content}>
          <span className={styles.eyebrow}>
            <HomeIcon size={14} strokeWidth={2.5} aria-hidden="true" />
            The Best Online Furniture Store
          </span>

          <h1 className={styles.heading}>
            <span className={styles.dark}>Explore Our</span>
            <br />
            <span className={styles.green}>Modern</span>
            <br />
            <span className={styles.green}>Furniture Collection</span>
          </h1>

          <p className={styles.copy}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore.
          </p>

          <div className={styles.actions}>
            <Button variant="primary" withArrow as="a" href="#shop">
              Shop Now
            </Button>
            <Button variant="secondary" as="a" href="#shop">
              View All Products
            </Button>
          </div>

          <Rating />
        </div>

        <div className={styles.visual}>
          <FurnitureShowcase />
        </div>
      </div>
    </section>
  );
}
