import { motion } from "framer-motion";
import { Calendar, UserCheck, MapPin } from "lucide-react";
import heroImg from "../assets/hero.png";
import "./Hero.css";
import {useTranslation} from 'react-i18next';

const ease = [0.22, 1, 0.36, 1];

export default function Hero() {

  const {t} = useTranslation();

  return (
    <section id="start" className="hero-section">
      {/* MAIN ROYAL BLUE CONTAINER */}
      <div className="hero-card">
        
        {/* Abstract Vector Line Overlay (Exact Reference Circles & Rounded Rectangles) */}
        <div className="hero-vector-bg">
          <svg viewBox="0 0 1200 600" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="520" y="-80" width="480" height="480" rx="160" stroke="white" strokeWidth="60" />
            <rect x="700" y="120" width="550" height="550" rx="200" stroke="white" strokeWidth="60" />
            <circle cx="180" cy="380" r="280" stroke="white" strokeWidth="60" />
          </svg>
        </div>

        <div className="hero-grid">
          
          {/* LEFT: HEADLINE + DESCRIPTON + CTA */}
          <div className="hero-left-col">
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              className="hero-title"
            >
              {t("Dedicated to Long")} <br />
              {t("Term Health and")} <br />
              {t("Well-Being")}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease }}
              className="hero-description"
            >
              {t("At Carevia, we provide patient-focused medical care backed by experienced doctors, modern technology, and evidence-based practices.")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease }}
            >
              <a href="#get-started" className="btn-get-started">
                {t("Get Started Now")}
              </a>
            </motion.div>
          </div>

          {/* CENTER: DOCTOR PORTRAIT CUTOUT */}
          <div className="hero-center-col">
            <motion.img
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease }}
              src={heroImg}
              alt="Doctor"
              className="doctor-img"
            />
          </div>

          {/* RIGHT: RATING BADGE & TAGLINE */}
          <div className="hero-right-col">
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease }}
              className="social-badge-box"
            >
              <div className="avatar-pill">
                <div className="avatar-group-images">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="User" />
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" alt="User" />
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" alt="User" />
                </div>
                <span className="social-count">5.5k</span>
              </div>

              <p className="social-tagline">
                {t("Trusted By Happy Patients For Exceptional Care")}
              </p>
            </motion.div>
          </div>

        </div>
      </div>

      {/* BOTTOM OVERLAPPING SEARCH BAR WIDGET */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease }}
        className="bottom-widget-container"
      >
        <div className="search-bar-card">
          
          {/* Field 1: Dates */}
          <div className="field-group">
            <div className="field-icon-box">
              <Calendar size={20} />
            </div>
            <div className="field-text-box">
              <span className="field-title-text">{t("Date")}</span>
              <span className="field-main-text">{t("Aug 04, 2025")}</span>
            </div>
          </div>

          {/* Field 2: Specialist */}
          <div className="field-group">
            <div className="field-icon-box">
              <UserCheck size={20} />
            </div>
            <div className="field-text-box">
              <span className="field-title-text">{t("Specialist")}</span>
              <span className="field-main-text">{t("Gynecologist")}</span>
            </div>
          </div>

          {/* Field 3: Location */}
          <div className="field-group">
            <div className="field-icon-box">
              <MapPin size={20} />
            </div>
            <div className="field-text-box">
              <span className="field-title-text">{t("Location")}</span>
              <span className="field-main-text">{t("Sialkot, Pakistan")}</span>
            </div>
          </div>

          {/* Button: Search Doctor */}
          <button className="btn-search-doctor">
            {t("Search Doctor")}
          </button>

        </div>
      </motion.div>
    </section>
  );
}