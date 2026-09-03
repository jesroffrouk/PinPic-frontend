import { useState } from 'react';
import { Eye, EyeOff, MapPin, Check } from 'lucide-react';

import { useNavigate , Link} from "react-router"
import { useDispatch } from "react-redux"
import { setUser } from "../lib/features/authSlice"
import { setGlobalError } from "../lib/features/errorSlice"

const BASE_URL = import.meta.env.VITE_BACKEND_URL

export default function Signup() {
  const [isLoading, setIsLoading] = useState(false);
  // const [validations, setValidations] = useState({
  //   minLength: false,
  //   hasNumber: false,
  //   hasSpecial: false,
  // });

  // const handleChange = () => {
  //   const { name, value } = e.target;
  //   setFormData(prev => ({
  //     ...prev,
  //     [name]: value,
  //   }));

  //   // Password validation
  //   if (name === 'password') {
  //     setValidations({
  //       minLength: value.length >= 8,
  //       hasNumber: /\d/.test(value),
  //       hasSpecial: /[!@#$%^&*]/.test(value),
  //     });
  //   }
  // };

  // const isPasswordValid = validations.minLength && validations.hasNumber && validations.hasSpecial;

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

    const handleSignup = async(e) => {
        e.preventDefault()
        // check empty , undefined and null values
        if(!formData.email?.trim() || !formData.username?.trim() || !formData.password?.trim()){
            setError("kindly fill all the details") 
            return
        }
        // making fetch call
        setIsLoading(true)
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
                setIsLoading(false)
                navigate('/login')
            }
            console.log(result.error)
            setError(errorMessages[result.code] || "unknown server error")
        } catch (error) {
            console.log(error)
            setIsLoading(false)
            dispatch(setGlobalError("Network failed.. Try again later"))
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
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center p-4 py-12">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
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
          <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-blue-300 text-sm">Join millions sharing their world in images</p>
        </div>

        {/* Signup Card */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-blue-500/20 rounded-3xl p-8 shadow-2xl">
          <form onSubmit={handleSignup} className="space-y-5">
            {/* Username Field */}
            <div className="space-y-3">
              <label htmlFor="username" className="block text-sm font-medium text-gray-100">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Choose a unique username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-800/50 border border-blue-500/30 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 text-white placeholder-gray-500 transition-all duration-300"
                required
              />
            </div>

            {/* Email Field */}
            <div className="space-y-3">
              <label htmlFor="email" className="block text-sm font-medium text-gray-100">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
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
                  placeholder="Create a strong password"
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

            {/* Password Requirements */}
            {/* <div className="bg-slate-800/30 border border-blue-500/20 rounded-xl p-4 space-y-3">
              <p className="text-xs text-gray-400 font-semibold">Password Requirements:</p>
              <div className="space-y-2">
                <div className={`flex items-center gap-2 text-xs transition-colors ${validations.minLength ? 'text-green-400' : 'text-gray-400'}`}>
                  <Check className={`w-4 h-4 ${validations.minLength ? 'block' : 'invisible'}`} />
                  <span>At least 8 characters</span>
                </div>
                <div className={`flex items-center gap-2 text-xs transition-colors ${validations.hasNumber ? 'text-green-400' : 'text-gray-400'}`}>
                  <Check className={`w-4 h-4 ${validations.hasNumber ? 'block' : 'invisible'}`} />
                  <span>Contains a number</span>
                </div>
                <div className={`flex items-center gap-2 text-xs transition-colors ${validations.hasSpecial ? 'text-green-400' : 'text-gray-400'}`}>
                  <Check className={`w-4 h-4 ${validations.hasSpecial ? 'block' : 'invisible'}`} />
                  <span>Contains a special character (!@#$%^&*)</span>
                </div>
              </div>
            </div> */}

            {/* Terms Checkbox */}
            <div className="flex items-start gap-3">
              <input
                id="terms"
                type="checkbox"
                className="mt-1 w-4 h-4 bg-slate-800/50 border border-blue-500/30 rounded cursor-pointer checked:bg-blue-600 checked:border-blue-600 transition-colors"
                required
              />
              <label htmlFor="terms" className="text-xs text-gray-400 cursor-pointer">
                I agree to the{' '}
                <Link href="#" className="text-blue-400 hover:text-blue-300">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="#" className="text-blue-400 hover:text-blue-300">
                  Privacy Policy
                </Link>
              </label>
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/50 hover:shadow-blue-500/70 disabled:opacity-50"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating account...
                </span>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-blue-500/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-slate-900/50 text-gray-400">or sign up with</span>
            </div>
          </div>

          {/* Social Sign Up Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button className="w-full px-4 py-3 bg-slate-800/50 border border-blue-500/20 rounded-xl hover:border-blue-400/50 transition-colors text-gray-300 font-medium flex items-center justify-center gap-2 text-sm">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </button>
            <button
            onClick={handleGoogleLogin} 
            className="w-full px-4 py-3 bg-slate-800/50 border border-blue-500/20 rounded-xl hover:border-blue-400/50 transition-colors text-gray-300 font-medium flex items-center justify-center gap-2 text-sm">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.745 12.27c0-.79-.3-1.54-.82-2.1v-2.49h-1.99v1.74c-.48-.34-1.05-.54-1.66-.54-1.93 0-3.5 1.57-3.5 3.5s1.57 3.5 3.5 3.5c.61 0 1.18-.2 1.66-.53v1.73h1.99v-2.5c.52-.56.82-1.3.82-2.1zm-3.5 1.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
              </svg>
              Google
            </button>
          </div>

          {/* Sign In Link */}
          <p className="text-center mt-6 text-gray-400 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
