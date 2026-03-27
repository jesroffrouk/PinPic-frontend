
function Menu() {
  return (
    <button className="w-11 h-11 rounded-full bg-primary-background/8 backdrop-blur-xl border border-primary-border/40 flex items-center justify-center hover:bg-primary-background/[0.14] hover:scale-105 transition-all">
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#7fb3d3" strokeWidth={2}>
          <circle cx="12" cy="12" r="1" fill="#7fb3d3" />
          <circle cx="19" cy="12" r="1" fill="#7fb3d3" />
          <circle cx="5" cy="12" r="1" fill="#7fb3d3" />
      </svg>
    </button>
  )
}

export default Menu