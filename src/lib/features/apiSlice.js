import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URI = import.meta.env.VITE_BACKEND_URL

export const apiSlice = createApi({
    reducerPath: 'apiSlice',
    baseQuery: fetchBaseQuery({baseUrl: `${BASE_URI}`}),
    tagTypes: ['Comment'],
    endpoints: (build) => ({
        getAuthInfo: build.query({
          query: () => ({
              url: `auth/me`,
              method: 'GET',
              credentials: 'include'
            }),
        }),
        getLogout: build.query({
          query: () => ({
              url: `auth/logout`,
              credentials: 'include'
            }),
        }),
        getUserProfile: build.query({
            query: () => ({
                url: `auth/profile`,
                credentials: 'include'
            }),
        }),
        getImages: build.query({
            query: ({nextCursor,location}) => ({
                url: nextCursor ? `/img/all?latitude=${location.latitude}&longitude=${location.longitude}&created_at=${nextCursor.created_at}&post_id=${nextCursor.post_id}`:
                 `/img/all?latitude=${location.latitude}&longitude=${location.longitude}`,
                credentials: 'include'
            }),
            serializeQueryArgs: ({endpointName}) => endpointName,
            merge: (cache,incoming) => {
                const existingIds = new Set(cache.data.posts.map(p => p.id));
                        incoming.data.posts.forEach(p => {
                            if (!existingIds.has(p.id)) {
                            cache.data.posts.push(p);
                            }
                        });
                cache.data.nextCursor = incoming.data.nextCursor;
                cache.data.hasMore = incoming.data.hasMore;
            },
            forceRefetch: ({currentArg,previousArg}) => currentArg !== previousArg
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
        }),
        setCollection: build.mutation({
            query: (postId) => ({
                url: `/img/collection`,
                method: 'POST',
                credentials: 'include',
                headers: {'Content-Type': 'application/json'},
                body: {postId},
            }) 
        }),
        getCollection: build.query({
            query: ({nextCursor})=> ({
                url: nextCursor ? `/img/collection?created_at=${nextCursor.created_at}&post_id=${nextCursor.id}` : 
                `/img/collection`,
                method: 'GET',
                credentials: 'include'
            }),
            serializeQueryArgs: ({endpointName}) => endpointName,
            merge: (cache,incoming) => {
                const existingIds = new Set(cache.data.posts.map(p => p.id));
                        incoming.data.posts.forEach(p => {
                            if (!existingIds.has(p.id)) {
                            cache.data.posts.push(p);
                            }
                        });
                cache.data.nextCursor = incoming.data.nextCursor;
                cache.data.hasMore = incoming.data.hasMore;
            },
            forceRefetch: ({currentArg,previousArg}) => currentArg !== previousArg
        })
    })
})


export const { 
    useGetAuthInfoQuery,
    useLazyGetLogoutQuery,
    useGetImagesQuery,
    useLazyGetImagesQuery,
    useSetImagesMutation,
    useLazyGetStoryByIdQuery,
    useSetUpvotesMutation,
    useLazyGetCommentsQuery,
    useSetCommentsMutation,
    useGetUserProfileQuery,
    useGetPlacesNameQuery, 
    useGetCollectionQuery ,
    useSetCollectionMutation 
} = apiSlice;
