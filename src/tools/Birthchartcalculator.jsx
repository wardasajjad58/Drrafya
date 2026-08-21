import React, { useState } from 'react';
import './BirthChartCalculator.css';

// ===== CONSTANTS =====
const SIGNS = [
  { name: 'Aries', symbol: '\u2648', trait: 'Bold, energetic, quick to lead.', element: 'Fire', quality: 'Cardinal', ruler: 'Mars' },
  { name: 'Taurus', symbol: '\u2649', trait: 'Steady, affectionate, loves comfort.', element: 'Earth', quality: 'Fixed', ruler: 'Venus' },
  { name: 'Gemini', symbol: '\u264A', trait: 'Curious, chatty, quick to adapt.', element: 'Air', quality: 'Mutable', ruler: 'Mercury' },
  { name: 'Cancer', symbol: '\u264B', trait: 'Sensitive, nurturing, deeply attached to home.', element: 'Water', quality: 'Cardinal', ruler: 'Moon' },
  { name: 'Leo', symbol: '\u264C', trait: 'Warm, confident, loves an audience.', element: 'Fire', quality: 'Fixed', ruler: 'Sun' },
  { name: 'Virgo', symbol: '\u264D', trait: 'Observant, careful, likes routine.', element: 'Earth', quality: 'Mutable', ruler: 'Mercury' },
  { name: 'Libra', symbol: '\u264E', trait: 'Sociable, fair-minded, seeks harmony.', element: 'Air', quality: 'Cardinal', ruler: 'Venus' },
  { name: 'Scorpio', symbol: '\u264F', trait: 'Intense, perceptive, feels things deeply.', element: 'Water', quality: 'Fixed', ruler: 'Pluto' },
  { name: 'Sagittarius', symbol: '\u2650', trait: 'Adventurous, cheerful, loves exploring.', element: 'Fire', quality: 'Mutable', ruler: 'Jupiter' },
  { name: 'Capricorn', symbol: '\u2651', trait: 'Determined, patient, an old soul early on.', element: 'Earth', quality: 'Cardinal', ruler: 'Saturn' },
  { name: 'Aquarius', symbol: '\u2652', trait: 'Independent, inventive, marches to its own beat.', element: 'Air', quality: 'Fixed', ruler: 'Uranus' },
  { name: 'Pisces', symbol: '\u2653', trait: 'Dreamy, gentle, tuned in to feelings.', element: 'Water', quality: 'Mutable', ruler: 'Neptune' },
];

const PLANETS = [
  { name: 'Sun', symbol: '\u2609', key: 'sun' },
  { name: 'Moon', symbol: '\u263D', key: 'moon' },
  { name: 'Mercury', symbol: '\u263F', key: 'mercury' },
  { name: 'Venus', symbol: '\u2640', key: 'venus' },
  { name: 'Mars', symbol: '\u2642', key: 'mars' },
  { name: 'Jupiter', symbol: '\u2643', key: 'jupiter' },
  { name: 'Saturn', symbol: '\u2644', key: 'saturn' },
  { name: 'Uranus', symbol: '\u2645', key: 'uranus' },
  { name: 'Neptune', symbol: '\u2646', key: 'neptune' },
  { name: 'Pluto', symbol: '\u2647', key: 'pluto' },
];

// ===== UTILITIES =====
const norm = d => ((d % 360) + 360) % 360;
const toJD = date => date.getTime() / 86400000 + 2440587.5;
const parseDate = v => v ? new Date(v + 'T00:00:00') : null;
const signIdx = lon => Math.floor(lon / 30) % 12;

// ===== PLANETARY CALCULATIONS =====
const sunPos = T => {
  const L = norm(280.46646 + 36000.76983 * T + 0.0003032 * T * T);
  const M = norm(357.52911 + 35999.05029 * T - 0.0001537 * T * T);
  const Mr = M * Math.PI / 180;
  const C = (1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(Mr) +
    (0.019993 - 0.000101 * T) * Math.sin(2 * Mr) + 0.000289 * Math.sin(3 * Mr);
  return norm(L + C);
};

const moonPos = T => {
  const r = d => d * Math.PI / 180;
  const Lp = norm(218.3164477 + 481267.88123421 * T - 0.0015786 * T * T);
  const D = norm(297.8501921 + 445267.1114034 * T - 0.0018819 * T * T);
  const M = norm(357.5291092 + 35999.0502909 * T - 0.0001536 * T * T);
  const Mp = norm(134.9633964 + 477198.8675055 * T + 0.0087414 * T * T);
  const F = norm(93.272095 + 483202.0175233 * T - 0.0036539 * T * T);
  return norm(Lp + 6.289 * Math.sin(r(Mp)) - 1.274 * Math.sin(r(Mp - 2 * D)) +
    0.658 * Math.sin(r(2 * D)) - 0.186 * Math.sin(r(M)) - 0.059 * Math.sin(r(2 * Mp - 2 * D)) -
    0.057 * Math.sin(r(Mp - 2 * D + M)) + 0.053 * Math.sin(r(Mp + 2 * D)) +
    0.046 * Math.sin(r(2 * D - M)) + 0.041 * Math.sin(r(Mp - M)) -
    0.035 * Math.sin(r(D)) - 0.031 * Math.sin(r(Mp + M)) -
    0.015 * Math.sin(r(2 * F - 2 * D)) + 0.011 * Math.sin(r(Mp - 4 * D)));
};

// Generic planet calculator
const calcPlanet = (T, L0, L1, L2, M0, M1, M2, c1, c2) => {
  const L = norm(L0 + L1 * T + L2 * T * T);
  const M = norm(M0 + M1 * T + M2 * T * T);
  const Mr = M * Math.PI / 180;
  return norm(L + c1 * Math.sin(Mr) + c2 * Math.sin(2 * Mr));
};

const mercuryPos = T => calcPlanet(T, 252.2509, 149472.6746, 0.000008, 174.7948, 415.2014, 0.000007, 7.004, 0.035);
const venusPos = T => calcPlanet(T, 181.9798, 58517.8157, 0.000001, 50.4161, 210.6642, 0.000003, 3.394, 0.001);
const marsPos = T => calcPlanet(T, 355.4530, 19140.2993, 0.000002, 19.3730, 191.4032, 0.000004, 10.691, 0.003);
const jupiterPos = T => calcPlanet(T, 34.3515, 3034.9057, 0.000002, 19.8950, 33.1403, 0.000008, 5.855, 0.002);
const saturnPos = T => calcPlanet(T, 50.0774, 1222.1138, 0.000002, 317.0207, 12.9401, 0.000002, 6.313, 0.001);
const uranusPos = T => norm(74.0005 + 42.6938 * T);
const neptunePos = T => norm(84.4572 + 21.4349 * T);
const plutoPos = T => norm(238.9290 + 14.0462 * T);

// ===== ICONS =====
const Icon = ({ path, viewBox = "0 0 20 20" }) => (
  <svg viewBox={viewBox} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d={path} stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const StarIcon = () => <Icon path="M8 1.5L9.4 6.1L14 7.5L9.4 8.9L8 13.5L6.6 8.9L2 7.5L6.6 6.1L8 1.5Z" viewBox="0 0 16 16" />;
const CalendarIcon = () => <Icon path="M3 4.5h14v12H3zM3 8h14M6.5 2.5v3M13.5 2.5v3" />;
const ClockIcon = () => <Icon path="M10 3a7 7 0 110 14 7 7 0 010-14zM10 6.2V10l2.5 1.8" />;
const LocationIcon = () => <Icon path="M10 2a5 5 0 00-5 5c0 3.5 5 9 5 9s5-5.5 5-9a5 5 0 00-5-5zM10 7a2.5 2.5 0 110 5 2.5 2.5 0 010-5z" />;
const AlertIcon = () => <Icon path="M8 1.5A6.5 6.5 0 1014.5 8 6.5 6.5 0 008 1.5zM8 5.2v3.4M8 10.8a.8.8 0 100 1.6.8.8 0 000-1.6z" viewBox="0 0 16 16" />;

// ===== MAIN COMPONENT =====
export default function BirthChartCalculator() {
  const [state, setState] = useState({ name: '', birthDate: '', birthTime: '', timeKnown: true, location: '', gender: '', error: '', result: null, activeTab: 'chart' });
  const update = (k, v) => setState(s => ({ ...s, [k]: v }));

  const cx = 140, cy = 140, outerR = 122, innerR = 96;
  const colors = { sun: '#FDB813', moon: '#C0C0C0', mercury: '#8C8C8C', venus: '#E8A3B5', mars: '#E25822', jupiter: '#D4A017', saturn: '#B8860B', uranus: '#7EC8E3', neptune: '#4169E1', pluto: '#8B4513' };

  const handleCalculate = () => {
    const { birthDate, birthTime, timeKnown, name, location, gender } = state;
    const date = parseDate(birthDate);
    if (!date) return update('error', "Enter the baby's date of birth.");
    if (date > new Date()) return update('error', 'That date is in the future — double-check it.');
    if (timeKnown && !birthTime) return update('error', 'Enter a birth time, or switch to "I don\'t know the exact time."');

    let hour = 12, minute = 0;
    if (timeKnown) { const [h, m] = birthTime.split(':').map(Number); hour = h; minute = m; }

    const calcDate = new Date(date); calcDate.setHours(hour, minute, 0, 0);
    const T = (toJD(calcDate) - 2451545.0) / 36525;

    const positions = {
      sun: sunPos(T), moon: moonPos(T), mercury: mercuryPos(T), venus: venusPos(T),
      mars: marsPos(T), jupiter: jupiterPos(T), saturn: saturnPos(T),
      uranus: uranusPos(T), neptune: neptunePos(T), pluto: plutoPos(T)
    };
    const signIndices = {};
    Object.keys(positions).forEach(k => signIndices[k] = signIdx(positions[k]));

    let risingIdx = null;
    if (timeKnown) {
      const minutesSince6am = ((hour * 60 + minute - 6 * 60) + 1440) % 1440;
      risingIdx = (signIndices.sun + Math.floor(minutesSince6am / 120)) % 12;
    }

    update('result', { positions, signIndices, risingIdx, timestamp: calcDate.toISOString(), location, gender, name });
    update('error', '');
  };

  const wheelPoint = (lon, r) => {
    const a = ((lon - 90) * Math.PI) / 180;
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
  };

  const { name, birthDate, birthTime, timeKnown, location, gender, error, result, activeTab } = state;

  return (
    <div className="bcc-wrap">
      <div className="bcc-eyebrow"><StarIcon /><span>Baby's birth chart</span></div>
      <h1 className="bcc-h1">What was written in the stars?</h1>
      <p className="bcc-sub">Enter your baby's birth details for a complete planetary chart.</p>

      <div className="bcc-card">
        <div className="bcc-field">
          <span className="bcc-field-label">Baby's name</span>
          <input type="text" className="bcc-text-input" placeholder="Enter baby's name" value={name} onChange={e => update('name', e.target.value)} />
        </div>

        <div className="bcc-row">
          <div className="bcc-field">
            <span className="bcc-field-label">Date of birth</span>
            <div className="bcc-input-icon"><CalendarIcon /><input type="date" value={birthDate} onChange={e => update('birthDate', e.target.value)} /></div>
          </div>
          <div className="bcc-field">
            <span className="bcc-field-label">Time of birth</span>
            <div className={`bcc-input-icon ${!timeKnown ? 'disabled' : ''}`}>
              <ClockIcon /><input type="time" value={birthTime} onChange={e => update('birthTime', e.target.value)} disabled={!timeKnown} />
            </div>
          </div>
        </div>

        <div className="bcc-row">
          <div className="bcc-field">
            <span className="bcc-field-label">Birth location</span>
            <div className="bcc-input-icon"><LocationIcon /><input type="text" placeholder="City, Country" value={location} onChange={e => update('location', e.target.value)} /></div>
          </div>
          <div className="bcc-field">
            <span className="bcc-field-label">Gender</span>
            <select className="bcc-select-input" value={gender} onChange={e => update('gender', e.target.value)}>
              <option value="">Prefer not to say</option><option value="female">Female</option><option value="male">Male</option><option value="other">Other</option>
            </select>
          </div>
        </div>

        <label className="bcc-checkbox">
          <input type="checkbox" checked={!timeKnown} onChange={e => update('timeKnown', !e.target.checked)} />
          <span>I don't know the exact time</span>
        </label>

        {error && <div className="bcc-alert error"><AlertIcon /><span>{error}</span></div>}
        <button className="bcc-calc-btn" onClick={handleCalculate} type="button">Build the chart</button>
      </div>

      {result && (
        <div className="bcc-result">
          <div className="bcc-result-header">
            <h2>{result.name ? `${result.name}'s` : 'Baby\'s'} Birth Chart</h2>
            {result.location && <span className="bcc-location">{result.location}</span>}
          </div>

          <div className="bcc-tabs">
            {['chart', 'planets', 'elements'].map(tab => (
              <button key={tab} className={`bcc-tab ${activeTab === tab ? 'active' : ''}`} onClick={() => update('activeTab', tab)}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {activeTab === 'chart' && (
            <div className="bcc-chart-view">
              <div className="bcc-wheel-card">
                <svg viewBox="0 0 280 280" className="bcc-wheel">
                  <circle cx={cx} cy={cy} r={outerR} className="ring-outer" />
                  <circle cx={cx} cy={cy} r={innerR} className="ring-inner" />
                  {SIGNS.map((s, i) => {
                    const a = ((i * 30 - 90) * Math.PI) / 180;
                    const la = ((i * 30 + 15 - 90) * Math.PI) / 180;
                    return (
                      <g key={s.name}>
                        <line x1={cx + innerR * Math.cos(a)} y1={cy + innerR * Math.sin(a)} 
                              x2={cx + outerR * Math.cos(a)} y2={cy + outerR * Math.sin(a)} className="spoke" />
                        <text x={cx + ((outerR + innerR) / 2) * Math.cos(la)} y={cy + ((outerR + innerR) / 2) * Math.sin(la) + 5} 
                              textAnchor="middle" className="sign-symbol">{s.symbol}</text>
                      </g>
                    );
                  })}
                  {PLANETS.map((p, i) => {
                    const pos = result.positions[p.key];
                    const pt = wheelPoint(pos, 78 - i * 5);
                    return (
                      <g key={p.key}>
                        <circle cx={pt.x} cy={pt.y} r="7" className="marker planet" style={{ fill: colors[p.key] }} />
                        <text x={pt.x} y={pt.y + 3} textAnchor="middle" className="marker-glyph small" style={{ fontSize: '8px', fill: '#fff' }}>{p.symbol}</text>
                      </g>
                    );
                  })}
                  {result.risingIdx !== null && (() => {
                    const pt = wheelPoint(result.risingIdx * 30 + 15, outerR + 14);
                    return (<g><circle cx={pt.x} cy={pt.y} r="8" className="marker rising" /><text x={pt.x} y={pt.y + 3} textAnchor="middle" className="marker-glyph small">ASC</text></g>);
                  })()}
                </svg>
              </div>
              <div className="bcc-placements">
                {PLANETS.slice(0, 7).map(p => {
                  const idx = result.signIndices[p.key];
                  return (
                    <div key={p.key} className="p planet-item">
                      <div className="p-icon" style={{ color: colors[p.key] }}>{p.symbol}</div>
                      <div><div className="p-k">{p.name}</div><div className="p-v">{SIGNS[idx].symbol} {SIGNS[idx].name}</div></div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'planets' && (
            <div className="bcc-planets-view">
              {PLANETS.map(p => {
                const sign = SIGNS[result.signIndices[p.key]];
                return (
                  <div key={p.key} className="bcc-planet-card">
                    <div className="bcc-planet-header">
                      <span className="bcc-planet-symbol" style={{ color: colors[p.key] }}>{p.symbol}</span>
                      <span className="bcc-planet-name">{p.name}</span>
                      <span className="bcc-planet-sign">{sign.symbol} {sign.name}</span>
                    </div>
                    <div className="bcc-planet-details">
                      {['Element', 'Quality', 'Ruler', 'Trait'].map(label => {
                        const key = label.toLowerCase();
                        return (
                          <div key={label} className="bcc-planet-detail">
                            <span className="bcc-detail-label">{label}:</span>
                            <span className="bcc-detail-value">{sign[key]}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'elements' && (
            <div className="bcc-elements-view">
              <div className="bcc-element-summary">
                <h3>Element Distribution</h3>
                {['Fire', 'Earth', 'Air', 'Water'].map(el => {
                  const count = Object.values(result.signIndices).filter(idx => SIGNS[idx].element === el).length;
                  return (
                    <div key={el} className="bcc-element-bar">
                      <span className="bcc-element-label">{el}</span>
                      <div className="bcc-element-track"><div className="bcc-element-fill" style={{ width: `${Math.round(count / 10 * 100)}%` }}></div></div>
                      <span className="bcc-element-count">{count}/10</span>
                    </div>
                  );
                })}
              </div>
              {result.risingIdx !== null && (
                <div className="bcc-ascendant-info">
                  <h3>Rising Sign</h3>
                  <div className="bcc-ascendant-detail">
                    <span className="bcc-ascendant-symbol">{SIGNS[result.risingIdx].symbol}</span>
                    <span className="bcc-ascendant-name">{SIGNS[result.risingIdx].name}</span>
                    <p className="bcc-ascendant-trait">{SIGNS[result.risingIdx].trait}</p>
                  </div>
                </div>
              )}
              <div className="bcc-gender-info">
                <h3>Chart Details</h3>
                <p><strong>Name:</strong> {result.name || 'Not specified'}</p>
                <p><strong>Birth Date:</strong> {new Date(result.timestamp).toLocaleDateString()}</p>
                <p><strong>Birth Time:</strong> {result.risingIdx !== null ? 'Known' : 'Approximate'}</p>
                <p><strong>Location:</strong> {result.location || 'Not specified'}</p>
                <p><strong>Gender:</strong> {result.gender || 'Not specified'}</p>
              </div>
            </div>
          )}
        </div>
      )}

      <footer className="bcc-footer">
        <p>Planetary positions calculated using Meeus, "Astronomical Algorithms". The rising sign is a rough estimate based on time of day alone — a true ascendant requires birth location and full ephemeris calculations. This chart is for educational and entertainment purposes only.</p>
      </footer>
    </div>
  );
}