import { useLocation, useNavigate } from "react-router"

const NavigationBar = () => {
  let activeTab = 'Maps'
  const location = useLocation()
  const pathname = location.pathname
  if (pathname === '/vault') {
    activeTab = 'Story'
  }
  const Navigate = useNavigate()
  const handleClick = () => {
    if (activeTab === 'Maps') {
     Navigate('/vault')
    }else {
      Navigate('/')
    }
  }

  return (<>
    <div className="fixed bottom-0 z-10 w-full left-1/2 -translate-x-1/2 flex justify-center pb-4 pt-3 bg-transparent">
      {["Maps", "Story"].map(tab => (
        <button
          key={tab}
          onClick={handleClick}
          className="relative flex flex-col items-center gap-1.5 px-10 py-1 transition-all"
        >
          {/* <span className={`w-1 h-1 rounded-full transition-all ${
            activeTab === tab
              ? 'bg-blue-400 opacity-100'
              : 'opacity-0'
          }`}
          style={activeTab === tab ? { boxShadow: '0 0 6px rgba(96,165,250,0.9)' } : {}}
          /> */}
          <span className={`text-[13px] font-medium tracking-wide transition-colors ${
            activeTab === tab ? 'text-white' : 'text-white/35'
          }`}>
            {tab}
          </span>
        </button>
      ))}
    </div>
  </>
)
}

export default NavigationBar