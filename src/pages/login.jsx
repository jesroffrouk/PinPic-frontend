import { useState } from 'react';
import { Eye, EyeOff, MapPin } from 'lucide-react';
import { useNavigate,Link } from 'react-router';
import { useDispatch } from "react-redux"
import { setUser } from "../lib/features/authSlice"
import {setGlobalError} from "../lib/features/errorSlice"
import ErrorInline from '../components/error/ErrorInline';

const BASE_URL = import.meta.env.VITE_BACKEND_URL

export default function Login() {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [formData,setFormData] = useState({
        username: "",
        password: ""
    })

    const [error,setError] = useState("")
    const errorMessage = {
        USER_NOT_EXIST: "user doesnot exist",
        INCORRECT_PASSWORD: "incorrect password"
    }
    
    const handleLogin = async(e) => {
        e.preventDefault()
        // check if formdata in empty, undefined or null
        if(!formData.username?.trim() || !formData.password?.trim()){
            setError("kindly filled all the details")
            return
        }
        setIsLoading(true)
        try {
            const response = await fetch(`${BASE_URL}/auth/login`,{
                method: 'POST',
                credentials: "include",
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })

            const result = await response.json()
            // clearing formdata even if it gets error
            setFormData({
                username: "",
                password: ""
            }) 
            if(!result.success){ 
              setError( errorMessage[result.code] || 'unknown server error')
              return
            }
            dispatch(setUser({userid: result.user.id , username: result.user.username , email: result.user.email}))
            setError('')
            setIsLoading(false)
            navigate('/',{
                replace: true
            })

        } catch (error) {
            setIsLoading(false)
            dispatch(setGlobalError("Network failed..Try again later"))
        }
    }

    const handleChange = (e)=>{
        setFormData((prev)=>({ ...prev, [e.target.name]: e.target.value}))
    }


  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
      </div>

      {/* Main container */}
      <div className="w-full max-w-md relative z-10">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/50">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-linear-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              PinPic
            </span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-blue-300 text-sm">Discover moments, share locations, create memories</p>
        </div>

        {/* Login Card */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-blue-500/20 rounded-3xl p-8 shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Username Field */}
            <div className="space-y-3">
              <label htmlFor="username" className="block text-sm font-medium text-gray-100">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-800/50 border border-blue-500/30 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 text-white placeholder-gray-500 transition-all duration-300"
                required
              />
            </div>

            {/* Password Field */}
            <div className="space-y-3">
              <label htmlFor="password" className="block text-sm font-medium text-gray-100">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={'password'}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-blue-500/30 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 text-white placeholder-gray-500 transition-all duration-300 pr-12"
                  required
                />
                {/* <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button> */}
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end">
              <Link href="#" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                Forgot password?
              </Link>
            </div>
            {/* Error Inline */}
            {error && <ErrorInline error={error} />}
            
            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/50 hover:shadow-blue-500/70 disabled:opacity-50"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-blue-500/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-slate-900/50 text-gray-400">or continue with</span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button className="w-full px-4 py-3 bg-slate-800/50 border border-blue-500/20 rounded-xl hover:border-blue-400/50 transition-colors text-gray-300 font-medium flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </button>
            <button className="w-full px-4 py-3 bg-slate-800/50 border border-blue-500/20 rounded-xl hover:border-blue-400/50 transition-colors text-gray-300 font-medium flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.745 12.27c0-.79-.3-1.54-.82-2.1v-2.49h-1.99v1.74c-.48-.34-1.05-.54-1.66-.54-1.93 0-3.5 1.57-3.5 3.5s1.57 3.5 3.5 3.5c.61 0 1.18-.2 1.66-.53v1.73h1.99v-2.5c.52-.56.82-1.3.82-2.1zm-3.5 1.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
              </svg>
              Google
            </button>
          </div>

          {/* Sign Up Link */}
          <p className="text-center mt-6 text-gray-400 text-sm">
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
              Sign up
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center mt-8 text-gray-500 text-xs">
          By signing in, you agree to our{' '}
          <Link href="#" className="text-blue-400 hover:text-blue-300">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="#" className="text-blue-400 hover:text-blue-300">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}
