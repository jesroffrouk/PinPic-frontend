import { useState } from "react"
import { useNavigate, Link } from "react-router"
import { useDispatch } from "react-redux"
import { setUser } from "../lib/features/authSlice"

const BASE_URL = import.meta.env.VITE_BACKEND_URL

export default function Login(){
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
    
    const handleLogin = async() => {
        // check if formdata in empty, undefined or null
        if(!formData.username?.trim() || !formData.password?.trim()){
            setError("kindly filled all the details")
            return
        }

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
            navigate('/',{
                replace: true
            })

        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = (e)=>{
        setFormData((prev)=>({ ...prev, [e.target.name]: e.target.value}))
    }

    return (
        <>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg border border-slate-200">
      {/* Header */}
      <div className="px-6 py-8 text-center border-b border-slate-100">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Login</h1>
        <p className="mt-2 text-sm text-slate-600">Enter your credentials to access your account</p>
      </div>

      {/* Content */}
      <div className="px-6 py-8 space-y-6">
        <div className="space-y-4">
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
          onClick={handleLogin}
          className="w-full h-11 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-md shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
        >
          Login
        </button>

        {/* Register Link */}
        <div className="text-center text-sm text-slate-600">
          New user?{" "}
          <Link
            to="/signup"
            className="font-medium text-slate-900 hover:text-slate-700 underline underline-offset-4 transition-colors duration-200 cursor-pointer"
          >
            Register
          </Link>
        </div>
      </div>
    </div> 
    </div>
       
        </>
    )
}