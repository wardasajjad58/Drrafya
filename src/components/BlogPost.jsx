import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import {
  CalendarDays,
  Clock3,
  Search,
  Share2,
  Bookmark,
  Heart,
  MessageSquare,
  Send,
  ArrowLeft,
  TrendingUp,
  Mail,
  User,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const ease = [0.22, 1, 0.36, 1];

const BLOGS = [
  {
    slug: "understanding-pcos-beyond-the-symptoms",
    category: "Reproductive Health",
    title: "Understanding PCOS: Beyond the Symptoms",
   
    cover:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop",
    author: { name: "Dr. Rafiya Zahir", role: "Women’s Health Specialist" },
    date: "Oct 24, 2023",
    readTime: "6 min read",
    likes: "1.2k",
    comments: 48,
    tags: ["#PCOS", "#Hormones", "#Wellness", "#Guide"],
    popular: [
      {
        title: "Functional Foods for Hormonal Balance",
        date: "Feb 10, 2024",
        img:
          "https://images.unsplash.com/photo-1461354464878-ad92f492a5a0?q=80&w=400&auto=format&fit=crop",
        slug: "functional-foods-for-hormonal-balance",
      },
      {
        title: "Mastering the Art of Stress Management",
        date: "Dec 05, 2023",
        img:
          "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=400&auto=format&fit=crop",
        slug: "mastering-the-art-of-stress-management",
      },
      {
        title: "The Menopause Transition: What to Expect",
        date: "Jan 15, 2024",
        img:
          "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=400&auto=format&fit=crop",
        slug: "the-menopause-transition-what-to-expect",
      },
    ],
    categories: [
      { emoji: "🌸", name: "Reproductive Health", count: 12 },
      { emoji: "🥑", name: "Nutrition & Wellness", count: 8 },
      { emoji: "🧠", name: "Mental Wellbeing", count: 5 },
      { emoji: "🤰", name: "Pregnancy Journey", count: 15 },
      { emoji: "✨", name: "Healthy Lifestyle", count: 7 },
    ],
    content: [
      {
        type: "p",
        text:
          "PCOS is not just about irregular periods. It can affect metabolism, mood, skin, weight, fertility, and long-term cardiovascular health.",
      },
      {
        type: "p",
        text:
          "The key is understanding your symptoms, your lab patterns, and then creating a sustainable plan—nutrition, movement, sleep, and stress support.",
      },
      { type: "h2", text: "What’s happening in the body?" },
      {
        type: "p",
        text:
          "Many people with PCOS have insulin resistance. This can drive higher androgen levels, which may worsen acne, hair changes, and cycle irregularity.",
      },
      { type: "h2", text: "A simple plan you can start today" },
      {
        type: "tips",
        items: [
          { title: "Protein-first breakfast", desc: "Stabilize glucose and reduce cravings." },
          { title: "Walk after meals", desc: "10–15 minutes improves insulin sensitivity." },
          { title: "Sleep schedule", desc: "Consistent bedtime supports hormone rhythm." },
        ],
      },
    ],
    existingComments: [
      {
        id: "c1",
        name: "Sarah Jenkins",
        time: "2 hours ago",
        text:
          "This article was so eye-opening. I’ve been struggling with PCOS for years and never looked at the insulin resistance aspect this way.",
        helpful: 2,
      },
      {
        id: "c2",
        name: "Elena Rodriguez",
        time: "5 hours ago",
        text:
          "Dr. Rafiya, thank you for this holistic view. It makes the journey feel much less overwhelming.",
        helpful: 2,
      },
      {
        id: "c3",
        name: "Ayesha K.",
        time: "1 day ago",
        text: "The post-meal walk tip is gold. Please write a follow-up on supplements!",
        helpful: 6,
      },
      {
        id: "c4",
        name: "Hina R.",
        time: "3 days ago",
        text: "Love the practical approach. Saved this to share with friends.",
        helpful: 9,
      },
      {
        id: "c5",
        name: "Sara M.",
        time: "1 week ago",
        text: "Clear, kind, and actionable. Exactly what I needed.",
        helpful: 4,
      },
    ],
  },

  {
    slug: "nutrition-secrets-for-a-healthy-pregnancy",
    category: "Pregnancy Journey",
    title: "Nutrition Secrets for a Healthy Pregnancy",
    subtitle:
      "Evidence-based micronutrients and simple habits that support baby’s growth—without perfectionism.",
    cover:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1600&auto=format&fit=crop",
    author: { name: "Dr. Rafiya Zahir", role: "Women’s Health Specialist" },
    date: "Nov 12, 2023",
    readTime: "5 min read",
    likes: "980",
    comments: 31,
    tags: ["#Pregnancy", "#Nutrition", "#Micronutrients", "#Guide"],
    popular: [],
    categories: [
      { emoji: "🌸", name: "Reproductive Health", count: 12 },
      { emoji: "🥑", name: "Nutrition & Wellness", count: 8 },
      { emoji: "🧠", name: "Mental Wellbeing", count: 5 },
      { emoji: "🤰", name: "Pregnancy Journey", count: 15 },
      { emoji: "✨", name: "Healthy Lifestyle", count: 7 },
    ],
    content: [
      { type: "p", text: "Your baby’s growth depends on consistent micronutrients—not perfect eating." },
      { type: "h2", text: "Top micronutrients" },
      {
        type: "tips",
        items: [
          { title: "Folate", desc: "Supports neural tube development." },
          { title: "Iron", desc: "Prevents anemia and supports placenta." },
          { title: "Omega-3", desc: "Important for baby’s brain development." },
        ],
      },
    ],
    existingComments: [
      { id: "p1", name: "Noor", time: "Yesterday", text: "So clear and simple. Thank you!", helpful: 3 },
      { id: "p2", name: "Maham", time: "4 days ago", text: "Loved the micronutrient list.", helpful: 5 },
    ],
  },

  {
    slug: "mastering-the-art-of-stress-management",
    category: "Mental Wellbeing",
    title: "Mastering the Art of Stress Management",
    subtitle:
      "Quick resets and long-term habits to calm the nervous system and protect your energy.",
    cover:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1600&auto=format&fit=crop",
    author: { name: "Dr. Rafiya Zahir", role: "Women’s Health Specialist" },
    date: "Dec 05, 2023",
    readTime: "4 min read",
    likes: "760",
    comments: 19,
    tags: ["#Stress", "#Cortisol", "#Mindfulness", "#Reset"],
    popular: [],
    categories: [
      { emoji: "🌸", name: "Reproductive Health", count: 12 },
      { emoji: "🥑", name: "Nutrition & Wellness", count: 8 },
      { emoji: "🧠", name: "Mental Wellbeing", count: 5 },
      { emoji: "🤰", name: "Pregnancy Journey", count: 15 },
      { emoji: "✨", name: "Healthy Lifestyle", count: 7 },
    ],
    content: [
      { type: "p", text: "Stress isn’t only mental—your body experiences it as chemistry." },
      { type: "h2", text: "Quick resets" },
      {
        type: "tips",
        items: [
          { title: "Physiological sigh", desc: "Two inhales + long exhale. Repeat 3 times." },
          { title: "Screen breaks", desc: "60 seconds away from phone every hour." },
          { title: "Evening wind-down", desc: "Dim lights, warm shower, calm breathing." },
        ],
      },
    ],
    existingComments: [
      { id: "s1", name: "Urooj", time: "2 days ago", text: "Physiological sigh works instantly.", helpful: 8 },
      { id: "s2", name: "Aliya", time: "1 week ago", text: "Saved. Needed this reminder.", helpful: 2 },
    ],
  },

  {
    slug: "the-menopause-transition-what-to-expect",
    category: "Reproductive Health",
    title: "The Menopause Transition: What to Expect",
    subtitle:
      "Symptoms, timelines, and supportive pillars that help you feel steady through change.",
    cover:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1600&auto=format&fit=crop",
    author: { name: "Dr. Rafiya Zahir", role: "Women’s Health Specialist" },
    date: "Jan 15, 2024",
    readTime: "8 min read",
    likes: "1.1k",
    comments: 42,
    tags: ["#Menopause", "#Health", "#Guidance", "#Wellness"],
    popular: [],
    categories: [
      { emoji: "🌸", name: "Reproductive Health", count: 12 },
      { emoji: "🥑", name: "Nutrition & Wellness", count: 8 },
      { emoji: "🧠", name: "Mental Wellbeing", count: 5 },
      { emoji: "🤰", name: "Pregnancy Journey", count: 15 },
      { emoji: "✨", name: "Healthy Lifestyle", count: 7 },
    ],
    content: [
      { type: "p", text: "Hot flashes, sleep issues, and mood changes are common—and manageable." },
      { type: "h2", text: "Support pillars" },
      {
        type: "tips",
        items: [
          { title: "Protein + strength training", desc: "Protect muscle and metabolism." },
          { title: "Sleep routine", desc: "Cooling, consistent timing." },
          { title: "Check labs", desc: "Work with a clinician on symptoms & risk." },
        ],
      },
    ],
    existingComments: [
      { id: "m1", name: "Shazia", time: "3 days ago", text: "Finally something practical.", helpful: 7 },
      { id: "m2", name: "Kiran", time: "2 weeks ago", text: "Strength training note was gold.", helpful: 4 },
    ],
  },

  {
    slug: "functional-foods-for-hormonal-balance",
    category: "Nutrition & Wellness",
    title: "Functional Foods for Hormonal Balance",
    subtitle:
      "Food-as-medicine swaps for stable blood sugar, gut support, and better energy.",
    cover:
      "https://images.unsplash.com/photo-1461354464878-ad92f492a5a0?q=80&w=1600&auto=format&fit=crop",
    author: { name: "Dr. Rafiya Zahir", role: "Women’s Health Specialist" },
    date: "Feb 10, 2024",
    readTime: "5 min read",
    likes: "890",
    comments: 27,
    tags: ["#Nutrition", "#Hormones", "#FoodAsMedicine", "#Balance"],
    popular: [],
    categories: [
      { emoji: "🌸", name: "Reproductive Health", count: 12 },
      { emoji: "🥑", name: "Nutrition & Wellness", count: 8 },
      { emoji: "🧠", name: "Mental Wellbeing", count: 5 },
      { emoji: "🤰", name: "Pregnancy Journey", count: 15 },
      { emoji: "✨", name: "Healthy Lifestyle", count: 7 },
    ],
    content: [
      { type: "p", text: "Hormonal balance starts with stable blood sugar, gut support, and smart fats." },
      { type: "h2", text: "Easy swaps" },
      {
        type: "tips",
        items: [
          { title: "Seeds daily", desc: "Flax + chia for fiber and hormone metabolism." },
          { title: "Greens", desc: "Support estrogen detox pathways." },
          { title: "Healthy fats", desc: "Olive oil, nuts, avocado for satiety." },
        ],
      },
    ],
    existingComments: [
      { id: "f1", name: "Sana", time: "2 days ago", text: "Started flax today!", helpful: 3 },
      { id: "f2", name: "Iqra", time: "6 days ago", text: "More meal ideas please!", helpful: 5 },
    ],
  },
];

function FillIconButton({ title, children, onClick }) {
  return (
    <motion.button
      type="button"
      title={title}
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.18, ease }}
      className="group h-10 w-10 rounded-xl border border-black/10 bg-black/5 grid place-items-center
                 hover:bg-[var(--rich-pink)] hover:border-[var(--rich-pink)] transition"
    >
      <span className="text-black/55 group-hover:text-white transition">{children}</span>
    </motion.button>
  );
}

export default function BlogPost() {
  const { slug } = useParams();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 160, damping: 26 });

  const post = useMemo(() => BLOGS.find((b) => b.slug === slug) || BLOGS[0], [slug]);

  // COMMENTS (professional list + pagination like your images)
  const [allComments, setAllComments] = useState(post.existingComments || []);
  const [commentText, setCommentText] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 3;

  useEffect(() => {
    setAllComments(post.existingComments || []);
    setCommentText("");
    setPage(1);
  }, [post.slug]);

  const totalPages = Math.max(1, Math.ceil(allComments.length / perPage));
  const safePage = Math.min(page, totalPages);
  const paged = allComments.slice((safePage - 1) * perPage, safePage * perPage);

  const postComment = () => {
    const t = commentText.trim();
    if (!t) return;
    const item = { id: `new-${Date.now()}`, name: "You", time: "Just now", text: t, helpful: 0 };
    setAllComments((prev) => [item, ...prev]);
    setCommentText("");
    setPage(1);
  };

  const helpful = (id) => {
    setAllComments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, helpful: (c.helpful || 0) + 1 } : c))
    );
  };

  // SIDEBAR helpers
  const [q, setQ] = useState("");
  const popularList = useMemo(() => {
    const base = post.popular?.length
      ? post.popular
      : BLOGS.slice(0, 3).map((b) => ({ title: b.title, date: b.date, img: b.cover, slug: b.slug }));

    if (!q.trim()) return base;

    const query = q.toLowerCase();
    return BLOGS.filter(
      (b) =>
        b.title.toLowerCase().includes(query) ||
        b.category.toLowerCase().includes(query) ||
        b.tags?.some((t) => t.toLowerCase().includes(query))
    ).slice(0, 5).map((b) => ({ title: b.title, date: b.date, img: b.cover, slug: b.slug }));
  }, [post, q]);

  return (
    <div className="bg-[#fbfbfd]">
      <motion.div
        style={{ scaleX: progress, transformOrigin: "0% 50%" }}
        className="fixed left-0 top-0 z-[9999] h-[3px] w-full bg-[var(--rich-pink)]"
      />

      <div className="mx-auto max-w-[1200px] px-4 py-10">
        {/* TOP HEADING (Expert Insights) */}
        <motion.div
          initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.45, ease }}
          className="text-center mb-10"
        >
          <h2 className="text-[30px] sm:text-[44px] font-extrabold text-[#14182b] leading-[1.05]">
            Expert Insights on{" "}
            <span className="text-[var(--rich-pink)]">Women's Wellness</span>
          </h2>

          <p className="mt-3 text-[14px] sm:text-[16px] font-semibold text-black/45 leading-7 max-w-[860px] mx-auto">
            Empowering your journey with clinical expertise, holistic wisdom, and compassionate guidance.
          </p>
          <p className="text-[14px] sm:text-[16px] font-semibold text-black/45 leading-7 max-w-[860px] mx-auto">
            Curated by Dr. Rafiya Zahir to help you feel informed, steady, and supported.
          </p>
        </motion.div>

        {/* Top bar */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 text-[13px] font-extrabold text-black/70 hover:text-black transition"
          >
            <ArrowLeft size={16} />
            Back to Blogs
          </Link>

          <div className="text-[12px] font-semibold text-black/40">
            Home / Blogs / <span className="text-black/70">{post.category}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
          {/* LEFT */}
          <AnimatePresence mode="wait">
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 22, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: 18, filter: "blur(6px)" }}
              transition={{ duration: 0.45, ease }}
              className="rounded-[28px] bg-white shadow-[0_18px_60px_rgba(0,0,0,0.08)] overflow-hidden"
            >
              {/* Hero */}
              <div className="relative h-[320px] sm:h-[380px] overflow-hidden">
                <motion.img
                  src={post.cover}
                  alt={post.title}
                  className="h-full w-full object-cover"
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.8, ease }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-transparent" />

                <div className="absolute left-6 sm:left-10 top-6">
                  <span className="inline-flex items-center rounded-full px-4 py-2 text-[11px] font-extrabold tracking-[0.18em] uppercase bg-[var(--rich-pink)] text-white shadow-[0_10px_24px_rgba(236,72,153,0.25)]">
                    Featured Article
                  </span>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease, delay: 0.05 }}
                  className="absolute left-6 sm:left-10 bottom-8 sm:bottom-10 right-6"
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center rounded-full px-4 py-2 text-[11px] font-extrabold tracking-[0.18em] uppercase bg-white/12 text-white border border-white/15">
                      {post.category}
                    </span>

                    <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-extrabold tracking-[0.14em] uppercase bg-white/12 text-white border border-white/15">
                      <Clock3 size={14} className="text-white/80" /> {post.readTime}
                    </span>

                    <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-extrabold tracking-[0.14em] uppercase bg-white/12 text-white border border-white/15">
                      <CalendarDays size={14} className="text-white/80" /> {post.date}
                    </span>
                  </div>

                  <h1 className="mt-4 text-white text-[34px] sm:text-[50px] leading-[1.02] font-extrabold">
                    {post.title}
                  </h1>

                  <p className="mt-3 max-w-[760px] text-white/85 text-[14px] sm:text-[16px] font-semibold leading-7">
                    {post.subtitle}
                  </p>
                </motion.div>
              </div>

              {/* Meta row */}
              <div className="px-6 sm:px-10 py-6 border-b border-black/5">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-2xl bg-black/5 grid place-items-center overflow-hidden border border-black/5">
                      <User className="text-black/50" size={18} />
                    </div>
                    <div className="leading-tight">
                      <p className="font-extrabold text-[14px] text-black/85">{post.author.name}</p>
                      <p className="text-[12px] font-semibold text-black/45">{post.author.role}</p>
                    </div>
                  </div>

                  {/* FULL FILL PINK on hover */}
                  <div className="flex items-center gap-2">
                    <FillIconButton title="Share">
                      <Share2 size={18} />
                    </FillIconButton>
                    <FillIconButton title="Save">
                      <Bookmark size={18} />
                    </FillIconButton>
                    <FillIconButton title="Like">
                      <Heart size={18} />
                    </FillIconButton>
                  </div>
                </div>
              </div>

              {/* Body */}
              <motion.div
                initial="hidden"
                animate="show"
                variants={{
                  hidden: { opacity: 0 },
                  show: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
                }}
                className="px-6 sm:px-10 py-8"
              >
                {post.content.map((block, idx) => {
                  if (block.type === "h2") {
                    return (
                      <motion.h2
                        key={idx}
                        variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                        className="text-[26px] sm:text-[30px] font-extrabold text-[#14182b] mt-10 first:mt-0"
                      >
                        {block.text}
                      </motion.h2>
                    );
                  }

                  if (block.type === "p") {
                    return (
                      <motion.p
                        key={idx}
                        variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                        className="text-[16px] leading-8 text-black/70 mt-5 first:mt-0"
                      >
                        {block.text}
                      </motion.p>
                    );
                  }

                  if (block.type === "tips") {
                    return (
                      <motion.div
                        key={idx}
                        variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                        className="mt-7 space-y-4"
                      >
                        {block.items.map((it, i) => (
                          <motion.div
                            key={i}
                            whileHover={{ y: -2 }}
                            transition={{ duration: 0.18, ease }}
                            className="rounded-[22px] bg-[#f7f8fc] border border-black/5 p-5 flex gap-4 hover:border-[var(--rich-pink)]/25 transition"
                          >
                            <div className="w-1.5 rounded-full bg-[var(--rich-pink)]/70" />
                            <div className="text-black/70 leading-7">
                              <span className="font-extrabold">{i + 1}. {it.title}:</span>{" "}
                              <span className="font-semibold">{it.desc}</span>
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    );
                  }

                  return null;
                })}

                {/* Tags + stats */}
                <div className="mt-12 pt-8 border-t border-black/5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((t) => (
                      <motion.span
                        whileHover={{ y: -2, scale: 1.03 }}
                        transition={{ duration: 0.18, ease }}
                        key={t}
                        className="px-4 py-2 rounded-full bg-[#f4f6fb] text-[12px] font-extrabold text-black/55 cursor-pointer
                                   hover:bg-[var(--rich-pink)] hover:text-white transition"
                      >
                        {t}
                      </motion.span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <motion.button
                      type="button"
                      whileHover={{ y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      className="group inline-flex items-center gap-2 rounded-2xl bg-black/5 border border-black/10 px-4 py-2
                                 text-[12px] font-extrabold text-black/55 hover:bg-[var(--rich-pink)] hover:text-white hover:border-[var(--rich-pink)] transition"
                    >
                      <Heart size={16} className="text-black/45 group-hover:text-white transition" />
                      {post.likes}
                    </motion.button>

                    <motion.button
                      type="button"
                      whileHover={{ y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      className="group inline-flex items-center gap-2 rounded-2xl bg-black/5 border border-black/10 px-4 py-2
                                 text-[12px] font-extrabold text-black/55 hover:bg-[var(--rich-pink)] hover:text-white hover:border-[var(--rich-pink)] transition"
                    >
                      <MessageSquare size={16} className="text-black/45 group-hover:text-white transition" />
                      {post.comments}
                    </motion.button>
                  </div>
                </div>

                {/* COMMENTS — EXACT PROFESSIONAL STYLE (like your screenshot) */}
                <div className="mt-12">
                  <div className="flex items-center gap-3">
                    <span className="h-11 w-11 rounded-2xl bg-[var(--rich-pink)]/10 grid place-items-center border border-[var(--rich-pink)]/15">
                      <MessageCircle className="text-[var(--rich-pink)]" size={18} />
                    </span>
                    <h3 className="text-[22px] sm:text-[26px] font-extrabold text-[#14182b]">
                      Community Comments <span className="text-black/35">({allComments.length})</span>
                    </h3>
                  </div>

                  {/* Write box + Post button (same feel) */}
                  <div className="mt-6 rounded-[28px] bg-white border border-black/5 shadow-[0_18px_60px_rgba(0,0,0,0.06)] p-6 sm:p-8">
                    <textarea
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      className="w-full min-h-[120px] rounded-2xl bg-[#fbfbfd] border border-black/10 px-5 py-4
                                 outline-none focus:ring-4 focus:ring-[var(--rich-pink)]/15 transition"
                      placeholder="Join the conversation... What are your thoughts?"
                    />

                    <div className="mt-5 flex justify-end">
                      <motion.button
                        type="button"
                        onClick={postComment}
                        whileHover={{ y: -1 }}
                        whileTap={{ scale: 0.98 }}
                        className="rounded-2xl bg-[var(--rich-pink)] px-7 py-3 text-white font-extrabold
                                   shadow-[0_16px_30px_rgba(236,72,153,0.28)] hover:brightness-95 transition"
                      >
                        Post Comment
                      </motion.button>
                    </div>
                  </div>

                  {/* List card */}
                  <div className="mt-6 rounded-[28px] bg-white border border-black/5 shadow-[0_18px_60px_rgba(0,0,0,0.06)] overflow-hidden">
                    <div className="px-6 sm:px-8 py-5 border-b border-black/5 flex items-center justify-between">
                      <p className="font-extrabold text-[#14182b]">Latest Comments</p>

                      <div className="flex items-center gap-2">
                        <motion.button
                          type="button"
                          onClick={() => setPage((p) => Math.max(1, p - 1))}
                          disabled={safePage === 1}
                          whileHover={safePage !== 1 ? { y: -1 } : {}}
                          whileTap={safePage !== 1 ? { scale: 0.98 } : {}}
                          className={`h-10 w-10 rounded-xl border grid place-items-center transition
                            ${safePage !== 1
                              ? "bg-black/5 border-black/10 hover:bg-[var(--rich-pink)] hover:border-[var(--rich-pink)]"
                              : "bg-black/3 border-black/10 opacity-40 cursor-not-allowed"}`}
                        >
                          <ChevronLeft className={safePage !== 1 ? "text-black/60" : "text-black/35"} size={18} />
                        </motion.button>

                        <motion.button
                          type="button"
                          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                          disabled={safePage === totalPages}
                          whileHover={safePage !== totalPages ? { y: -1 } : {}}
                          whileTap={safePage !== totalPages ? { scale: 0.98 } : {}}
                          className={`h-10 w-10 rounded-xl border grid place-items-center transition
                            ${safePage !== totalPages
                              ? "bg-black/5 border-black/10 hover:bg-[var(--rich-pink)] hover:border-[var(--rich-pink)]"
                              : "bg-black/3 border-black/10 opacity-40 cursor-not-allowed"}`}
                        >
                          <ChevronRight className={safePage !== totalPages ? "text-black/60" : "text-black/35"} size={18} />
                        </motion.button>
                      </div>
                    </div>

                    <div className="px-6 sm:px-8 py-6">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={`page-${safePage}`}
                          initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
                          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                          exit={{ opacity: 0, y: 10, filter: "blur(6px)" }}
                          transition={{ duration: 0.35, ease }}
                          className="space-y-7"
                        >
                          {paged.map((c) => (
                            <div key={c.id} className="flex gap-4">
                              <div className="h-12 w-12 rounded-2xl bg-[#f7f8fc] grid place-items-center border border-black/5 overflow-hidden">
                                <User size={18} className="text-black/45" />
                              </div>

                              <div className="flex-1">
                                <div className="flex items-start justify-between gap-4">
                                  <div>
                                    <p className="font-extrabold text-[14px] text-black/80">{c.name}</p>
                                  </div>
                                  <p className="text-[11px] font-extrabold tracking-[0.14em] uppercase text-black/35">
                                    {c.time}
                                  </p>
                                </div>

                                <p className="mt-2 text-[14px] leading-7 text-black/65 font-semibold">
                                  {c.text}
                                </p>

                                <div className="mt-3 flex items-center gap-5">
                                  <button
                                    type="button"
                                    className="text-[11px] font-extrabold tracking-[0.14em] uppercase text-black/35 hover:text-[var(--rich-pink)] transition"
                                  >
                                    Reply
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() => helpful(c.id)}
                                    className="text-[11px] font-extrabold tracking-[0.14em] uppercase text-black/35 hover:text-[var(--rich-pink)] transition"
                                  >
                                    Helpful ({c.helpful || 0})
                                  </button>
                                </div>

                                <div className="mt-5 h-[1px] bg-black/5" />
                              </div>
                            </div>
                          ))}
                        </motion.div>
                      </AnimatePresence>

                      {/* Pagination row like screenshot */}
                      <div className="mt-6 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {Array.from({ length: totalPages }).slice(0, 5).map((_, i) => {
                            const n = i + 1;
                            const active = n === safePage;
                            return (
                              <button
                                key={n}
                                type="button"
                                onClick={() => setPage(n)}
                                className={`h-10 w-10 rounded-xl border font-extrabold text-[13px] transition
                                  ${active
                                    ? "bg-[var(--rich-pink)] text-white border-[var(--rich-pink)] shadow-[0_12px_26px_rgba(236,72,153,0.25)]"
                                    : "bg-white text-black/55 border-black/10 hover:bg-[var(--rich-pink)] hover:text-white hover:border-[var(--rich-pink)]"
                                  }`}
                              >
                                {n}
                              </button>
                            );
                          })}
                        </div>

                        <button
                          type="button"
                          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                          className="inline-flex items-center gap-2 rounded-2xl bg-white border border-black/10 px-5 py-2
                                     text-[12px] font-extrabold text-black/55 hover:bg-[var(--rich-pink)] hover:text-white hover:border-[var(--rich-pink)] transition"
                        >
                          Next <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.article>
          </AnimatePresence>

          {/* RIGHT SIDEBAR */}
          <motion.aside
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, ease }}
            className="space-y-6 lg:sticky lg:top-[92px] h-fit"
          >
            {/* Search */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="rounded-[26px] bg-white shadow-[0_18px_60px_rgba(0,0,0,0.06)] p-6 border border-black/5"
            >
              <div className="flex items-center gap-3">
                <Search className="text-[var(--rich-pink)]" />
                <h4 className="text-[18px] font-extrabold text-[#14182b]">Search Articles</h4>
              </div>

              <div className="mt-5 relative">
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search keywords..."
                  className="w-full rounded-2xl border border-black/10 bg-[#f7f8fc] px-5 py-4 pr-12
                             font-semibold text-black/70 outline-none focus:ring-4 focus:ring-[var(--rich-pink)]/15 transition"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-black/35">
                  <Search size={18} />
                </div>
              </div>
            </motion.div>

            {/* Categories */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="rounded-[26px] bg-white shadow-[0_18px_60px_rgba(0,0,0,0.06)] p-6 border border-black/5"
            >
              <div className="flex items-center gap-3">
                <span className="text-[var(--rich-pink)]">✨</span>
                <h4 className="text-[18px] font-extrabold text-[#14182b]">Categories</h4>
              </div>

              <div className="mt-4 space-y-3">
                {post.categories.map((c) => (
                  <div
                    key={c.name}
                    className="group flex items-center justify-between rounded-2xl bg-[#f7f8fc] px-4 py-3 border border-black/5
                               hover:bg-[var(--rich-pink)]/10 hover:border-[var(--rich-pink)]/25 transition"
                  >
                    <div className="flex items-center gap-3">
                      <span className="h-10 w-10 rounded-2xl bg-white grid place-items-center border border-black/5">
                        {c.emoji}
                      </span>
                      <span className="font-extrabold text-black/70 group-hover:text-black transition">{c.name}</span>
                    </div>
                    <span className="h-9 min-w-[44px] px-3 rounded-2xl bg-white border border-black/5 grid place-items-center text-[12px] font-extrabold text-black/45
                                     group-hover:bg-[var(--rich-pink)] group-hover:text-white group-hover:border-[var(--rich-pink)] transition">
                      {c.count}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Popular Reading */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="rounded-[26px] bg-white shadow-[0_18px_60px_rgba(0,0,0,0.06)] p-6 border border-black/5"
            >
              <div className="flex items-center gap-3">
                <TrendingUp className="text-[var(--rich-pink)]" />
                <h4 className="text-[18px] font-extrabold text-[#14182b]">Popular Reading</h4>
              </div>

              <div className="mt-5 space-y-4">
                {popularList.map((p) => (
                  <motion.div key={p.title} whileHover={{ x: 4 }} transition={{ duration: 0.18, ease }}>
                    <Link to={`/blogs/${p.slug}`} className="flex gap-4 group">
                      <motion.img
                        src={p.img}
                        alt={p.title}
                        className="h-16 w-16 rounded-2xl object-cover"
                        whileHover={{ scale: 1.06 }}
                        transition={{ duration: 0.35, ease }}
                      />
                      <div>
                        <p className="font-extrabold text-black/80 leading-6 group-hover:text-[var(--rich-pink)] transition">
                          {p.title}
                        </p>
                        <p className="mt-1 text-[12px] font-extrabold tracking-[0.14em] uppercase text-black/35">
                          {p.date}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Newsletter */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="rounded-[26px] bg-gradient-to-br from-[var(--rich-pink)] to-[#a855f7] text-white p-7 shadow-[0_22px_70px_rgba(236,72,153,0.22)]"
            >
              <div className="h-12 w-12 rounded-2xl bg-white/18 grid place-items-center">
                <Mail />
              </div>

              <h4 className="mt-5 text-[26px] font-extrabold">Weekly Wellness</h4>
              <p className="mt-3 text-white/85 font-semibold leading-7">
                Get expert health advice and holistic tips delivered to your inbox every Sunday morning.
              </p>

              <div className="mt-6">
                <input
                  placeholder="Your email address"
                  className="w-full rounded-2xl bg-white/15 border border-white/20 px-5 py-4
                             placeholder:text-white/60 outline-none focus:ring-4 focus:ring-white/20 transition"
                />
                <button
                  type="button"
                  className="mt-4 w-full rounded-2xl bg-white text-[#14182b] font-extrabold py-3 hover:brightness-95 transition"
                >
                  Subscribe Now
                </button>
              </div>
            </motion.div>
          </motion.aside>
        </div>
      </div>
    </div>
  );
}
