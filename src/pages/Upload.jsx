import { useState } from "react"
import { Upload, MapPin, Camera, Loader , Share2 } from "lucide-react"
import Error from "../components/Error"
import useLocation from "../lib/hooks/useLocation"
import { useSetImagesMutation } from "../lib/features/apiSlice"
import MapView from "../components/MapView"

// const BASE_URL = import.meta.env.VITE_BACKEND_URL

export default function UploadPage(){
    const [uploadImageFile,setUploadImageFile] = useState(null)
    const [uploadImagePreview,setUploadImagePreview] = useState(null)
    const [title,setTitle] = useState('')
    const [content,setContent] = useState('')
    const [loader,setLoader] = useState(false) 
    const {location,error} = useLocation()

    const [trigger,{data}] = useSetImagesMutation();

    const handleUploadData = async()=>{
        setLoader(true)
        const formData = new FormData()
        formData.append("image",uploadImageFile)
        formData.append("title",title)
        formData.append("content",content)
        formData.append("latitude",location.latitude)
        formData.append("longitude",location.longitude)
        await trigger(formData)
        console.log(data)
        // const response = await fetch(`${BASE_URL}/img`,{
        //     method: 'POST',
        //     credentials: 'include',
        //     body: formData
        // })
        // const result = await response.json()
        // if(result.error){
        //     setLoader(false)
        //     console.log(error)
        //     return
        // }
        // console.log("image upload successfully:", result)
        // clear form
        setUploadImagePreview(null)
        setUploadImageFile(null)
        setTitle('')
        setContent('')
        setLoader(false)
    }

    const handleImageUpload = (e) => {
      if (e.target.files[0]) {
        setUploadImageFile(e.target.files[0])
        const reader = new FileReader()
        reader.onload = function(e) {
          const ImageDataUrl = e.target.result
          setUploadImagePreview(ImageDataUrl)          
        }
        reader.readAsDataURL(e.target.files[0])
      }
    }


return (
     <>
      {error && <Error error={error} />}
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="relative">
                <MapPin className="w-10 h-10 sm:w-12 sm:h-12 text-indigo-600 dark:text-indigo-400" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-purple-500 dark:bg-purple-400 rounded-full animate-pulse"></div>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                PinPic Gallery
              </h1>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto">
              Discover and share unforgettable moments from this location
            </p>
            {/* views and likes */}
            {/* <div className="flex items-center justify-center gap-4 mt-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                <span>2.3k views</span>
              </div>
              <div className="flex items-center gap-1">
                <Heart className="w-4 h-4" />
                <span>456 likes</span>
              </div>
            </div> */}
          </div>

          {/* Upload Section */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 sm:p-8 mb-8 sm:mb-12 border border-white/20 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-indigo-600 dark:to-purple-600 rounded-xl shadow-lg">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">Share Your Moment</h2>
                <p className="text-gray-600 dark:text-gray-300 mt-1">Capture and share what makes this place special</p>
              </div>
            </div>

            <div className="space-y-6">
              {/* File Upload */}
              {uploadImagePreview ? (
                <div className="relative group">
                  <img 
                    src={uploadImagePreview} 
                    alt="image file"
                    className="w-full h-64 sm:h-80 object-cover rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 rounded-2xl flex items-center justify-center">
                    <button 
                      onClick={() => setUploadImagePreview(null)}
                      className="bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white dark:hover:bg-gray-800"
                    >
                      Change Photo
                    </button>
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Choose Photo</label>
                  <div className="relative border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl p-8 sm:p-12 hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-indigo-50/30 dark:hover:bg-indigo-900/20 transition-all duration-300 cursor-pointer group">
                    <input
                      type="file"
                      onChange={handleImageUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      accept="image/*"
                    />
                    <div className="text-center">
                      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-indigo-600 dark:to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                        <Upload className="w-8 h-8 text-white" />
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 font-medium text-lg group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Title Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Title</label>
                <textarea
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Add a Title"
                  className="w-full px-4 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 resize-none transition-all duration-200 bg-gray-50/50 dark:bg-gray-700/50 hover:bg-white dark:hover:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  rows={4}
                />
                <div className="text-right text-sm text-gray-500 dark:text-gray-400 mt-2">
                  {title.length}/280 characters
                </div>
              </div>
              {/* Content Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Content</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Share what's happening... Tell us about the story behind it!"
                  className="w-full px-4 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 resize-none transition-all duration-200 bg-gray-50/50 dark:bg-gray-700/50 hover:bg-white dark:hover:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  rows={4}
                />
              </div>

              {/* Upload Button */}
              <button
                onClick={handleUploadData}
                disabled={!uploadImagePreview || !title.trim() || loader}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-700 dark:to-purple-700 text-white py-4 px-8 rounded-2xl font-semibold hover:from-indigo-700 hover:to-purple-700 dark:hover:from-indigo-600 dark:hover:to-purple-600 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loader ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader className="animate-spin w-5 h-5" />
                    <span>Uploading...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <Share2 className="w-5 h-5" />
                    <span>Share Photo</span>
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* Map view */}
          {location.latitude && location.longitude && <MapView location={location} /> }
        </div>
      </div>
    </>
  );
}