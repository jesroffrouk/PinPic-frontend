import { MapContainer,TileLayer,Marker,Popup,Circle,Tooltip } from "react-leaflet"
import "leaflet/dist/leaflet.css";

// This component is going to show me location with right radius. Currently It's working but it needs a lot of optimisation. 
// I want better Ui to show map and perform upload and vault , and also want to show different css style for map but I don't mind it for now

function MapView({location}) {
  console.log(location)
  let position = [location.latitude,location.longitude]
  return (
    <>
    <MapContainer style={{ height: '400px', width: '100%' }} center={[location.latitude, location.longitude]} zoom={13} scrollWheelZoom={false}>
    <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Circle
      center={position}
      pathOptions={{ color: 'blue' }}
      radius={1000}>
      <Tooltip>Tooltip for CircleMarker</Tooltip>
    </Circle>
    <Marker position={[location.latitude, location.longitude]}>
        <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
    </Marker>
    </MapContainer>
    </>
  )
}

export default MapView