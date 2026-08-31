import styles from "./WhyChooseUs.module.css";

const features = [
  {
    icon: "🚚",
    title: "Fast Delivery",
    description: "Quick and reliable delivery right to your doorstep.",
  },
  {
    icon: "🔒",
    title: "Secure Payment",
    description: "Your payment information is always safe and protected.",
  },
  {
    icon: "⭐",
    title: "High Quality",
    description: "Carefully selected furniture made to last for years.",
  },
  {
    icon: "↩",
    title: "Easy Returns",
    description: "Simple and hassle-free returns whenever you need them.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <span className={styles.label}>WHY CHOOSE US</span>

        <h2>
          Why Choose <span>FurniHome.</span>
        </h2>

        <p>
          Everything you need for a comfortable and beautiful home.
        </p>
      </div>

      <div className={styles.features}>
        {features.map((feature, index) => (
          <div className={styles.featureCard} key={index}>
            <div className={styles.icon}>
              {feature.icon}
            </div>

            <h3>{feature.title}</h3>

            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;