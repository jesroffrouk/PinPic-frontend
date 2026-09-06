
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { apiSlice, useGetLogoutMutation } from "../../../lib/features/apiSlice";
import { useDispatch } from "react-redux";

function Settings() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const Navigate = useNavigate()
  const [trigger] = useGetLogoutMutation()
  const dispatch = useDispatch();

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async() => {
    try {
      setOpen(false);
      await trigger().unwrap();
      dispatch(apiSlice.util.resetApiState());
      Navigate('/login', { replace: true});
    } catch (error) {
      console.error('Logout Failed:',error)  
    }
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-11 h-11 rounded-full bg-primary/8 backdrop-blur-xl border border-primary-border/40 flex items-center justify-center hover:bg-primary/[0.14] hover:scale-105 transition-all"
      >
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="3" stroke="#93b4d4" strokeWidth="2" />
          <path
            d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"
            stroke="#93b4d4"
            strokeWidth="2"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 rounded-xl bg-primary/95 backdrop-blur-xl border border-primary-border/40 shadow-lg overflow-hidden z-50">
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2.5 text-sm text-white hover:bg-primary/10 transition-colors"
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
}

export default Settings;
