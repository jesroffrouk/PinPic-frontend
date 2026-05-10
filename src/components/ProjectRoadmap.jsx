import { useState, useEffect, useRef } from "react";
import '../css/ProjectRoadmap.css'

/* ─── ROADMAP DATA ─────────────────────────────────────────────────────────── */
const QUARTERS = [
  {
    label: "Q4 2026",
    tag: "In Progress",
    tagColor: "#00b4d8",
    features: [
      {
        icon: "🔥",
        title: "Story Heatmaps",
        desc: "See the world light up. A live heatmap layer on the map shows clusters of popular, frequently unlocked stories glowing brighter as more travelers visit.",
        status: "building",
        progress: 40,
      },
      {
        icon: "📡",
        title: "Offline Reading",
        desc: "Download collected stories before you travel. Read rich narratives, view images, and replay routes even without a data connection in remote locations.",
        status: "building",
        progress: 30,
      },
      {
        icon: "🗺️",
        title: "Custom Story Routes",
        desc: "String multiple pins into a guided walking route. Share your curated trail with other travelers like a playlist, but for places.",
        status: "building",
        progress: 10,
      },
    ],
  },
  {
    label: "Q1 2027",
    tag: "Coming Soon",
    tagColor: "#0096c7",
    features: [
      // {
      //   icon: "🎧",
      //   title: "Audio Stories",
      //   desc: "Record your voice, add ambient sound, and let travelers listen as they walk through a location. Immersive, spatial audio narration tied to the pin.",
      //   status: "planned",
      //   progress: 0,
      // },
      {
        icon: "🏅",
        title: "Explorer Badges",
        desc: "Unlock rare badges for visiting legendary locations, discovering hidden pins, or being the first to read a newly placed story. A living achievement system.",
        status: "planned",
        progress: 0,
      },
      {
        icon: "🌐",
        title: "Multi-language Stories",
        desc: "AI-powered real-time translation of stories into your native language — so a story pinned in Japanese reads fluidly in English, Hindi, or Spanish.",
        status: "planned",
        progress: 0,
      },
    ],
  },
  {
    label: "Q2 2026",
    tag: "On the Horizon",
    tagColor: "#023e8a",
    features: [
      // {
      //   icon: "🕶️",
      //   title: "AR Story Overlay",
      //   desc: "Point your camera at a location and see pinned stories floating in augmented reality — images, text, and route markers layered over the real world.",
      //   status: "future",
      //   progress: 0,
      // },
      {
        icon: "🤝",
        title: "Collaborative Pins",
        desc: "Multiple authors can co-write a story at a single pin — ideal for groups, travel blogs, or local communities building a shared narrative around a place.",
        status: "future",
        progress: 0,
      },
      {
        icon: "🧭",
        title: "Proximity Notifications",
        desc: "Get a silent nudge when you wander within range of a highly-rated story. No searching — PinPic whispers when something worth reading is nearby.",
        status: "future",
        progress: 0,
      },
    ],
  },
];


const CHIP_LABELS = { building: "Building now", planned: "Planned", future: "On the horizon" };

/* ─── VOTE DATA ─────────────────────────────────────────────────────────────── */
const VOTE_ITEMS = [
  { id: "heatmap", label: "🔥 Heatmaps", count: 412 },
  { id: "offline", label: "📡 Offline mode", count: 389 },
  { id: "audio", label: "🎧 Audio stories", count: 307 },
  { id: "ar", label: "🕶️ AR overlay", count: 278 },
  { id: "routes", label: "🗺️ Story routes", count: 261 },
  { id: "badges", label: "🏅 Badges", count: 198 },
];

/* ─── COMPONENT ─────────────────────────────────────────────────────────────── */
export default function ProjectRoadmap() {
  const [votes, setVotes] = useState({});
  const revealRefs = useRef([]);
  const barRefs = useRef([]);

  // Bidirectional reveal observer
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.remove("exit-up", "exit-down");
          e.target.classList.add("visible");
          e.target._wasVisible = true;
        } else {
          if (!e.target._wasVisible) return;
          const scrolledPast = e.boundingClientRect.top < 0;
          e.target.classList.remove("visible");
          e.target.classList.add(scrolledPast ? "exit-up" : "exit-down");
          e.target._wasVisible = false;
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -30px 0px" });

    revealRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Progress bar animation observer
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("bar-visible");
        else e.target.classList.remove("bar-visible");
      });
    }, { threshold: 0.2 });
    barRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const addReveal = (el) => { if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el); };
  const addBar = (el) => { if (el && !barRefs.current.includes(el)) barRefs.current.push(el); };

  const toggleVote = (id) =>
    setVotes((v) => ({ ...v, [id]: !v[id] }));

  return (
    <>
      <div className="project_roadmap">
      <section className="rm-root" id="product">
        <div className="rm-orb rm-orb-a" />
        <div className="rm-orb rm-orb-b" />
        <div className="rm-grid" />

        <div className="rm-inner">

          {/* ── Header ── */}
          <div className="rm-reveal" ref={addReveal}>
            <div className="rm-eyebrow">
              <span className="rm-eyebrow-dot" />
              Product Roadmap
            </div>
            <h2 className="rm-title">
              What's being<br /><em>built next</em>
            </h2>
            <p className="rm-sub">
              PinPic is growing fast. Here's I am developing actively shipping, planning, and dreaming about. Ordered by when you'll get to use it.
            </p>
          </div>

          {/* ── Timeline ── */}
          <div className="rm-timeline">
            <div className="rm-rail" />

            {QUARTERS.map((q, qi) => (
              <div key={qi} className="rm-quarter">
                {/* Label */}
                <div
                  className="rm-qlabel rm-reveal"
                  ref={addReveal}
                  style={{ transitionDelay: `${qi * 0.05}s` }}
                >
                  <div className="rm-qdate">{q.label}</div>
                  <span
                    className="rm-qtag"
                    style={{ color: q.tagColor, borderColor: q.tagColor + "55", background: q.tagColor + "14" }}
                  >
                    {q.tag}
                  </span>
                </div>

                {/* Timeline dot */}
                <div className="rm-dot" />

                {/* Cards */}
                <div className="rm-cards">
                  {q.features.map((f, fi) => (
                    <div
                      key={fi}
                      className="rm-card rm-reveal"
                      ref={(el) => {
                        addReveal(el);
                        if (f.progress > 0) addBar(el);
                      }}
                      style={{ transitionDelay: `${qi * 0.06 + fi * 0.09}s` }}
                    >
                      <span className="rm-card-icon">{f.icon}</span>
                      <div className="rm-card-title">{f.title}</div>
                      <div className="rm-card-desc">{f.desc}</div>

                      {f.progress > 0 && (
                        <div className="rm-progress-wrap">
                          <div className="rm-progress-label">
                            <span>Progress</span>
                            <span>{f.progress}%</span>
                          </div>
                          <div className="rm-progress-bar">
                            <div
                              className="rm-progress-fill"
                              style={{ "--p": f.progress / 100 }}
                            />
                          </div>
                        </div>
                      )}

                      <div className={`rm-chip rm-chip-${f.status}`}>
                        <span className="rm-chip-dot" />
                        {CHIP_LABELS[f.status]}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* ── Vote strip ── */}
          {/* <div className="rm-reveal" ref={addReveal} style={{ transitionDelay: "0.1s" }}>
            <div
              style={{
                background: "rgba(0,180,216,0.05)",
                border: "1px solid rgba(0,180,216,0.15)",
                borderRadius: 20,
                padding: "32px 36px",
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  display: "flex", alignItems: "flex-start",
                  justifyContent: "space-between", flexWrap: "wrap", gap: 16,
                  marginBottom: 20,
                }}
              >
                <div>
                  <h3
                    style={{
                      fontFamily: "var(--fhead)", fontSize: 18, fontWeight: 700,
                      color: "#fff", marginBottom: 4,
                    }}
                  >
                    👇 Vote for what matters to you
                  </h3>
                  <p style={{ fontSize: 13, color: "var(--muted)", fontWeight: 300 }}>
                    Your votes shape our build priority. Click the features you care most about.
                  </p>
                </div>
                <div
                  style={{
                    fontSize: 12, color: "var(--cyan)", background: "rgba(0,180,216,0.1)",
                    border: "1px solid rgba(0,180,216,0.25)", borderRadius: 100,
                    padding: "5px 14px", whiteSpace: "nowrap", alignSelf: "flex-start",
                  }}
                >
                  {Object.values(votes).filter(Boolean).length} voted
                </div>
              </div>

              <div className="rm-vote-row">
                {VOTE_ITEMS.map((v) => (
                  <button
                    key={v.id}
                    className={`rm-vote ${votes[v.id] ? "voted" : ""}`}
                    onClick={() => toggleVote(v.id)}
                  >
                    {v.label}
                    <span className="count">
                      {votes[v.id] ? v.count + 1 : v.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div> */}

          {/* ── CTA strip ── */}
          <div className="rm-reveal" ref={addReveal} style={{ transitionDelay: "0.15s" }}>
            <div className="rm-cta">
              <div className="rm-cta-text">
                <h3>Have a feature idea?</h3>
                <p>We read every suggestion. Drop it in our community Discord and it might make the roadmap.</p>
              </div>
              <button className="rm-cta-btn">💬 Share your idea →</button>
            </div>
          </div>

        </div>
      </section>
    </div>
    </>
  );
}