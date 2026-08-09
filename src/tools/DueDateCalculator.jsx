import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Calendar, ChevronDown, Sparkles, RefreshCw, AlertCircle } from "lucide-react";
import "./DueDateCalculator.css";

export default function DueDateCalculator() {
  const { t } = useTranslation();

  // Calculation Method: 'lmp', 'conception', 'ivf3', 'ivf5', 'ultrasound'
  const [method, setMethod] = useState("lmp");
  
  // Dynamic Inputs
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [cycleLength, setCycleLength] = useState(28);
  const [gestationalWeeks, setGestationalWeeks] = useState(8);
  const [gestationalDays, setGestationalDays] = useState(0);

  // Result & UI State
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const calculateDueDate = (e) => {
    e.preventDefault();
    setError("");

    if (!startDate) {
      setError(t("Please select a valid date.", "Please select a valid date."));
      return;
    }

    const baseDate = new Date(startDate);
    if (isNaN(baseDate.getTime())) {
      setError(t("Invalid date provided.", "Invalid date provided."));
      return;
    }

    let dueDate = new Date(baseDate);
    let estimatedConception = new Date(baseDate);

    // Standard gestation period = 280 days (40 weeks) from LMP
    if (method === "lmp") {
      // Naegele's Rule adjustment for cycle length
      const cycleAdjustment = cycleLength - 28;
      const totalDaysToAdd = 280 + cycleAdjustment;
      dueDate.setDate(baseDate.getDate() + totalDaysToAdd);
      
      estimatedConception.setDate(baseDate.getDate() + 14 + cycleAdjustment);
    } else if (method === "conception") {
      dueDate.setDate(baseDate.getDate() + 266);
      estimatedConception = new Date(baseDate);
    } else if (method === "ivf3") {
      // 3-day embryo transfer
      dueDate.setDate(baseDate.getDate() + 263);
      estimatedConception.setDate(baseDate.getDate() - 3);
    } else if (method === "ivf5") {
      // 5-day blastocyst transfer
      dueDate.setDate(baseDate.getDate() + 261);
      estimatedConception.setDate(baseDate.getDate() - 5);
    } else if (method === "ultrasound") {
      const scannedDays = gestationalWeeks * 7 + parseInt(gestationalDays, 10);
      const remainingDays = 280 - scannedDays;
      dueDate.setDate(baseDate.getDate() + remainingDays);
      
      estimatedConception.setDate(baseDate.getDate() - scannedDays + 14);
    }

    // Calculate current gestational age from today
    const today = new Date();
    const totalGestationDays = 280 - Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
    
    let currentWeek = Math.floor(totalGestationDays / 7);
    let currentDay = totalGestationDays % 7;

    if (currentWeek < 0) {
      currentWeek = 0;
      currentDay = 0;
    }

    const options = { year: "numeric", month: "long", day: "numeric" };

    setResult({
      formattedDueDate: dueDate.toLocaleDateString("en-US", options),
      formattedConceptionDate: estimatedConception.toLocaleDateString("en-US", options),
      currentWeek: currentWeek > 40 ? 40 : currentWeek,
      currentDay: currentWeek > 40 ? 0 : currentDay,
      trimester:
        currentWeek <= 12
          ? t("First Trimester", "First Trimester")
          : currentWeek <= 27
          ? t("Second Trimester", "Second Trimester")
          : t("Third Trimester", "Third Trimester"),
    });
  };

  const handleReset = () => {
    setResult(null);
    setError("");
  };

  return (
    <section className="due-calc-section">
      <div className="due-calc-container">
        
        {/* Top Header Block */}
        <div className="due-calc-header">
          <div className="calendar-icon-badge">
            <Calendar size={32} className="header-icon" />
          </div>
          <h2 className="due-calc-title">
            {t("Pregnancy Due Date Calculator", "Pregnancy Due Date Calculator")}
          </h2>
          <p className="due-calc-subtitle">
            {t(
              "When is your baby due? Use this pregnancy calculator to find your due date based on the date of your last menstrual period, conception date, IVF three-day or five-day transfer date, or date of your last ultrasound.",
              "When is your baby due? Use this pregnancy calculator to find your due date based on the date of your last menstrual period, conception date, IVF three-day or five-day transfer date, or date of your last ultrasound."
            )}
          </p>
        </div>

        {/* Main Card View */}
        <div className="due-calc-card">
          <AnimatePresence mode="wait">
            {!result ? (
              <motion.form
                key="due-date-form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onSubmit={calculateDueDate}
                className="due-calc-form"
              >
                {error && (
                  <div className="due-calc-error">
                    <AlertCircle size={18} />
                    <span>{error}</span>
                  </div>
                )}

                {/* 1. Method Selection */}
                <div className="due-form-group">
                  <label className="due-form-label">
                    {t("Calculation Method", "Calculation Method")}
                  </label>
                  <div className="due-select-wrapper">
                    <select
                      value={method}
                      onChange={(e) => setMethod(e.target.value)}
                      className="due-form-input custom-select"
                    >
                      <option value="lmp">{t("Last Period", "Last Period")}</option>
                      <option value="conception">{t("Conception Date", "Conception Date")}</option>
                      <option value="ivf3">{t("IVF 3-Day Transfer", "IVF 3-Day Transfer")}</option>
                      <option value="ivf5">{t("IVF 5-Day Transfer", "IVF 5-Day Transfer")}</option>
                      <option value="ultrasound">{t("Ultrasound Date", "Ultrasound Date")}</option>
                    </select>
                    <ChevronDown className="select-icon" size={18} />
                  </div>
                </div>

                {/* 2. Dynamic Input Based on Method */}
                <div className="due-form-group">
                  <label className="due-form-label">
                    {method === "lmp" && t("The first day of your last period", "The first day of your last period")}
                    {method === "conception" && t("Estimated Conception Date", "Estimated Conception Date")}
                    {method === "ivf3" && t("3-Day Transfer Date", "3-Day Transfer Date")}
                    {method === "ivf5" && t("5-Day Transfer Date", "5-Day Transfer Date")}
                    {method === "ultrasound" && t("Date of Ultrasound Scan", "Date of Ultrasound Scan")}
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="due-form-input date-input"
                  />
                </div>

                {/* Extra fields if Last Period */}
                {method === "lmp" && (
                  <div className="due-form-group">
                    <label className="due-form-label">{t("Cycle Length", "Cycle Length")}</label>
                    <div className="due-select-wrapper">
                      <select
                        value={cycleLength}
                        onChange={(e) => setCycleLength(parseInt(e.target.value, 10))}
                        className="due-form-input custom-select"
                      >
                        {Array.from({ length: 25 }, (_, i) => i + 20).map((days) => (
                          <option key={days} value={days}>
                            {days} {t("days", "days")}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="select-icon" size={18} />
                    </div>
                  </div>
                )}

                {/* Extra fields if Ultrasound */}
                {method === "ultrasound" && (
                  <div className="due-form-group">
                    <label className="due-form-label">
                      {t("Gestational Age at Scan", "Gestational Age at Scan")}
                    </label>
                    <div className="dual-inputs">
                      <div className="due-select-wrapper">
                        <select
                          value={gestationalWeeks}
                          onChange={(e) => setGestationalWeeks(parseInt(e.target.value, 10))}
                          className="due-form-input custom-select"
                        >
                          {Array.from({ length: 30 }, (_, i) => i + 4).map((w) => (
                            <option key={w} value={w}>
                              {w} {t("weeks", "weeks")}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="select-icon" size={18} />
                      </div>
                      <div className="due-select-wrapper">
                        <select
                          value={gestationalDays}
                          onChange={(e) => setGestationalDays(parseInt(e.target.value, 10))}
                          className="due-form-input custom-select"
                        >
                          {Array.from({ length: 7 }, (_, i) => i).map((d) => (
                            <option key={d} value={d}>
                              {d} {t("days", "days")}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="select-icon" size={18} />
                      </div>
                    </div>
                  </div>
                )}

                {/* Calculate CTA Button */}
                <div className="due-calc-action">
                  <motion.button
                    type="submit"
                    className="due-submit-btn"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {t("Calculate My Due Date", "Calculate My Due Date")}
                  </motion.button>
                </div>

                <div className="conception-link-wrapper">
                  <button
                    type="button"
                    onClick={() => setMethod("conception")}
                    className="conception-link"
                  >
                    {t("Want to know your conception date?", "Want to know your conception date?")}
                  </button>
                </div>
              </motion.form>
            ) : (
              /* Calculated Due Date Output Screen */
              <motion.div
                key="due-date-result"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                className="due-result-wrapper"
              >
                <div className="due-result-badge">
                  <Sparkles size={28} className="sparkle-icon" />
                </div>

                <h3 className="result-heading">{t("Your Estimated Due Date", "Your Estimated Due Date")}</h3>
                
                <div className="primary-date-display">
                  {result.formattedDueDate}
                </div>

                <div className="due-details-grid">
                  <div className="due-detail-card">
                    <span className="detail-label">{t("Estimated Conception", "Estimated Conception")}</span>
                    <span className="detail-val">{result.formattedConceptionDate}</span>
                  </div>

                  <div className="due-detail-card highlight">
                    <span className="detail-label">{t("Current Progress", "Current Progress")}</span>
                    <span className="detail-val main">
                      {t("Week", "Week")} {result.currentWeek}, {result.currentDay} {t("Days", "Days")}
                    </span>
                    <span className="detail-trimester">{result.trimester}</span>
                  </div>
                </div>

                <div className="due-result-footer">
                  <motion.button
                    type="button"
                    onClick={handleReset}
                    className="recalculate-btn"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <RefreshCw size={16} />
                    {t("Calculate Again", "Calculate Again")}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}