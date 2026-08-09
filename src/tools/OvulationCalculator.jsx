import { useState } from "react";
import { Calendar, RefreshCw, Sparkles, Heart, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "./OvulationCalculator.css";

export default function OvulationCalculator() {
  const [lastPeriod, setLastPeriod] = useState("2026-07-18");
  const [cycleLength, setCycleLength] = useState(28);
  const [results, setResults] = useState(null);

  const calculateFertility = (e) => {
    e.preventDefault();
    if (!lastPeriod) return;

    const startDate = new Date(lastPeriod);
    const cycle = parseInt(cycleLength, 10);

    // Estimated Ovulation: ~14 days before next period
    const nextPeriodDate = new Date(startDate);
    nextPeriodDate.setDate(startDate.getDate() + cycle);

    const ovulationDate = new Date(nextPeriodDate);
    ovulationDate.setDate(nextPeriodDate.getDate() - 14);

    // Fertile Window: 4 days before ovulation to 1 day after
    const fertileStart = new Date(ovulationDate);
    fertileStart.setDate(ovulationDate.getDate() - 4);

    const fertileEnd = new Date(ovulationDate);
    fertileEnd.setDate(ovulationDate.getDate() + 1);

    const formatDate = (date) =>
      date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });

    const formatRange = (start, end) =>
      `${start.toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${end.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;

    setResults({
      fertileWindow: formatRange(fertileStart, fertileEnd),
      ovulationDay: formatDate(ovulationDate),
      nextPeriod: formatDate(nextPeriodDate),
    });
  };

  return (
    <section className="calc-section">
      <div className="calc-glow-1" />
      <div className="calc-glow-2" />

      <div className="calc-container">
        <div className="calc-card">
          {/* HEADER */}
          <div className="calc-header">
            <div className="calc-badge-wrapper">
              <Heart size={14} className="calc-badge-icon" />
              <p className="calc-badge-text">Fertility Insights</p>
            </div>
            <h3 className="calc-title">
              Ovulation <span className="calc-title-accent">Calculator</span>
            </h3>
            <p className="calc-subtitle">
              Discover your most fertile days and boost your chances of conceiving with our simple cycle tracker.
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={calculateFertility} className="calc-form">
            <div className="calc-input-group">
              <label className="calc-label">
                <Calendar size={16} className="calc-label-icon" />
                <span>The first day of your last period</span>
              </label>
              <input
                type="date"
                value={lastPeriod}
                onChange={(e) => setLastPeriod(e.target.value)}
                className="calc-input-field"
                required
              />
            </div>

            <div className="calc-input-group">
              <label className="calc-label">
                <RefreshCw size={16} className="calc-label-icon" />
                <span>Typical cycle length</span>
              </label>
              <select
                value={cycleLength}
                onChange={(e) => setCycleLength(e.target.value)}
                className="calc-select-field"
              >
                {Array.from({ length: 23 }, (_, i) => i + 22).map((days) => (
                  <option key={days} value={days}>
                    {days} days {days === 28 ? "(Average)" : ""}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="calc-btn">
              <span>Show Fertility Dates</span>
              <ChevronRight size={18} />
            </button>
          </form>

          {/* DYNAMIC RESULTS DISPLAY */}
          <AnimatePresence>
            {results && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="calc-results"
              >
                <div className="results-grid">
                  <div className="result-card result-card-highlight">
                    <p className="result-label">Most Fertile Window</p>
                    <p className="result-value">{results.fertileWindow}</p>
                  </div>

                  <div className="result-card">
                    <p className="result-label">Estimated Ovulation</p>
                    <p className="result-value">{results.ovulationDay}</p>
                  </div>

                  <div className="result-card">
                    <p className="result-label">Next Period Expected</p>
                    <p className="result-value">{results.nextPeriod}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}