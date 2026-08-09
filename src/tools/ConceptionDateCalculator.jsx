import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Calendar as CalendarIcon, ChevronDown, Sparkles, RefreshCw, AlertCircle } from "lucide-react";
import "./ConceptionDateCalculator.css";

export default function ConceptionCalculator() {
  const { t } = useTranslation();

  // Calculation Method: 'due_date', 'lmp', 'ultrasound'
  const [method, setMethod] = useState("due_date");

  // Dynamic Inputs
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [cycleLength, setCycleLength] = useState(28);
  const [gestationalWeeks, setGestationalWeeks] = useState(8);
  const [gestationalDays, setGestationalDays] = useState(0);

  // Result & State
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const calculateConception = (e) => {
    e.preventDefault();
    setError("");

    if (!selectedDate) {
      setError(t("Please select a valid date.", "Please select a valid date."));
      return;
    }

    const inputDate = new Date(selectedDate);
    if (isNaN(inputDate.getTime())) {
      setError(t("Invalid date selected.", "Invalid date selected."));
      return;
    }

    let estimatedConception = new Date(inputDate);
    let estimatedDueDate = new Date(inputDate);

    // Medical Calculation Formulas
    if (method === "due_date") {
      // Conception is roughly 266 days (38 weeks) before due date
      estimatedConception.setDate(inputDate.getDate() - 266);
      estimatedDueDate = new Date(inputDate);
    } else if (method === "lmp") {
      // Conception happens around 14 days after LMP (adjusted for cycle length)
      const cycleAdjustment = cycleLength - 28;
      estimatedConception.setDate(inputDate.getDate() + 14 + cycleAdjustment);
      
      // Due Date is 280 days + cycle adjustment from LMP
      estimatedDueDate.setDate(inputDate.getDate() + 280 + cycleAdjustment);
    } else if (method === "ultrasound") {
      // Calculate gestational age in days at scan time
      const scannedDays = gestationalWeeks * 7 + parseInt(gestationalDays, 10);
      
      // Conception date = Scan Date - Scanned Days + 14 days
      estimatedConception.setDate(inputDate.getDate() - scannedDays + 14);
      
      // Due Date = Scan Date + (280 - Scanned Days)
      estimatedDueDate.setDate(inputDate.getDate() + (280 - scannedDays));
    }

    // Conception Window Calculation (typically 3 days before to 1 day after estimated conception)
    const windowStart = new Date(estimatedConception);
    windowStart.setDate(estimatedConception.getDate() - 3);

    const windowEnd = new Date(estimatedConception);
    windowEnd.setDate(estimatedConception.getDate() + 1);

    const dateOptions = { month: "long", day: "numeric", year: "numeric" };

    setResult({
      formattedConception: estimatedConception.toLocaleDateString("en-US", dateOptions),
      formattedDueDate: estimatedDueDate.toLocaleDateString("en-US", dateOptions),
      windowStart: windowStart.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      windowEnd: windowEnd.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    });
  };

  const handleReset = () => {
    setResult(null);
    setError("");
  };

  return (
    <section className="conception-calc-section">
      <div className="conception-calc-container">
        
        {/* Purple Header Banner */}
        <div className="conception-banner">
          <div className="banner-icon-badge">
            <CalendarIcon size={32} className="banner-calendar-icon" />
          </div>
          <h2 className="banner-title">
            {t("Conception Date Calculator: When Did You Conceive?", "Conception Date Calculator: When Did You Conceive?")}
          </h2>
        </div>

        {/* Intro Subtitle */}
        <p className="conception-subtitle">
          {t(
            "Wondering when your baby was conceived? Use our Conception Date Calculator to find out the most likely date you conceived your little bundle. You may even be able to use your conception date to see how far along you are and when baby is likely to arrive.",
            "Wondering when your baby was conceived? Use our Conception Date Calculator to find out the most likely date you conceived your little bundle. You may even be able to use your conception date to see how far along you are and when baby is likely to arrive."
          )}
        </p>

        {/* Card Form Block */}
        <div className="conception-card">
          <AnimatePresence mode="wait">
            {!result ? (
              <motion.form
                key="conception-form"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                onSubmit={calculateConception}
                className="conception-form"
              >
                {error && (
                  <div className="conception-error">
                    <AlertCircle size={18} />
                    <span>{error}</span>
                  </div>
                )}

                {/* 1. Calculation Method */}
                <div className="conception-form-group">
                  <label className="conception-label">
                    {t("Calculation Method", "Calculation Method")}
                  </label>
                  <div className="conception-select-wrapper">
                    <select
                      value={method}
                      onChange={(e) => setMethod(e.target.value)}
                      className="conception-input custom-select"
                    >
                      <option value="due_date">{t("Due Date", "Due Date")}</option>
                      <option value="lmp">{t("Last Period (LMP)", "Last Period (LMP)")}</option>
                      <option value="ultrasound">{t("Ultrasound Date", "Ultrasound Date")}</option>
                    </select>
                    <ChevronDown className="select-arrow" size={18} />
                  </div>
                </div>

                {/* 2. Dynamic Input Label & Field */}
                <div className="conception-form-group">
                  <label className="conception-label">
                    {method === "due_date" && t("What is your due date?", "What is your due date?")}
                    {method === "lmp" && t("The first day of your last period", "The first day of your last period")}
                    {method === "ultrasound" && t("Date of your ultrasound scan", "Date of your ultrasound scan")}
                  </label>
                  <div className="conception-date-wrapper">
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="conception-input date-field"
                    />
                  </div>
                </div>

                {/* Optional Cycle Length for LMP */}
                {method === "lmp" && (
                  <div className="conception-form-group">
                    <label className="conception-label">{t("Cycle Length", "Cycle Length")}</label>
                    <div className="conception-select-wrapper">
                      <select
                        value={cycleLength}
                        onChange={(e) => setCycleLength(parseInt(e.target.value, 10))}
                        className="conception-input custom-select"
                      >
                        {Array.from({ length: 25 }, (_, i) => i + 20).map((days) => (
                          <option key={days} value={days}>
                            {days} {t("days", "days")}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="select-arrow" size={18} />
                    </div>
                  </div>
                )}

                {/* Optional Gestational Age for Ultrasound */}
                {method === "ultrasound" && (
                  <div className="conception-form-group">
                    <label className="conception-label">
                      {t("Gestational Age at Scan", "Gestational Age at Scan")}
                    </label>
                    <div className="dual-select-grid">
                      <div className="conception-select-wrapper">
                        <select
                          value={gestationalWeeks}
                          onChange={(e) => setGestationalWeeks(parseInt(e.target.value, 10))}
                          className="conception-input custom-select"
                        >
                          {Array.from({ length: 30 }, (_, i) => i + 4).map((w) => (
                            <option key={w} value={w}>
                              {w} {t("weeks", "weeks")}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="select-arrow" size={18} />
                      </div>
                      <div className="conception-select-wrapper">
                        <select
                          value={gestationalDays}
                          onChange={(e) => setGestationalDays(parseInt(e.target.value, 10))}
                          className="conception-input custom-select"
                        >
                          {Array.from({ length: 7 }, (_, i) => i).map((d) => (
                            <option key={d} value={d}>
                              {d} {t("days", "days")}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="select-arrow" size={18} />
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Submit Button */}
                <div className="conception-action">
                  <motion.button
                    type="submit"
                    className="conception-submit-btn"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {t("Calculate Conception Date", "Calculate Conception Date")}
                  </motion.button>
                </div>

                <p className="conception-disclaimer">
                  {t("*The results of this calculator are estimations only.", "*The results of this calculator are estimations only.")}
                </p>
              </motion.form>
            ) : (
              /* Output Display Screen */
              <motion.div
                key="conception-result"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                className="conception-result-view"
              >
                <div className="result-badge-icon">
                  <Sparkles size={28} className="sparkle-svg" />
                </div>

                <span className="result-tagline">
                  {t("Estimated Conception Date", "Estimated Conception Date")}
                </span>

                <h3 className="primary-conception-date">
                  {result.formattedConception}
                </h3>

                <div className="conception-result-cards">
                  <div className="result-sub-card">
                    <span className="sub-card-label">{t("Conception Window", "Conception Window")}</span>
                    <span className="sub-card-value">
                      {result.windowStart} - {result.windowEnd}
                    </span>
                  </div>

                  <div className="result-sub-card highlight">
                    <span className="sub-card-label">{t("Estimated Due Date", "Estimated Due Date")}</span>
                    <span className="sub-card-value main">{result.formattedDueDate}</span>
                  </div>
                </div>

                <div className="conception-reset-wrapper">
                  <motion.button
                    type="button"
                    onClick={handleReset}
                    className="recalc-btn"
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