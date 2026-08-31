import { images } from "../data/images.js";
import CategoryCard from "./CategoryCard.jsx";
import styles from "./Categories.module.css";

const CATEGORIES = [
  { image: "/images/livingroom.jpg", title: "Living Room", itemCount: "2,500+ Items" },
  { image: "/images/Bedroom.jpg", title: "Bed Room", itemCount: "1,500+ Items" },
  { image: "/images/diningroom.jpg", title: "Dining Room", itemCount: "980+ Items" },
  { image: "/images/officeroom.jpg", title: "Home Office", itemCount: "720+ Items" },
];

export default function Categories() {
  return (
    <section id="categories" className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <div>
            <span className={styles.eyebrow}>Categories</span>
            <h2 className={styles.title}>Shop by Room</h2>
          </div>
          <p className={styles.description}>
            Browse our full collection organized by room, so you can find
            exactly the pieces your space needs.
          </p>
        </div>

        <div className={styles.grid}>
          {CATEGORIES.map((cat) => (
            <CategoryCard key={cat.title} {...cat} />
          ))}
        </div>
      </div>
    </section>
  );
}
