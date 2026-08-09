import { motion } from "framer-motion";
import { Clock, Calendar, ArrowRight } from "lucide-react";
import "./TrendingBlogs.css";

const blogsData = [
  {
    id: 1,
    title: "Understanding Hormonal Health & Wellness in Modern Life",
    snippet: "Discover key insights into managing hormonal balance, stress levels, and daily nutrition effectively.",
    category: "Wellness",
    date: "Aug 02, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop&q=80",
    href: "#",
  },
  {
    id: 2,
    title: "Essential Care Routine for Preconception Health",
    snippet: "A comprehensive guide on planning for pregnancy with multi-disciplinary health practices.",
    category: "Preconception",
    date: "Jul 28, 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600&auto=format&fit=crop&q=80",
    href: "#",
  },
  {
    id: 3,
    title: "Postpartum Recovery: Physical & Mental Wellbeing",
    snippet: "Explore evidence-based recovery strategies for mothers during the vital fourth trimester.",
    category: "Postpartum",
    date: "Jul 21, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1531983412531-1f49a365ffed?w=600&auto=format&fit=crop&q=80",
    href: "#",
  },
  {
    id: 4,
    title: "The Role of Nutrition in Reproductive Health",
    snippet: "How superfoods, micronutrients, and tailored diets impact long-term vitality.",
    category: "Nutrition",
    date: "Jul 15, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600&auto=format&fit=crop&q=80",
    href: "#",
  },
  {
    id: 5,
    title: "Debunking Common Myths About Infertility and IVF",
    snippet: "Dr. Rafiya Zahir breaks down popular misconceptions regarding modern fertility treatments.",
    category: "Fertility",
    date: "Jul 08, 2026",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&auto=format&fit=crop&q=80",
    href: "#",
  },
  {
    id: 6,
    title: "Mindfulness Strategies for Expectant Mothers",
    snippet: "Simple daily meditation practices designed to reduce stress during labor preparation.",
    category: "Pregnancy",
    date: "Jun 30, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&auto=format&fit=crop&q=80",
    href: "#",
  },
];

export default function TrendingBlogs() {
  return (
    <section className="trending-blogs-section">
      <div className="blogs-container">
        
        {/* SECTION HEADER */}
        <div className="blogs-header">
          <div>
            <span className="section-tag">Latest Medical Insights</span>
            <h2 className="blogs-title">Trending Healthcare Articles</h2>
            <p className="blogs-subtitle">
              Expertly curated reads on women's life stages, clinical advice, and wellness tips.
            </p>
          </div>

          <a href="#all-blogs" className="btn-view-all">
            <span>Explore All Articles</span>
            <ArrowRight size={18} />
          </a>
        </div>

        {/* 2 ROWS x 3 COLUMNS GRID */}
        <div className="blogs-grid">
          {blogsData.map((blog, index) => (
            <motion.a
              key={blog.id}
              href={blog.href}
              className="blog-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              {/* Image Box */}
              <div className="card-image-box">
                <img src={blog.image} alt={blog.title} className="card-img" />
                <span className="category-badge">{blog.category}</span>
              </div>

              {/* Card Body */}
              <div className="card-content">
                <div>
                  <div className="card-meta">
                    <div className="meta-item">
                      <Calendar size={14} />
                      <span>{blog.date}</span>
                    </div>
                    <span>•</span>
                    <div className="meta-item">
                      <Clock size={14} />
                      <span>{blog.readTime}</span>
                    </div>
                  </div>

                  <h3 className="blog-card-title">{blog.title}</h3>
                  <p className="blog-card-snippet">{blog.snippet}</p>
                </div>

                {/* Footer Link */}
                <div className="card-footer">
                  <span className="read-more-text">
                    Read Article <ArrowRight size={16} className="arrow-icon" />
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
}