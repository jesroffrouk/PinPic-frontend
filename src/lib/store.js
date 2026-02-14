import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../lib/features/authSlice.js'
import { apiSlice } from './features/apiSlice.js'
import errorReducer from '../lib/features/errorSlice.js'

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    error: errorReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),

})