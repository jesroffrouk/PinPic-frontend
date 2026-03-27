import { useState, useEffect } from "react"
import {setGlobalError} from "../features/errorSlice"
import { useDispatch } from "react-redux"

export default function useLocation(){
    const dispatch = useDispatch()
    const [location,setLocation] = useState({
        latitude: null,
        longitude: null
    })

    useEffect(()=>{ 
    let watchId = navigator.geolocation.watchPosition((position)=>{
        const {latitude, longitude} = position.coords;
        setLocation({latitude,longitude})
    },(error)=>{
    // need to provide proper error feedback if user doesnot allow location
    console.error("error getting location:" , error)
    dispatch(setGlobalError('error getting location...turn on location and try again'))
    // return error
    },{
    enableHighAccuracy: true,
    maximumAge: 10000,
    timeout: 10000
    })
    return () => navigator.geolocation.clearWatch(watchId);
    }
    ,[])
    return {location};
}