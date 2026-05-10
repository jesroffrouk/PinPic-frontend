import { useEffect, useRef } from "react";
import '../css/AboutMe.css'

export default function AboutMe() {
  const refs = useRef([]);

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.remove("exit-up", "exit-down");
          e.target.classList.add("visible");
          e.target._was = true;
        } else {
          if (!e.target._was) return;
          e.target.classList.remove("visible");
          e.target.classList.add(e.boundingClientRect.top < 0 ? "exit-up" : "exit-down");
          e.target._was = false;
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -30px 0px" });

    refs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const r = (el) => { if (el && !refs.current.includes(el)) refs.current.push(el); };

  return (
    <>
    <div className="aboutme">
      <section className="ab-root" id="about">
        <div className="ab-orb" />
        <div className="ab-grid-bg" />

        <div className="ab-inner ab-reveal" ref={r}>

          {/* ── Photo ── */}
          <div className="ab-photo-wrap">
            <div className="ab-ring" />
            <div className="ab-frame">
                <img className="ab-photo" src="/myProfile.jpeg" alt="Your Name" />

              <div className="ab-placeholder">
                <svg width="50" height="50" viewBox="0 0 80 80" fill="none" opacity="0.45">
                  <circle cx="40" cy="30" r="18" stroke="rgba(0,180,216,0.8)" strokeWidth="2" fill="none"/>
                  <path d="M8 72c0-17.673 14.327-32 32-32s32 14.327 32 32"
                    stroke="rgba(0,180,216,0.8)" strokeWidth="2" fill="none" strokeLinecap="round"/>
                </svg>
                <span>your photo</span>
              </div>
            </div>

            <div className="ab-badge">
              <span className="ab-badge-dot" />
              <span className="ab-badge-label">Solo Dev</span>
            </div>
          </div>

          {/* ── Text ── */}
          <div className="ab-text">
            <div className="ab-name">Hi, I'm <em>Jesroff</em></div>
            <div className="ab-role">Founder · Solo Developer</div>

            <p className="ab-bio">
              Building PinPic entirely solo - code, design, and every pin.
              A <strong>developer & traveler</strong> who believes the best stories
              belong exactly where they happened.
            </p>

            <div className="ab-link-row">
              <a
                href="https://jessroff.vercel.app"
                target="_blank"
                rel="noreferrer"
                className="ab-portfolio-btn"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.2"
                  strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10
                           15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
                View Portfolio
              </a>
              <span className="ab-building">Building in public</span>
            </div>
          </div>

        </div>
      </section>
    </div>
    </>
  );
}