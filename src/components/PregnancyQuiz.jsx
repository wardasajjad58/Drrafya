import React from "react";
import {
  Search,
  ChevronRight,
  Play,
  Phone,
  MessageCircle,
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

export default function PregnancyQuizPage() {
  return (
    <div className="min-h-screen bg-[#f7f7f8] text-slate-900">
      {/* Hero */}
      <section className="bg-gradient-to-r from-pink-600 via-pink-600 to-pink-500">
        <div className="mx-auto max-w-7xl px-4 py-10 text-center sm:px-6 sm:py-14 lg:px-8">
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">
            Pregnancy Quiz
          </h1>
          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-yellow-400" />
        </div>
      </section>

      {/* Main */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left */}
          <div className="space-y-8 lg:col-span-8">
            {/* Intro */}
            <div>
              <h2 className="text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
                Am I Pregnant?
                <br />
                <span className="text-pink-600">Find Out With Our Pregnancy Quiz</span>
              </h2>

              <p className="mt-5 text-base font-semibold text-slate-900">
                Are those symptoms you are experiencing a sign of pregnancy or something else?
              </p>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
                Symptoms such as <span className="font-semibold">nausea, vomiting, a missed or late period, tender breasts</span>, and{" "}
                <span className="font-semibold">frequent trips to the bathroom</span> can often be early symptoms of pregnancy.
                But they can also be related to PMS, stress, and a whole lot of other situations.
              </p>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
                Before you start spinning out of control, this quiz is here to help you decide if
                you might be pregnant and need to take a pregnancy test.
              </p>
            </div>

            {/* Ready card */}
            <div className="rounded-[28px] bg-[#f1f2f5] p-6 shadow-sm transition duration-300 hover:shadow-md sm:p-8">
              <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-2">
                <div>
                  <h3 className="text-2xl font-extrabold text-slate-900">
                    Ready to get started?
                  </h3>
                  <p className="mt-4 max-w-md text-sm leading-7 text-slate-600">
                    The official American Pregnancy Association pregnancy quiz is free,
                    confidential, and just takes a few minutes.
                  </p>

                  <button className="mt-6 inline-flex items-center gap-2 rounded-full bg-pink-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-pink-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-pink-700 hover:shadow-xl">
                    Take The Quiz Now
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex justify-start md:justify-end">
                  <div className="group relative h-40 w-full max-w-[320px] overflow-hidden rounded-2xl bg-gradient-to-br from-[#a97d5a] via-[#8c6b52] to-[#5f4d42] shadow-lg transition duration-300 hover:shadow-xl">
                    <div className="absolute inset-0 bg-black/10 transition duration-300 group-hover:bg-black/20" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-lg transition duration-300 hover:scale-105 hover:bg-white">
                        <Play className="ml-1 h-7 w-7 fill-current" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="rounded-2xl border border-yellow-200 bg-[#fffdf7] p-4 text-sm italic leading-6 text-slate-500">
              THIS TOOL DOES NOT PROVIDE MEDICAL ADVICE. It is intended for informational
              purposes only and is not a substitute for professional medical consultation,
              diagnosis or treatment.
            </div>

            {/* Help text */}
            <p className="text-sm leading-7 text-slate-600 sm:text-base">
              Want to talk to someone now? We’re here for you—give us a call at{" "}
              <span className="font-bold text-pink-600">1-800-672-2296</span> and our pregnancy
              experts can provide the guidance needed in this emotional situation.
            </p>

            {/* Video block */}
            <div className="group relative overflow-hidden rounded-[28px] bg-[#1a2a45] shadow-xl transition duration-300 hover:shadow-2xl">
              <div className="flex h-[280px] items-center justify-center sm:h-[340px]">
                <button className="flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/60 transition duration-300 hover:scale-105 hover:bg-white/10 hover:text-white">
                  <Play className="ml-1 h-10 w-10" />
                </button>
              </div>
            </div>
          </div>

          {/* Right */}
          <aside className="space-y-6 lg:col-span-4">
            {/* Search */}
            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="h-12 w-full rounded-xl border border-gray-200 bg-[#fafafa] pl-10 pr-4 text-sm outline-none transition-all duration-300 focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
                />
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              </div>
            </div>

            {/* Navigation */}
            <div className="rounded-[24px] border border-gray-200 bg-white p-5 shadow-sm">
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">
                Navigation
              </p>

              <div className="space-y-2">
                {navItems.map((item) => {
                  const active = item === "Pregnancy Quiz";
                  return (
                    <button
                      key={item}
                      className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-medium transition-all duration-300 ${
                        active
                          ? "bg-pink-50 text-pink-600"
                          : "text-slate-700 hover:bg-slate-50 hover:text-pink-600"
                      }`}
                    >
                      <span>{item}</span>
                      <ChevronRight className="h-4 w-4 opacity-60" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Ad placeholder */}
            <div className="flex min-h-[280px] items-center justify-center rounded-[28px] border-2 border-dashed border-slate-200 bg-slate-50 text-center text-slate-300">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.24em]">
                  Advertisement
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-pink-600">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h3 className="text-3xl font-extrabold text-white sm:text-4xl">
                Track Your Baby’s Development
              </h3>
              <p className="mt-3 text-sm leading-7 text-pink-50 sm:text-base">
                Subscribe to our week-by-week Pregnancy Newsletter
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:col-span-7 lg:grid-cols-3">
              <input
                type="text"
                placeholder="First Name"
                className="h-12 rounded-xl border border-white/10 bg-white/10 px-4 text-sm text-white placeholder:text-pink-100 outline-none transition focus:bg-white/15 focus:ring-2 focus:ring-white/20"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="h-12 rounded-xl border border-white/10 bg-white/10 px-4 text-sm text-white placeholder:text-pink-100 outline-none transition focus:bg-white/15 focus:ring-2 focus:ring-white/20"
              />
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_auto] lg:col-span-1">
                <input
                  type="text"
                  placeholder="How many weeks pregnant are you?"
                  className="h-12 rounded-xl border border-white/10 bg-white/10 px-4 text-sm text-white placeholder:text-pink-100 outline-none transition focus:bg-white/15 focus:ring-2 focus:ring-white/20"
                />
                <button className="h-12 rounded-xl bg-yellow-500 px-6 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-yellow-400">
                  Subscribe Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}