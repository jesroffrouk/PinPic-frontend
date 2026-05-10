function Add({handleClick}) {
  return (
    <>
    <button className="w-11 h-11 rounded-full button_gradient backdrop-blur-xl border border-primary-border/40 flex items-center justify-center hover:bg-primary-background/[0.14] hover:scale-105 transition-all" 
    onClick={handleClick}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <line x1="12" y1="5" x2="12" y2="19" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="5" y1="12" x2="19" y2="12" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    </button>
    </>
  )
}

export default Add