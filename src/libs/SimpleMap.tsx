import GoogleMapReact from "google-map-react";
import "./SimpleMap.css";

const AnyReactComponent = ({ text = "", lat = 0, lng = 0 }: { text: string; lat: number; lng: number }) => <div>{text}</div>;

export default function SimpleMap({ lat = 0, lng = 0 }) {
  const defaultProps = {
    center: { lat: 40.782751, lng: -73.965558 },
    zoom: 11,
  };

  return (
    // Important! Always set the container height explicitly
    <div className="simple-map-size">
      <GoogleMapReact bootstrapURLKeys={{ key: "" }} defaultCenter={defaultProps.center} defaultZoom={defaultProps.zoom}>
        <AnyReactComponent lat={lat} lng={lng} text="My Marker" />
      </GoogleMapReact>
    </div>
  );
}
