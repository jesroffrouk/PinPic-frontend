// use error inline for error handling.
// no image available might need some improvment to match it's colors with my projects
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import Profile from "../components/ui/buttons/ProfileButton";
import Background from "../components/ui/Background";
import Contianer from "../components/ui/Container";
import Buttons from "../components/ui/buttons/FilterButtons";
import { useGetPlacesNameQuery } from "../lib/features/apiSlice";
import { Link } from "react-router";
import ErrorInline from "../components/error/ErrorInline";
import ScannerAnimation from "../components/Scanner";
import { useInfinitePostsFeed } from "../hooks/useInfiniteFeed";
import { useSelector } from "react-redux";


const filters = ["Most Recent", "Most Liked", "Trending"];

const CardComponent = ({img,i}) => (
    <>
        <Link 
        to={`/story/${img.id}`}
        className="cursor-pointer"
        > 
        <div
            className="relative overflow-hidden component_background"
            style={{ animationDelay: `${i * 80}ms` }}
        >
            {/* Image */}
            <div className="overflow-hidden">
            <img
                src={img.imgurl}
                alt={img.title}
                className="w-full h-56 object-cover brightness-75 group-hover:brightness-95 group-hover:scale-105 transition-all duration-500"
            />
            </div>
                <div className="absolute top-0 left-0 right-0 px-4 py-4 bg-linear-to-b from-black/70 to-transparent">
                    <p className="text-secondary-text font-semibold text-base leading-tight tracking-tight z-10">
                        {img.title}
                    </p>
                    <div className="flex items-center justify-between mt-1.5 z-10">
                        {/* skipping location for now */}
                        {/* <span className="text-tertiary-text text-xs uppercase tracking-widest font-medium">
                        📍 {img.location}
                        </span> */}
                    </div>
                </div>

            {/* Like button */}
            <button
            className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950/55 border border-white/10 backdrop-blur-md hover:bg-blue-900/60 hover:border-blue-500/40 hover:scale-105 transition-all duration-200"
            >
            <span className="text-sm">🤍</span>
            <span className="text-xs font-medium text-blue-200">
                {img.upvotes_count}
            </span>
            </button>

            {/* Overlay info */}
            <div className="absolute bottom-0 left-0 right-0 px-4 py-4 bg-linear-to-t from-slate-950/95 via-slate-950/60 to-transparent">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    {/* place an image instea of just Text background */}
                    <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-secondary-text font-semibold text-lg">
                        J
                    </div>
                    <span className="text-tertiary-text text-xs uppercase tracking-widest font-medium">
                        {img.author_name}
                    </span>
                </div>
                {/* i will make time avialable later on */}
                {/* <span className="text-tertiary-text text-xs">{img.time}</span> */}
            </div>
            </div>
        </div>
        </Link>
    </>
)

const HeaderComponent = ({place}) => (
    <>        
        <div>
            <h1 className="title_name">
                {place && place.name}
            </h1>
            <p className="place_muted_name">📍 {place && place.state} · {place && place.country}</p>
        </div>
    </>
)

const FilterComponent = ({setActiveFilter,activeFilter}) => (
    <>
    <Contianer>
            <div className="flex gap-3 pb-6 overflow-x-auto no-scrollbar">
            {filters.map((f) => (
                <Buttons key={f} name={f} HandleClickEvent={() => setActiveFilter(f)} isActive={activeFilter === f} />
            ))}
            </div>
    </Contianer>
    </>
)

const NoImageAvailableComponent = () => (
    <>
    <div className="min-h-screen bg-blue-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-blue-300">
            <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-16 h-16 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 3l18 18M6.75 6.75h.007v.008H6.75V6.75z"
            />
            </svg>
            <h2 className="text-xl font-semibold text-blue-200">No Images Available</h2>
            <p className="text-sm text-blue-400">There are no images to display at this location.</p>
        </div>
    </div>
    </>
)


export default function Feed() {
  const Navigate = useNavigate()
  const [activeFilter, setActiveFilter] = useState("Most Recent");
//   const [showScanner,setShowScanner] = useState(false)
  // getPlaceName Error
  const {cords: userLocation,loader,error: locationError } = useSelector(state => state.location) 

  const shouldSkip = !userLocation.latitude || !userLocation.longitude

  const {data: getPlaceName} = useGetPlacesNameQuery(userLocation,{skip: shouldSkip})
  const place = getPlaceName?.data?.location
  // need to handle ERrro

  const {posts,isFetching,isLoading,hasMore,sentinelRef} = useInfinitePostsFeed(userLocation)

  //   i am sorting even recent ones which is techincal fault so fix it later on
  const sorted = useMemo(()=> {
    if (!posts) return null
    return [...posts].sort((a, b) =>
        activeFilter === "Most Liked" ? b.upvotes_count - a.upvotes_count : 0
    )
  },[posts,activeFilter]) 

//   useEffect(()=>{
//     setShowScanner(true)
//   },[])

  return (
    <>
    {/* skipping scanner for now */}
        {/* {showScanner && <ScannerAnimation handleExit={() => setShowScanner(false)} handleGetImages={()=> {}} />} */}
        <Background>

        <div className="overflow-auto pb-14">
        {/* Main content */}
            <div className="relative">
                {/* Header */}
                <Contianer>
                    <section className="pt-10 pb-5">
                        <header className="flex items-center justify-between">
                            <HeaderComponent place={place} />
                            <Profile handleClick={()=> Navigate('/profile')} />
                        </header>
                    </section>
                </Contianer>

                {/* Divider */}
                <div className="mx-6 mb-5 h-px bg-linear-to-r from-transparent via-blue-700/80 to-transparent" />

                {/* Filter pills */}
                <FilterComponent setActiveFilter={setActiveFilter} activeFilter={activeFilter} />
                {/* Image grid */}

            </div>

            {/* getImagesError */}
            {/* {getImagesError && <ErrorInline error={'Failed to retrive posts'} />} */}

            {/* card components */}
            {posts ? 
                (<>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 px-6">
                    {sorted.map((img, i) => (
                        <CardComponent key={img.id} img={img} i={i} />
                    ))}
                    {hasMore && <div ref={sentinelRef} className="h-4" />}
                </div>
                </>):
                (<>
                <NoImageAvailableComponent />
                </>)}

        </div>
        {/* navigation bar */}
        {/* <NavigationBar activeTab={activeTab} setActiveTab={setActiveTab} /> */}
        <style>{`
            .no-scrollbar::-webkit-scrollbar { display: none; }
            .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>

        </Background>
    </>
  );
}