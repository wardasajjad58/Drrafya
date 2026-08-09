import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarDays,
  Search,
  ChevronDown,
  ArrowRight,
  PhoneCall,
  CircleAlert,
} from "lucide-react";

const ease = [0.22, 1, 0.36, 1];

const navItems = [
  { label: "Free Live Helpline", to: "/free-live-helpline" },
  { label: "Pregnancy Questions Center", to: "/pregnancyquestionscenter" },
  { label: "Ovulation Calendar", to: "/tools/ovulation-calendar" },
  { label: "Due Date Calculator", to: "/tools/due-date" },
  { label: "Baby Name Generator", to: "/baby-names" },
  { label: "Pregnancy Quiz", to: "/tools/pregnancy-quiz" },
  { label: "Pregnancy Resources", to: "/pregnancy-resources" },
  { label: "Blog", to: "/blogs" },
];

const milestones = [
  {
    week: "WEEK 4",
    title: "Implantation",
    bg: "bg-rose-50",
    text: "text-rose-500",
  },
  {
    week: "WEEK 8",
    title: "Heartbeat",
    bg: "bg-amber-50",
    text: "text-amber-500",
  },
  {
    week: "WEEK 12",
    title: "First Trimester",
    bg: "bg-emerald-50",
    text: "text-emerald-500",
  },
  {
    week: "WEEK 20",
    title: "Halfway Point",
    bg: "bg-sky-50",
    text: "text-sky-500",
  },
];

function addDays(dateString, days) {
  if (!dateString) return "";
  const d = new Date(dateString);
  if (Number.isNaN(d.getTime())) return "";
  d.setDate(d.getDate() + days);
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function calculateDueDate(method, lastPeriod, cycleLength) {
  if (!lastPeriod) return "";
  const cycle = Number(cycleLength) || 28;

  if (method === "Last Period") {
    return addDays(lastPeriod, 280 + (cycle - 28));
  }

  return addDays(lastPeriod, 266);
}

function MilestoneCard({ item }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.28, ease }}
      className={`rounded-2xl border border-white/70 px-5 py-4 ${item.bg} shadow-sm`}
    >
      <p className={`text-[10px] font-bold uppercase tracking-[0.22em] ${item.text}`}>
        {item.week}
      </p>
      <h4 className="mt-2 text-sm font-bold text-slate-800">{item.title}</h4>
    </motion.div>
  );
}

function FadeUp({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

export default function PregnancyDueDateCalendar() {
  const [method, setMethod] = useState("Last Period");
  const [lastPeriod, setLastPeriod] = useState("");
  const [cycleLength, setCycleLength] = useState("28");
  const [showResult, setShowResult] = useState(false);

  const dueDate = useMemo(
    () => calculateDueDate(method, lastPeriod, cycleLength),
    [method, lastPeriod, cycleLength]
  );

  const handleCalculate = (e) => {
    e.preventDefault();
    setShowResult(true);
  };

  return (
    <div className="min-h-screen bg-[#f7f7f8] text-slate-900">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-r from-pink-600 via-pink-600 to-pink-500">
        <motion.div
          animate={{ x: [0, 18, 0], y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
          className="absolute left-0 top-0 h-24 w-60 rounded-full bg-white/10 blur-sm"
        />

        <motion.div
          animate={{ x: [0, -20, 0], y: [0, -12, 0] }}
          transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
          className="absolute right-10 bottom-0 h-32 w-72 rounded-full bg-white/10 blur-sm"
        />

        <div className="mx-auto max-w-7xl px-4 py-14 text-center sm:px-6 md:py-16 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="text-3xl font-extrabold text-white sm:text-4xl md:text-5xl"
          >
            Pregnancy Due Date Calculator
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.55, delay: 0.1, ease }}
            className="mx-auto mt-4 h-1 w-20 origin-center rounded-full bg-yellow-400"
          />

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16, ease }}
            className="mx-auto mt-6 max-w-2xl text-sm leading-6 text-pink-50 sm:text-base"
          >
            Our easy-to-use pregnancy calculator is the most popular way to estimate
            your due date based on your unique cycle and timing.
          </motion.p>
        </div>
      </section>

      {/* Main */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-10 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left */}
          <div className="space-y-8 lg:col-span-8">
            <FadeUp>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.28, ease }}
                className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-7"
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    whileHover={{ scale: 1.08, rotate: -4 }}
                    transition={{ duration: 0.22 }}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50"
                  >
                    <CalendarDays className="h-5 w-5 text-amber-500" />
                  </motion.div>

                  <h2 className="text-xl font-extrabold text-slate-800">
                    Pregnancy Calendar & Due Date
                  </h2>
                </div>

                <form onSubmit={handleCalculate} className="mt-6 space-y-5">
                  <div>
                    <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">
                      Calculate Based On
                    </label>

                    <div className="relative">
                      <select
                        value={method}
                        onChange={(e) => setMethod(e.target.value)}
                        className="h-12 w-full appearance-none rounded-xl border border-gray-200 bg-[#fafafa] px-4 text-sm outline-none transition-all duration-300 focus:border-pink-400 focus:bg-white focus:ring-2 focus:ring-pink-100"
                      >
                        <option>Last Period</option>
                        <option>Conception Date</option>
                      </select>

                      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 transition-transform duration-300" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">
                        {method === "Last Period"
                          ? "First Day of Last Period"
                          : "Conception Date"}
                      </label>

                      <input
                        type="date"
                        value={lastPeriod}
                        onChange={(e) => setLastPeriod(e.target.value)}
                        className="h-12 w-full rounded-xl border border-gray-200 bg-[#fafafa] px-4 text-sm outline-none transition-all duration-300 focus:border-pink-400 focus:bg-white focus:ring-2 focus:ring-pink-100"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">
                        Average Cycle Length
                      </label>

                      <div className="relative">
                        <input
                          type="number"
                          min="20"
                          max="45"
                          value={cycleLength}
                          onChange={(e) => setCycleLength(e.target.value)}
                          disabled={method !== "Last Period"}
                          className="h-12 w-full rounded-xl border border-gray-200 bg-[#fafafa] px-4 pr-14 text-sm outline-none transition-all duration-300 focus:border-pink-400 focus:bg-white focus:ring-2 focus:ring-pink-100 disabled:cursor-not-allowed disabled:opacity-60"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                          Days
                        </span>
                      </div>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ y: -2, scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    type="submit"
                    className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-pink-600 px-6 text-sm font-semibold text-white shadow-lg shadow-pink-600/20 transition-all duration-300 hover:bg-pink-700 hover:shadow-xl"
                  >
                    Calculate Now
                    <ArrowRight className="h-4 w-4" />
                  </motion.button>

                  <AnimatePresence>
                    {showResult && (
                      <motion.div
                        initial={{ opacity: 0, y: 12, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{ duration: 0.32, ease }}
                        className="rounded-2xl border border-pink-100 bg-pink-50 p-4"
                      >
                        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-pink-500">
                          Estimated Result
                        </p>
                        <p className="mt-2 text-lg font-extrabold text-slate-800">
                          {dueDate || "Please select a valid date."}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.div
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.22 }}
                    className="flex gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4"
                  >
                    <CircleAlert className="mt-0.5 h-4 w-4 flex-none text-slate-400" />
                    <p className="text-xs leading-6 text-slate-500">
                      This is not a diagnosis. The calculations provided are estimates
                      based on averages and should be confirmed by a healthcare
                      professional.
                    </p>
                  </motion.div>
                </form>
              </motion.div>
            </FadeUp>

            {/* How it works */}
            <FadeUp delay={0.05}>
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <span className="h-7 w-1 rounded-full bg-pink-600" />
                  <h3 className="text-2xl font-extrabold text-slate-800">
                    How Does it Work?
                  </h3>
                </div>

                <p className="max-w-3xl text-sm leading-7 text-slate-500 sm:text-base">
                  Our Pregnancy Due Date Calculator is designed to provide you with an
                  estimated due date by using specific inputs like your Last Menstrual
                  Period (LMP) or Conception Date.
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.28, ease }}
                    className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5"
                  >
                    <h4 className="text-lg font-extrabold text-slate-800">LMP Method</h4>
                    <p className="mt-3 text-sm leading-6 text-slate-500">
                      Calculates your due date assuming a 28-day cycle, counting 40 weeks
                      from your last period.
                    </p>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.28, ease }}
                    className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5"
                  >
                    <h4 className="text-lg font-extrabold text-slate-800">
                      Conception Method
                    </h4>
                    <p className="mt-3 text-sm leading-6 text-slate-500">
                      Uses the exact date of conception for a more precise estimate,
                      adding 266 days.
                    </p>
                  </motion.div>
                </div>
              </div>
            </FadeUp>

            {/* Resources CTA */}
            <FadeUp delay={0.08}>
              <div className="relative overflow-hidden rounded-[28px] bg-pink-50 p-6 sm:p-8">
                <motion.div
                  animate={{ x: [0, -10, 0], y: [0, 12, 0] }}
                  transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }}
                  className="absolute right-0 top-0 h-28 w-28 rounded-full bg-pink-100/70"
                />

                <div className="relative">
                  <h3 className="text-2xl font-extrabold text-slate-800">
                    Free Pregnancy Resources
                  </h3>

                  <p className="mt-4 max-w-xl text-sm leading-7 text-slate-500">
                    Whether you are trying to get pregnant, are pregnant, or preparing
                    to give birth, we have trusted resources for you.
                  </p>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                      <Link
                        to="/pregnancyquestionscenter"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-pink-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-600/20 transition-all duration-300 hover:bg-pink-700"
                      >
                        Questions Center
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </motion.div>

                    <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                      <Link
                        to="/pregnancy-resources"
                        className="inline-flex items-center justify-center rounded-xl border border-pink-500 bg-white px-6 py-3 text-sm font-semibold text-pink-600 transition-all duration-300 hover:bg-pink-600 hover:text-white"
                      >
                        Weekly Newsletter
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </div>
            </FadeUp>

            {/* Milestones */}
            <FadeUp delay={0.1}>
              <div>
                <div className="mb-6 flex items-center justify-between gap-4">
                  <h3 className="text-2xl font-extrabold text-slate-800">
                    Pregnancy Milestones
                  </h3>

                  <Link
                    to="/pregnancy-resources"
                    className="text-sm font-semibold text-pink-600 transition hover:text-pink-700"
                  >
                    View All Weeks →
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  {milestones.map((item) => (
                    <MilestoneCard key={item.week} item={item} />
                  ))}
                </div>
              </div>
            </FadeUp>

            {/* Big CTA Animated */}
            <FadeUp delay={0.12}>
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.7, ease }}
                className="group relative overflow-hidden rounded-[34px] bg-gradient-to-br from-pink-600 via-pink-600 to-rose-500 px-8 py-14 text-center text-white shadow-2xl md:px-16"
              >
                <motion.div
                  animate={{ x: [0, 20, 0], y: [0, -10, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl"
                />

                <motion.div
                  animate={{ x: [0, -20, 0], y: [0, 12, 0] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -right-10 bottom-0 h-48 w-48 rounded-full bg-yellow-300/10 blur-2xl"
                />

                <div className="relative z-10">
                  <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1, duration: 0.45 }}
                    className="mb-5 text-[10px] font-bold uppercase tracking-[0.32em] text-pink-100"
                  >
                    Stay Updated
                  </motion.p>

                  <motion.h3
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.18, duration: 0.5 }}
                    className="mx-auto max-w-3xl text-4xl font-extrabold leading-tight md:text-6xl"
                  >
                    Track Your Baby’s
                    <br />
                    Development
                  </motion.h3>

                  <motion.p
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.28, duration: 0.5 }}
                    className="mx-auto mt-5 max-w-2xl text-base leading-7 text-pink-50"
                  >
                    Subscribe to our week-by-week Pregnancy Newsletter for expert advice,
                    milestones, and updates.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.38, duration: 0.55 }}
                    className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-[1fr_1fr_auto]"
                  >
                    <input
                      type="text"
                      placeholder="First Name"
                      className="h-14 rounded-xl border border-white/10 bg-white/10 px-5 text-white placeholder:text-pink-100 outline-none transition-all duration-300 focus:scale-[1.01] focus:bg-white/15 focus:ring-2 focus:ring-white/20"
                    />

                    <input
                      type="email"
                      placeholder="Email Address"
                      className="h-14 rounded-xl border border-white/10 bg-white/10 px-5 text-white placeholder:text-pink-100 outline-none transition-all duration-300 focus:scale-[1.01] focus:bg-white/15 focus:ring-2 focus:ring-white/20"
                    />

                    <motion.button
                      whileHover={{ y: -3, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      className="h-14 rounded-xl bg-yellow-500 px-8 font-extrabold tracking-wider text-white shadow-lg shadow-yellow-500/30 transition"
                    >
                      SUBSCRIBE
                    </motion.button>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.48, duration: 0.55 }}
                    className="mt-8 flex flex-wrap items-center justify-center gap-3"
                  >
                    <Link
                      to="/free-live-helpline"
                      className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-pink-600"
                    >
                      Free Helpline
                    </Link>

                    <Link
                      to="/pregnancyquestionscenter"
                      className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-pink-600"
                    >
                      Questions Center
                    </Link>

                    <Link
                      to="/tools/ovulation-calendar"
                      className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-pink-600"
                    >
                      Ovulation Calendar
                    </Link>

                    <Link
                      to="/tools/due-date"
                      className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-pink-600"
                    >
                      Due Date Calculator
                    </Link>

                    <Link
                      to="/baby-names"
                      className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-pink-600"
                    >
                      Baby Names
                    </Link>

                    <Link
                      to="/tools/pregnancy-quiz"
                      className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-pink-600"
                    >
                      Pregnancy Quiz
                    </Link>

                    <Link
                      to="/pregnancy-resources"
                      className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-pink-600"
                    >
                      Pregnancy Resources
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </FadeUp>
          </div>

          {/* Right */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              <FadeUp>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25, ease }}
                  className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5"
                >
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search resources..."
                      className="h-12 w-full rounded-xl border border-gray-200 bg-[#fafafa] pl-4 pr-11 text-sm outline-none transition-all duration-300 focus:border-pink-400 focus:bg-white focus:ring-2 focus:ring-pink-100"
                    />

                    <button className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-pink-100 text-pink-600 transition-all duration-300 hover:scale-110 hover:bg-pink-600 hover:text-white">
                      <Search className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              </FadeUp>

              <FadeUp delay={0.05}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25, ease }}
                  className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5"
                >
                  <div className="bg-[#081634] px-5 py-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-yellow-400">
                      Navigation
                    </p>
                  </div>

                  <div className="space-y-1 p-4">
                    {navItems.map((item) => {
                      const active = item.label === "Due Date Calculator";

                      return (
                        <Link
                          key={item.label}
                          to={item.to}
                          className={`group flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-medium transition-all duration-300 ${
                            active
                              ? "bg-pink-600 text-white shadow-lg shadow-pink-600/20"
                              : "text-slate-700 hover:translate-x-1 hover:bg-slate-50 hover:text-pink-600"
                          }`}
                        >
                          <span>{item.label}</span>
                          <ArrowRight
                            className={`h-4 w-4 transition-transform duration-300 ${
                              active ? "text-white" : "group-hover:translate-x-1"
                            }`}
                          />
                        </Link>
                      );
                    })}
                  </div>
                </motion.div>
              </FadeUp>

              <FadeUp delay={0.08}>
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.28, ease }}
                  className="relative overflow-hidden rounded-[28px] bg-[#d9b233] p-6 text-white shadow-sm"
                >
                  <motion.div
                    animate={{ x: [0, 10, 0], y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                    className="absolute bottom-0 right-0 h-24 w-24 rounded-full bg-white/10"
                  />

                  <div className="relative">
                    <motion.div
                      whileHover={{ scale: 1.08 }}
                      className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15"
                    >
                      <PhoneCall className="h-5 w-5" />
                    </motion.div>

                    <h3 className="mt-5 text-2xl font-extrabold">Need Help?</h3>

                    <p className="mt-3 text-sm leading-6 text-white/85">
                      Speak with a pregnancy educator today. We are here for you.
                    </p>

                    <motion.a
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      href="tel:18006722296"
                      className="mt-6 block w-full rounded-xl bg-white px-5 py-3 text-center text-sm font-bold text-[#c79d16] transition-all duration-300 hover:bg-slate-50"
                    >
                      1-800-672-2296
                    </motion.a>
                  </div>
                </motion.div>
              </FadeUp>

              <FadeUp delay={0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.28, ease }}
                  className="flex min-h-[300px] items-center justify-center rounded-[28px] border-2 border-dashed border-slate-200 bg-slate-50 text-center text-slate-300"
                >
                  <div>
                    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-slate-300">
                      i
                    </div>
                    <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.25em]">
                      Advertisement
                    </p>
                  </div>
                </motion.div>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}