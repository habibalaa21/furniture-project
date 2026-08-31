import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";

import styles from "./FurnitureShowcase.module.css";

// عايز تزود قسم جديد؟ ضيف عنصر هنا بس، مش محتاج تلمس أي حاجة تانية في الكومبوننت
const rooms = [
  {
    title: "Living Room",
    count: "2,500+ Items",
    category: "Living Room",
    image: "/images/livingroom.jpg",
    alt: "Modern living room furniture set",
  },
  {
    title: "Bed Room",
    count: "1,500+ Items",
    category: "Bedroom",
    image: "/images/Bedroom.jpg",
    alt: "Modern bedroom furniture set",
  },
  {
    title: "Dining Room",
    count: "3,200+ Items",
    category: "Dining Room",
    image: "/images/diningroom.jpg",
    alt: "Modern dining room furniture set",
  },
  {
    title: "Office Room",
    count: "900+ Items",
    category: "Office",
    image: "/images/office-desk.jpeg",
    alt: "Modern office furniture set",
  },
];

export default function FurnitureShowcase() {
  const [index, setIndex] = useState(0);

  // IMPORTANT: initialize navigate
  const navigate = useNavigate();

  const total = rooms.length;

  const current = rooms[index];

  const upNext =
    rooms[(index + 1) % total];

  const goPrev = () =>
    setIndex(
      (i) => (i - 1 + total) % total
    );

  const goNext = () =>
    setIndex(
      (i) => (i + 1) % total
    );

  // Go to Shop with the selected category
  const handleCategoryClick = (
    category
  ) => {
    navigate(
      `/shop?category=${encodeURIComponent(
        category
      )}`
    );
  };

  return (
    <div className={styles.showcase}>
      <div
        className={styles.dots}
        aria-hidden="true"
      />

      {/* ================= MAIN CARD ================= */}

      <div className={styles.mainCard}>
        <div className={styles.imageWrap}>
          <img
            src={current.image}
            alt={current.alt}
            onClick={() =>
              handleCategoryClick(
                current.category
              )
            }
            className={styles.clickableImage}
          />

          <button
            className={styles.imageArrow}
            aria-label={`View ${current.title} collection`}
            onClick={() =>
              handleCategoryClick(
                current.category
              )
            }
          >
            <ArrowUpRight
              size={18}
              strokeWidth={2.5}
            />
          </button>
        </div>

        <div className={styles.caption}>
          <p
            className={
              styles.captionTitle
            }
          >
            {current.title}
          </p>

          <p
            className={
              styles.captionCount
            }
          >
            {current.count}
          </p>
        </div>
      </div>

      {/* ================= SECONDARY CARD ================= */}

      <div
        className={
          styles.secondaryCard
        }
      >
        <div className={styles.imageWrap}>
          <img
            src={upNext.image}
            alt={upNext.alt}
            onClick={() =>
              handleCategoryClick(
                upNext.category
              )
            }
            className={styles.clickableImage}
          />
        </div>

        <div className={styles.caption}>
          <p
            className={
              styles.captionTitle
            }
          >
            {upNext.title}
          </p>

          <p
            className={
              styles.captionCount
            }
          >
            {upNext.count}
          </p>
        </div>
      </div>

      {/* ================= CONTROLS ================= */}

      <div
        className={
          styles.floatingControls
        }
      >
        <button
          className={`${styles.navBtn} ${styles.navBtnGreen}`}
          aria-label="Previous item"
          onClick={goPrev}
        >
          <ArrowLeft
            size={20}
            strokeWidth={2.5}
          />
        </button>

        <button
          className={`${styles.navBtn} ${styles.navBtnYellow}`}
          aria-label="Next item"
          onClick={goNext}
        >
          <ArrowRight
            size={20}
            strokeWidth={2.5}
          />
        </button>
      </div>
    </div>
  );
}

