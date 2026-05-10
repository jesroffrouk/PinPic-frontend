import { useEffect, useState } from "react";

// no need of locationLoader rightnow but might be useful in future
export default function LocationLoader({loader}) {
//   const [show,    setShow]    = useState(true);
  const [closing, setClosing] = useState(false);

  const launch = () => { setClosing(false); };


//   if (!show) return (
//     <div className="min-h-screen bg-[#08080a] flex flex-col items-center justify-center gap-4">
//       <span className="text-xs tracking-widest text-white/20">location found</span>
//       <button
//         onClick={launch}
//         className="mt-1 px-5 py-2 rounded-full border border-white/10 bg-black/80 text-xs text-white/40 hover:text-white/75 hover:border-white/20 transition-all cursor-pointer"
//       >
//         ↺ replay
//       </button>
//     </div>
//   );

  return (
    <div className="min-h-screen bg-[#08080a]">
      {/* overlay */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/45 transition-opacity duration-300 ${
          closing ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        {/* card */}
        <div
          className={`flex flex-col items-center gap-5 bg-white/5 border border-white/8 rounded-2xl px-10 py-9 shadow-2xl transition-all duration-300 ${
            closing ? "opacity-0 scale-95" : "opacity-100 scale-100"
          }`}
        >
          {/* spinner */}
          <div className="w-10 h-10 rounded-full border-2 border-white/10 border-t-white/75 animate-spin" />

          {/* text */}
          <span className="text-sm font-light text-white/50 tracking-wide">
            Finding your location…
          </span>
        </div>
      </div>
    </div>
  );
}