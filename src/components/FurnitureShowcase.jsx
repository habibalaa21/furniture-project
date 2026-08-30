import { useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

import styles from "./FurnitureShowcase.module.css";

// عايز تزود قسم جديد؟ ضيف عنصر هنا بس، مش محتاج تلمس أي حاجة تانية في الكومبوننت
const rooms = [
  {
    title: "Living Room",
    count: "2,500+ Items",
    image: "/images/livingroom.jpg",
    alt: "Modern living room furniture set",
  },
  {
    title: "Bed Room",
    count: "1,500+ Items",
    image: "/images/Bedroom.jpg",
    alt: "Modern bedroom furniture set",
  },
  {
    title: "Dining Room",
    count: "3,200+ Items",
    image: "/images/diningroom.jpg",
    alt: "Modern dining room furniture set",
  },
  {
    title: "Table",
    count: "900+ Items",
    image: "/images/table.jpg",
    alt: "Modern table furniture set",
  },
];

export default function FurnitureShowcase() {
  const [index, setIndex] = useState(0);

  const total = rooms.length;
  const current = rooms[index];
  const upNext = rooms[(index + 1) % total];

  const goPrev = () => setIndex((i) => (i - 1 + total) % total);
  const goNext = () => setIndex((i) => (i + 1) % total);

  return (
    <div className={styles.showcase}>
      <div className={styles.dots} aria-hidden="true" />

      <div className={styles.mainCard}>
        <div className={styles.imageWrap}>
          <img src={current.image} alt={current.alt} />
          <button
            className={styles.imageArrow}
            aria-label={`View ${current.title} collection`}
          >
            <ArrowUpRight size={18} strokeWidth={2.5} />
          </button>
        </div>
        <div className={styles.caption}>
          <p className={styles.captionTitle}>{current.title}</p>
          <p className={styles.captionCount}>{current.count}</p>
        </div>
      </div>

      <div className={styles.secondaryCard}>
        <div className={styles.imageWrap}>
          <img src={upNext.image} alt={upNext.alt} />
        </div>
        <div className={styles.caption}>
          <p className={styles.captionTitle}>{upNext.title}</p>
          <p className={styles.captionCount}>{upNext.count}</p>
        </div>
      </div>

      <div className={styles.floatingControls}>
        <button
          className={`${styles.navBtn} ${styles.navBtnGreen}`}
          aria-label="Previous item"
          onClick={goPrev}
        >
          <ArrowLeft size={20} strokeWidth={2.5} />
        </button>
        <button
          className={`${styles.navBtn} ${styles.navBtnYellow}`}
          aria-label="Next item"
          onClick={goNext}
        >
          <ArrowRight size={20} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}
