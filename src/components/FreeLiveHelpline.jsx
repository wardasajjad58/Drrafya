import React from "react";
import {
  Search,
  Phone,
  MessageCircle,
  Heart,
  CalendarDays,
  Calculator,
  BookOpen,
  Baby,
  ChevronRight,
  ExternalLink,
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

const resourceCards = [
  {
    title: "Free Pregnancy Helpline",
    desc: "Access professional guidance and support services tailored for your journey.",
    icon: <Phone size={18} />,
    color: "bg-pink-500",
  },
  {
    title: "Live Pregnancy Chat",
    desc: "Access professional guidance and support services tailored for your journey.",
    icon: <MessageCircle size={18} />,
    color: "bg-indigo-500",
  },
  {
    title: "Provider Search",
    desc: "Access professional guidance and support services tailored for your journey.",
    icon: <Search size={18} />,
    color: "bg-emerald-500",
  },
  {
    title: "Pregnancy Question Center",
    desc: "Access professional guidance and support services tailored for your journey.",
    icon: <Heart size={18} />,
    color: "bg-amber-500",
  },
];

const toolCards = [
  {
    title: "Due Date Calculator",
    subtitle: "INTERACTIVE TOOL",
    icon: <Calculator size={18} />,
    color: "bg-pink-500",
  },
  {
    title: "Ovulation Calendar",
    subtitle: "INTERACTIVE TOOL",
    icon: <CalendarDays size={18} />,
    color: "bg-yellow-500",
  },
  {
    title: "Baby Name Generator",
    subtitle: "INTERACTIVE TOOL",
    icon: <Heart size={18} />,
    color: "bg-slate-800",
  },
  {
    title: "Pregnancy Quiz",
    subtitle: "INTERACTIVE TOOL",
    icon: <BookOpen size={18} />,
    color: "bg-pink-600",
  },
];

function SectionLabel({ children, color = "text-pink-500" }) {
  return (
    <p className={`text-[10px] font-bold uppercase tracking-[0.25em] ${color} mb-2`}>
      {children}
    </p>
  );
}

function ResourceCard({ item }) {
  return (
    <div className="rounded-3xl bg-[#f7f7fb] border border-gray-100 p-5 min-h-[170px]">
      <div className={`w-11 h-11 rounded-xl ${item.color} text-white flex items-center justify-center mb-5 shadow-sm`}>
        {item.icon}
      </div>
      <h3 className="text-[18px] font-bold text-slate-900 leading-tight mb-2">
        {item.title}
      </h3>
      <p className="text-sm text-slate-500 leading-6">{item.desc}</p>
    </div>
  );
}

function ToolCard({ item }) {
  return (
    <div className="rounded-2xl bg-[#f7f7fb] border border-gray-100 px-5 py-5 flex items-center gap-4">
      <div className={`w-11 h-11 rounded-xl ${item.color} text-white flex items-center justify-center shadow-sm`}>
        {item.icon}
      </div>
      <div>
        <h4 className="text-[16px] font-bold text-slate-900 leading-tight">
          {item.title}
        </h4>
        <p className="text-[10px] tracking-[0.18em] text-slate-400 font-bold mt-1">
          {item.subtitle}
        </p>
      </div>
    </div>
  );
}

export default function FreeLiveHelplinePage() {
  return (
    <div className="bg-white text-slate-900">
      {/* Hero */}
      <section className="bg-gradient-to-br from-pink-600 via-pink-600 to-rose-500 min-h-[340px] flex items-center justify-center px-6">
        <div className="text-center text-white">
          <div className="inline-block px-4 py-1 rounded-full bg-white/10 text-[10px] tracking-[0.22em] uppercase font-bold mb-5">
            Resource Portal
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold leading-none">
            Free Live
          </h1>
          <h2 className="text-5xl md:text-6xl font-extrabold leading-none text-yellow-400">
            Helpline
          </h2>

          <div className="w-24 h-1 bg-yellow-400 rounded-full mx-auto mt-5" />
        </div>
      </section>

      {/* Main */}
      <section className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left content */}
          <div className="lg:col-span-8">
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-slate-900 max-w-3xl">
              You are not alone with our
              <br />
              <span className="text-pink-600 italic">Free Pregnancy Helpline</span>
            </h2>

            <p className="text-slate-500 text-base leading-7 mt-5 max-w-2xl">
              Every pregnancy comes with questions. Our Free Pregnancy Helpline is here
              to provide trusted information to help you make informed decisions.
            </p>

            {/* Helpline Box */}
            <div className="mt-8 max-w-[640px] rounded-[28px] bg-gradient-to-br from-[#0b1537] via-[#08152f] to-[#31133d] text-white p-8 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div>
                  <p className="text-[10px] tracking-[0.35em] uppercase text-pink-400 font-bold mb-4">
                    Direct Support
                  </p>
                  <p className="text-slate-300 text-lg mb-1">Call us anytime:</p>
                  <p className="text-4xl md:text-5xl font-extrabold tracking-tight">
                    800-672-2296
                  </p>
                </div>

                <div className="bg-white/8 rounded-3xl p-6 backdrop-blur-sm">
                  <p className="text-[10px] tracking-[0.35em] uppercase text-yellow-400 font-bold mb-4">
                    Availability
                  </p>
                  <div className="space-y-3 text-lg">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-slate-300">Mon–Fri</span>
                      <span className="font-bold">7am – 10pm</span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-slate-300">Sat–Sun</span>
                      <span className="font-bold">9am – 7pm</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-10">
              <p className="text-[10px] tracking-[0.25em] uppercase text-slate-400 font-bold mb-3">
                Instant Assistance
              </p>
              <button className="bg-yellow-500 hover:bg-yellow-400 text-white font-bold rounded-xl px-10 py-4 shadow-lg tracking-wide">
                CHAT NOW
              </button>
            </div>

            {/* Resources */}
            <div className="mt-20">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <SectionLabel>Explore</SectionLabel>
                  <h3 className="text-3xl font-extrabold text-slate-900">
                    FREE Pregnancy Resources
                  </h3>
                </div>

                <button className="hidden md:flex items-center gap-2 text-pink-600 text-sm font-bold">
                  View All <ChevronRight size={16} />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                {resourceCards.map((item, idx) => (
                  <ResourceCard key={idx} item={item} />
                ))}
              </div>
            </div>

            {/* Tools */}
            <div className="mt-16">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <SectionLabel color="text-yellow-500">Interactive</SectionLabel>
                  <h3 className="text-3xl font-extrabold text-slate-900">
                    FREE Pregnancy Tools
                  </h3>
                </div>

                <button className="flex items-center gap-1 text-yellow-600 text-sm font-bold">
                  Open Tools <ExternalLink size={14} />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                {toolCards.map((item, idx) => (
                  <ToolCard key={idx} item={item} />
                ))}
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <aside className="lg:col-span-4">
            {/* Search */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 bg-[#f7f7fb] rounded-xl px-4 h-12 flex items-center border border-gray-100">
                <input
                  type="text"
                  placeholder="Search resources..."
                  className="w-full bg-transparent outline-none text-sm placeholder:text-slate-400"
                />
              </div>
              <button className="w-10 h-10 rounded-lg bg-pink-600 text-white flex items-center justify-center shadow">
                <Search size={16} />
              </button>
            </div>

            {/* Navigation */}
            <div className="bg-[#f7f7fb] rounded-[24px] p-6 border border-gray-100">
              <p className="text-[10px] tracking-[0.28em] uppercase text-slate-400 font-bold mb-4">
                Navigation
              </p>

              <div className="space-y-2">
                {navItems.map((item, idx) => (
                  <button
                    key={idx}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition ${
                      idx === 0
                        ? "bg-pink-600 text-white shadow"
                        : "text-slate-700 hover:bg-white"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Promo card */}
            <div className="mt-8 rounded-[28px] bg-gradient-to-br from-[#121743] via-[#0d1738] to-[#08162d] text-white p-8 min-h-[360px] flex flex-col justify-end shadow-xl">
              <p className="text-[10px] uppercase tracking-[0.32em] text-slate-400 font-bold mb-4">
                Sponsored
              </p>
              <h4 className="text-2xl font-extrabold leading-tight mb-3">
                Premium Prenatal Care
              </h4>
              <p className="text-slate-300 text-sm leading-6 mb-6">
                Trusted by over 1M mothers worldwide.
              </p>
              <button className="bg-white text-slate-900 rounded-xl py-3 font-bold">
                Learn More
              </button>
            </div>
          </aside>
        </div>
      </section>

      {/* Newsletter section */}
      <section className="bg-[#020a2b] px-6 py-20 mt-8">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-[34px] bg-gradient-to-br from-pink-600 via-pink-600 to-rose-500 px-8 md:px-16 py-14 text-center text-white shadow-2xl">
            <p className="text-[10px] tracking-[0.32em] uppercase font-bold text-pink-100 mb-5">
              Stay Updated
            </p>

            <h3 className="text-4xl md:text-6xl font-extrabold leading-tight max-w-3xl mx-auto">
              Track Your Baby’s
              <br />
              Development
            </h3>

            <p className="text-pink-50 max-w-2xl mx-auto mt-5 text-base leading-7">
              Subscribe to our week-by-week Pregnancy Newsletter for expert advice,
              milestones, and updates.
            </p>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-4 max-w-4xl mx-auto">
              <input
                type="text"
                placeholder="First Name"
                className="h-14 rounded-xl bg-white/10 border border-white/10 px-5 text-white placeholder:text-pink-100 outline-none"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="h-14 rounded-xl bg-white/10 border border-white/10 px-5 text-white placeholder:text-pink-100 outline-none"
              />
              <button className="h-14 px-8 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-white font-extrabold tracking-wider">
                SUBSCRIBE
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}