import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router"

const BASE_URL = import.meta.env.VITE_BACKEND_URL

export default function RestrictedPublicRoutes(){
    const navigate = useNavigate()

    useEffect(()=>{
        const handleAsync = async()=> {
            const response = await fetch(`${BASE_URL}/auth/me`,{
                credentials: 'include'
            })
            const result = await response.json()
            console.log(result)
            // just checking if it will give id of current logged in user or not and if does no routing to login page
            if(result.id){
                console.log('you cannot access restricted public sites')
                navigate('/')
            }
        }
        handleAsync()
    },[])

    return (
        <><Outlet/></>
    )
}