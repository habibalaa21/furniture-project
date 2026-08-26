import styles from "./CategoryCard.module.css";

export default function CategoryCard({ image, title, itemCount }) {
  return (
    <a href="#shop" className={styles.card}>
      <div className={styles.imageWrap}>
        <img src={image} alt={title} loading="lazy" />
      </div>
      <p className={styles.title}>{title}</p>
      <p className={styles.count}>{itemCount}</p>
    </a>
  );
}
