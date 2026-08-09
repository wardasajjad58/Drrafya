import React, { useMemo, useState } from "react";
import { Search, Heart, X } from "lucide-react";

const NAMES = [
  { name: "Aria", gender: "Female", origin: "Italian", meaning: "Air; song or melody" },
  { name: "Asher", gender: "Male", origin: "Hebrew", meaning: "Happy; blessed" },
  { name: "Bella", gender: "Female", origin: "Italian", meaning: "Beautiful" },
  { name: "Caleb", gender: "Male", origin: "Hebrew", meaning: "Devotion to God" },
  { name: "Quinn", gender: "Unisex", origin: "Irish", meaning: "Counsel" },
  { name: "Rowan", gender: "Unisex", origin: "Scottish", meaning: "Little red-head" },
  { name: "Silas", gender: "Male", origin: "Latin", meaning: "Wood; forest" },
  { name: "Thea", gender: "Female", origin: "Greek", meaning: "Goddess; godly" },
  { name: "Uri", gender: "Male", origin: "Hebrew", meaning: "My light" },
  { name: "Vera", gender: "Female", origin: "Russian", meaning: "Faith" },
  { name: "Wyatt", gender: "Male", origin: "English", meaning: "Brave in war" },
  { name: "Xander", gender: "Male", origin: "Greek", meaning: "Defender of men" },
  { name: "Yara", gender: "Female", origin: "Arabic", meaning: "Small butterfly" },
  { name: "Zane", gender: "Male", origin: "Hebrew", meaning: "God is gracious" },
];

const ORIGINS = [
  "All Origins",
  "Arabic",
  "English",
  "Greek",
  "Hebrew",
  "Irish",
  "Italian",
  "Latin",
  "Russian",
  "Scottish",
];

const ALPH = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function LetterPill({ active, letter, onClick }) {
  return (
    <button
      onClick={onClick}
      className={
        "h-8 w-8 rounded-xl border text-[12px] font-extrabold transition grid place-items-center " +
        (active
          ? "bg-[#ec4899] text-white border-[#ec4899]"
          : "bg-white border-black/10 text-black/60 hover:bg-black/5")
      }
    >
      {letter}
    </button>
  );
}

function GenderBadge({ gender }) {
  const map = {
    Female: "bg-pink-500/12 text-pink-600 border-pink-500/20",
    Male: "bg-sky-500/12 text-sky-600 border-sky-500/20",
    Unisex: "bg-violet-500/12 text-violet-600 border-violet-500/20",
  };
  return (
    <span
      className={
        "inline-flex items-center justify-center px-3 py-1 rounded-full border text-[11px] font-extrabold " +
        (map[gender] ?? "bg-black/5 text-black/60 border-black/10")
      }
    >
      {gender}
    </span>
  );
}

export default function BabyNames() {
  const [q, setQ] = useState("");
  const [gender, setGender] = useState("All");
  const [origin, setOrigin] = useState("All Origins");
  const [letter, setLetter] = useState("All");
  const [saved, setSaved] = useState(() => new Set());

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    return NAMES.filter((n) => {
      const qOk =
        !query ||
        n.name.toLowerCase().includes(query) ||
        n.meaning.toLowerCase().includes(query) ||
        n.origin.toLowerCase().includes(query);

      const genderOk = gender === "All" ? true : n.gender === gender;
      const originOk = origin === "All Origins" ? true : n.origin === origin;
      const letterOk = letter === "All" ? true : n.name.toUpperCase().startsWith(letter);

      return qOk && genderOk && originOk && letterOk;
    });
  }, [q, gender, origin, letter]);

  const clearAll = () => {
    setGender("All");
    setOrigin("All Origins");
    setLetter("All");
    setQ("");
  };

  const toggleSave = (name) => {
    setSaved((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  return (
    <main className="bg-[#fbfbfd]">
      {/* HERO */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#ff2f87] via-[#ff2f87] to-[#ff5aa6]" />
        <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[1200px] h-[520px] rounded-[999px] bg-white/18" />

        <section className="relative max-w-6xl mx-auto px-4 pt-12 pb-16">
          <div className="text-center text-white">
            <h1 className="text-[30px] md:text-[44px] font-black tracking-tight">
              Find the perfect name for your little one
            </h1>
            <p className="mt-3 text-[12.5px] md:text-[14px] text-white/80 max-w-2xl mx-auto">
              Explore thousands of names, their origins, and meanings with our intuitive discovery engine.
            </p>

            {/* Search */}
            <div className="mt-7 max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80" size={18} />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search by name..."
                  className="w-full h-12 rounded-2xl bg-white/95 text-black/70 placeholder:text-black/35 pl-11 pr-11 text-[13px] outline-none border border-white/30 focus:ring-2 focus:ring-white/35"
                />
                {q ? (
                  <button
                    onClick={() => setQ("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-black/40 hover:text-black/60"
                    aria-label="Clear"
                  >
                    <X size={18} />
                  </button>
                ) : null}
              </div>

              {/* Gender pills */}
              <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                {["All", "Female", "Male", "Unisex"].map((g) => (
                  <button
                    key={g}
                    onClick={() => setGender(g)}
                    className={
                      "h-10 px-4 rounded-2xl border text-[12px] font-extrabold transition " +
                      (gender === g
                        ? "bg-white text-[#b0004d] border-white"
                        : "bg-white/12 text-white border-white/20 hover:bg-white/18")
                    }
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* CONTENT */}
          <div className="mt-10 grid lg:grid-cols-[320px_1fr] gap-7 items-start">
            {/* Filters */}
            <aside className="rounded-[18px] bg-white border border-black/10 shadow-[0_18px_60px_rgba(0,0,0,0.08)] overflow-hidden">
              <div className="px-6 py-5 flex items-center justify-between">
                <p className="font-extrabold text-[13px] text-[#0b1020]">Filters</p>
                <button onClick={clearAll} className="text-[11px] font-extrabold text-black/45 hover:text-black/60">
                  Reset
                </button>
              </div>

              <div className="px-6 pb-6 space-y-5">
                {/* Origin */}
                <div>
                  <p className="text-[11px] font-extrabold text-black/45">Origin</p>
                  <select
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    className="mt-2 w-full h-11 rounded-2xl bg-black/5 border border-black/10 px-4 text-[13px] font-semibold text-black/65 outline-none focus:ring-2 focus:ring-pink-500/20"
                  >
                    {ORIGINS.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Letters */}
                <div>
                  <p className="text-[11px] font-extrabold text-black/45">First letter</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <LetterPill active={letter === "All"} letter="All" onClick={() => setLetter("All")} />
                    {ALPH.map((L) => (
                      <LetterPill key={L} active={letter === L} letter={L} onClick={() => setLetter(L)} />
                    ))}
                  </div>
                </div>

                {/* Saved */}
                <div className="rounded-2xl bg-black/5 border border-black/10 px-4 py-3">
                  <p className="text-[11px] font-extrabold text-black/45">Saved</p>
                  <p className="mt-1 text-[13px] font-extrabold text-[#0b1020]">
                    {saved.size} {saved.size === 1 ? "name" : "names"}
                  </p>
                </div>
              </div>
            </aside>

            {/* Table */}
            <section className="rounded-[18px] bg-white border border-black/10 shadow-[0_18px_60px_rgba(0,0,0,0.08)] overflow-hidden">
              <div className="px-6 py-5 flex items-center justify-between">
                <div>
                  <p className="font-extrabold text-[13px] text-[#0b1020]">Baby Names</p>
                  <p className="text-[11px] font-semibold text-black/45 mt-0.5">
                    {results.length} result{results.length === 1 ? "" : "s"}
                  </p>
                </div>
              </div>

              <div className="px-4 pb-4">
                <div className="rounded-2xl border border-black/10 overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="bg-black/5">
                      <tr>
                        <th className="w-12 px-4 py-3 text-[10px] font-extrabold text-black/35">FAV</th>
                        <th className="px-4 py-3 text-[10px] font-extrabold text-black/35">NAME</th>
                        <th className="px-4 py-3 text-[10px] font-extrabold text-black/35">GENDER</th>
                        <th className="hidden md:table-cell px-4 py-3 text-[10px] font-extrabold text-black/35">
                          ORIGIN
                        </th>
                        <th className="hidden lg:table-cell px-4 py-3 text-[10px] font-extrabold text-black/35">
                          MEANING
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {results.map((n) => {
                        const isSaved = saved.has(n.name);
                        return (
                          <tr key={n.name} className="border-t border-black/10">
                            <td className="px-4 py-4">
                              <button
                                onClick={() => toggleSave(n.name)}
                                className={
                                  "h-9 w-9 rounded-2xl border grid place-items-center transition " +
                                  (isSaved
                                    ? "bg-pink-500/10 border-pink-500/20"
                                    : "bg-white border-black/10 hover:bg-black/5")
                                }
                              >
                                <Heart size={16} className={isSaved ? "text-pink-600 fill-pink-600" : "text-black/35"} />
                              </button>
                            </td>

                            <td className="px-4 py-4">
                              <p className="text-[13px] font-extrabold text-[#0b1020]">{n.name}</p>
                            </td>

                            <td className="px-4 py-4">
                              <GenderBadge gender={n.gender} />
                            </td>

                            <td className="hidden md:table-cell px-4 py-4 text-[13px] font-semibold text-black/55">
                              {n.origin}
                            </td>

                            <td className="hidden lg:table-cell px-4 py-4 text-[13px] font-semibold text-black/55">
                              {n.meaning}
                            </td>
                          </tr>
                        );
                      })}

                      {results.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="px-6 py-10 text-center">
                            <p className="text-[13px] font-extrabold text-[#0b1020]">No matches found</p>
                            <p className="mt-1 text-[12px] font-semibold text-black/50">
                              Try a different search or clear filters.
                            </p>
                            <button
                              onClick={clearAll}
                              className="mt-4 h-10 px-4 rounded-2xl bg-[#ec4899] text-white text-[12px] font-extrabold"
                            >
                              Clear filters
                            </button>
                          </td>
                        </tr>
                      ) : null}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </div>
        </section>
      </div>

      <div className="pb-10" />
    </main>
  );
}
