import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Heart,
  Baby,
  ShieldPlus,
  Sparkles,
  Activity,
  Stethoscope,
  ArrowRight,
} from "lucide-react";
import Reveal from "./Reveal";

const ease = [0.22, 1, 0.36, 1];

const items = [
  {
    id: "preconception",
    icon: Heart,
    title: "Preconception",
    desc: "Expert guidance on egg quality, PCOS management, and preparing for conception.",
    points: ["Egg Quality Meal Plan", "Couples Guide E-Book", "Fertility Myths vs Facts"],
  },
  {
    id: "pregnancy",
    icon: Baby,
    title: "Pregnancy",
    desc: "A comprehensive journey through all three trimesters with tailored local insights.",
    points: ["Trimester Nutrition Guides", "Kick Counter Tool", "Birth Planning Prep"],
  },
  {
    id: "delivery",
    icon: ShieldPlus,
    title: "Postpartum",
    desc: "Preparing you for the big day with medical insights and birth planning.",
    points: ["Birth Plan Blueprint", "C-Section vs Natural", "Pain Management"],
  },
  {
    id: "postpartum",
    icon: Sparkles,
    title: "IVF & Infertility",
    desc: "Recovery, newborn care and mental wellness support for the fourth trimester.",
    points: ["Recovery Guidance", "Mental Wellness Tools", "Newborn Support"],
  },
  {
    id: "ivf",
    icon: Activity,
    title: "Infertility / IVF Support",
    desc: "Evidence-based IVF support with emotional tools and journey planning.",
    points: ["Evidence-Based Support", "Emotional Tools", "Journey Planning"],
  },
  {
    id: "gyne",
    icon: Stethoscope,
    title: "General Gyne",
    desc: "Routine women’s wellness, screenings and preventive gynecologic care.",
    points: ["Routine Care", "Screenings", "Women’s Wellness"],
  },
];

const gridParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.08 } },
};

const cardAnim = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

export default function Journey() {
  const [active, setActive] = useState(items[0].id);

  return (
    <section id="pillars" className="py-16 bg-white">
      <div className="containerX">
        <Reveal>
          <div className="text-center">
            <p className="text-[11px] font-extrabold tracking-[0.22em] text-[var(--rich-pink)] uppercase">
              Knowledge &amp; Lifecycle
            </p>
            <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-black">
              Your Health Journey, Decoded
            </h2>
            <p className="mt-4 text-black/55 max-w-3xl mx-auto font-medium">
              From the first thought of motherhood to recovery and beyond, we support you with
              expert-vetted resources tailored for Pakistan.
            </p>
          </div>
        </Reveal>

        <motion.div
          variants={gridParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="mt-12 grid md:grid-cols-3 gap-7"
        >
          {items.map((it) => {
            const Icon = it.icon;
            const isActive = active === it.id;

            return (
              <motion.div
                key={it.id}
                variants={cardAnim}
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.98 }}
                role="button"
                tabIndex={0}
                onClick={() => setActive(it.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") setActive(it.id);
                }}
                className={[
                  "text-left rounded-[22px] p-7 transition duration-300 w-full cursor-pointer",
                  "border",
                  isActive
                    ? "bg-white border-[var(--rich-pink)]/40 shadow-[0_22px_80px_rgba(242,139,182,0.22)]"
                    : "bg-[#f6f7fb] border-black/0 hover:bg-white hover:border-black/10 hover:shadow-[0_18px_60px_rgba(0,0,0,0.12)]",
                ].join(" ")}
              >
                <div
                  className={[
                    "h-11 w-11 rounded-2xl grid place-items-center transition",
                    isActive
                      ? "bg-[var(--rich-pink)]/14 text-[var(--rich-pink)]"
                      : "bg-white text-[var(--rich-pink)] shadow-sm",
                  ].join(" ")}
                >
                  <Icon size={20} />
                </div>

                <h3 className="mt-5 text-[16px] font-extrabold text-black leading-snug">
                  {it.title}
                </h3>

                <p className="mt-3 text-[13px] leading-relaxed text-black/55 font-medium">
                  {it.desc}
                </p>

                <ul className="mt-4 space-y-2.5 text-[13px] text-black/60 font-semibold">
                  {it.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--rich-pink)]" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>

                {/* ✅ Explore link: ONLY this navigates */}
                <Link
                  to={it.id === "pregnancy" ? "/pregnancyquestionscenter" : `/journey/${it.id}`}
                  onClick={(e) => e.stopPropagation()}
                  className="mt-6 inline-flex items-center gap-2 font-extrabold text-[var(--liquid-gold)]"
                >
                  Explore more
                  <ArrowRight size={16} />
                </Link>

                {isActive && (
                  <motion.div
                    layoutId="activeLine"
                    className="mt-6 h-[2px] w-full rounded-full bg-[var(--rich-pink)]/35"
                  />
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
