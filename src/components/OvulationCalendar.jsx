import React, { useMemo, useState } from "react";
import {
  CalendarDays,
  Search,
  PhoneCall,
  MessageCircle,
  ArrowRight,
  Heart,
  ShieldAlert,
} from "lucide-react";

const navItems = [
  "Free Live Helpline",
  "Pregnancy Questions Center",
  "Ovulation Calendar",
  "Due Date Calculator",
  "Baby Name Generator",
  "Pregnancy Quiz",
  "Healthy Recipes",
  "Blog",
  "Provider Search",
];

function addDays(dateString, days) {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "";
  date.setDate(date.getDate() + days);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function getOvulationData(lastPeriod, cycleLength) {
  if (!lastPeriod) return null;

  const cycle = Number(cycleLength) || 28;
  const ovulationDay = cycle - 14;

  return {
    fertileStart: addDays(lastPeriod, ovulationDay - 5),
    fertileEnd: addDays(lastPeriod, ovulationDay + 1),
    ovulationDate: addDays(lastPeriod, ovulationDay),
    nextPeriod: addDays(lastPeriod, cycle),
  };
}

function InfoCard({ title, desc, accent = "pink" }) {
  const styles =
    accent === "pink"
      ? "bg-pink-50 border-pink-100"
      : "bg-amber-50 border-amber-100";

  const titleColor = accent === "pink" ? "text-pink-600" : "text-amber-600";

  return (
    <div
      className={`rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${styles}`}
    >
      <h4 className={`text-sm font-extrabold ${titleColor}`}>{title}</h4>
      <p className="mt-2 text-sm leading-6 text-slate-600">{desc}</p>
    </div>
  );
}

function FertilityTip({ icon, title, text, iconBg }) {
  return (
    <div className="flex items-start gap-4 rounded-2xl bg-white p-4 transition-all duration-300 hover:shadow-sm">
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-full ${iconBg} flex-none`}
      >
        {icon}
      </div>
      <div>
        <h4 className="text-sm font-bold text-slate-900 sm:text-base">{title}</h4>
        <p className="mt-1 text-sm leading-6 text-slate-600">{text}</p>
      </div>
    </div>
  );
}

export default function OvulationCalendarPage() {
  const [lastPeriod, setLastPeriod] = useState("");
  const [cycleLength, setCycleLength] = useState("28");
  const [showResult, setShowResult] = useState(false);

  const results = useMemo(
    () => getOvulationData(lastPeriod, cycleLength),
    [lastPeriod, cycleLength]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowResult(true);
  };

  return (
    <div className="min-h-screen bg-[#f8f8f9] text-slate-900">
      {/* Top Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-[#fcfcfd] to-pink-50">
        <div className="absolute right-0 top-0 h-full w-40 bg-pink-100/30 blur-3xl sm:w-72" />
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <p className="text-xs text-slate-400">
            Home <span className="mx-2">›</span> Resources{" "}
            <span className="mx-2">›</span>
            <span className="font-medium text-slate-700">Ovulation Calendar</span>
          </p>

          <h1 className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl">
            <span className="text-slate-900">Ovulation </span>
            <span className="text-pink-600">Calendar</span>
          </h1>

          <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
            Our popular ovulation calculator will estimate your fertility window.
            This is the period of time during your monthly cycle when you can
            potentially conceive.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left Column */}
          <div className="space-y-8 lg:col-span-8">
            {/* Calculator */}
            <div className="rounded-[28px] bg-white p-5 shadow-lg shadow-slate-200/60 ring-1 ring-black/5 sm:p-7">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-pink-50">
                  <CalendarDays className="h-5 w-5 text-pink-600" />
                </div>
                <h2 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
                  Calculate Your Window
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                      First Day of Last Period
                    </label>
                    <input
                      type="date"
                      value={lastPeriod}
                      onChange={(e) => setLastPeriod(e.target.value)}
                      className="h-12 w-full rounded-xl border border-gray-200 bg-[#fafafa] px-4 text-sm outline-none transition-all duration-300 focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                      Average Cycle Length (Days)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min="20"
                        max="45"
                        value={cycleLength}
                        onChange={(e) => setCycleLength(e.target.value)}
                        className="h-12 w-full rounded-xl border border-gray-200 bg-[#fafafa] px-4 pr-14 text-sm outline-none transition-all duration-300 focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                        Days
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-slate-400">
                      Default is 28. Range: 22–44 days.
                    </p>
                  </div>
                </div>

                <button
                  type="submit"
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#d4ad31] px-6 text-sm font-bold text-white shadow-lg shadow-yellow-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#c59f28] hover:shadow-xl"
                >
                  Get My Fertility Dates
                  <ArrowRight className="h-4 w-4" />
                </button>

                {showResult && (
                  <div className="grid gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4 sm:grid-cols-2">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-pink-500">
                        Estimated Ovulation
                      </p>
                      <p className="mt-2 text-lg font-extrabold text-slate-900">
                        {results?.ovulationDate || "Select a valid date"}
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-pink-500">
                        Fertile Window
                      </p>
                      <p className="mt-2 text-sm font-semibold text-slate-800">
                        {results
                          ? `${results.fertileStart} — ${results.fertileEnd}`
                          : "Select a valid date"}
                      </p>
                    </div>

                    <div className="sm:col-span-2">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-pink-500">
                        Estimated Next Period
                      </p>
                      <p className="mt-2 text-sm font-semibold text-slate-800">
                        {results?.nextPeriod || "Select a valid date"}
                      </p>
                    </div>
                  </div>
                )}
              </form>
            </div>

            {/* How it works */}
            <div>
              <h3 className="text-3xl font-extrabold text-slate-900">
                How Does the Ovulation Calculator Work?
              </h3>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
                Our ovulation calculator helps estimate your most fertile days by
                using simple inputs that you provide. To get results, you will need
                to enter the first day of your last menstrual period (LMP) and the
                length of your menstrual cycle.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <InfoCard
                  title="Regular Cycle"
                  desc="Typically 28 days between periods. Ovulation occurs around day 14."
                  accent="pink"
                />
                <InfoCard
                  title="Irregular Cycle"
                  desc="Varies between months. Tracking helps identify your unique patterns."
                  accent="amber"
                />
              </div>
            </div>

            {/* Fertility Section */}
            <div className="rounded-[28px] bg-[#f3f4f6] p-6 sm:p-8">
              <h3 className="text-3xl font-extrabold text-slate-900">
                When Precisely Are You Most Fertile?
              </h3>

              <div className="mt-6 space-y-4">
                <FertilityTip
                  icon={<Heart className="h-4 w-4 text-pink-600" />}
                  iconBg="bg-pink-100"
                  title="Trying to Conceive"
                  text="Intercourse every other day during the fertile window is optimal for conception."
                />

                <FertilityTip
                  icon={<ShieldAlert className="h-4 w-4 text-amber-600" />}
                  iconBg="bg-amber-100"
                  title="Preventing Pregnancy"
                  text="Avoid unprotected sex for 4 days prior and 1 day after the fertile window."
                />
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <aside className="space-y-6 lg:col-span-4">
            {/* Help Card */}
            <div className="overflow-hidden rounded-[24px] bg-gradient-to-br from-[#111a3d] via-[#0d1636] to-[#1e0f33] p-6 text-white shadow-xl">
              <h3 className="text-2xl font-extrabold">Need Help?</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                Our specialists are available 24/7 to answer your questions.
              </p>

              <div className="mt-5 flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3">
                <PhoneCall className="h-4 w-4 text-slate-200" />
                <span className="text-sm font-semibold">1-800-672-2296</span>
              </div>

              <button className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-white text-sm font-bold text-slate-900 transition-all duration-300 hover:bg-slate-100">
                <MessageCircle className="h-4 w-4" />
                Live Chat
              </button>
            </div>

            {/* Search */}
            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search resources..."
                  className="h-12 w-full rounded-xl border border-gray-200 bg-[#fafafa] pl-4 pr-11 text-sm outline-none transition-all duration-300 focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
                />
                <Search className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              </div>
            </div>

            {/* Navigation */}
            <div className="rounded-[24px] border border-gray-200 bg-white p-5 shadow-sm">
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">
                Navigation
              </p>

              <div className="space-y-3">
                {navItems.map((item) => {
                  const active = item === "Ovulation Calendar";
                  return (
                    <button
                      key={item}
                      className={`block w-full rounded-xl px-3 py-2 text-left text-sm font-medium transition-all duration-300 ${
                        active
                          ? "bg-pink-600 text-white shadow-md"
                          : "text-slate-700 hover:bg-slate-50 hover:text-pink-600"
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}