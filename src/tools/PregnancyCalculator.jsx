import { useState } from "react";
import { Calendar, RefreshCw, Layers, Baby, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "./PregnancyCalculator.css";

export default function PregnancyCalculator() {
  const [method, setMethod] = useState("last_period");
  const [inputDate, setInputDate] = useState("2026-07-16");
  const [cycleLength, setCycleLength] = useState(28);
  const [results, setResults] = useState(null);

  const calculateDueDate = (e) => {
    e.preventDefault();
    if (!inputDate) return;

    const baseDate = new Date(inputDate);
    let dueDate = new Date(baseDate);

    // Standard pregnancy duration: 280 days (40 weeks) from LMP
    if (method === "last_period") {
      const cycleAdjustment = parseInt(cycleLength, 10) - 28;
      dueDate.setDate(baseDate.getDate() + 280 + cycleAdjustment);
    } else if (method === "conception") {
      dueDate.setDate(baseDate.getDate() + 266);
    } else if (method === "ivf_3day") {
      dueDate.setDate(baseDate.getDate() + 263);
    } else if (method === "ivf_5day") {
      dueDate.setDate(baseDate.getDate() + 261);
    } else if (method === "ultrasound") {
      dueDate.setDate(baseDate.getDate() + 280);
    }

    const formatDate = (date) =>
      date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });

    // Calculate Trimester
    const today = new Date();
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const daysElapsed = 280 - diffDays;
    const currentWeek = Math.max(1, Math.min(40, Math.floor(daysElapsed / 7)));

    let trimester = "First Trimester";
    if (currentWeek > 12 && currentWeek <= 27) {
      trimester = "Second Trimester";
    } else if (currentWeek > 27) {
      trimester = "Third Trimester";
    }

    // Conception Date Estimate
    const estConception = new Date(dueDate);
    estConception.setDate(dueDate.getDate() - 266);

    setResults({
      dueDate: formatDate(dueDate),
      conceptionDate: formatDate(estConception),
      trimesterStatus: `${trimester} (W${currentWeek})`,
    });
  };

  return (
    <section className="pcalc-section">
      <div className="pcalc-glow-1" />
      <div className="pcalc-glow-2" />

      <div className="pcalc-container">
        <div className="pcalc-card">
          
          {/* HEADER */}
          <div className="pcalc-header">
            <div className="pcalc-badge-wrapper">
              <Baby size={15} className="pcalc-badge-icon" />
              <p className="pcalc-badge-text">DUE DATE TRACKER</p>
            </div>
            <h3 className="pcalc-title">
              Pregnancy Due Date <span className="pcalc-title-accent">Calculator</span>
            </h3>
            <p className="pcalc-subtitle">
              When is your baby due? Find your estimated due date based on your last menstrual period, conception, IVF transfer, or ultrasound date.
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={calculateDueDate} className="pcalc-form">
            
            {/* METHOD SELECTOR */}
            <div className="pcalc-input-group">
              <label className="pcalc-label">
                <Layers size={16} className="pcalc-label-icon" />
                <span>Calculation Method</span>
              </label>
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="pcalc-select-field"
              >
                <option value="last_period">Last Period Date</option>
                <option value="conception">Conception Date</option>
                <option value="ivf_3day">IVF 3-Day Transfer Date</option>
                <option value="ivf_5day">IVF 5-Day Transfer Date</option>
                <option value="ultrasound">Ultrasound Date</option>
              </select>
            </div>

            {/* DATE INPUT */}
            <div className="pcalc-input-group">
              <label className="pcalc-label">
                <Calendar size={16} className="pcalc-label-icon" />
                <span>
                  {method === "last_period" && "The first day of your last period"}
                  {method === "conception" && "Date of conception"}
                  {method === "ivf_3day" && "3-Day embryo transfer date"}
                  {method === "ivf_5day" && "5-Day blastocyst transfer date"}
                  {method === "ultrasound" && "Date of your ultrasound"}
                </span>
              </label>
              <input
                type="date"
                value={inputDate}
                onChange={(e) => setInputDate(e.target.value)}
                className="pcalc-input-field"
                required
              />
            </div>

            {/* CYCLE LENGTH (ONLY FOR LAST PERIOD METHOD) */}
            {method === "last_period" && (
              <div className="pcalc-input-group">
                <label className="pcalc-label">
                  <RefreshCw size={16} className="pcalc-label-icon" />
                  <span>Cycle Length</span>
                </label>
                <select
                  value={cycleLength}
                  onChange={(e) => setCycleLength(e.target.value)}
                  className="pcalc-select-field"
                >
                  {Array.from({ length: 23 }, (_, i) => i + 22).map((days) => (
                    <option key={days} value={days}>
                      {days} days {days === 28 ? "(Average)" : ""}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <button type="submit" className="pcalc-btn">
              <span>Calculate My Due Date</span>
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
                className="pcalc-results"
              >
                <div className="pcalc-results-grid">
                  <div className="pcalc-result-card pcalc-result-card-main">
                    <p className="pcalc-result-label">Estimated Due Date</p>
                    <p className="pcalc-result-value">{results.dueDate}</p>
                  </div>

                  <div className="pcalc-result-card">
                    <p className="pcalc-result-label">Est. Conception Date</p>
                    <p className="pcalc-result-value">{results.conceptionDate}</p>
                  </div>

                  <div className="pcalc-result-card">
                    <p className="pcalc-result-label">Stage / Trimester</p>
                    <p className="pcalc-result-value">{results.trimesterStatus}</p>
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