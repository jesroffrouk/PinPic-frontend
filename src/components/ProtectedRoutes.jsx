import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Outlet, useNavigate,useLocation } from "react-router"
import { setUser } from "../lib/features/authSlice"

const BASE_URL = import.meta.env.VITE_BACKEND_URL

export default function ProtectedRoutes(){

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const publicRoutes = ['/','/about']
    const isMatch = publicRoutes.includes(location.pathname)

    useEffect(()=>{
        const handleAsync = async() => {
            const response = await fetch(`${BASE_URL}/auth/me`,{
                method: 'GET',
                credentials: 'include'
            })
            // i can return a authenticated boolean value too to check authenticated or not 
            const result = await response.json()
            if(!result.success){
                if (!isMatch) {
                    navigate('/login')
                }
            }else{
            dispatch(setUser(result.user))
            }
        }  
        handleAsync()      
    },[isMatch])

    return (
    <>
    <Outlet />   
    </>)
}