import { useCallback, useRef, useState } from "react"
import { useGetCollectionQuery, useGetImagesQuery } from "../lib/features/apiSlice"

export function useInfiniteCollectionFeed() {
    const [nextCursor,setNextCursor] = useState(null)
    const {data: getCollectionResponse,isFetching,isLoading} = useGetCollectionQuery({nextCursor})
    const posts = getCollectionResponse?.data?.posts ?? []
    const hasMore = getCollectionResponse?.data?.hasMore ?? true

    const observer = useRef(null)
    const sentinelRef = useCallback((node)=> {
        if (isFetching) return
        if(observer.current) observer.current.disconnect()

        observer.current = new IntersectionObserver((entries)=> {
            if (hasMore && entries[0].isIntersecting) {
                setNextCursor(getCollectionResponse?.data?.nextCursor)
            }
        },{threshold: 0.1})
        
        if (node) observer.current.observe(node)
    },[isFetching,hasMore])

    return {posts,isFetching,isLoading,hasMore,sentinelRef}
}

export function useInfinitePostsFeed(location) {
    const [nextCursor,setNextCursor] = useState(null)
    const shouldSkip = !location.longitude || !location.latitude
    const {data: getPostsResponse,isFetching,isLoading} = useGetImagesQuery({nextCursor,location},{skip: shouldSkip})
    const posts = getPostsResponse?.data?.posts ?? []
    const hasMore = getPostsResponse?.data?.hasMore ?? false

    const observer = useRef(null)
    const sentinelRef = useCallback((node)=> {
        if (isFetching || shouldSkip) return
        if(observer.current) observer.current.disconnect()

        observer.current = new IntersectionObserver((entries)=> {
            if (hasMore && entries[0].isIntersecting) {
                setNextCursor(getPostsResponse?.data?.nextCursor)
            }
        },{threshold: 0.1})
        
        if (node) observer.current.observe(node)
    },[isFetching,hasMore])

    return {posts,isFetching,isLoading,hasMore,sentinelRef}
}