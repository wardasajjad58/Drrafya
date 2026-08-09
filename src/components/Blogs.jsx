import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import {
  Search,
  Clock,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Tag,
  CalendarDays,
  Sparkles,
  Mail,
} from "lucide-react";

const ease = [0.22, 1, 0.36, 1];

const CATS = [
  { name: "Reproductive Health", count: 12, emoji: "🌸" },
  { name: "Nutrition & Wellness", count: 8, emoji: "🥑" },
  { name: "Mental Wellbeing", count: 5, emoji: "🧠" },
  { name: "Pregnancy Journey", count: 15, emoji: "🤰" },
  { name: "Healthy Lifestyle", count: 7, emoji: "✨" },
];

const POSTS = [
  {
    id: 1,
    featured: true,
    category: "Reproductive Health",
    read: "6 min read",
    title: "Understanding PCOS: Beyond the Symptoms",
    excerpt:
      "PCOS is more than just irregular cycles. Learn about the metabolic and hormonal impact it has on your body and how to manage it holistically.",
    author: "Dr. Rafiya Zahir",
    date: "Oct 24, 2023",
    img:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 2,
    category: "Pregnancy Journey",
    read: "5 min read",
    title: "Nutrition Secrets for a Healthy Pregnancy",
    excerpt:
      "What you eat matters now more than ever. Discover the essential micronutrients every expecting mother needs for her baby’s…",
    author: "Dr. Rafiya Zahir",
    date: "Nov 12, 2023",
    img:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 3,
    category: "Mental Wellbeing",
    read: "4 min read",
    title: "Mastering the Art of Stress Management",
    excerpt:
      "Hormonal balance and stress are deeply linked. Explore practical techniques to keep your cortisol in check.",
    author: "Dr. Rafiya Zahir",
    date: "Dec 05, 2023",
    img:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 4,
    category: "Reproductive Health",
    read: "8 min read",
    title: "The Menopause Transition: What to Expect",
    excerpt:
      "Entering a new phase of life requires a new approach to health. Here is your guide to navigating the change with grace.",
    author: "Dr. Rafiya Zahir",
    date: "Jan 15, 2024",
    img:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 5,
    category: "Nutrition & Wellness",
    read: "5 min read",
    title: "Functional Foods for Hormonal Balance",
    excerpt:
      "How seeds, healthy fats, and specific greens can help regulate your endocrine system naturally.",
    author: "Dr. Rafiya Zahir",
    date: "Feb 10, 2024",
    img:
      "https://images.unsplash.com/photo-1461354464878-ad92f492a5a0?q=80&w=1600&auto=format&fit=crop",
  },
];

const pageWrap = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

function CatEmoji({ name }) {
  const found = CATS.find((c) => c.name === name);
  return (
    <span className="w-6 grid place-items-center text-[14px]">
      {found?.emoji ?? "🏷️"}
    </span>
  );
}

export default function Blogs() {
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState("All");
  const [page, setPage] = useState(1);

  // hover control (video jaisa: title/pills/arrow animate)
  const [hoverCard, setHoverCard] = useState(null);
  const [hoverFeatured, setHoverFeatured] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return POSTS.filter((p) => {
      const catOk = activeCat === "All" ? true : p.category === activeCat;
      const qOk =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      return catOk && qOk;
    });
  }, [query, activeCat]);

  const featured = filtered.find((p) => p.featured) || POSTS.find((p) => p.featured);
  const rest = filtered.filter((p) => p.id !== featured?.id);

  const PER = 4;
  const totalPages = Math.max(1, Math.ceil(rest.length / PER));
  const pageItems = rest.slice((page - 1) * PER, (page - 1) * PER + PER);

  return (
    <main className="bg-[#fbfbfd]">
      <div className="pt-8 md:pt-10" />

      <motion.section
        variants={pageWrap}
        initial="hidden"
        animate="show"
        className="containerX pb-14"
      >
        {/* HERO HEADING */}
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease }}
            className="text-[34px] md:text-[46px] font-black tracking-tight text-[#0b1020]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Expert Insights on{" "}
            <span className="text-[var(--rich-pink)]">Women&apos;s Wellness</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08, ease }}
            className="mt-3 text-[13px] md:text-[14px] text-black/55 max-w-2xl mx-auto"
          >
            Empowering your journey with clinical expertise, holistic wisdom, and compassionate
            guidance from Dr. Rafiya Zahir.
          </motion.p>
        </div>

        {/* GRID */}
        <div className="mt-10 grid lg:grid-cols-[1fr_360px] gap-8">
          {/* LEFT */}
          <div>
            {/* FEATURED */}
            {featured && (
              <motion.div
                onMouseEnter={() => setHoverFeatured(true)}
                onMouseLeave={() => setHoverFeatured(false)}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="rounded-[22px] bg-white border border-black/10 shadow-[0_18px_60px_rgba(0,0,0,0.08)] overflow-hidden"
                style={{
                  borderColor: hoverFeatured ? "rgba(236,72,153,0.30)" : "rgba(0,0,0,0.10)",
                  boxShadow: hoverFeatured
                    ? "0 22px 75px rgba(0,0,0,0.10)"
                    : "0 18px 60px rgba(0,0,0,0.08)",
                }}
              >
                <div className="grid md:grid-cols-[0.95fr_1.05fr]">
                  {/* image */}
                  <div className="relative h-[260px] md:h-[320px] overflow-hidden">
                    <motion.img
                      src={featured.img}
                      alt={featured.title}
                      className="h-full w-full object-cover"
                      animate={{ scale: hoverFeatured ? 1.05 : 1 }}
                      transition={{ duration: 0.45, ease }}
                    />
                    <span className="absolute left-5 top-5 rounded-full bg-[var(--rich-pink)] text-white text-[10px] font-extrabold px-3 py-1 tracking-[0.12em]">
                      FEATURED ARTICLE
                    </span>
                  </div>

                  {/* content */}
                  <div className="p-7 md:p-9">
                    <div className="flex items-center gap-3 text-[11px] font-semibold text-black/45">
                      <motion.span
                        className="inline-flex items-center gap-1.5 rounded-full px-3 py-1"
                        animate={{
                          backgroundColor: hoverFeatured ? "rgba(236,72,153,0.16)" : "rgba(236,72,153,0.10)",
                          color: "var(--rich-pink)",
                        }}
                        transition={{ duration: 0.25, ease }}
                      >
                        <Tag size={14} />
                        {featured.category}
                      </motion.span>

                      <span className="inline-flex items-center gap-1.5">
                        <Clock size={14} /> {featured.read}
                      </span>
                    </div>

                    <motion.h2
                      className="mt-5 text-[26px] md:text-[30px] leading-tight font-black"
                      style={{ fontFamily: "var(--font-display)" }}
                      animate={{
                        color: hoverFeatured ? "var(--rich-pink)" : "#0b1020",
                      }}
                      transition={{ duration: 0.25, ease }}
                    >
                      {featured.title}
                    </motion.h2>

                    <p className="mt-4 text-[13px] md:text-[14px] leading-relaxed text-black/55">
                      {featured.excerpt}
                    </p>

                    <div className="mt-6 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-black/10" />
                        <div>
                          <p className="text-[12px] font-extrabold text-[#0b1020]">
                            {featured.author}
                          </p>
                          <p className="text-[11px] font-semibold text-black/45">{featured.date}</p>
                        </div>
                      </div>

                      <motion.button
                        whileTap={{ scale: 0.98 }}
                        className="text-[12px] font-extrabold text-[var(--rich-pink)] inline-flex items-center gap-2"
                      >
                        


<Link to={`/blogs/${featured.id}`}>Read More</Link>


                        <motion.span
                          animate={{ x: hoverFeatured ? 4 : 0 }}
                          transition={{ duration: 0.2, ease }}
                        >
                          <ArrowRight size={16} />
                        </motion.span>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* CARDS GRID */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="mt-8 grid md:grid-cols-2 gap-6"
            >
              {pageItems.map((p) => {
                const isHover = hoverCard === p.id;

                return (
                  <motion.article
                    key={p.id}
                    variants={item}
                    onMouseEnter={() => setHoverCard(p.id)}
                    onMouseLeave={() => setHoverCard(null)}
                    whileHover={{ y: -7 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="group rounded-[18px] bg-white border border-black/10 overflow-hidden"
                    style={{
                      borderColor: isHover ? "rgba(236,72,153,0.28)" : "rgba(0,0,0,0.10)",
                      boxShadow: isHover
                        ? "0 20px 60px rgba(0,0,0,0.10)"
                        : "0 14px 45px rgba(0,0,0,0.06)",
                    }}
                  >
                    {/* image */}
                    <div className="relative h-[180px] overflow-hidden">
                      <motion.img
                        src={p.img}
                        alt={p.title}
                        className="h-full w-full object-cover"
                        animate={{ scale: isHover ? 1.07 : 1 }}
                        transition={{ duration: 0.5, ease }}
                      />

                      {/* subtle overlay on hover (video feel) */}
                      <motion.div
                        className="absolute inset-0"
                        animate={{
                          background:
                            isHover
                              ? "linear-gradient(to top, rgba(0,0,0,0.22), rgba(0,0,0,0.00))"
                              : "linear-gradient(to top, rgba(0,0,0,0.10), rgba(0,0,0,0.00))",
                        }}
                        transition={{ duration: 0.35, ease }}
                      />

                      {/* category pill */}
                      <motion.span
                        className="absolute left-4 top-4 rounded-full text-[10px] font-extrabold px-3 py-1 tracking-wide"
                        animate={{
                          backgroundColor: isHover ? "rgba(236,72,153,0.14)" : "rgba(255,255,255,0.92)",
                          color: isHover ? "var(--rich-pink)" : "var(--rich-pink)",
                        }}
                        transition={{ duration: 0.25, ease }}
                      >
                        {p.category.toUpperCase()}
                      </motion.span>
                    </div>

                    {/* content */}
                    <div className="p-6">
                      <div className="flex items-center gap-3 text-[11px] font-semibold text-black/40">
                        <span className="inline-flex items-center gap-1.5">
                          <CalendarDays size={14} /> {p.date}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Clock size={14} /> {p.read}
                        </span>
                      </div>

                      <motion.h3
                        className="mt-3 text-[16px] md:text-[17px] font-extrabold leading-snug"
                        style={{ fontFamily: "var(--font-display)" }}
                        animate={{ color: isHover ? "var(--rich-pink)" : "#0b1020" }}
                        transition={{ duration: 0.22, ease }}
                      >
                        {p.title}
                      </motion.h3>

                      <motion.p
                        className="mt-3 text-[12.5px] leading-relaxed"
                        animate={{ color: isHover ? "rgba(0,0,0,0.60)" : "rgba(0,0,0,0.55)" }}
                        transition={{ duration: 0.22, ease }}
                      >
                        {p.excerpt}
                      </motion.p>

                      <div className="mt-5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-black/10" />
                          <p className="text-[11.5px] font-extrabold text-black/70">{p.author}</p>
                        </div>

                        {/* arrow hover slide + stronger pink */}
                        <motion.span
                          className="font-extrabold text-[16px]"
                          animate={{
                            x: isHover ? 6 : 0,
                            opacity: isHover ? 1 : 0.7,
                            color: "var(--rich-pink)",
                          }}
                          transition={{ duration: 0.2, ease }}
                        >
                          →
                        </motion.span>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </motion.div>

            {/* Pagination */}
            <div className="mt-10 flex items-center justify-center gap-2">
              <motion.button
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setPage((v) => Math.max(1, v - 1))}
                className="h-10 w-10 rounded-xl border border-black/10 bg-white grid place-items-center hover:bg-black/5 transition"
              >
                <ChevronLeft size={18} />
              </motion.button>

              {Array.from({ length: totalPages }).slice(0, 3).map((_, idx) => {
                const n = idx + 1;
                const isActive = n === page;
                return (
                  <motion.button
                    key={n}
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setPage(n)}
                    className={`h-10 w-10 rounded-xl border transition font-extrabold text-[13px]
                      ${
                        isActive
                          ? "bg-[var(--rich-pink)] text-white border-[var(--rich-pink)]"
                          : "bg-white border-black/10 hover:bg-black/5"
                      }
                    `}
                  >
                    {n}
                  </motion.button>
                );
              })}

              <motion.button
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setPage((v) => Math.min(totalPages, v + 1))}
                className="h-10 w-10 rounded-xl border border-black/10 bg-white grid place-items-center hover:bg-black/5 transition"
              >
                <ChevronRight size={18} />
              </motion.button>

              <motion.button
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setPage((v) => Math.min(totalPages, v + 1))}
                className="ml-2 h-10 px-4 rounded-xl border border-black/10 bg-white font-extrabold text-[13px] hover:bg-black/5 transition"
              >
                Next
              </motion.button>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <aside className="space-y-6">
            {/* Search */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, ease }}
              className="rounded-[18px] bg-white border border-black/10 shadow-[0_14px_45px_rgba(0,0,0,0.06)] p-6"
            >
              <p className="font-extrabold text-[13px] text-[#0b1020] flex items-center gap-2">
                <Search size={16} className="text-[var(--rich-pink)]" /> Search Articles
              </p>

              <div className="mt-4">
                <input
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setPage(1);
                  }}
                  placeholder="Search keywords..."
                  className="w-full rounded-2xl bg-black/5 border border-black/10 px-4 py-3 text-[13px] outline-none focus:ring-2 focus:ring-[var(--rich-pink)]/25 transition"
                />
              </div>
            </motion.div>

            {/* Categories */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, delay: 0.04, ease }}
              className="rounded-[18px] bg-white border border-black/10 shadow-[0_14px_45px_rgba(0,0,0,0.06)] p-6"
            >
              <p className="font-extrabold text-[13px] text-[#0b1020] flex items-center gap-2">
                <Sparkles size={16} className="text-[var(--rich-pink)]" /> Categories
              </p>

              <div className="mt-4 space-y-2">
                <motion.button
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.18, ease }}
                  onClick={() => {
                    setActiveCat("All");
                    setPage(1);
                  }}
                  className={`w-full flex items-center justify-between rounded-xl px-3 py-2 transition
                    ${activeCat === "All" ? "bg-[var(--rich-pink)]/12 text-[var(--rich-pink)]" : "hover:bg-black/5"}
                  `}
                >
                  <span className="flex items-center gap-2 font-semibold text-[13px]">
                    <span className="w-6 grid place-items-center text-[14px]">🧾</span>
                    All
                  </span>
                  <span className="text-[11px] font-extrabold text-black/40">{POSTS.length}</span>
                </motion.button>

                {CATS.map((c) => (
                  <motion.button
                    key={c.name}
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.18, ease }}
                    onClick={() => {
                      setActiveCat(c.name);
                      setPage(1);
                    }}
                    className={`w-full flex items-center justify-between rounded-xl px-3 py-2 transition
                      ${activeCat === c.name ? "bg-[var(--rich-pink)]/12 text-[var(--rich-pink)]" : "hover:bg-black/5"}
                    `}
                  >
                    <span className="flex items-center gap-2 font-semibold text-[13px]">
                      <CatEmoji name={c.name} />
                      {c.name}
                    </span>
                    <span className="text-[11px] font-extrabold text-black/40">{c.count}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Popular Reading */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, delay: 0.08, ease }}
              className="rounded-[18px] bg-white border border-black/10 shadow-[0_14px_45px_rgba(0,0,0,0.06)] p-6"
            >
              <p className="font-extrabold text-[13px] text-[#0b1020]">Popular Reading</p>

              <div className="mt-4 space-y-3">
                {[POSTS[0], POSTS[1], POSTS[2]].map((p) => (
                  <motion.button
                    key={p.id}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.18, ease }}
                    className="w-full flex items-center gap-3 rounded-xl hover:bg-black/5 p-2 text-left transition"
                  >
                    <img src={p.img} alt={p.title} className="h-11 w-11 rounded-xl object-cover" />
                    <div className="min-w-0">
                      <p className="text-[12px] font-extrabold text-[#0b1020] truncate">
                        {p.title}
                      </p>
                      <p className="text-[10px] font-semibold text-black/45">{p.date}</p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Newsletter */}
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="rounded-[18px] bg-gradient-to-b from-[var(--rich-pink)] to-[#f06aa6] shadow-[0_24px_80px_rgba(242,139,182,0.35)] p-7 text-white"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-white/18 grid place-items-center">
                  <Mail size={18} />
                </div>
                <p className="text-[14px] font-extrabold">Weekly Wellness</p>
              </div>

              <p className="mt-2 text-[12px] text-white/85 leading-relaxed">
                Get expert health advice and holistic tips delivered to your inbox every Sunday.
              </p>

              <div className="mt-4 space-y-3">
                <input
                  placeholder="Your email address"
                  className="w-full rounded-2xl bg-white/20 border border-white/25 px-4 py-3 text-[12.5px] outline-none placeholder:text-white/70 focus:ring-2 focus:ring-white/30 transition"
                />
                <motion.button
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.18, ease }}
                  className="w-full rounded-2xl bg-white text-[var(--rich-pink)] font-extrabold py-3 text-[13px] hover:brightness-95 transition"
                >
                  Subscribe Now
                </motion.button>
              </div>
            </motion.div>
          </aside>
        </div>
      </motion.section>

      <div className="pb-10" />
    </main>
  );
}
