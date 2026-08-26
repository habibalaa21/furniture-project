import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { images } from "../data/images.js";
import styles from "./FurnitureShowcase.module.css";

export default function FurnitureShowcase() {
  return (
    <div className={styles.showcase}>
      <div className={styles.dots} aria-hidden="true" />

      <div className={styles.mainCard}>
        <div className={styles.imageWrap}>
          <img src={images.livingRoom} alt="Modern living room furniture set" />
          <button className={styles.imageArrow} aria-label="View living room collection">
            <ArrowUpRight size={18} strokeWidth={2.5} />
          </button>
        </div>
        <div className={styles.caption}>
          <p className={styles.captionTitle}>Living Room</p>
          <p className={styles.captionCount}>2,500+ Items</p>
        </div>
      </div>

      <div className={styles.secondaryCard}>
        <div className={styles.imageWrap}>
          <img src={images.bedroom} alt="Modern bedroom furniture set" />
        </div>
        <div className={styles.caption}>
          <p className={styles.captionTitle}>Bed Room</p>
          <p className={styles.captionCount}>1,500+ Items</p>
        </div>
      </div>

      <div className={styles.floatingControls}>
        <button className={`${styles.navBtn} ${styles.navBtnGreen}`} aria-label="Previous item">
          <ArrowLeft size={20} strokeWidth={2.5} />
        </button>
        <button className={`${styles.navBtn} ${styles.navBtnYellow}`} aria-label="Next item">
          <ArrowRight size={20} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}
