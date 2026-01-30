import { Link, useNavigate } from "react-router"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { LogOut } from 'lucide-react'
import DarkModeToggle from '../components/DarkmodeToggle'
import { NotificationOverlay } from "./NotificationOverlay"

const BASE_URL = import.meta.env.VITE_BACKEND_URL

export default function Header() {
  const Navigate = useNavigate()
  const user = useSelector((state) => state.auth.user)
  console.log(user)
  const navItems = [
    { name: "Home", to: "/" },
    { name: "About", to: "/about" },
    { name: "Upload", to: "/upload" },
    { name: 'Vault', to: "/vault" }
  ]

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notifications,setNotifications] = useState([])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = async () => {
    const response = await fetch(`${BASE_URL}/auth/logout`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const result = await response.json()
    if (!result.success) {
      Navigate('/login')
    }
    // handle error if something went wrong
  }
  // call notification in here
  useEffect(()=>{
    const handleAsync = async()=>{
      const response = await fetch(`${BASE_URL}/img/notifications`,{
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      const result = await response.json()

      if (!result.success) {
        console.error("something went wrong while getting notifications")
      }
      console.log(result.notifications)
      setNotifications(result.notifications)
    }
    handleAsync()
  },[])

return (
    <nav className="bg-theme-primary dark:bg-theme-primary border-b border-theme-primary dark:border-gray-700 shadow-sm transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link 
              to="/" 
              className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-indigo-900 dark:from-indigo-400 dark:to-purple-400 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
            >
              PinPic
            </Link>
          </div>

          {/* Navigation Links - Hidden on mobile */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  className="text-theme-secondary dark:text-gray-300 hover:text-theme-primary dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover-bg-theme"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Username/Auth Section */}
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <DarkModeToggle />
            {notifications && <NotificationOverlay notifications={notifications}/>}
            
            
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <span className="text-theme-primary dark:text-white font-medium text-sm sm:block">
                    {user.username}
                  </span>
                </div>
                <button
                  className="text-theme-secondary dark:text-gray-300 hover:text-theme-primary dark:hover:text-white text-sm font-medium transition-colors"
                  onClick={handleLogout}
                >
                  <div className="flex cursor-pointer items-center space-x-1">
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </div>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-theme-tertiary dark:bg-gray-700 hover-bg-theme dark:hover:bg-gray-600 text-theme-primary dark:text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-theme-secondary dark:text-gray-300 hover:text-theme-primary dark:hover:text-white p-2 rounded-md transition-colors"
              aria-label="Toggle mobile menu"
            >
              <svg
                className={`h-6 w-6 transform transition-transform duration-200 ${isMobileMenuOpen ? 'rotate-90' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu - Conditionally rendered */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-theme-primary dark:border-gray-700 mt-2 text-center bg-theme-primary dark:bg-theme-primary">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  className="text-theme-secondary dark:text-gray-300 hover:text-theme-primary dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 hover-bg-theme"
                  onClick={() => setIsMobileMenuOpen(false)} // Close menu when link is clicked
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}