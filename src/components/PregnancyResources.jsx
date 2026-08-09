import React from "react";
import {
  PhoneCall,
  MessageCircle,
  CalendarDays,
 HelpCircle,
 Heart,
 MapPin,
 Search,
 ChevronRight,
} from "lucide-react";

const quickLinks = [
  { title: "Free Live Helpline", icon: PhoneCall, color: "text-pink-500" },
  { title: "Free Live Chat", icon: MessageCircle, color: "text-yellow-500" },
  { title: "Due Date Calculator", icon: CalendarDays, color: "text-pink-500" },
  { title: "Ovulation Calendar", icon: CalendarDays, color: "text-yellow-500" },
  { title: "Pregnancy Quiz", icon: HelpCircle, color: "text-pink-500" },
  { title: "Pregnancy Questions Center", icon: HelpCircle, color: "text-yellow-500" },
  { title: "Baby Name Generator", icon: Heart, color: "text-pink-500" },
  { title: "Provider Search", icon: MapPin, color: "text-yellow-500" },
];

const navItems = [
  "Free Live Helpline",
  "Pregnancy Questions",
  "Ovulation Calendar",
  "Due Date Calculator",
  "Baby Name Generator",
  "Pregnancy Quiz",
  "Healthy Recipes",
  "Blog",
  "Provider Search",
];

const blogPosts = [
  {
    category: "Multiple Births",
    title: "Did You Just Find Out? Support is Key!",
    desc: "Did you just find out you were expecting twins, triplets or more? It’s news that comes with a range of emotions...",
    image:
      "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=1200&auto=format&fit=crop",
  },
  {
    category: "Healthy Pregnancy",
    title: "Beyond Baby Blues: Postpartum Changes",
    desc: "When it is said that motherhood changes you, they are very right. Your body now looks center stage...",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    category: "Nutrition",
    title: "Prenatal Vitamins Guide",
    desc: "Prenatal vitamins consist of a variety of vitamins and minerals to help your baby get the nutrients...",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
  },
];

function QuickLinkCard({ item }) {
  const Icon = item.icon;

  return (
    <button
      className="group w-full rounded-xl border border-gray-200 bg-white p-4 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-pink-200 hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-50 transition duration-300 group-hover:bg-pink-50">
          <Icon className={`h-4 w-4 ${item.color}`} />
        </div>

        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold text-slate-900">
            {item.title}
          </h3>
          <p className="mt-1 text-xs text-slate-400">
            Access tool <ChevronRight className="ml-1 inline h-3 w-3" />
          </p>
        </div>
      </div>
    </button>
  );
}

function BlogCard({ post }) {
  return (
    <article className="group overflow-hidden rounded-2xl bg-white transition-all duration-300 hover:-translate-y-1">
      <div className="relative overflow-hidden rounded-2xl">
        <img
          src={post.image}
          alt={post.title}
          className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-yellow-400 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-900">
          {post.category}
        </span>
      </div>

      <div className="pt-4">
        <h3 className="text-xl font-bold leading-snug text-slate-900 transition-colors duration-300 group-hover:text-pink-600">
          {post.title}
        </h3>
        <p className="mt-3 text-sm leading-6 text-slate-500">{post.desc}</p>
        <button className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-pink-600 transition hover:gap-2">
          Read More <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </article>
  );
}

export default function PregnancyResourcesPage() {
  return (
    <div className="min-h-screen bg-[#f7f7f8] text-slate-900">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-r from-pink-600 via-pink-600 to-pink-500">
        <div className="absolute right-0 top-0 hidden h-full w-1/4 skew-x-[-12deg] bg-white/8 lg:block" />

        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-yellow-300">
            Expert Guidance
          </p>
          <h1 className="max-w-md text-4xl font-extrabold leading-tight text-white sm:text-5xl md:text-6xl">
            Pregnancy Resources
          </h1>
          <div className="mt-5 h-1 w-20 rounded-full bg-yellow-400" />
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {quickLinks.map((item, i) => (
                <QuickLinkCard key={i} item={item} />
              ))}
            </div>

            <div className="mt-12">
              <div className="mb-6 flex items-end justify-between gap-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-yellow-500">
                    Insights
                  </p>
                  <h2 className="mt-2 text-2xl font-extrabold text-slate-900 sm:text-3xl">
                    Latest from Blog
                  </h2>
                </div>

                <button className="text-xs font-bold uppercase tracking-wide text-pink-600 transition hover:text-pink-700">
                  View All
                </button>
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <BlogCard post={blogPosts[0]} />
                <BlogCard post={blogPosts[1]} />
                <div className="md:col-span-1">
                  <BlogCard post={blogPosts[2]} />
                </div>
              </div>

              <div className="mt-10 flex justify-center">
                <button className="rounded-full bg-pink-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-pink-700 hover:shadow-lg">
                  View All Posts
                </button>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <aside className="space-y-6 lg:col-span-4">
            {/* Search */}
            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.28em] text-slate-400">
                Search
              </p>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search resources..."
                  className="w-full rounded-xl border border-gray-200 bg-[#fafafa] py-3 pl-4 pr-10 text-sm outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
                />
                <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              </div>
            </div>

            {/* Navigation */}
            <div className="rounded-2xl bg-[#081634] p-6 text-white shadow-lg">
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.28em] text-yellow-400">
                Navigation
              </p>
              <div className="space-y-3">
                {navItems.map((item, idx) => (
                  <button
                    key={idx}
                    className="block text-left text-sm text-slate-200 transition hover:translate-x-1 hover:text-white"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Sidebar Promo */}
            <div className="relative overflow-hidden rounded-2xl shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1500534623283-312aade485b7?q=80&w=1200&auto=format&fit=crop"
                alt="Support families"
                className="h-80 w-full object-cover transition duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07162e]/90 via-[#07162e]/40 to-transparent" />
              <div className="absolute bottom-0 p-6 text-white">
                <span className="rounded-full bg-yellow-400 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-900">
                  Support Us
                </span>
                <h3 className="mt-4 max-w-[220px] text-2xl font-extrabold leading-tight">
                  Help us provide hope to families.
                </h3>
                <button className="mt-4 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-pink-600 transition hover:bg-pink-50">
                  Donate Now
                </button>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-[#f3f4f6] py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-pink-500">
            Stay Updated
          </p>
          <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Track Your Baby’s Development
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            Join thousands of parents receiving our expert week-by-week pregnancy guidance.
          </p>

          <form className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
            <input
              type="text"
              placeholder="First Name"
              className="h-12 rounded-xl border border-gray-200 bg-white px-4 text-sm outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="h-12 rounded-xl border border-gray-200 bg-white px-4 text-sm outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
            />
            <button
              type="submit"
              className="h-12 rounded-xl bg-pink-600 px-5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-pink-700 hover:shadow-lg"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}