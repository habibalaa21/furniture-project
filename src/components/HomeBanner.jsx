import styles from "./HomeBanner.module.css";

const HomeBanner = () => {
  return (
    <section className={styles.homeBanner}>
      <div className={styles.overlay}></div>

      <div className={styles.content}>
        <span className={styles.label}>
          LIMITED TIME OFFER
        </span>

        <h2>25% OFF</h2>

        <h1>
          Upgrade Your Home
          <br />
          Today
        </h1>

        <p>
          Discover our latest furniture collection.
        </p>

        <button className={styles.shopButton}>
          Shop Now <span>→</span>
        </button>
      </div>
    </section>
  );
};

export default HomeBanner;