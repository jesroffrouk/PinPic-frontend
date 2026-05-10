function Profile({handleClick}) {
    // add an onclick
  return (
    <>
    <button className="w-11 h-11 rounded-full bg-primary-background/8 backdrop-blur-xl border border-primary-border/40 flex items-center justify-center hover:bg-primary-background/[0.14] hover:scale-105 transition-all" 
    onClick={handleClick}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="4" stroke="white" strokeWidth="1.8"/>
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    </button>
    </>
  )
}

export default Profile