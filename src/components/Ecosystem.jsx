import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { ArrowRight } from "lucide-react";

const ease = [0.22, 1, 0.36, 1];

const team = [
  {
    tag: "LEAD OBGYN",
    name: "Dr. Rafiya Zahir",
    role: "Fertility & High-Risk Pregnancy",
    desc: "Care for complex reproductive & pregnancy needs with a multidisciplinary lens.",
    img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=1200&auto=format&fit=crop",
  },
  {
    tag: "CLINICAL NUTRITIONIST",
    name: "Sana Malik",
    role: "Gestational Diabetes & PCOS",
    desc: "Expert in local Pakistani dietary habits and nutrition plans for pregnancy.",
    img: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?q=80&w=1200&auto=format&fit=crop",
  },
  {
    tag: "WOMEN'S PHYSIOTHERAPIST",
    name: "Dr.Mustafa Khan",
    role: "Pelvic Floor & Recovery",
    desc: "Specialized in breathing, core, and prenatal mobility & recovery routines.",

    // ✅ replaced with stable image url
    img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=1200&auto=format&fit=crop",
  },
  {
    tag: "PERINATAL PSYCHIATRIST",
    name: "Dr. Ahmed",
    role: "Maternal Mental Health",
    desc: "Dedicated support for postpartum anxiety, depression, and emotional wellness.",

    // ✅ replaced with stable image url
    img: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=1200&auto=format&fit=crop",
  },
];

const parent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } },
};

const cardAnim = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
};

export default function Ecosystem() {
  return (
    <section id="team" className="py-16 bg-white">
      <div className="containerX">
        <Reveal>
          <div className="text-center">
            <p className="text-[11px] font-extrabold tracking-[0.22em] text-[var(--rich-pink)] uppercase">
              A Multidisciplinary Ecosystem
            </p>

            <p className="mt-3 text-[13px] text-black/55 font-medium max-w-3xl mx-auto">
              We’ve moved beyond single-doctor care. Our team of specialists works together to ensure
              every aspect of your health—physical, nutritional, and mental—is supported.
            </p>
          </div>
        </Reveal>

        <motion.div
          variants={parent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="mt-12 grid md:grid-cols-4 gap-6"
        >
          {team.map((t) => (
            <motion.article
              key={t.name}
              variants={cardAnim}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25 }}
              className="group rounded-[18px] overflow-hidden bg-white
                         border border-black/10
                         shadow-[0_18px_60px_rgba(0,0,0,0.10)]
                         hover:shadow-[0_26px_100px_rgba(0,0,0,0.14)]
                         hover:bg-[var(--rich-pink)]/6
                         hover:border-[var(--rich-pink)]/35
                         transition-colors duration-300"
            >
              {/* image */}
              <div className="relative h-[160px] overflow-hidden bg-black/5">
                <img
                  src={t.img}
                  alt={t.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.06]"
                  onError={(e) => {
                    // ✅ fallback if any image ever fails
                    e.currentTarget.src =
                      "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?q=80&w=1200&auto=format&fit=crop";
                  }}
                />

                {/* pill tag */}
                <div className="absolute bottom-3 left-3">
                  <span
                    className="inline-flex rounded-full px-3 py-1 text-[10px] font-extrabold tracking-[0.18em] text-white
                               bg-black/75 group-hover:bg-[var(--rich-pink)] transition-colors duration-300"
                  >
                    {t.tag}
                  </span>
                </div>
              </div>

              {/* body */}
              <div className="p-5">
                <p className="font-extrabold text-[14px] text-black">{t.name}</p>
                <p className="mt-1 text-[12px] text-black/55 font-semibold">{t.role}</p>

                <p className="mt-3 text-[12px] leading-relaxed text-black/55 font-medium">
                  {t.desc}
                </p>

                {/* button */}
                <motion.a
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  href="#"
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full
                             border border-black/15 bg-white py-3 text-[12px] font-extrabold text-black/75
                             group-hover:border-[var(--rich-pink)]/35
                             hover:bg-[var(--rich-pink)] hover:text-white
                             transition duration-300"
                >
                  View Profile
                  <ArrowRight
                    size={14}
                    className="opacity-70 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
                  />
                </motion.a>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
