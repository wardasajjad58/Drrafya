import React, { useState } from 'react';
import './ChineseGenderPredictor.css';

// helper to move a date forward
function addDays(date, days) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
}

// format for display
function formatDate(date) {
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });
}

// trying to be safe with date parsing
function getDateFromInput(value) {
  if (!value) return null;
  const parsed = new Date(value + 'T00:00:00');
  return isNaN(parsed.getTime()) ? null : parsed;
}

// some context info for the bottom
const FUN_NOTES = [
  {
    title: 'A centuries-old tradition',
    detail: 'Said to originate from a chart discovered in a Qing-dynasty tomb.',
  },
  {
    title: 'Roughly 50/50 odds',
    detail: 'With only two outcomes, any method is right about half the time.',
  },
  {
    title: 'For entertainment only',
    detail: 'Not based on science. An ultrasound or NIPT will give you a reliable answer.',
  },
];

// simple svg icons 
const BoyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="14" r="6" stroke="currentColor" strokeWidth="1.8" />
    <path
      d="M14.5 9.5L20 4M20 4H15M20 4V9"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const GirlIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="9" r="6" stroke="currentColor" strokeWidth="1.8" />
    <path
      d="M12 15V21M9 18H15"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function ChineseGenderPredictor() {
  // state management
  const [inputMode, setInputMode] = useState('conception'); // 'conception' or 'dueDate'
  const [motherDob, setMotherDob] = useState('');
  const [conceptionDate, setConceptionDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [warningMsg, setWarningMsg] = useState('');
  const [prediction, setPrediction] = useState(null);

  // switching between the two modes
  const changeMode = (newMode) => {
    setInputMode(newMode);
    setErrorMsg('');
    setPrediction(null);
  };

  // main prediction logic
  const runPrediction = () => {
   
    setErrorMsg('');
    setWarningMsg('');
    setPrediction(null);

    // validate mother's birth date
    const birth = getDateFromInput(motherDob);
    if (!birth) {
      setErrorMsg("Please enter the mother-to-be's date of birth.");
      return;
    }

    let conception;
    if (inputMode === 'conception') {
      conception = getDateFromInput(conceptionDate);
      if (!conception) {
        setErrorMsg('Please enter a conception date.');
        return;
      }
    } else {
      const due = getDateFromInput(dueDate);
      if (!due) {
        setErrorMsg('Please enter a due date.');
        return;
      }
      // standard 266 days back from due date
      conception = addDays(due, -266);
    }

    // sanity checks
    if (conception <= birth) {
      setErrorMsg('The conception date should fall after the date of birth.');
      return;
    }

    const now = new Date();
    if (conception > now) {
      setErrorMsg('The conception date appears to be in the future — please double-check it.');
      return;
    }

    // here's the actual calculation - using the "rule of 49"
    // most online versions use this simplified approach
    const lunarAge = conception.getFullYear() - birth.getFullYear() + 1;
    const lunarMonth = conception.getMonth() + 1;

    // warning if outside the usual range
    if (lunarAge < 18 || lunarAge > 45) {
      setWarningMsg(
        `A lunar age of ${lunarAge} falls outside the chart's traditional 18–45 range, so this result is a rough extrapolation.`
      );
    }

    // the actual formula: 49 + lunar month - lunar age
    // odd = boy, even = girl
    const calculation = 49 + lunarMonth - lunarAge;
    const isBoy = ((calculation % 2) + 2) % 2 === 1;

    setPrediction({
      gender: isBoy ? 'Boy' : 'Girl',
      lunarAge: lunarAge,
      lunarMonth: lunarMonth,
      conceptionDisplay: formatDate(conception),
      isEstimatedConception: inputMode === 'dueDate',
    });
  };

  return (
    <div className="cgp-wrap">
      <div className="cgp-eyebrow">Traditional Chinese Gender Chart</div>
      <h1 className="cgp-h1">
        Boy, or <em>girl</em>?
      </h1>
      <p className="cgp-sub">
        This centuries-old chart predicts a baby's sex from the mother's lunar age and the
        lunar month of conception. It's a cultural tradition, not a medical test but it's a
        fun one to try.
      </p>

      <div className="cgp-card">
        <span className="cgp-field-label">What do you know?</span>
        <div className="cgp-segmented cgp-segmented-2">
          <button
            type="button"
            className={inputMode === 'conception' ? 'active' : ''}
            onClick={() => changeMode('conception')}
          >
            Conception date
          </button>
          <button
            type="button"
            className={inputMode === 'dueDate' ? 'active' : ''}
            onClick={() => changeMode('dueDate')}
          >
            Due date
          </button>
        </div>

        <div className="cgp-row">
          <div className="cgp-date-field">
            <span className="cgp-field-label">Mother's date of birth</span>
            <input
              type="date"
              value={motherDob}
              onChange={(e) => setMotherDob(e.target.value)}
            />
          </div>

          {inputMode === 'conception' ? (
            <div className="cgp-date-field">
              <span className="cgp-field-label">Conception date</span>
              <input
                type="date"
                value={conceptionDate}
                onChange={(e) => setConceptionDate(e.target.value)}
              />
            </div>
          ) : (
            <div className="cgp-date-field">
              <span className="cgp-field-label">Due date</span>
              <input 
                type="date" 
                value={dueDate} 
                onChange={(e) => setDueDate(e.target.value)} 
              />
            </div>
          )}
        </div>

        <button className="cgp-calc-btn" onClick={runPrediction} type="button">
          Reveal the prediction
        </button>
        {errorMsg && <div className="cgp-err">{errorMsg}</div>}
      </div>

      {prediction && (
        <div className="cgp-result">
          <div className="cgp-stamp">
            <div className={'cgp-stamp-ring ' + (prediction.gender === 'Boy' ? 'boy' : 'girl')}>
              {prediction.gender === 'Boy' ? <BoyIcon /> : <GirlIcon />}
            </div>
            <div className="cgp-stamp-text">
              <div className="k">The chart predicts</div>
              <div className="due">{prediction.gender}</div>
              <div className="progress">
                Based on a lunar age of {prediction.lunarAge} and lunar month {prediction.lunarMonth}
                {prediction.isEstimatedConception
                  ? `, using a conception date estimated around ${prediction.conceptionDisplay}`
                  : ` (conception on ${prediction.conceptionDisplay})`}
                .
              </div>
            </div>
          </div>

          {warningMsg && <div className="cgp-warning">{warningMsg}</div>}

          <div className="cgp-facts">
            {FUN_NOTES.map((item, index) => (
              <div className="f" key={index}>
                <div className="dot" />
                <div className="label">{item.title}</div>
                <div className="note">{item.detail}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <footer className="cgp-footer">
        This tool applies the traditional "rule of 49" (49 + lunar month of conception − lunar
        age at conception; an odd result indicates a boy, an even result a girl). Lunar age and
        lunar month are approximated directly from the Gregorian dates provided, rather than
        through a full lunisolar calendar conversion, so results near a month or year boundary
        may differ slightly from a chart that uses exact lunar dates. There is no scientific
        evidence that this chart predicts anything reliably. please treat it as entertainment.
        For an accurate answer, an anatomy scan, NIPT, or your doctor remains the best source.
      </footer>
    </div>
  );
}