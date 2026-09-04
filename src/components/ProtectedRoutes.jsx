// import { useEffect } from "react"
// import { useDispatch } from "react-redux"
import { Outlet, Navigate,useLocation } from "react-router"
// import { setUser } from "../lib/features/authSlice"
import { useGetAuthInfoQuery } from "../lib/features/apiSlice"

// const BASE_URL = import.meta.env.VITE_BACKEND_URL


export default function ProtectedRoutes(){
    // const dispatch = useDispatch()
    const location = useLocation()
    const publicRoutes = ['/']
    const isMatch = publicRoutes.includes(location.pathname)
    const { data , isLoading } = useGetAuthInfoQuery()
    
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-screen">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin" />
        </div>
      );
    }
    const isAuthenticated = data?.success
    if (!isAuthenticated) {
      return (<Navigate to={isMatch ? '/home':'/login'} replace />);
    }
   
    // useEffect(()=>{
    //     const handleAsync = async() => {
    //         const response = await fetch(`${BASE_URL}/auth/me`,{
    //             method: 'GET',
    //             credentials: 'include'
    //         })
    //         // i can return a authenticated boolean value too to check authenticated or not 
    //         const result = await response.json()
    //         if(!result.success){
    //             if (!isMatch) {
    //                 navigate('/login')
    //             }
    //             else {
    //                 navigate('/home')
    //             }
    //         }else{
    //         dispatch(setUser(result.user))
    //         }
    //     }  
    //     handleAsync()
    // },[isMatch])

    return (<Outlet />)
}
