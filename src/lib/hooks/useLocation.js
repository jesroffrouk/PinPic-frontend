import { useState, useEffect } from "react"

export default function useLocation(){
    const [location,setLocation] = useState({
        latitude: null,
        longitude: null
    })
    const [error,setError] = useState(null)

    useEffect(()=>{ 
    let watchId = navigator.geolocation.watchPosition((position)=>{
        const {latitude, longitude} = position.coords;
        setLocation({latitude,longitude})
        setError(null)
    },(error)=>{
    // need to provide proper error feedback if user doesnot allow location
    console.error("error getting location:" , error)
    setError("didnot get the location of the device")
    // return error
    },{
    enableHighAccuracy: true,
    maximumAge: 10000,
    timeout: 10000
    })
    return () => navigator.geolocation.clearWatch(watchId);
    }
    ,[])
    return {location,error};
}