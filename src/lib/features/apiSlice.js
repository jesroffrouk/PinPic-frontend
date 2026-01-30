import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URI = import.meta.env.VITE_BACKEND_URL

export const apiSlice = createApi({
    reducerPath: 'apiSlice',
    baseQuery: fetchBaseQuery({baseUrl: `${BASE_URI}`}),
    endpoints: (build) => ({
        getImages: build.query({
            query: (location) => ({
                url: `/img/all?latitude=${location.latitude}&longitude=${location.longitude}`,
                credentials: 'include'
            }),
        }),
        setImages: build.mutation({
            query: (formData) => ({
                url: `/img`,
                method: 'POST',
                credentials: 'include',
                body: formData
            }),
        })
    })
})


export const { useLazyGetImagesQuery,useSetImagesMutation } = apiSlice;