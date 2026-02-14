import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    error: null
}

export const errorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        setGlobalError: (state,action) => {
            state.error = action.payload
        },
        clearGlobalError: (state) => {
            state.error = null
        },
    }
})

export const {setGlobalError,clearGlobalError} = errorSlice.actions
export default errorSlice.reducer