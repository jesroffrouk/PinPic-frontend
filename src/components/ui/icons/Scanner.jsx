function Scanner({handleClick}) {
  return (
    <>
    <button className="w-11 h-11 rounded-full bg-primary-background/8 backdrop-blur-xl border border-primary-border/40 flex items-center justify-center hover:bg-primary-background/[0.14] hover:scale-105 transition-all"
    onClick={handleClick}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M3 7V5a2 2 0 012-2h2M17 3h2a2 2 0 012 2v2M21 17v2a2 2 0 01-2 2h-2M7 21H5a2 2 0 01-2-2v-2"
          stroke={"rgba(255,255,255,0.8)"} strokeWidth="2" strokeLinecap="round"/>
        <circle cx="12" cy="12" r="3"
          stroke={"rgba(255,255,255,0.7)"} strokeWidth="1.8"/>
        <circle cx="12" cy="12" r="6"
          stroke={"rgba(255,255,255,0.15)"} strokeWidth="1"/>
      </svg>
    </button>
    </>
  )
}

export default Scanner