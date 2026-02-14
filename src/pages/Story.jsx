import { useState,useEffect } from 'react';
import useLocation from '../lib/hooks/useLocation';
import { useLazyGetStoryByIdQuery, useSetUpvotesMutation } from '../lib/features/apiSlice';
import { useParams } from 'react-router';
import { ArrowBigUpDash } from 'lucide-react';
import CommentsSection from '../components/CommentsSection';
import StorySkeleton from '../components/StorySkeleton';
import ErrorInline from '../components/error/ErrorInline';

const BASE_URL = import.meta.env.VITE_BACKEND_URL

export default function Story() {
  const [showFullImage, setShowFullImage] = useState(false);
  const {location} = useLocation()
  const {id: postId} = useParams()
  const [loader,setLoader] = useState(true)
  // just make an rtk call for this story pageid
  const [triggerGetStory,{data: story,error}] = useLazyGetStoryByIdQuery();
  const [triggerUpvotes] = useSetUpvotesMutation();
  const [localState,setLocalState] = useState({
    upvoted: null,
    upvotes_count: null,
  })

  useEffect(()=>{
        // check if location is not null then run our function
        if(location?.latitude && location?.longitude ){
            // handleAsync()
            if (postId && postId !== '') {
              // can add loader here
                (async() => await triggerGetStory({location,postId}))();
              setLoader(false)
              }
        }
    },[location.latitude,location.longitude,postId])

  useEffect(()=> {
    if (story) {
      setLocalState({
        upvoted: story.upvoted,
        upvotes_count: story.upvotes_count
      })
    }

  },[story?.upvoted,story?.upvoted_count])

  // convert it to RTK Query
  useEffect(()=> {
    const handleAsync = async() => {
      const request = await fetch(`${BASE_URL}/img/visitors`,{
        method: 'POST',
        credentials: 'include',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({postId})
      })
      const result = await request.json()
      if (!result.success) {
        console.error('error while adding visitors')
      }
    }
    const timer = setTimeout(()=> {
      handleAsync()
      console.log('views count')
    }, 5000)

    return () => clearTimeout(timer)
  },[])
  
    const toggleLike = async( imgid , upvoted) => {
      let body = JSON.stringify({
          imgid: imgid,
          react_type: upvoted ? 'none' : 'upvoted'
        }
      )
      await triggerUpvotes(body)
      setLocalState((prev)=>({
        ...prev,
        upvoted: !prev.upvoted,
        upvotes_count: prev.upvoted ? prev.upvotes_count - 1: prev.upvotes_count + 1
      }))
    }

  return (
    <>
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
    {loader ? (<StorySkeleton />): (story &&
    <> 
      {/* Full Image Modal */}
      {showFullImage && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setShowFullImage(false)}
        >
          <div className="relative max-w-7xl max-h-full">
            <button
              className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/70 rounded-full p-2 transition-all"
              onClick={() => setShowFullImage(false)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img
              src={story.imgurl}
              alt={story.title}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}

      <article className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero Image with Title Overlay */}
        <div 
          className="relative w-full h-96 rounded-2xl overflow-hidden shadow-2xl mb-8 cursor-pointer group"
        >
          <img
            src={story.imgurl}
            alt={story.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          
          {/* Title Overlay at Bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight drop-shadow-lg">
              {story.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold shadow-lg">
                  {story.author_name}
                </div>
                <span className="font-medium text-white drop-shadow-md">{story.author_name}</span>
              </div>
              <span className="text-gray-300">•</span>
              <span className='text-white'>{story.visitors_count} Views</span>
              <span className="text-gray-300">•</span>
              <time className="text-gray-200 drop-shadow-md">{story.date}</time>
              {/* move upvote logic */}
                <button 
                  className="p-2 rounded-lg flex-row text-white hover:bg-white dark:hover:bg-gray-800 transition-colors flex flex-col items-center gap-1 min-w-[3rem]" 
                  onClick={() => toggleLike(story.id, localState.upvoted)}
                >
                  <ArrowBigUpDash 
                    className={`w-5 h-5 transition-colors ${
                      localState.upvoted
                        ? 'text-red-500 fill-red-500' 
                        : 'text-gray-600 dark:text-gray-300'
                    }`}
                  />
                  <span>{localState.upvotes_count}</span>
                </button> 
              {/* <span className="text-gray-300">•</span> */}
              {/* <span className="text-gray-200 drop-shadow-md">{story.readTime}</span> */}
            </div>
          </div>
          
          {/* Click to expand indicator */}
          <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => setShowFullImage(true)}
          >
            Click to expand
          </div>
        </div>

        {/* Story Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none mt-12">
          {  <p
              className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed mb-6 text-lg first-letter:text-5xl first-letter:font-bold first-letter:uppercase first-letter:text-blue-600 dark:first-letter:text-blue-400 first-letter:mr-2 first-letter:float-left"
            >
              {story.content}
            </p>
          }
        </div>

        {/* Divider */}
        <div className="my-12 flex items-center justify-center">
          <div className="h-px w-full max-w-md bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
        </div>
        <div>
          {story && <CommentsSection comments_count={story.comments_count} imgid={story.id} />}
        </div>

      </article>
    </>)}
    {error && <ErrorInline error={error?.message ?? "Internal Server Error"} />}
    </div>
    </>
  );
}