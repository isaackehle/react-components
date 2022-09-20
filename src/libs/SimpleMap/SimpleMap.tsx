import GoogleMapReact from "google-map-react";
import "./SimpleMap.css";
import { MapLocation } from "./interfaces";
import LocationPin from "./LocationPin";

const DefaultLocation: MapLocation = { lat: 40.782751, lng: -73.965558, address: "" };

interface SimpleMapArgs {
  location: MapLocation;
  zoomLevel: number;
}

export default function SimpleMap({ location = DefaultLocation, zoomLevel = 11 }: SimpleMapArgs) {
  return (
    // Important! Always set the container height explicitly
    <div className="simple-map-size">
      <GoogleMapReact bootstrapURLKeys={{ key: "" }} defaultCenter={location} defaultZoom={zoomLevel}>
        <LocationPin lat={location.lat} lng={location.lng} text={location.address} />
      </GoogleMapReact>
    </div>
  );
}
