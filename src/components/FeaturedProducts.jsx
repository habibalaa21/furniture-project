import { ShoppingCart, ArrowRight, Star } from "lucide-react";
import styles from "./FeaturedProducts.module.css";
const products = [
  { id: 1, name: "Modern Sofa", price: 450, image: "/images/modernsofa.jpg" },
  {
    id: 2,
    name: "Nordic Chair",
    price: 180,
    image: "/images/nordic-chair.jpg",
  },
  {
    id: 3,
    name: "Wooden Table",
    price: 320,
    image: "/images/wooden-table.jpg",
  },
  {
    id: 4,
    name: "Lounge Chair",
    price: 250,
    image: "/images/lounge-chair.jpg",
  },
];
export default function FeaturedProducts() {
  return (
    <section className={styles.featured}>
      {" "}
      <div className="container">
        {" "}
        {/* Section Header */}{" "}
        <div className={styles.header}>
          {" "}
          <div className={styles.headerContent}>
            {" "}
            <span className={styles.eyebrow}> OUR COLLECTION </span>{" "}
            <h2 className={styles.title}> Featured Products </h2>{" "}
            <p className={styles.description}>
              {" "}
              Discover our most popular furniture pieces.{" "}
            </p>{" "}
          </div>{" "}
          <a href="/shop" className={styles.viewAll}>
            {" "}
            View All Products <ArrowRight size={18} />{" "}
          </a>{" "}
        </div>{" "}
        {/* Products */}{" "}
        <div className={styles.productsGrid}>
          {" "}
          {products.map((product) => (
            <article className={styles.card} key={product.id}>
              {" "}
              {/* Product Image */}{" "}
              <div className={styles.imageWrapper}>
                {" "}
                <img src={product.image} alt={product.name} />{" "}
                {/* Add To Cart */}{" "}
                <button
                  type="button"
                  className={styles.cartButton}
                  aria-label={`Add ${product.name} to cart`}
                >
                  {" "}
                  <ShoppingCart size={18} />{" "}
                </button>{" "}
              </div>{" "}
              {/* Product Information */}{" "}
              <div className={styles.info}>
                {" "}
                <h3 className={styles.productName}> {product.name} </h3>{" "}
                {/* Rating */}{" "}
                <div className={styles.rating}>
                  {" "}
                  <div className={styles.stars} aria-label="5 out of 5 stars">
                    {" "}
                    {[...Array(5)].map((_, index) => (
                      <Star key={index} size={14} fill="currentColor" />
                    ))}{" "}
                  </div>{" "}
                  <span>5.0</span>{" "}
                </div>{" "}
                {/* Price */}{" "}
                <p className={styles.price}> ${product.price} </p>{" "}
              </div>{" "}
            </article>
          ))}{" "}
        </div>{" "}
      </div>{" "}
    </section>
  );
}
