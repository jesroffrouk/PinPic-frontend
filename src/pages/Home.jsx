export default function Home(){
     return (
    <div className="min-h-screen relative overflow-hidden bg-theme-primary">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="./background.jpg" 
          alt="Beautiful landscape background" 
          className="h-full w-full object-cover"
        />
        {/* Dynamic Gradient Overlay - Changes based on theme */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/60 dark:from-black/60 dark:via-black/70 dark:to-black/80"></div>
        {/* Additional theme-aware overlay */}
        <div className="absolute inset-0 bg-theme-primary/10 dark:bg-theme-primary/20"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 pt-16 pb-16 sm:pb-8 lg:pb-0 sm:pt-8 md:pt-0">
        <div className="text-center max-w-5xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white dark:text-gray-100 mb-4 sm:mb-6 leading-tight">
            <span className="block mb-2 sm:mb-3">
               <span className="bg-[#e3e1ec] dark:bg-[#E8F9FF] bg-clip-text text-transparent">
                Welcome to{' '}
              </span>
              <span className="bg-gradient-to-r from-blue-800 to-indigo-900 dark:from-blue-300 dark:to-purple-400 bg-clip-text text-transparent">
                PinPic
              </span>
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-200 dark:text-gray-300 font-medium leading-relaxed max-w-4xl mx-auto mb-8 sm:mb-12">
            The best platform where you can bind your memories to a location
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="w-full sm:w-auto px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500 text-white font-semibold rounded-full hover:from-blue-600 hover:to-purple-700 dark:hover:from-blue-500 dark:hover:to-purple-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              Get Started
            </button>
            <button className="w-full sm:w-auto px-8 py-3 sm:py-4 border-2 border-white dark:border-gray-300 text-white dark:text-gray-300 font-semibold rounded-full hover:bg-white hover:text-gray-900 dark:hover:bg-gray-300 dark:hover:text-gray-900 transition-all duration-300 backdrop-blur-sm">
              Learn More
            </button>
          </div>
          
          {/* Features */}
          <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/20 dark:border-white/10 hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300">
              <div className="text-3xl mb-3">📍</div>
              <h3 className="text-lg font-semibold text-white dark:text-gray-100 mb-2">Location Binding</h3>
              <p className="text-gray-300 dark:text-gray-400 text-sm">Connect your precious memories to specific places</p>
            </div>
            
            <div className="bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/20 dark:border-white/10 hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300">
              <div className="text-3xl mb-3">📸</div>
              <h3 className="text-lg font-semibold text-white dark:text-gray-100 mb-2">Photo Memories</h3>
              <p className="text-gray-300 dark:text-gray-400 text-sm">Capture and store your favorite moments</p>
            </div>
            
            <div className="bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/20 dark:border-white/10 hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300 sm:col-span-2 lg:col-span-1">
              <div className="text-3xl mb-3">🗺️</div>
              <h3 className="text-lg font-semibold text-white dark:text-gray-100 mb-2">Interactive Maps</h3>
              <p className="text-gray-300 dark:text-gray-400 text-sm">Explore your memory map with ease</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating Animation Elements - Theme aware */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-blue-400 dark:bg-blue-300 rounded-full animate-pulse opacity-60 dark:opacity-40"></div>
      <div className="absolute top-40 right-20 w-6 h-6 bg-purple-400 dark:bg-purple-300 rounded-full animate-bounce opacity-40 dark:opacity-30"></div>
      <div className="absolute bottom-32 left-1/4 w-3 h-3 bg-pink-400 dark:bg-pink-300 rounded-full animate-ping opacity-50 dark:opacity-35"></div>
      <div className="absolute bottom-20 right-1/3 w-5 h-5 bg-cyan-400 dark:bg-cyan-300 rounded-full animate-pulse opacity-30 dark:opacity-25"></div>
    </div>
  );
}