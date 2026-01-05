import { MapPin, Camera, Users, Globe, Heart, Smartphone, Share2, Eye, ArrowRight, Star } from "lucide-react"

export default function About(){

return (
        <>
             <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
            {/* Hero Section */}
            <section className="relative overflow-hidden py-20 lg:py-32">
                <div className="container mx-auto px-4 md:px-6">
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
                    <div className="space-y-8">
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border dark:border-gray-700">
                        <MapPin className="w-4 h-4 mr-2" />
                        Location-Based Photo Sharing
                    </div>
                    <div className="space-y-4">
                        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-gray-900 dark:text-white">
                        Discover the World Through
                        <span className="text-blue-600 dark:text-blue-400 block">Shared Moments</span>
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
                        Connect places with memories. Share your photos at specific locations and let others discover them
                        when they visit the same spots. Every place has a story waiting to be told.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white bg-blue-600 dark:bg-blue-700 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors">
                        Start Exploring
                        <ArrowRight className="ml-2 h-5 w-5" />
                        </button>
                        <button className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-gray-700 dark:text-gray-300 bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors">
                        Learn More
                        </button>
                    </div>
                    </div>
                    <div className="relative">
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                        <img
                        src="/background.jpg?height=600&width=500"
                        alt="Location-based photo sharing concept"
                        className="w-full h-auto"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                    {/* Floating elements */}
                    <div className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg">
                        <Camera className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg">
                        <MapPin className="h-6 w-6 text-red-500 dark:text-red-400" />
                    </div>
                    </div>
                </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-20 bg-white dark:bg-gray-800">
                <div className="container mx-auto px-4 md:px-6">
                <div className="text-center space-y-4 mb-16">
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300">
                    How It Works
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-gray-900 dark:text-white">
                    Three Simple Steps to Share Your World
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                    Our platform makes it easy to connect your memories with places, creating a global network of shared
                    experiences.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                    <div className="relative overflow-hidden bg-white dark:bg-gray-700 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-600">
                    <div className="p-8 text-center space-y-4">
                        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto">
                        <Camera className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="absolute top-4 right-4 bg-blue-600 dark:bg-blue-700 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                        1
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Capture & Share</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                        Take a photo at any location and share it with our community. Your image becomes part of that place's
                        story.
                        </p>
                    </div>
                    </div>

                    <div className="relative overflow-hidden bg-white dark:bg-gray-700 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-600">
                    <div className="p-8 text-center space-y-4">
                        <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto">
                        <MapPin className="h-8 w-8 text-green-600 dark:text-green-400" />
                        </div>
                        <div className="absolute top-4 right-4 bg-green-600 dark:bg-green-700 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                        2
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Location Tagged</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                        Your photo is automatically tagged with precise location data, creating a digital memory at that exact
                        spot.
                        </p>
                    </div>
                    </div>

                    <div className="relative overflow-hidden bg-white dark:bg-gray-700 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-600">
                    <div className="p-8 text-center space-y-4">
                        <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto">
                        <Eye className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div className="absolute top-4 right-4 bg-purple-600 dark:bg-purple-700 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                        3
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Discover & Explore</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                        When others visit the same location, they can discover and view all the shared memories from that
                        place.
                        </p>
                    </div>
                    </div>
                </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-gray-50 dark:bg-gray-900">
                <div className="container mx-auto px-4 md:px-6">
                <div className="text-center space-y-4 mb-16">
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300">
                    Features
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-gray-900 dark:text-white">Why Choose Our Platform?</h2>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    <div className="space-y-4">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                        <Globe className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Global Community</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                        Connect with travelers and locals worldwide. Share experiences and discover hidden gems through others'
                        eyes.
                    </p>
                    </div>

                    <div className="space-y-4">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                        <Smartphone className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Mobile First</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                        Designed for mobile use. Capture and share moments instantly, wherever you are in the world.
                    </p>
                    </div>

                    <div className="space-y-4">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                        <Share2 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Easy Sharing</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                        Simple, intuitive interface makes sharing your location-based memories effortless and fun.
                    </p>
                    </div>

                    <div className="space-y-4">
                    <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
                        <Heart className="h-6 w-6 text-red-600 dark:text-red-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Meaningful Connections</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                        Create deeper connections with places and people through shared visual stories and experiences.
                    </p>
                    </div>

                    <div className="space-y-4">
                    <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center">
                        <Star className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Quality Content</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                        Community-driven quality ensures you discover the best moments and perspectives from every location.
                    </p>
                    </div>

                    <div className="space-y-4">
                    <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center">
                        <Users className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Privacy Focused</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                        Your privacy matters. Control who sees your content and maintain your digital footprint securely.
                    </p>
                    </div>
                </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-20 bg-white dark:bg-gray-800">
                <div className="container mx-auto px-4 md:px-6">
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
                    <div className="space-y-6">
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 w-fit">
                        Our Mission
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-gray-900 dark:text-white">
                        Connecting People Through Places
                    </h2>
                    <div className="space-y-4 text-lg text-gray-600 dark:text-gray-300">
                        <p>
                        We believe every location has a story to tell, and every moment deserves to be shared. Our platform
                        bridges the gap between physical spaces and digital memories.
                        </p>
                        <p>
                        By connecting photos to specific locations, we're creating a living, breathing map of human
                        experiences. Whether it's a breathtaking sunset, a hidden café, or a moment of joy, these shared
                        memories help others discover the world through authentic perspectives.
                        </p>
                        <p>
                        Join us in building a global community where every place becomes a canvas for shared stories and every
                        visit becomes an opportunity for discovery.
                        </p>
                    </div>
                    </div>
                    <div className="relative">
                    <img
                        src="/background.jpg?height=500&width=600"
                        alt="Community sharing photos"
                        className="rounded-2xl shadow-xl w-full h-auto"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-2xl" />
                    </div>
                </div>
                </div>
            </section>

            {/* Stats Section */}
            {/* <section className="py-16 bg-blue-600 text-white">
                <div className="container mx-auto px-4 md:px-6">
                <div className="grid gap-8 md:grid-cols-4 text-center">
                    <div className="space-y-2">
                    <div className="text-3xl font-bold">10K+</div>
                    <div className="text-blue-100">Active Users</div>
                    </div>
                    <div className="space-y-2">
                    <div className="text-3xl font-bold">50K+</div>
                    <div className="text-blue-100">Photos Shared</div>
                    </div>
                    <div className="space-y-2">
                    <div className="text-3xl font-bold">100+</div>
                    <div className="text-blue-100">Countries</div>
                    </div>
                    <div className="space-y-2">
                    <div className="text-3xl font-bold">1M+</div>
                    <div className="text-blue-100">Locations Tagged</div>
                    </div>
                </div>
                </div>
            </section> */}

            {/* CTA Section */}
            {/* <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <div className="container mx-auto px-4 md:px-6 text-center">
                <div className="max-w-3xl mx-auto space-y-8">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to Start Your Journey?</h2>
                    <p className="text-xl text-blue-100">
                    Join thousands of explorers who are already sharing their world. Download our app and start connecting
                    your memories to places today.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-blue-600 bg-white rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 transition-colors">
                        Download PinPic
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </button>
                    <button className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white bg-transparent border border-white rounded-lg hover:bg-white hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 transition-colors">
                        View Demo
                    </button>
                    </div>
                </div>
                </div>
            </section> */}
            </div>
        </>
    )
}