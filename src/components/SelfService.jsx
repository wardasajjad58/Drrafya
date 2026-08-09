import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Zap, Activity, Search, Sparkles } from "lucide-react";
import "./SelfService.css";

const ease = [0.22, 1, 0.36, 1];

const tools = [
  { title: "Due Date Calculator", desc: "Calculate your estimated arrival date based on your LMP", icon: CalendarDays },
  { title: "Ovulation Finder", desc: "Track your fertile window to maximize conception chances.", icon: Zap },
  { title: "Pregnancy BMI", desc: "Monitor your healthy weight gain trends.", icon: Activity },
  { title: "Symptom Checker", desc: "Instant guidance on common pregnancy symptoms.", icon: Search },
];

const parent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const child = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

export default function SelfService() {
  const [lmp, setLmp] = useState("");
  const [cycle, setCycle] = useState("28");

  const result = useMemo(() => {
    if (!lmp) return "";
    const base = new Date(lmp);
    if (Number.isNaN(base.getTime())) return "";
    const adjust = parseInt(cycle, 10) - 28;
    const due = addDays(base, 280 + adjust);
    return due.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  }, [lmp, cycle]);

  return (
    <section id="tools" className="ss-section">
      <div className="ss-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease }}
          className="ss-main-panel"
        >
          {/* Ambient Lighting Orbs */}
          <div className="ss-glow-top" />
          <div className="ss-glow-bottom" />

          <div className="ss-grid">
            {/* LEFT COLUMN */}
            <div className="ss-left-wrapper">
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, ease }}
                className="ss-badge"
              >
                Utility &amp; Tools
              </motion.p>

              <motion.h3
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, delay: 0.05, ease }}
                className="ss-title"
              >
                Self-Service Health Center
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, delay: 0.1, ease }}
                className="ss-subtitle"
              >
                Quick, data-driven actions at your fingertips. From vaccination schedules to fertility
                trackers, manage your health with our verified digital tools.
              </motion.p>

              {/* BENTO CARDS */}
              <motion.div
                variants={parent}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                className="ss-bento-grid"
              >
                {tools.map((t) => {
                  const Icon = t.icon;
                  return (
                    <motion.div
                      key={t.title}
                      variants={child}
                      whileHover={{ y: -5 }}
                      whileTap={{ scale: 0.98 }}
                      className="ss-bento-item"
                    >
                      <div className="ss-icon-wrapper">
                        <Icon size={20} />
                      </div>

                      <div>
                        <h4 className="ss-item-title">{t.title}</h4>
                        <p className="ss-item-desc">{t.desc}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

            {/* RIGHT CALCULATOR CARD (MATCHES HEIGHT) */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.65, delay: 0.08, ease }}
              className="ss-calc-card"
            >
              <div className="ss-calc-head">
                <h4 className="ss-calc-head-title">Due Date Calculator</h4>
                <div className="ss-calc-chip">
                  <Sparkles size={12} />
                  Interactive
                </div>
              </div>

              <div className="ss-calc-body">
                <div className="ss-form-field">
                  <label className="ss-field-label">First day of last period (LMP)</label>
                  <input
                    type="date"
                    value={lmp}
                    onChange={(e) => setLmp(e.target.value)}
                    className="ss-input-control"
                  />
                </div>

                <div className="ss-form-field">
                  <label className="ss-field-label">Average Cycle Length</label>
                  <select
                    value={cycle}
                    onChange={(e) => setCycle(e.target.value)}
                    className="ss-select-control"
                  >
                    <option value="27">27 days</option>
                    <option value="28">28 days (Standard)</option>
                    <option value="29">29 days</option>
                    <option value="30">30 days</option>
                  </select>
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="ss-action-btn"
                  type="button"
                >
                  Calculate Now
                </motion.button>
              </div>

              <div className="ss-calc-footer">
                <p className="ss-disclaimer">
                  Medical Validation Required For Accuracy
                </p>

                {result && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, ease }}
                    className="ss-result-card"
                  >
                    <p className="ss-result-label">Estimated Due Date</p>
                    <p className="ss-result-value">{result}</p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}