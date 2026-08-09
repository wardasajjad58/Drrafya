import { useState } from "react";
import { motion } from "framer-motion";
import {
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  Phone,
  Mail,
  MapPin,
  ArrowUpRight,
} from "lucide-react";
import "./Footer.css";
import Drrafyalogo from '../assets/rafyalogo.png';

const socials = [
  { key: "fb", Icon: Facebook, label: "Facebook", href: "#" },
  { key: "ig", Icon: Instagram, label: "Instagram", href: "#" },
  { key: "yt", Icon: Youtube, label: "YouTube", href: "#" },
  { key: "tw", Icon: Twitter, label: "Twitter", href: "#" },
];

const lifecycleLinks = [
  { label: "Preconception", href: "#preconception" },
  { label: "Pregnancy Hub", href: "#pregnancy" },
  { label: "Labor & Delivery", href: "#delivery" },
  { label: "Postpartum & Recovery", href: "#postpartum" },
  { label: "Infertility/IVF", href: "#infertility" },
];

const resourceLinks = [
  { label: "Media Center", href: "#media" },
  { label: "Calculators & Tools", href: "#tools" },
  { label: "E-Book Library", href: "#library" },
  { label: "Sisterhood Forums", href: "#forums" },
  { label: "Podcast Series", href: "#podcast" },
];

export default function Footer() {
  const [activeSocial, setActiveSocial] = useState(null);

  return (
    <footer className="modern-footer">
      {/* Background Ambient Glow */}
      <div className="footer-ambient-bg" />

      <div className="footer-inner">
        {/* MAIN BENTO GRID CONTAINERS */}
        <div className="bento-container">
          
          {/* Bento Box 1: Brand Header */}
          <div className="bento-box">
            <div>
              <img className="footer-logo" src={Drrafyalogo} alt="Dr Rafya Zahir" />

              <p className="brand-bio-text">
                Redefining women&apos;s healthcare with compassionate clinical care, 
                advanced evidence-based tools, and personalized life-stage guidance.
              </p>
            </div>

            {/* Social Links */}
            <div className="socials-row">
              {socials.map(({ key, Icon, label, href }) => {
                const isActive = activeSocial === key;
                return (
                  <motion.a
                    key={key}
                    href={href}
                    aria-label={label}
                    onMouseEnter={() => setActiveSocial(key)}
                    onMouseLeave={() => setActiveSocial(null)}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    transition={{ type: "spring", stiffness: 400, damping: 22 }}
                    className="social-pill"
                    style={{
                      backgroundColor: isActive ? "var(--rich-pink)" : undefined,
                    }}
                  >
                    <Icon size={18} />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Bento Box 2: Lifecycle Hubs */}
          <div className="bento-box">
            <div>
              <p className="bento-title">Lifecycle Hubs</p>
              <ul className="bento-nav-list">
                {lifecycleLinks.map((item) => (
                  <li key={item.label}>
                    <a className="nav-item-link" href={item.href}>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bento Box 3: Resources */}
          <div className="bento-box">
            <div>
              <p className="bento-title">Resources</p>
              <ul className="bento-nav-list">
                {resourceLinks.map((item) => (
                  <li key={item.label}>
                    <a className="nav-item-link" href={item.href}>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bento Box 4: Direct Consultation */}
          <div className="bento-box">
            <div>
              <p className="bento-title">Consultation</p>
              
              <div className="contact-stack">
                <div className="contact-row">
                  <div className="contact-icon-wrapper">
                    <Phone size={18} />
                  </div>
                  <a className="contact-anchor" href="tel:+923001344417">
                    +92 300 1344417
                  </a>
                </div>

                <div className="contact-row">
                  <div className="contact-icon-wrapper">
                    <Mail size={18} />
                  </div>
                  <a className="contact-anchor" href="mailto:clinic@drrafiya.com">
                    clinic@drrafiya.com
                  </a>
                </div>

                <div className="contact-row">
                  <div className="contact-icon-wrapper">
                    <MapPin size={18} />
                  </div>
                  <span>DHA Phase 6, Lahore, Pakistan</span>
                </div>
              </div>
            </div>

            <a id="book" href="#book" className="btn-cta-gold">
              <span>Online Consultation</span>
              <ArrowUpRight size={18} />
            </a>
          </div>

        </div>

        {/* GIANT EDITORIAL WATERMARK */}
        <div className="brand-watermark-container">
          <p className="brand-watermark-text">DR. RAFIYA ZAHIR</p>
        </div>

        {/* FOOTER BAR / LEGAL */}
        <div className="footer-bar">
          <p>© {new Date().getFullYear()} Dr. Rafiya Zahir. All rights reserved.</p>
          <div className="legal-links">
            <a href="#privacy" className="legal-link">Privacy Policy</a>
            <a href="#terms" className="legal-link">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}