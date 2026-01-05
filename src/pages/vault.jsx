import { useState,useEffect } from "react"
import { User, Heart , Share2 ,Image } from "lucide-react"
import Error from "../components/Error"
import useLocation from "../lib/hooks/useLocation"

const BASE_URL = import.meta.env.VITE_BACKEND_URL

function Loader(){

  return (
    <>
    <div className="min-h-60 flex flex-col">
      <div className="flex flex-auto flex-col justify-center items-center p-4 md:p-5">
        <div className="flex justify-center">
          <div className="animate-spin inline-block size-6 border-3 border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500" role="status" aria-label="loading">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

function Vault() {
  const [imageData, setImageData] = useState(null)
  const [loader,setLoader] = useState(false)
  const {location,error} = useLocation()

  const handleAsync = async() => {
      const response = await fetch(`${BASE_URL}/img/all?latitude=${location.latitude}&longitude=${location.longitude}`,{
          method: 'GET',
          credentials: 'include'
      })
      const result = await response.json()
      console.log(result)
      if(result.error){
          console.log(result.error)
          return
      }
      setLoader(false)
      setImageData(result)
  }
  
    useEffect(()=>{
        // check if location is not null then run our function
        if(location?.latitude && location?.longitude){
            handleAsync()
        }
    },[location.latitude,location.longitude])

    // upvote logic
    const toggleLike = async( imgid , upvoted) => {
      console.log(upvoted)
      const request = await fetch(`${BASE_URL}/img/upvotes`,{
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          imgid: imgid,
          react_type: upvoted ? 'dislike' : 'like'
        }
      )
      })

      const result = await request.json()
      if (!result.success) {
          console.log(result.error)
          return
      }
      setImageData(prev =>
        prev.map(img =>
        img.id === imgid
          ? {
              ...img,
              upvoted: !img.upvoted,
              upvotes_count: img.upvoted
                ? img.upvotes_count - 1
                : img.upvotes_count + 1,
            }
          : img
    )
  );
    }

return (
    <>
    {error && <Error error={error} />}
    <div className="p-6 bg-theme-primary min-h-screen">
    {/* Images Gallery */}
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-600 dark:to-pink-600 rounded-xl shadow-lg">
            <Image className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">Recent Photos</h2>
            <p className="text-gray-600 dark:text-gray-300 mt-1">Moments shared by our community</p>
          </div>
        </div>
          {loader ? (<Loader />) : (imageData && imageData.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {imageData.map((images) => (
                <div
                  key={images.id}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] border border-white/20 dark:border-gray-700/50 group"
                >
                  {/* Image */}
                  <div className="aspect-square overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 relative">
                    <img
                      src={images.imgurl || "/placeholder.svg"}
                      alt={images.captions}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                     <button 
                        className="bg-white/90 dark:bg-gray-800/90 p-2 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-colors flex flex-col items-center gap-1 min-w-[3rem]" 
                        onClick={() => toggleLike(images.id, images.upvoted)}
                      >
                        <Heart 
                          className={`w-5 h-5 transition-colors ${
                            images.upvoted 
                              ? 'text-red-500 fill-red-500' 
                              : 'text-gray-600 dark:text-gray-300'
                          }`}
                        />
                        <span className="text-xs font-bold text-gray-700 dark:text-gray-200 leading-none">
                          {images.upvotes_count > 999 ? `${(images.upvotes_count / 1000).toFixed(1)}k` : images.upvotes_count}
                        </span>
                      </button> 
                      <button className="bg-white/90 dark:bg-gray-800/90 p-2 rounded-full hover:bg-white dark:hover:bg-gray-800 transition-colors">
                        <Share2 className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                      </button>
                    </div>
                  </div>
                  {/* Content */}
                  <div className="p-5">
                    {/* Caption */}
                    <p className="text-gray-800 dark:text-gray-200 font-medium mb-4 line-clamp-2 leading-relaxed">
                      {images.captions}
                    </p>
                    {/* Author */}
                    <div className="flex items-center gap-3 text-sm">
                      <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-indigo-600 dark:to-purple-600 rounded-full">
                        <User className="w-3 h-3 text-white" />
                      </div>
                      <span className="font-semibold text-gray-700 dark:text-gray-300">{images.author_name}</span>
                      <div className="ml-auto text-xs text-gray-500 dark:text-gray-400">2h ago</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <Image className="w-10 h-10 text-indigo-500 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-3">No photos yet</h3>
              <p className="text-gray-500 dark:text-gray-400 text-lg max-w-md mx-auto">
                Be the first to share a moment from this location and inspire others!
              </p>
            </div>
          ))}
        </div>
    </div>
    </>
  )
}

export default Vault
