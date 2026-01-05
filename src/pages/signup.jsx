import { useNavigate , Link} from "react-router"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { setUser } from "../lib/features/authSlice"

const BASE_URL = import.meta.env.VITE_BACKEND_URL

export default function Signup(){
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [formData,setFormData] = useState({
        email: "",
        username: "",
        password: ""
    })

    const [error,setError] = useState('')
    const errorMessages = {
        USER_EXIST: "user already exist",
        INVALID_GOOGLE_TOKEN: "Invalid google token",
        LOCAL_EMAIL: "please login through email and password"

    }
    const GOOGLE_CLIENT_ID = "8114425658-qbrrfkbt81ai65s5c8jt2ojd4ucfdq3n.apps.googleusercontent.com"

    const handleSignup = async() => {
        // check empty , undefined and null values
        if(!formData.email?.trim() || !formData.username?.trim() || !formData.password?.trim()){
            setError("kindly fill all the details") 
            return
        }
        // making fetch call
        try {
            const response = await fetch(`${BASE_URL}/auth/register`,{
                method: 'POST',
                credentials: "include",
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            const result = await response.json()
            // clearing formdata after request even if it gets error
            setFormData({
                email: "",
                username: "",
                password: ""
            })
            if(!result.error){
                // if successfull
                setError('')
                navigate('/login')
            }
            console.log(result.error)
            setError(errorMessages[result.code] || "unknown server error")
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = (e) =>{
        setFormData((prev)=>({
            ...prev,[e.target.name]: e.target.value
        }))
    }
    // logic for oauth login
    const handleGoogleLogin = () => {
    // Initialize login
    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse,
    });
    // Show the Google popup
    window.google.accounts.id.prompt();
  };
  const handleCredentialResponse = async (response) => {
    const id_token = response.credential;
    try {
      const res = await fetch(`${BASE_URL}/auth/google`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: id_token }),
      });
      // handle error if something goes wrong -- important
      const result = await res.json()
      if(!result.error){
        dispatch(setUser({userid: result.user.id , username: result.user.username , email: result.user.email}))
            setError('')
            navigate('/',{
                replace: true
            })
      }
      setError( errorMessages[result.code] || 'unknown server error')

      // handle for redux set userdetails
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

    return (
        <>
         <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg border border-slate-200">
      {/* Header */}
      <div className="px-6 py-8 text-center border-b border-slate-100">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Signup</h1>
        <p className="mt-2 text-sm text-slate-600">Enter your credentials to Create your account</p>
      </div>

      {/* Content */}
      <div className="px-6 py-8 space-y-6">
        <div className="space-y-4">
          {/* Email Field */}
         <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-slate-700">
            Email
            </label>
            <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="w-full h-11 px-4 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors"
            />
        </div>
          {/* Username Field */}
          <div className="space-y-2">
            <label htmlFor="username" className="block text-sm font-medium text-slate-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              className="w-full h-11 px-4 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors"
            />
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full h-11 px-4 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors"
            />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3">
            <div className="text-red-600 font-medium text-center text-sm">{error}</div>
          </div>
        )}

        {/* Login Button */}
        <button
          onClick={handleSignup}
          className="w-full h-11 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-md shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
        >
          Signup
        </button>

        {/* Register Link */}
        <div className="text-center text-sm text-slate-600">
          Already Register?{" "}
          <Link
            to="/login"
            className="font-medium text-slate-900 hover:text-slate-700 underline underline-offset-4 transition-colors duration-200 cursor-pointer"
          >
            Login
          </Link>
          {/* fix ui for this thing */}

        </div>
        <div className="text-center">
        <button onClick={handleGoogleLogin} className="cursor-pointer py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent text-blue-600 hover:bg-blue-100 focus:outline-hidden focus:bg-blue-100 hover:text-blue-800 focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:bg-blue-800/30 dark:hover:text-blue-400 dark:focus:bg-blue-800/30 dark:focus:text-blue-400">SignIn with Google</button>
        </div>
      </div>
    </div> 
    </div>
        </>
    )
}