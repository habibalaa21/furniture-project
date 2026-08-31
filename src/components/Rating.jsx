import { Plus } from "lucide-react";
import { images } from "../data/images.js";
import styles from "./Rating.module.css";

const AVATARS = [images.avatar1, images.avatar2, images.avatar3, images.avatar4, images.avatar5];

export default function Rating() {
  return (
    <div className={styles.rating}>
      <div className={styles.avatars}>
        {AVATARS.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Customer avatar ${i + 1}`}
            className={styles.avatar}
            style={{ zIndex: AVATARS.length - i }}
          />
        ))}
        <span className={styles.plusBadge} aria-hidden="true">
          <Plus size={14} strokeWidth={3} />
        </span>
      </div>

      <div className={styles.text}>
        <p className={styles.score}>4.9 Ratings+</p>
        <p className={styles.subtext}>Trusted by 50k+ Customers</p>
      </div>
    </div>
  );
}
