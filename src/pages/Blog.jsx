import { Link } from "react-router-dom";
import styles from "./Blog.module.css";
import Navbar from "../components/Navbar.jsx";
import AnnouncementBar from "../components/AnnouncementBar.jsx";
import Footer from "../components/Footer.jsx";

const posts = [
  {
    id: 1,
    title: "How to Choose the Perfect Sofa for Your Living Room",
    category: "Living Room",
    date: "August 20, 2026",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=80",
    description:
      "Discover how to choose the right sofa based on your living room size, style, comfort, and everyday needs.",
  },
  {
    id: 2,
    title: "5 Simple Ways to Make Your Home Feel More Cozy",
    category: "Home Décor",
    date: "August 18, 2026",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=80",
    description:
      "Small changes in furniture, lighting, colors, and accessories can completely transform the feeling of your home.",
  },
  {
    id: 3,
    title: "Modern Furniture Trends You’ll Love",
    category: "Trends",
    date: "August 15, 2026",
    image:
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=900&q=80",
    description:
      "Explore some of the latest furniture and interior design trends that can give your home a fresh and modern look.",
  },
  {
    id: 4,
    title: "How to Create the Perfect Bedroom",
    category: "Bedroom",
    date: "August 12, 2026",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=80",
    description:
      "Learn how to choose bedroom furniture and arrange your space to create a comfortable and relaxing environment.",
  },
  {
    id: 5,
    title: "How to Take Care of Your Wooden Furniture",
    category: "Furniture Care",
    date: "August 10, 2026",
    image:
      "https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=900&q=80",
    description:
      "Follow these simple furniture care tips to keep your wooden pieces beautiful and in great condition for years.",
  },
  {
    id: 6,
    title: "Small Space? Here’s How to Choose the Right Furniture",
    category: "Interior Design",
    date: "August 8, 2026",
    image:
      "https://images.unsplash.com/photo-1617104678098-de229db51175?auto=format&fit=crop&w=900&q=80",
    description:
      "Make the most of a small home with smart furniture choices, practical layouts, and space-saving ideas.",
  },
];

function Blog() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <div className={styles.blogPage}>
        {/* Hero Section */}
        <section className={styles.blogHero}>
          <div className={styles.blogHeroContent}>
            <p className={styles.blogSubtitle}>OUR BLOG</p>

            <h1>
              Inspiration for
              <span> Beautiful Living</span>
            </h1>

            <p className={styles.blogIntro}>
              Discover furniture ideas, interior design inspiration, styling
              tips, and expert advice to help you create a home you love.
            </p>
          </div>
        </section>

        {/* Articles Section */}
        <section className={styles.blogSection}>
          <div className={styles.blogHeading}>
            <h2>Latest Articles</h2>

            <p>Inspiration, ideas, and tips for creating beautiful spaces.</p>
          </div>

          {/* Blog Cards */}
          <div className={styles.blogGrid}>
            {posts.map((post) => (
              <article className={styles.blogCard} key={post.id}>
                {/* Image */}
                <div className={styles.blogImage}>
                  <img src={post.image} alt={post.title} />
                </div>

                {/* Card Content */}
                <div className={styles.blogContent}>
                  <div className={styles.blogMeta}>
                    <span>{post.category}</span>

                    <span>{post.date}</span>
                  </div>

                  <h3>{post.title}</h3>

                  <p>{post.description}</p>

                  <Link to={`/blog/${post.id}`} className={styles.readMore}>
                    Read More →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default Blog;
