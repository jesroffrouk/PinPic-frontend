import { createSlice } from "@reduxjs/toolkit";

// as it is not typescript , I am declaring it Null so that I can easily check if it exist or not for UX
const initialState = {
    user: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state,action) => {
            state.user = {
                ...state.user , ...action.payload
            }
        }
    }
})


export const { setUser } = authSlice.actions

export default authSlice.reducer