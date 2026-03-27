import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ProfileButton from "../components/ui/buttons/ProfileButton";
import Contianer from "../components/ui/Container";
import Scanner from "../components/ui/icons/Scanner";
import Add from "../components/ui/icons/Add";
import ScannerAnimation from '../components/Scanner'
import useLocation from "../lib/hooks/useLocation";
import MapView from "../components/MapView";
import { useLazyGetPlacesNameQuery } from "../lib/features/apiSlice";


const PlaceNameComponent = ({place}) => (
  <>
    <div>
      <h1 className="title_name">
        {place && place.name}
      </h1>
      <p className="place_muted_name">📍 {place && place.state} · { place && place.country}</p>
    </div>
  </>
)


export default function MapPage() {
  const Navigate = useNavigate()
  const [showScanner,setShowScanner] = useState(false)

  const {location: userLocation} = useLocation()
  const [triggerGetPlaceNameApi,{data: place}] = useLazyGetPlacesNameQuery()

  useEffect(()=> {
    if (userLocation.latitude && userLocation.longitude) {
      triggerGetPlaceNameApi(userLocation)
    }
    }
  ,[userLocation])
  // above api call looks but you need the same in another page so create hook or something similar to user like this.


  return (
<>
    {showScanner && <ScannerAnimation handleExit={() => setShowScanner(false)} />}

    {/* main */}
     <div className="min-h-screen overflow-hidden bg-secondary-background flex items-center justify-center">
      {/* Phone Frame */}
      <div
        className="relative w-97.5 h-211 overflow-hidden"
        style={{ boxShadow: '0 0 0 1px rgba(255,255,255,0.07), 0 40px 100px rgba(0,0,0,0.85)' }}
      >
        {/* Map Background */}
        
        {userLocation.latitude ? 
        (<div className="fixed inset-0 w-full h-full object-cover">
          <MapView location={userLocation} />
        </div>)  :  
        (<img
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80"
          alt="map"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'brightness(0.4) saturate(0.6) hue-rotate(200deg)' }}
        />)
        }
        
        {/* Vignette */}
        {/* <div className="absolute inset-0 bg-linear-to-b from-secondary-background/65 via-transparent to-secondary-background/90 z-1" /> */}

        {/* ── TOP BAR ── */}

        <Contianer>
          <section className="pt-8">
            <div className="relative">
              <div className="fixed top-0 w-full left-1/2 -translate-x-1/2 px-4 pt-4 z-20 flex items-center justify-between pb-4">
                {/* place Name */}
                <PlaceNameComponent place={place} />
                {/* profile button */}
                <ProfileButton handleClick={()=> Navigate('/profile') } />

              </div>

            </div>
          </section>
        </Contianer> 
        {/* ── MAP PINS ── */}
        {/* <MapPin label="GANNATH TEMPLE" emoji="🛕" style={{ top: '28%', left: '6%' }} />
        <MapPin label="City Park" emoji="🌿" style={{ top: '54%', right: '10%' }} />
        <MapPin label="Central Cafe" emoji="☕" style={{ top: '38%', right: '18%' }} /> */}

        {/* ── PLAYER MARKER ── */}
        {/* <PlayerMarker /> */}

        {/* ── BOTTOM CONTROLS ── */}
        <div className="">
          {/* Action buttons */}
          <div className="flex flex-col items-center">
            <div className="fixed bottom-8 left-0 right-0 z-20">
            <Contianer>
              <section className="py-4">
                <div className="flex items-center justify-between">
                  {/* Add button */}
                  {/* <AddButton /> */}
                  <Add handleClick={()=> Navigate('/upload')} />
                  {/* Scan button */}
                  {/* <ScanButton /> */}
                  <Scanner handleClick={()=> setShowScanner(true)} />
                </div>
              </section>
            </Contianer>
            {/* Nav Bar */}
            {/* <NavigationBar activeTab={activeTab} setActiveTab={setActiveTab} /> */}
            </div>
          </div>
        </div>
      </div>
      </div>
</>
  );
}