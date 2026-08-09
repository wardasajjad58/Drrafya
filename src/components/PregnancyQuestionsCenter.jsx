import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

const ease = [0.22, 1, 0.36, 1];

const pageWrap = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
};

const TOPICS = [
  "All Topics",
  "Unplanned Pregnancy",
  "Getting Pregnant",
  "Healthy Pregnancy",
  "Giving Birth",
  "Postpartum",
];

const POSTS = [
  {
    id: 1,
    topic: "Healthy Pregnancy",
    title: "Omega-3 and Pregnancy: Benefits of Fish Oil",
    img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    topic: "Getting Pregnant",
    title: "GIFT (Gamete Transfer): How It Works",
    img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    topic: "Unplanned Pregnancy",
    title: "Why Your Period Might Change",
    img: "https://images.unsplash.com/photo-1465447142348-e9952c393450?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 4,
    topic: "Healthy Pregnancy",
    title: "Infant Development: First Year Milestones",
    img: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 5,
    topic: "Giving Birth",
    title: "Rapid Labor: What to Expect",
    img: "data:image/jpeg;base64,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",
  },
  {
    id: 6,
    topic: "Healthy Pregnancy",
    title: "Hives During Pregnancy: Normal or Not?",
    img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 7,
    topic: "Unplanned Pregnancy",
    title: "False Pregnancy: Causes and Symptoms",
    img: "https://images.unsplash.com/photo-1461354464878-ad92f492a5a0?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 8,
    topic: "Healthy Pregnancy",
    title: "What Causes Diarrhea During Pregnancy?",
    img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 9,
    topic: "Healthy Pregnancy",
    title: "Placental Encapsulation: Benefits & Risks",
    img: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 10,
    topic: "Giving Birth",
    title: "Natural Ways to Avoid Cesarean Birth",
    img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1200&auto=format&fit=crop",
  },
];

function TopicPill({ active, children, onClick }) {
  return (
    <button
      onClick={onClick}
      className={
        "h-10 px-5 rounded-full border text-[13px] font-extrabold transition " +
        (active
          ? "bg-[#c9a227] text-white border-[#c9a227] shadow-[0_10px_28px_rgba(201,162,39,0.35)]"
          : "bg-white text-black/55 border-black/10 hover:bg-black/5")
      }
    >
      {children}
    </button>
  );
}

function PostCard({ title, img }) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className="group relative rounded-[18px] overflow-hidden shadow-[0_18px_55px_rgba(0,0,0,0.10)]"
    >
      <div className="relative h-[170px] md:h-[190px]">
        <img src={img} alt={title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-black/0" />
      </div>
      <div className="absolute left-0 right-0 bottom-0 p-4">
        <p className="text-white text-[13px] font-extrabold leading-snug drop-shadow">
          {title}
        </p>
      </div>
    </motion.article>
  );
}

export default function PregnancyQuestionsCenter() {
  const [topic, setTopic] = useState("All Topics");
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return POSTS.filter((p) => {
      const topicOk = topic === "All Topics" ? true : p.topic === topic;
      const qOk = !query || p.title.toLowerCase().includes(query) || p.topic.toLowerCase().includes(query);
      return topicOk && qOk;
    });
  }, [topic, q]);

  const PER = 10;
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER));
  const items = filtered.slice((page - 1) * PER, (page - 1) * PER + PER);

  // reset page when filters change
  React.useEffect(() => {
    setPage(1);
  }, [topic, q]);

  return (
    <main className="bg-[#f7f8fb]">
      {/* HERO */}
      <div className="relative overflow-hidden bg-[#c4005a]">
        <motion.section
          variants={pageWrap}
          initial="hidden"
          animate="show"
          className="max-w-6xl mx-auto px-5 pt-16 pb-20"
        >
          <h1 className="text-white text-center text-[38px] md:text-[56px] font-black tracking-tight">
            Pregnancy Questions Center
          </h1>
          <div className="mt-6 flex justify-center">
            <span className="h-[4px] w-20 rounded-full bg-[#c9a227]" />
          </div>
        </motion.section>
      </div>

      {/* CONTENT */}
      <section className="max-w-6xl mx-auto px-5 -mt-10 pb-16">
        <div className="rounded-[22px] bg-white border border-black/10 shadow-[0_24px_90px_rgba(0,0,0,0.08)] p-7 md:p-10">
          <div className="text-center">
            <h2 className="text-[22px] md:text-[26px] font-black text-[#0b1020]">
              Helpful Info for Your Most Requested Questions
            </h2>
            <p className="mt-2 text-[13px] md:text-[14px] font-semibold text-black/50">
              Search for Your Question or Click on a Topic Tile
            </p>
          </div>

          {/* Search */}
          <div className="mt-7 flex justify-center">
            <div className="relative w-full max-w-2xl">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search for a Topic or Question"
                className="w-full h-12 rounded-full border border-black/10 bg-white px-5 pr-12 text-[13px] font-semibold text-black/60 outline-none focus:ring-2 focus:ring-[#c4005a]/15"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-black/35" size={18} />
            </div>
          </div>

          {/* Topics */}
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            {TOPICS.map((t) => (
              <TopicPill
                key={t}
                active={topic === t}
                onClick={() => setTopic(t)}
              >
                {t}
              </TopicPill>
            ))}
          </div>

          {/* Grid */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {items.map((p) => (
              <PostCard key={p.id} title={p.title} img={p.img} />
            ))}
          </div>

          {/* Pagination (center overlay style) */}
          <div className="mt-10 flex items-center justify-center">
            <div className="inline-flex items-center gap-2 rounded-2xl bg-[#111]/85 text-white px-4 py-2 shadow-[0_18px_60px_rgba(0,0,0,0.20)]">
              <button
                onClick={() => setPage((v) => Math.max(1, v - 1))}
                className="h-9 w-9 rounded-xl hover:bg-white/10 grid place-items-center transition"
                aria-label="Previous"
              >
                <ChevronLeft size={18} />
              </button>
              <span className="text-[12px] font-extrabold tracking-wide">
                {page} / {totalPages}
              </span>
              <button
                onClick={() => setPage((v) => Math.min(totalPages, v + 1))}
                className="h-9 w-9 rounded-xl hover:bg-white/10 grid place-items-center transition"
                aria-label="Next"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* HELP CARD */}
      <section className="max-w-6xl mx-auto px-5 pb-14">
        <div className="rounded-[22px] bg-white border border-black/10 shadow-[0_22px_80px_rgba(0,0,0,0.07)] p-10 md:p-12 text-center">
          <h3 className="text-[#c4005a] text-[26px] md:text-[30px] font-black">Do You Need Help?</h3>
          <p className="mt-3 text-[13px] md:text-[14px] font-semibold text-black/50 max-w-2xl mx-auto">
            Every pregnancy comes with questions. Our live team is here to support you. Chat for FREE with a real person or talk with a pregnancy educator.
          </p>

          <div className="mt-7 flex flex-col md:flex-row items-center justify-center gap-5">
            <button className="h-12 px-8 rounded-full bg-[#c9a227] text-white font-extrabold shadow-[0_14px_40px_rgba(201,162,39,0.35)] hover:brightness-95 transition">
              Free Live Chat
            </button>
            <p className="text-[#c4005a] font-black text-[22px] md:text-[28px]">800-672-2296</p>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="bg-[#eef1f6] py-14">
        <div className="max-w-6xl mx-auto px-5 text-center">
          <h3 className="text-[#c4005a] text-[26px] md:text-[30px] font-black">Track Your Baby&apos;s Development</h3>
          <p className="mt-2 text-[13px] md:text-[14px] font-semibold text-black/50">
            Subscribe to our week-by-week Pregnancy Newsletter
          </p>

          <div className="mt-7 flex flex-col md:flex-row items-center justify-center gap-4">
            <input
              placeholder="First Name"
              className="h-12 w-full md:w-[320px] rounded-full border border-black/10 bg-white px-5 text-[13px] font-semibold text-black/60 outline-none focus:ring-2 focus:ring-[#c4005a]/15"
            />
            <input
              placeholder="Email Address"
              className="h-12 w-full md:w-[360px] rounded-full border border-black/10 bg-white px-5 text-[13px] font-semibold text-black/60 outline-none focus:ring-2 focus:ring-[#c4005a]/15"
            />
            <button className="h-12 px-10 rounded-full bg-[#c4005a] text-white font-extrabold shadow-[0_14px_40px_rgba(196,0,90,0.25)] hover:brightness-95 transition">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <div className="pb-10" />
    </main>
  );
}
