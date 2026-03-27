import { useState, useEffect, useRef } from "react";
import Background from "./ui/Background";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router";

const AVATARS = [
  { id: 1, src: "https://i.pravatar.cc/100?img=5",  style: { top: "14%", left: "10%" } },
  { id: 2, src: "https://i.pravatar.cc/100?img=12", style: { top: "16%", right: "10%" } },
  { id: 3, src: "https://i.pravatar.cc/100?img=47", style: { top: "35%", left: "28%" } },
  { id: 4, src: "https://i.pravatar.cc/100?img=33", style: { top: "42%", right: "12%" } },
  { id: 5, src: "https://i.pravatar.cc/100?img=21", style: { top: "62%", left: "8%" } },
  { id: 6, src: "https://i.pravatar.cc/100?img=39", style: { top: "68%", right: "11%" } },
];

const BADGES = [
  { id: "b1", label: 4,  color: "#f4831f", style: { top: "44%", left: "22%" } },
  { id: "b2", label: 8,  color: "#52b788", style: { top: "45%", right: "20%" } },
  { id: "b3", label: 23, color: "#52b788", style: { top: "74%", left: "36%" } },
  { id: "b4", label: 6,  color: "#f4831f", style: { top: "80%", right: "20%" } },
];

const SCHEDULE = [
  { id: 3,    delay: 600  },
  { id: "b1", delay: 900  },
  { id: 1,    delay: 1100 },
  { id: 4,    delay: 1400 },
  { id: "b2", delay: 1700 },
  { id: 2,    delay: 1900 },
  { id: "b3", delay: 2200 },
  { id: 5,    delay: 2400 },
  { id: 6,    delay: 2700 },
  { id: "b4", delay: 2900 },
];

const SCAN_DURATION = 3500;

const RINGS = [
  { size: "w-80 h-80", delay: "0s" },
  { size: "w-60 h-60", delay: "0.3s" },
  { size: "w-40 h-40", delay: "0.6s" },
  { size: "w-20 h-20", delay: "0.9s" },
];

const ScannerTitle = () => (
  <>
    <h1
      className="scanner_title_shadow relative z-10 mt-8 title_name"
    >
      Pictures Nearby
    </h1>
  </>
)

const ScannerArea = ({scanning,visibleIds,angle,tx,ty}) => (
  <>
          <div className="relative z-10 w-85 h-125 mt-5 flex items-center justify-center">

            {/* Rings */}
            {RINGS.map((r, i) => (
              <div
                key={i}
                className={`absolute ${r.size} rounded-full border border-white/40 ring-breath`}
                style={{ animationDelay: r.delay }}
              />
            ))}

            {/* Conic sweep gradient */}
            {scanning && (
              <div
                className="absolute w-80 h-80 rounded-full pointer-events-none"
                style={{
                  background: `conic-gradient(
                    from ${angle - 90}deg,
                    transparent 0deg,
                    rgba(100,180,255,.04) 18deg,
                    rgba(100,180,255,.18) 58deg,
                    rgba(100,180,255,.33) 80deg,
                    rgba(100,180,255,0)   90deg,
                    transparent           91deg
                  )`,
                }}
              />
            )}

            {/* SVG sweep line + glowing tip */}
            {scanning && (
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
                viewBox="0 0 100 100"
              >
                <defs>
                  <filter id="lineglow">
                    <feGaussianBlur stdDeviation="1.5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <line
                  x1="50" y1="50" x2={tx} y2={ty}
                  stroke="rgba(100,180,255,.95)"
                  strokeWidth=".65"
                  strokeLinecap="round"
                  filter="url(#lineglow)"
                />
                <circle
                  cx={tx} cy={ty} r="1.5"
                  fill="rgba(100,180,255,1)"
                  filter="url(#lineglow)"
                />
              </svg>
            )}

            {/* Center dot */}
            <div className="absolute w-6 h-6 rounded-full bg-white/95 flex items-center justify-center z-10 dot-glow">
              <div className="w-2.5 h-2.5 rounded-full bg-[#1a5c3a]" />
            </div>

            {/* Avatars */}
            {AVATARS.map((av) => (
              <div
                key={av.id}
                className={`absolute w-14 h-14 rounded-full border-[3px] border-primary-border/40 overflow-hidden z-8
                  ${visibleIds.has(av.id) ? "pop-in" : "opacity-0 scale-0"}`}
                style={{
                  ...av.style,
                  boxShadow: "0 4px 20px rgba(0,0,0,.45)",
                }}
              >
                <img src={av.src} alt="" className="w-full h-full object-cover" />
              </div>
            ))}

            {/* Badges */}
            {BADGES.map((b) => (
              <div
                key={b.id}
                className={`absolute w-9 h-9 rounded-full flex items-center justify-center
                  text-white font-extrabold text-[13px] z-8
                  ${visibleIds.has(b.id) ? "pop-in" : "opacity-0 scale-0"}`}
                style={{
                  ...b.style,
                  background: b.color,
                  boxShadow: "0 3px 14px rgba(0,0,0,.35)",
                }}
              >
                {b.label}
              </div>
            ))}
          </div>
  </>
)

const StatusArea = ({scanning,done}) => (
  <>
    <div className="flex items-center z-10">
      {scanning && (
        <span className="blink text-[11px] font-bold tracking-[3px] text-tertiary-text">
          ● SCANNING...
        </span>
      )}
      {done && !scanning && (
        <span className="small_regular_text text-tertiary-text/80">
          ✓ SCAN COMPLETE
        </span>
      )}
    </div>
  </>
)

const ScanButton = ({startScan,scanning,done}) => (
  <>
    <button
      onClick={startScan}
      disabled={scanning}
      className={`
        z-10 mt-3 px-12 py-3.5 rounded-full text-secondary-text font-extrabold text-base tracking-wide
        transition-all duration-300
        ${scanning
          ? "bg-tertiary-background opacity-60 cursor-not-allowed"
          : "bg-tertiary-background hover:scale-105 active:scale-95 cursor-pointer hover:brightness-110"}
      `}
      style={{
        boxShadow: scanning
          ? "0 4px 16px rgba(45,122,85,.3)"
          : "0 4px 24px rgba(82,183,136,.6)",
      }}
    >
      {scanning ? "Scanning…" : done ? "Scan Again" : "Start Scanning"}
    </button>
  </>
)

export default function Scanner({handleExit}) {
  const [scanning, setScanning]     = useState(false);
  const [visibleIds, setVisibleIds] = useState(new Set());
  const [angle, setAngle]           = useState(0);
  const rafRef      = useRef(null);
  const startRef    = useRef(null);
  const timeoutsRef = useRef([]);
  const Navigate = useNavigate()

  const startScan = () => {
    if (scanning) return;
    setScanning(true);
    setVisibleIds(new Set());
    setAngle(0);
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];

    startRef.current = performance.now();
    const animate = (now) => {
      const elapsed = now - startRef.current;
      setAngle(((elapsed / SCAN_DURATION) * 360 * 1.5) % 360);
      if (elapsed < SCAN_DURATION) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setScanning(false);
        // if i got some images sent it to feed page otherwise just handleExit it.
        // for now I am just routing it to feed page
        Navigate('/vault')
        handleExit?.()
      }
    };
    rafRef.current = requestAnimationFrame(animate);

    SCHEDULE.forEach(({ id, delay }) => {
      const t = setTimeout(() => {
        setVisibleIds((prev) => new Set([...prev, id]));
      }, delay);
      timeoutsRef.current.push(t);
    });
  };

  useEffect(() => () => {
    startScan()
    return () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    timeoutsRef.current.forEach(clearTimeout);
    }
  }, []);

  const rad = ((angle - 90) * Math.PI) / 180;
  const tx  = 50 + Math.cos(rad) * 46;
  const ty  = 50 + Math.sin(rad) * 46;

  return createPortal(
    <div className="fixed inset-0 z-50">
    <Background>
      <div className="min-h-screen flex items-center justify-center">

        {/* Phone shell */}
        <div
          className="relative w-90 h-160 overflow-hidden flex flex-col items-center" >
          {/* Header */}
          <ScannerTitle />

          {/* Scan area */}
          <ScannerArea scanning={scanning} visibleIds={visibleIds} angle={angle} tx={tx} ty={ty} />

        </div>
      </div>
    </Background>
    </div>
,document.body
  );
}