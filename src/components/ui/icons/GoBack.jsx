function GoBack({handleClick}) {
  return (
    <button className="w-11 h-11 rounded-full bg-primary-background/8 backdrop-blur-xl border border-primary-border/40 flex items-center justify-center hover:bg-primary-background/[0.14] hover:scale-105 transition-all" 
    onClick={handleClick}
    >
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#7fb3d3" strokeWidth={2.2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
    </button>
  )
}

export default GoBack