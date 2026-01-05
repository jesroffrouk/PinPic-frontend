import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Outlet, useNavigate } from "react-router"
import { setUser } from "../lib/features/authSlice"

const BASE_URL = import.meta.env.VITE_BACKEND_URL

export default function ProtectedRoutes(){

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(()=>{
        const handleAsync = async() => {
            const response = await fetch(`${BASE_URL}/auth/me`,{
                method: 'GET',
                credentials: 'include'
            })
            // i can return a authenticated boolean value too to check authenticated or not 
            const user = await response.json()
            if(user.error){
                navigate('/login')
            }
            dispatch(setUser(user))
        }  
        handleAsync()      
    },[])

    return (
    <>
    <Outlet />   
    </>)
}