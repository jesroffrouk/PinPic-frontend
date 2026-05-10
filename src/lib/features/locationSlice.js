import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cords: {latitude: null, longitude: null},
    loading: false,
    error: null,
}

export const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {
        setLocationLoading: (state,action) => {
            state.loading = true
            state.error = null
        },
        setLocationError: (state,action) => {
            state.loading = false
            state.error = action.payload
        },
        setLocation: (state,action) => {
            state.loading = false,
            state.error = null,
            state.cords.latitude = action.payload.latitude,
            state.cords.longitude = action.payload.longitude
        }
    }
})

export const {setLocation,setLocationError,setLocationLoading} = locationSlice.actions

export default locationSlice.reducer