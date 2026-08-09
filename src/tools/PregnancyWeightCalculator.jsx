import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ChevronDown, Scale, CheckCircle2, AlertCircle, RefreshCw } from "lucide-react";
import "./PregnancyWeightCalculator.css";

export default function WeightCalculator() {
  const { t } = useTranslation();

  // Unit system toggle: 'imperial' (in, lb, oz) vs 'metric' (cm, kg, ml)
  const [unitSystem, setUnitSystem] = useState("imperial");

  // Form State
  const [week, setWeek] = useState("1");
  const [preWeight, setPreWeight] = useState("");
  const [currentWeight, setCurrentWeight] = useState("");
  const [heightFeet, setHeightFeet] = useState("");
  const [heightInches, setHeightInches] = useState("");
  const [heightCm, setHeightCm] = useState("");
  const [isTwins, setIsTwins] = useState(false);

  // Result State
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const calculateWeightGain = (e) => {
    e.preventDefault();
    setError("");

    // 1. Convert height to meters & inches
    let heightInMeters = 0;
    if (unitSystem === "imperial") {
      const feet = parseFloat(heightFeet) || 0;
      const inches = parseFloat(heightInches) || 0;
      const totalInches = feet * 12 + inches;
      heightInMeters = totalInches * 0.0254;
    } else {
      heightInMeters = (parseFloat(heightCm) || 0) / 100;
    }

    // 2. Convert weights to kg & lbs
    let preWeightKg = 0;
    let currentWeightKg = 0;
    if (unitSystem === "imperial") {
      preWeightKg = (parseFloat(preWeight) || 0) * 0.453592;
      currentWeightKg = (parseFloat(currentWeight) || 0) * 0.453592;
    } else {
      preWeightKg = parseFloat(preWeight) || 0;
      currentWeightKg = parseFloat(currentWeight) || 0;
    }

    // Validation
    if (!heightInMeters || heightInMeters <= 0) {
      setError(t("Please enter a valid height.", "Please enter a valid height."));
      return;
    }
    if (!preWeightKg || preWeightKg <= 0) {
      setError(t("Please enter a valid pre-pregnancy weight.", "Please enter a valid pre-pregnancy weight."));
      return;
    }
    if (!currentWeightKg || currentWeightKg <= 0) {
      setError(t("Please enter a valid current weight.", "Please enter a valid current weight."));
      return;
    }

    // 3. BMI Calculation
    const bmi = preWeightKg / (heightInMeters * heightInMeters);

    // 4. Categorize BMI & Weight Target (IOM Guidelines)
    let bmiCategory = "";
    let minTotalGain = 0;
    let maxTotalGain = 0;

    if (!isTwins) {
      if (bmi < 18.5) {
        bmiCategory = t("Underweight", "Underweight");
        minTotalGain = 12.5; // kg
        maxTotalGain = 18.0;
      } else if (bmi >= 18.5 && bmi < 24.9) {
        bmiCategory = t("Normal Weight", "Normal Weight");
        minTotalGain = 11.5;
        maxTotalGain = 16.0;
      } else if (bmi >= 25.0 && bmi < 29.9) {
        bmiCategory = t("Overweight", "Overweight");
        minTotalGain = 7.0;
        maxTotalGain = 11.5;
      } else {
        bmiCategory = t("Obese", "Obese");
        minTotalGain = 5.0;
        maxTotalGain = 9.0;
      }
    } else {
      // Twins guidelines
      if (bmi < 25.0) {
        bmiCategory = t("Normal/Underweight (Twins)", "Normal/Underweight (Twins)");
        minTotalGain = 16.8;
        maxTotalGain = 24.5;
      } else if (bmi >= 25.0 && bmi < 29.9) {
        bmiCategory = t("Overweight (Twins)", "Overweight (Twins)");
        minTotalGain = 14.1;
        maxTotalGain = 22.7;
      } else {
        bmiCategory = t("Obese (Twins)", "Obese (Twins)");
        minTotalGain = 11.3;
        maxTotalGain = 19.1;
      }
    }

    // 5. Week-by-Week Proportional Calculation
    const currentWeekNum = parseInt(week, 10);
    const actualGainKg = currentWeightKg - preWeightKg;
    
    // First trimester (weeks 1-12) average expected gain: ~0.5 to 2.0 kg
    const firstTrimesterMax = 2.0;
    let expectedMinKg = 0;
    let expectedMaxKg = 0;

    if (currentWeekNum <= 12) {
      const ratio = currentWeekNum / 12;
      expectedMinKg = 0.5 * ratio;
      expectedMaxKg = firstTrimesterMax * ratio;
    } else {
      const remainingWeeks = currentWeekNum - 12;
      const weeklyRateMin = (minTotalGain - firstTrimesterMax) / 28;
      const weeklyRateMax = (maxTotalGain - firstTrimesterMax) / 28;

      expectedMinKg = firstTrimesterMax + weeklyRateMin * remainingWeeks;
      expectedMaxKg = firstTrimesterMax + weeklyRateMax * remainingWeeks;
    }

    // Convert values according to selected unit System
    const isImperial = unitSystem === "imperial";
    const unitLabel = isImperial ? "lbs" : "kg";
    const factor = isImperial ? 2.20462 : 1;

    const actualGainDisplay = (actualGainKg * factor).toFixed(1);
    const expectedMinDisplay = (expectedMinKg * factor).toFixed(1);
    const expectedMaxDisplay = (expectedMaxKg * factor).toFixed(1);

    // Status evaluation
    let status = "on_track";
    const actualGainVal = actualGainKg * factor;
    if (actualGainVal < expectedMinKg * factor - 1.0) {
      status = "below";
    } else if (actualGainVal > expectedMaxKg * factor + 1.0) {
      status = "above";
    }

    setResult({
      bmi: bmi.toFixed(1),
      bmiCategory,
      actualGain: actualGainDisplay,
      expectedMin: expectedMinDisplay,
      expectedMax: expectedMaxDisplay,
      unitLabel,
      status,
      week: currentWeekNum,
    });
  };

  const handleReset = () => {
    setResult(null);
    setError("");
  };

  return (
    <section className="calc-section">
      <div className="calc-container">
        
        {/* Banner Section */}
        <div className="calc-banner">
          <div className="banner-illustration">
            <div className="illustration-badge">
              <Scale size={42} className="scale-icon" />
            </div>
          </div>
          <div className="banner-content">
            <h2 className="banner-title">
              {t("Pregnancy Weight Gain Calculator", "Pregnancy Weight Gain Calculator")}
            </h2>
            <p className="banner-desc">
              {t(
                "Pregnancy weight gain isn’t one-size-fits-all, but this tool can give you a general idea of what to expect week-by-week.",
                "Pregnancy weight gain isn’t one-size-fits-all, but this tool can give you a general idea of what to expect week-by-week."
              )}
            </p>
          </div>
        </div>

        {/* Form Card */}
        <div className="calc-card">
          <AnimatePresence mode="wait">
            {!result ? (
              <motion.form
                key="calculator-form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onSubmit={calculateWeightGain}
                className="calc-form"
              >
                {/* Unit Toggle Switch */}
                <div className="unit-toggle-wrapper">
                  <button
                    type="button"
                    className={`unit-btn ${unitSystem === "imperial" ? "active" : ""}`}
                    onClick={() => {
                      setUnitSystem("imperial");
                      setPreWeight("");
                      setCurrentWeight("");
                    }}
                  >
                    in, lb, oz
                  </button>
                  <button
                    type="button"
                    className={`unit-btn ${unitSystem === "metric" ? "active" : ""}`}
                    onClick={() => {
                      setUnitSystem("metric");
                      setPreWeight("");
                      setCurrentWeight("");
                    }}
                  >
                    cm, kg, ml
                  </button>
                </div>

                {error && (
                  <div className="calc-error-banner">
                    <AlertCircle size={18} />
                    <span>{error}</span>
                  </div>
                )}

                {/* Field 1: Week Selection */}
                <div className="form-group">
                  <label className="form-label">
                    {t("Your Week of Pregnancy", "Your Week of Pregnancy")}
                  </label>
                  <div className="select-wrapper">
                    <select
                      value={week}
                      onChange={(e) => setWeek(e.target.value)}
                      className="form-input custom-select"
                    >
                      {Array.from({ length: 40 }, (_, i) => i + 1).map((w) => (
                        <option key={w} value={w}>
                          {t(`Week ${w}`, `Week ${w}`)}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="select-icon" size={18} />
                  </div>
                </div>

                {/* Field 2: Pre-Pregnancy Weight */}
                <div className="form-group">
                  <label className="form-label">
                    {t("Your Pre-Pregnancy Weight", "Your Pre-Pregnancy Weight")}
                  </label>
                  <div className="input-wrapper">
                    <input
                      type="number"
                      step="any"
                      placeholder={unitSystem === "imperial" ? "e.g. 135" : "e.g. 60"}
                      value={preWeight}
                      onChange={(e) => setPreWeight(e.target.value)}
                      className="form-input"
                    />
                  </div>
                </div>

                {/* Field 3: Weight Right Now */}
                <div className="form-group">
                  <label className="form-label">
                    {t("Your Weight Right Now", "Your Weight Right Now")}
                  </label>
                  <div className="input-wrapper">
                    <input
                      type="number"
                      step="any"
                      placeholder={unitSystem === "imperial" ? "e.g. 142" : "e.g. 64"}
                      value={currentWeight}
                      onChange={(e) => setCurrentWeight(e.target.value)}
                      className="form-input"
                    />
                  </div>
                </div>

                {/* Field 4: Height Inputs */}
                <div className="form-group">
                  <label className="form-label">{t("Your Height", "Your Height")}</label>
                  {unitSystem === "imperial" ? (
                    <div className="dual-inputs">
                      <input
                        type="number"
                        placeholder="5 feet"
                        value={heightFeet}
                        onChange={(e) => setHeightFeet(e.target.value)}
                        className="form-input"
                      />
                      <input
                        type="number"
                        placeholder="5 in"
                        value={heightInches}
                        onChange={(e) => setHeightInches(e.target.value)}
                        className="form-input"
                      />
                    </div>
                  ) : (
                    <input
                      type="number"
                      placeholder="165 cm"
                      value={heightCm}
                      onChange={(e) => setHeightCm(e.target.value)}
                      className="form-input"
                    />
                  )}
                </div>

                {/* Checkbox: Carrying Twins */}
                <div className="checkbox-group">
                  <label className="custom-checkbox">
                    <input
                      type="checkbox"
                      checked={isTwins}
                      onChange={(e) => setIsTwins(e.target.checked)}
                    />
                    <span className="checkmark"></span>
                    <span className="checkbox-text">
                      {t("I am carrying twins", "I am carrying twins")}
                    </span>
                  </label>
                </div>

                {/* Calculate CTA Button */}
                <div className="calc-action">
                  <motion.button
                    type="submit"
                    className="calc-submit-btn"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {t("Calculate", "Calculate")}
                  </motion.button>
                </div>
              </motion.form>
            ) : (
              /* Results View Display */
              <motion.div
                key="calculator-result"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                className="result-wrapper"
              >
                <div className="result-header">
                  <CheckCircle2 className="result-check-icon" size={42} />
                  <h3>{t("Your Calculated Estimate", "Your Calculated Estimate")}</h3>
                  <p className="result-week-subtitle">
                    {t("For Week", "For Week")} {result.week}
                  </p>
                </div>

                <div className="result-grid">
                  <div className="result-card-item">
                    <span className="res-label">{t("Pre-Pregnancy BMI", "Pre-Pregnancy BMI")}</span>
                    <span className="res-value">{result.bmi}</span>
                    <span className="res-sub">{result.bmiCategory}</span>
                  </div>

                  <div className="result-card-item highlight">
                    <span className="res-label">{t("Current Gain", "Current Gain")}</span>
                    <span className="res-value main">
                      {result.actualGain} {result.unitLabel}
                    </span>
                    <span className={`res-status-pill ${result.status}`}>
                      {result.status === "on_track" && t("On Track", "On Track")}
                      {result.status === "below" && t("Below Target", "Below Target")}
                      {result.status === "above" && t("Above Target", "Above Target")}
                    </span>
                  </div>

                  <div className="result-card-item">
                    <span className="res-label">{t("Recommended Range", "Recommended Range")}</span>
                    <span className="res-value">
                      {result.expectedMin} - {result.expectedMax} {result.unitLabel}
                    </span>
                    <span className="res-sub">{t("For this week", "For this week")}</span>
                  </div>
                </div>

                <div className="result-footer-action">
                  <motion.button
                    type="button"
                    onClick={handleReset}
                    className="recalculate-btn"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <RefreshCw size={16} />
                    {t("Recalculate", "Recalculate")}
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