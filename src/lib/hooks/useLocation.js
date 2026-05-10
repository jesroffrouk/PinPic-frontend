import { useState, useEffect, useRef } from "react"
import {setGlobalError} from "../features/errorSlice"
import { useDispatch, useSelector } from "react-redux"
import { setLocation,setLocationError,setLocationLoading } from "../features/locationSlice"

const DISTANCE_THRESHOLD_KM = 0.5 // 500m

function getDistanceKm(lat1,lon1,lat2,lon2) {
    const R = 6371
    const dLat = ((lat2-lat1) * Math.PI) / 180
    const dLon = ((lon2-lon1) * Math.PI) / 180

    const a = 
            Math.sin(dLat / 2) ** 2 + Math.cos((lat1 * Math.PI)/180) * Math.cos((lat2 * Math.PI)/180) * Math.sin(dLon / 2) ** 2
    return R * 2 * Math.atan2(Math.sqrt(a) , Math.sqrt(1-a))
}


export default function useLocation(){
    const dispatch = useDispatch()
    const locationRef = useRef({latitude: null,longitude: null})
    const watchIdRef = useRef(null)

    useEffect(()=>{ 
        if (watchIdRef.current !== null) return

        if (!navigator.geolocation) {
            dispatch(setGlobalError('geolocation not supported'))
            return
        }

        dispatch(setLocationLoading());

        // watch for position react only when location changed upto threshold
        watchIdRef.current = navigator.geolocation.watchPosition((position)=>{
            const {latitude, longitude} = position.coords;
            const prev = locationRef.current

            // first position
            if (!prev.latitude) {
                locationRef.current = {latitude,longitude}
                dispatch(setLocation({latitude,longitude}))
                return
            }
            const distance  = getDistanceKm(prev.latitude,prev.longitude,latitude,longitude)
            if (distance >= DISTANCE_THRESHOLD_KM) {
                locationRef.current = {latitude,longitude}
                dispatch(setLocation({latitude,longitude}))
                return
            }
        },(error)=>{
        // need to provide proper error feedback if user doesnot allow location
        console.error("error getting location:" , error)
        dispatch(setGlobalError('error getting location...turn on location and try again'))
        dispatch(setLocationError(error.message))
        // return error
        },{
        enableHighAccuracy: true,
        maximumAge: 10000,
        timeout: 10000
        })
    return () => {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null
    } 
    }
    ,[])
}