import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Calendar as CalendarIcon, ChevronDown, Sparkles, RefreshCw, AlertCircle } from "lucide-react";
import './IVFDueDateCalculator.css';

const TRANSFER_TYPES = [
  { type: 'retrieval', label: 'Egg retrieval', sub: 'day of collection', offset: 266 },
  { type: 'day3', label: 'Day 3 transfer', sub: 'cleavage stage', offset: 263 },
  { type: 'day5', label: 'Day 5 transfer', sub: 'blastocyst', offset: 261 },
  { type: 'day6', label: 'Day 6 transfer', sub: 'blastocyst', offset: 260 },
];

const BETA_OFFSETS = { retrieval: 14, day3: 12, day5: 9, day6: 8 };

const MILESTONE_DEFS = [
  { week: 0, label: 'Your date', key: 'origin' },
  { week: 6, label: 'First ultrasound' },
  { week: 8, label: 'Heartbeat check' },
  { week: 12, label: '1st trimester ends' },
  { week: 20, label: 'Anatomy scan' },
  { week: 24, label: 'Viability point' },
  { week: 28, label: '3rd trimester' },
  { week: 37, label: 'Full term' },
  { week: 40, label: 'Due date' },
];

function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function startOfDay(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function fmt(date) {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function IVFDueDateCalendar() {
  const [selectedType, setSelectedType] = useState('day5');
  const [inputDate, setInputDate] = useState(() => {
    const t = new Date();
    return t.toISOString().slice(0, 10);
  });
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    setError('');

    if (!inputDate) {
      setError('Pick a date first.');
      setResult(null);
      return;
    }

    const config = TRANSFER_TYPES.find((t) => t.type === selectedType);
    const origin = startOfDay(new Date(inputDate + 'T00:00:00'));
    const dueDate = addDays(origin, config.offset);
    const lmpEquiv = addDays(dueDate, -280);
    const today = startOfDay(new Date());

    const totalDaysGestation = Math.round((today - lmpEquiv) / 86400000);

    let progressText;
    if (totalDaysGestation >= 0 && today <= dueDate) {
      const wk = Math.floor(totalDaysGestation / 7);
      const dy = totalDaysGestation % 7;
      progressText = `Today, you'd be about ${wk} weeks${dy ? ', ' + dy + ' days' : ''} along.`;
    } else if (today > dueDate) {
      progressText = 'Estimated due date has passed.';
    } else {
      progressText = `Countdown to transfer/retrieval: ${Math.abs(totalDaysGestation)} day(s) out.`;
    }

    const betaDate = addDays(origin, BETA_OFFSETS[selectedType]);

    const milestones = MILESTONE_DEFS.map((m) => {
      const date = m.key === 'origin' ? origin : addDays(lmpEquiv, m.week * 7);
      return {
        ...m,
        date,
        isPast: date < today,
        isToday: date.getTime() === today.getTime(),
      };
    });

    setResult({
      dueDateText: fmt(dueDate),
      progressText,
      betaText: `Typical beta hCG blood test window: around ${fmt(
        betaDate
      )} (approx. — follow your clinic's exact protocol).`,
      milestones,
    });
  };

  return (
    <div className="ivf-wrap">
      <div className="ivf-eyebrow">Gestational Calendar</div>
      <h1 className="ivf-h1">
        Find your <em>due date</em>,<br />
        and the road there.
      </h1>
      <p className="ivf-sub">
        Enter the date of your egg retrieval or embryo transfer. We'll estimate your due date
        and lay out the milestones between here and then.
      </p>

      <div className="ivf-card">
        <span className="ivf-field-label">What date are you entering?</span>
        <div className="ivf-segmented">
          {TRANSFER_TYPES.map((t) => (
            <button
              key={t.type}
              className={selectedType === t.type ? 'active' : ''}
              onClick={() => setSelectedType(t.type)}
              type="button"
            >
              {t.label}
              <span>{t.sub}</span>
            </button>
          ))}
        </div>

        <div className="ivf-row">
          <div className="ivf-date-field">
            <span className="ivf-field-label">Date</span>
            <input
              type="date"
              value={inputDate}
              onChange={(e) => setInputDate(e.target.value)}
            />
          </div>
          <button className="ivf-calc-btn" onClick={handleCalculate} type="button">
            Calculate due date →
          </button>
        </div>
        <div className="ivf-err">{error}</div>
      </div>

      {result && (
        <div className="ivf-result">
          <div className="ivf-stamp">
            <div className="ivf-stamp-ring">
              estimated
              <br />
              due
            </div>
            <div className="ivf-stamp-text">
              <div className="k">Your estimated due date</div>
              <div className="due">{result.dueDateText}</div>
              <div className="progress">{result.progressText}</div>
            </div>
          </div>
          <div className="ivf-note">{result.betaText}</div>

          <div className="ivf-timeline-wrap">
            <div className="ivf-timeline-head">The path from here to your due date</div>
            <div className="ivf-arc">
              <svg viewBox="0 0 900 40" preserveAspectRatio="none">
                <line
                  x1="20"
                  y1="20"
                  x2="880"
                  y2="20"
                  stroke="#D8CDBA"
                  strokeWidth="1.5"
                  strokeDasharray="1 7"
                  strokeLinecap="round"
                />
              </svg>
              <div className="ivf-milestones">
                {result.milestones.map((m, i) => (
                  <div
                    key={i}
                    className={'m' + (m.isPast ? ' past' : '') + (m.isToday ? ' today' : '')}
                  >
                    <div className="dot" />
                    <div className="wk">{m.key === 'origin' ? 'day 0' : 'wk ' + m.week}</div>
                    <div className="label">{m.label}</div>
                    <div className="date">{fmt(m.date)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="ivf-footer">
        These dates are estimates based on standard IVF dating conventions (266 days from
        retrieval; 263 / 261 / 260 days from day 3, 5, and 6 transfers). Actual clinical due
        dates and monitoring schedules are set by your clinic and may vary. This tool doesn't
        provide medical advice — check timings with your care team.
      </footer>
    </div>
  );
}