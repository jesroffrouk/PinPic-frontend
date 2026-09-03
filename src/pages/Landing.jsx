import { useState, useEffect, useRef } from "react";
import '../css/LandingPage.css'
import { Link } from "react-router";
import ProjectRoadmap from "../components/ProjectRoadmap";
import AboutMe from "../components/AboutMe";

const MapMockup = () => {
  const pins = [
    { top: "30%", left: "20%", color: "#0077b6", emoji: "🗼", delay: 0 },
    { top: "55%", left: "45%", color: "#00b4d8", emoji: "🏯", delay: 0.2 },
    { top: "25%", left: "65%", color: "#0096c7", emoji: "🌸", delay: 0.4 },
    { top: "65%", left: "70%", color: "#023e8a", emoji: "⛩️", delay: 0.6 },
    { top: "45%", left: "15%", color: "#0077b6", emoji: "🏔️", delay: 0.8 },
  ];

  return (
    <div style={{ position: "relative", height: "360px", background: "#060f25", overflow: "hidden" }}>
      <div className="map-grid" />
      {/* Roads SVG */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.12 }} viewBox="0 0 900 360">
        <path d="M0,180 Q225,100 450,180 T900,180" stroke="#00b4d8" strokeWidth="2" fill="none" />
        <path d="M0,280 Q300,200 600,250 T900,200" stroke="#0096c7" strokeWidth="1.5" fill="none" />
        <path d="M200,0 Q250,180 220,360" stroke="#00b4d8" strokeWidth="1.5" fill="none" />
        <path d="M600,0 Q580,180 620,360" stroke="#0096c7" strokeWidth="1.5" fill="none" />
        <path d="M400,0 L420,360" stroke="#00b4d8" strokeWidth="1" fill="none" strokeDasharray="4 8" />
      </svg>
      {/* Glow effect */}
      <div style={{ position: "absolute", top: "50%", left: "45%", transform: "translate(-50%,-50%)", width: "300px", height: "200px", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,119,182,0.15) 0%, transparent 70%)" }} />
      {pins.map((p, i) => (
        <div key={i} className="map-pin" style={{ top: p.top, left: p.left, animationDelay: `${p.delay}s` }}>
          <div className="map-pin-inner" style={{ background: `linear-gradient(135deg, ${p.color}, rgba(0,180,216,0.6))` }}>
            <span>{p.emoji}</span>
          </div>
          <div className="map-pin-ripple" style={{ background: p.color }} />
        </div>
      ))}
      {/* Story popup */}
      <div className="story-card-popup" style={{ top: "15%", left: "40%", animationDelay: "1s" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <div style={{ width: 24, height: 24, borderRadius: "50%", background: "linear-gradient(135deg, #0077b6, #00b4d8)" }} />
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#fff" }}>Senso-ji Temple</div>
            <div style={{ fontSize: 10, color: "#7ea8d8" }}>3 stories nearby</div>
          </div>
        </div>
        <div style={{ fontSize: 11, color: "#7ea8d8", lineHeight: 1.5, marginBottom: 8 }}>
          "At dawn the temple reveals itself in a soft orange haze..."
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <div style={{ fontSize: 10, padding: "3px 8px", borderRadius: 100, border: "1px solid rgba(0,180,216,0.3)", color: "#00b4d8" }}>Read</div>
          <div style={{ fontSize: 10, padding: "3px 8px", borderRadius: 100, border: "1px solid rgba(0,180,216,0.3)", color: "#90e0ef", background: "rgba(0,119,182,0.15)" }}>Collect</div>
        </div>
      </div>
    </div>
  );
};

const PhoneMockup = () => (
  <div className="phone-wrap">
    <div className="phone">
      <div className="phone-notch"><div className="phone-notch-bar" /></div>
      <div className="phone-screen">
        <div className="phone-map-mini">
          <div className="phone-pin" style={{ top: "35%", left: "35%" }}>
            <div className="phone-pin-dot" style={{ background: "linear-gradient(135deg, #0077b6, #00b4d8)", width: 28, height: 28, borderRadius: "50% 50% 50% 0", transform: "rotate(-45deg)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ transform: "rotate(45deg)", fontSize: 12 }}>📸</span>
            </div>
          </div>
          <div className="phone-pin" style={{ top: "55%", left: "65%" }}>
            <div style={{ background: "linear-gradient(135deg, #023e8a, #0096c7)", width: 24, height: 24, borderRadius: "50% 50% 50% 0", transform: "rotate(-45deg)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ transform: "rotate(45deg)", fontSize: 11 }}>🗺️</span>
            </div>
          </div>
          <div style={{ position: "absolute", bottom: 10, right: 10, background: "rgba(0,180,216,0.15)", border: "1px solid rgba(0,180,216,0.3)", borderRadius: 8, padding: "4px 8px", fontSize: 10, color: "#00b4d8" }}>📍 2 stories nearby</div>
        </div>
        <div className="phone-card">
          <div className="phone-card-row">
            <div className="phone-avatar" />
            <div>
              <div className="phone-card-title">Asakusa, Tokyo</div>
              <div className="phone-card-sub">by @wanderer_kenji · 2km away</div>
            </div>
          </div>
          <div className="phone-card-body">"The air smells of incense before you even see the gate. The old city breathes here..."</div>
          <div className="phone-card-actions">
            <div className="phone-pill">📖 Read</div>
            <div className="phone-pill collect">🗂 Collect</div>
            <div className="phone-pill">❤️ 48</div>
          </div>
        </div>
        <div className="phone-card">
          <div className="phone-card-row">
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg, #0096c7, #00b4d8)", flexShrink: 0 }} />
            <div>
              <div className="phone-card-title">Nakamise Street</div>
              <div className="phone-card-sub">by @mia_travels · 1.4km away</div>
            </div>
          </div>
          <div className="phone-card-actions">
            <div className="phone-pill">🖼 12 images</div>
            <div className="phone-pill collect">🔒 Unlocked!</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default function LandingPage() {
  const revealRefs = useRef([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            // Entering viewport — play reveal animation
            e.target.classList.remove("exit-up", "exit-down");
            e.target.classList.add("visible");
            e.target._wasVisible = true;
            e.target._lastY = e.boundingClientRect.top;
          } else {
            if (!e.target._wasVisible) return;
            // Leaving viewport — determine direction
            const scrollingDown = e.boundingClientRect.top < 0;
            e.target.classList.remove("visible");
            if (scrollingDown) {
              // Element scrolled past upward (user scrolled down past it)
              e.target.classList.add("exit-up");
            } else {
              // Element scrolled off below (user scrolled up past it)
              e.target.classList.add("exit-down");
            }
            e.target._wasVisible = false;
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    revealRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const addReveal = (el) => { if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el); };

  return (
    <>
    <div className="Landing_page_body">
      <div className="noise" />

      {/* NAV */}
      <nav className="nav">
        <div className="nav-logo">
          <span className="nav-logo-dot" />
          PinPic
        </div>
        <ul className="nav-links">
          <li><a href="#how">How it works</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#travelers">For Travelers</a></li>
          <li><a href="#product">Product Roadmap</a></li>
        </ul>
        <Link to={'/signup'}>
          <button className="nav-cta">Sign Up</button>
        </Link> 
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="grid-bg" />
        <div className="orb orb-1" />
        <div className="orb orb-2" />

        <div className="hero-badge">
          <span className="badge-dot" />
          Location Bound Storytelling · Now in Beta
        </div>

        <h1 className="hero-title">
          <span className="hero-title-line1">Stories live</span>
          <span className="hero-title-line2">where you are</span>
        </h1>

        <p className="hero-sub">
          PinPic binds images and stories to real world locations. Discover hidden narratives the moment you arrive created by fellow travelers, waiting just for you.
        </p>

        <div className="hero-actions">

            <a href="#how">
              <button className="btn-primary">
                Start Exploring →
              </button>
            </a>
          <a href="#travelers">
            <button className="btn-ghost"> 
                Pin Your Story 
            </button>
          </a>

        </div>

        <div className="hero-mockup">
          <div className="mockup-frame">
            <div className="mockup-topbar">
              <div className="tb-dot" style={{ background: "#ff5f57" }} />
              <div className="tb-dot" style={{ background: "#ffbd2e" }} />
              <div className="tb-dot" style={{ background: "#28c840" }} />
              <div style={{ flex: 1, textAlign: "center", fontSize: 12, color: "var(--muted)" }}>📍 Tokyo, Japan — 8 stories nearby</div>
            </div>
            <MapMockup />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section" id="how">
        <div className="orb orb-3" style={{ position: "absolute" }} />
        <div className="section-inner">
          <div ref={addReveal} className="reveal">
            <span className="section-tag">How it works</span>
            <h2 className="section-title">Three steps to<br />unlock a story</h2>
            <p className="section-sub">PinPic uses your GPS to surface stories hidden in the world around you. No searching. Just arrive.</p>
          </div>
          <div className="steps">
            {[
              { n: "01", icon: "📍", title: "Pin your story", desc: "Attach photos and written narratives to exact GPS coordinates. Your story sleeps there, waiting for the next explorer to arrive." },
              { n: "02", icon: "🚶", title: "Travel & discover", desc: "As you approach a location and do the scan, the story unlocks. Story stays in exact location and view range is only upto 1000m" },
              { n: "03", icon: "🗂️", title: "Collect & revisit", desc: "Save stories to your collection to read later — on the train home, in your journal app, or to share with friends who couldn't make the trip." },
            ].map((s, i) => (
              <div key={i} className="step-card reveal" ref={addReveal} style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="step-num">{s.n}</div>
                <div className="step-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section" id="features" style={{ background: "linear-gradient(180deg, transparent 0%, rgba(13,71,161,0.06) 100%)" }}>
        <div className="section-inner">
          <div ref={addReveal} className="reveal">
            <span className="section-tag">Features</span>
            <h2 className="section-title">Built for the<br />curious explorer</h2>
          </div>
          <div className="features-grid reveal" ref={addReveal}>
            {[
              { icon: "🔒", title: "Location locked content", desc: "Images and stories are bound to GPS coordinates. You cannot read them without physically being there." },
              { icon: "📸", title: "Rich visual stories", desc: "Combine photos and written narratives into layered stories. Every image has context, every word has a place." },
              { icon: "🗺️", title: "Story maps", desc: "See a heatmap of stories nearby. Dense areas glow brighter, a living map of collective travel memory. (in development)" },
              { icon: "🗂️", title: "Personal collection", desc: "Bookmark stories you've unlocked to read later. Build a personal archive of every place you've ever visited." },
            ].map((f, i) => (
              <div key={i} className="feat">
                <div className="feat-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOR TRAVELERS */}
      <section className="section traveler-section" id="travelers">
        <div className="section-inner">
          <div className="traveler-grid">
            <div ref={addReveal} className="reveal">
              <span className="section-tag">For Travelers</span>
              <h2 className="section-title">Every place has<br />a story to tell</h2>
              <p className="section-sub">PinPic turns your travel into a living scrapbook and lets you read the ones left behind by those who came before.</p>
              <ul className="traveler-list">
                {[
                  { icon: "✈️", title: "Arrive, unlock, discover", desc: "Stories activate when you step within range of a pin like finding a message in a bottle, but at a temple in Kyoto." },
                  { icon: "📖", title: "Read the hidden history", desc: "Local legends, personal encounters, hidden viewpoints all tagged to the exact spot where they happened." },
                  { icon: "💌", title: "Leave stories for others", desc: "Become a storyteller yourself. Pin your most meaningful travel moments so future visitors can feel what you felt." },
                ].map((item, i) => (
                  <li key={i} className="traveler-item">
                    <div className="traveler-bullet">{item.icon}</div>
                    <div>
                      <strong>{item.title}</strong>
                      <span>{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div ref={addReveal} className="reveal" style={{ transitionDelay: "0.2s" }}>
              <PhoneMockup />
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Features and goals */}
      <ProjectRoadmap />

      {/* STATS */}
      <section className="stats-section reveal" ref={addReveal}>
        <span className="section-tag">Growing fast</span>
        <h2 className="section-title" style={{ fontSize: "clamp(32px, 4vw, 48px)" }}>The world is being<br />written, one pin at a time</h2>
        <div className="stats-grid">
          {[
            { n: "100+", l: "Stories pinned" },
            { n: "Global", l: "Support for any location worldwide" },
            { n: "99.9%", l: "Server uptime" },
            { n: "Active", l: "Developer support" },
          ].map((s, i) => (
            <div key={i} className="stat-item">
              <div className="stat-num">{s.n}</div>
              <div className="stat-label">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      {/* <section className="section" id="stories">
        <div className="section-inner">
          <div ref={addReveal} className="reveal">
            <span className="section-tag">Traveler Stories</span>
            <h2 className="section-title">Heard from<br />the road</h2>
          </div>
          <div className="testimonials">
            {[
              { stars: "★★★★★", text: "I was standing at the base of Angkor Wat when a story unlocked — it was written by a photographer who'd camped there for a week. I read it as the sun rose. Unforgettable.", name: "Priya M.", loc: "Traveled 34 countries", color: "#0077b6" },
              { stars: "★★★★★", text: "PinPic changed how I travel. I don't just look at a place anymore — I listen to it. Every corner has a story pinned by someone who loved it enough to write it down.", name: "Tom R.", loc: "Solo traveler, 5 continents", color: "#00b4d8" },
              { stars: "★★★★★", text: "I pinned a story at my grandmother's village in Italy before she passed. Travelers still unlock it. Knowing her memory lives in that hillside means everything to me.", name: "Giulia F.", loc: "Florence, Italy", color: "#0096c7" },
            ].map((t, i) => (
              <div key={i} className="testi-card reveal" ref={addReveal} style={{ transitionDelay: `${i * 0.12}s` }}>
                <div className="testi-stars">{t.stars}</div>
                <p className="testi-text">"{t.text}"</p>
                <div className="testi-author">
                  <div className="testi-avatar" style={{ background: `linear-gradient(135deg, ${t.color}, #00b4d8)` }} />
                  <div>
                    <div className="testi-name">{t.name}</div>
                    <div className="testi-loc">{t.loc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* About Me */}
      <AboutMe />

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-glow" />
        <div className="cta-card reveal" ref={addReveal}>
          <div style={{ fontSize: 40, marginBottom: 20 }}>📍</div>
          <h2>We are waiting<br />for your Feedback</h2>
          <p>Join thousands of travelers already pinning and discovering stories across the world.</p>
          {/* <div className="cta-input-row"> */}
            {/* <input
              type="email"
              className="cta-input"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            /> */}
            <a href={'https://jessroff.vercel.app/'}>
              <button className="btn-primary" style={{ whiteSpace: "nowrap", padding: "14px 28px" }}> 
                  Connect with me
                </button>
            </a>
          {/* </div> */}
          <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 16 }}>No spam. Be honest. Share love</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid var(--border)", padding: "60px 24px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="footer-top">
            <div className="footer-brand">
              <div className="nav-logo" style={{ marginBottom: 0 }}>
                <span className="nav-logo-dot" />PinPic
              </div>
              <p style={{ marginTop: 12 }}>Location bound stories for the generation of wanderers. Every place has a voice, PinPic is its microphone.</p>
            </div>
            <div className="footer-links">
              <div className="footer-col">
                <h4>Product</h4>
                <a href="#">How it works</a>
                <a href="#">Features</a>
              </div>
              <div className="footer-col">
                <h4>Community</h4>
                <a href="#">Travelers</a>
                <a href="#">Storytellers</a>
              </div>
              <div className="footer-col">
                <h4>Company</h4>
                <a href="#">About</a>
                <a href="#">Blog</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p className="footer-copy">© 2025 PinPic. All rights reserved.</p>
            {/* <p className="footer-copy" style={{ display: "flex", gap: 20 }}>
              <a href="#" style={{ color: "var(--muted)", textDecoration: "none" }}>Twitter</a>
              <a href="#" style={{ color: "var(--muted)", textDecoration: "none" }}>Instagram</a>
              <a href="#" style={{ color: "var(--muted)", textDecoration: "none" }}>LinkedIn</a>
            </p> */}
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}
