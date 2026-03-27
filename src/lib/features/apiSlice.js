import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URI = import.meta.env.VITE_BACKEND_URL

export const apiSlice = createApi({
    reducerPath: 'apiSlice',
    baseQuery: fetchBaseQuery({baseUrl: `${BASE_URI}`}),
    tagTypes: ['Comment'],
    endpoints: (build) => ({
        getUserProfile: build.query({
            query: () => ({
                url: `auth/profile`,
                credentials: 'include'
            }),
        }),
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
        }),
        getStoryById: build.query({
            query: ({location,postId}) => ({
                url: `img/story?latitude=${location.latitude}&longitude=${location.longitude}&postid=${postId}`,
                credentials: 'include'
            }),
            providesTags: ['Comment']
        }),
        setUpvotes: build.mutation({
            query: (body) => ({
                url: `/img/upvotes`,
                method: 'POST',
                credentials: 'include',
                headers: {'Content-Type': 'application/json'},
                body: body
            })
        }),
        getComments: build.query({
            query: (postId) => ({
                url: `/img/comments?postid=${postId}`,
                method: 'GET',
                credentials: 'include',
             }),
             providesTags: ['Comment']

        }),
        setComments: build.mutation({
            query: (body) => ({
                url: `/img/comments`,
                method: 'POST',
                credentials: 'include',
                headers: {'Content-Type': 'application/json'},
                body: body
            }),
            invalidatesTags: ['Comment']
        }),
        getPlacesName: build.query({
            query: (location) => ({
                url: `/img/place?latitude=${location.latitude}&longitude=${location.longitude}`,
                method: 'GET',
                credentials: 'include',
            })
        })
    })
})


export const { useLazyGetImagesQuery,useSetImagesMutation,useLazyGetStoryByIdQuery,useSetUpvotesMutation,useLazyGetCommentsQuery,useSetCommentsMutation,useGetUserProfileQuery,useLazyGetPlacesNameQuery } = apiSlice;